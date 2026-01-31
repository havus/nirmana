import { ref, onMounted, onUnmounted, markRaw, shallowRef } from 'vue'
import * as THREE from 'three'
import { OrbitControls } from 'three/examples/jsm/controls/OrbitControls.js'

export function use3DScene(canvasContainer) {
  // State - use shallowRef for Three.js objects to prevent deep reactivity
  const scene = shallowRef(null)
  const camera = shallowRef(null)
  const renderer = shallowRef(null)
  const controls = shallowRef(null)
  const isLoading = ref(true)
  const fps = ref(0)
  const memoryUsage = ref(0)
  const isSceneReady = ref(false)

  // Promise that resolves when scene is initialized
  let sceneReadyResolve
  const sceneReadyPromise = new Promise(resolve => {
    sceneReadyResolve = resolve
  })

  const settings = ref({
    boardColor: 0xa4846a,
    boardSize: 42, // Kept for backward compatibility
    boardWidth: 42,
    boardDepth: 42,
    boardHeight: 2,
    baseColor: 0xffffff,
    colorScheme: 'custom',
    colorVariation: 0.7,
    brightness: 0.8,
    metalness: 0.8,
    headSizeRatio: 2.0,
    nailGrid: 41,
    minNailHeight: 1,
    maxNailHeight: 5,
    nailRadius: 0.1,
    edgeMargin: 0.5,
    topMargin: 0,
    autoRotate: false,
    pattern: 'fingerprint',
    patternIntensity: 1.0,
    patternScale: 4,
    nailDetail: 'medium',
    lightIntensity: 2.0,
    lightContrast: 2.0,
    nailSpacing: 1.0,
    spacingDistribution: 'uniform'
  })

  // Pattern functions
  const patterns = {
    fingerprint: (x, y, gridSize, scale, intensity) => {
      const centerX = gridSize / 2
      const centerY = gridSize / 2
      const dx = x - centerX
      const dy = y - centerY
      const dist = Math.sqrt(dx * dx + dy * dy) / (gridSize / 2)
      const angle = Math.atan2(dy, dx)

      const rings = Math.sin(dist * scale * 2) * 0.5 + 0.5
      const ridges = Math.sin(angle * 8 + dist * scale * 4) * 0.3 + 0.7

      return Math.max(0.1, rings * ridges * intensity)
    },

    diamond: (x, y, gridSize, scale, intensity) => {
      const centerX = gridSize / 2
      const centerY = gridSize / 2
      const dx = Math.abs(x - centerX)
      const dy = Math.abs(y - centerY)
      const dist = (dx + dy) / (gridSize / 2)

      return Math.max(0.1, (1 - dist) * intensity)
    },

    waves: (x, y, gridSize, scale, intensity) => {
      const normalizedX = x / gridSize
      const normalizedY = y / gridSize
      const wave = Math.sin(normalizedX * scale * Math.PI) * Math.sin(normalizedY * scale * Math.PI)

      return Math.max(0.1, (wave * 0.5 + 0.5) * intensity)
    },

    concentric: (x, y, gridSize, scale, intensity) => {
      const centerX = gridSize / 2
      const centerY = gridSize / 2
      const dx = x - centerX
      const dy = y - centerY
      const dist = Math.sqrt(dx * dx + dy * dy)

      return Math.max(0.1, (Math.cos(dist / scale * Math.PI) * 0.5 + 0.5) * intensity)
    },

    spiral: (x, y, gridSize, scale, intensity) => {
      const centerX = gridSize / 2
      const centerY = gridSize / 2
      const dx = x - centerX
      const dy = y - centerY
      const dist = Math.sqrt(dx * dx + dy * dy)
      const angle = Math.atan2(dy, dx)

      return Math.max(0.1, (Math.cos(dist / scale - angle * 2) * 0.5 + 0.5) * intensity)
    }
  }

  // Color utilities
  const colorUtils = {
    hslToHex: (h, s, l) => {
      l /= 100
      const a = s * Math.min(l, 1 - l) / 100
      const f = n => {
        const k = (n + h / 30) % 12
        const color = l - a * Math.max(Math.min(k - 3, 9 - k, 1), -1)
        return Math.round(255 * color).toString(16).padStart(2, '0')
      }
      return `#${f(0)}${f(8)}${f(4)}`
    },

    generateColorScheme: (baseColor, scheme, count) => {
      const colors = []
      const baseHue = (baseColor >> 16) & 0xff

      switch (scheme) {
        case 'rainbow':
          for (let i = 0; i < count; i++) {
            const hue = (i / count) * 360
            colors.push(parseInt(colorUtils.hslToHex(hue, 70, 50).slice(1), 16))
          }
          break
        case 'monochromatic':
          for (let i = 0; i < count; i++) {
            const lightness = 30 + (i / count) * 40
            colors.push(parseInt(colorUtils.hslToHex(baseHue, 70, lightness).slice(1), 16))
          }
          break
        default:
          colors.push(baseColor)
      }

      return colors
    }
  }

  let frameCount = 0
  let lastTime = 0
  // Use regular variables for Three.js objects that don't need reactivity
  let board, nailInstancedMesh, nailHeadInstancedMesh
  let lights = []

  // Methods
  const initScene = () => {
    if (!canvasContainer.value) return

    try {
      // Create scene - mark as raw to prevent Vue reactivity
      scene.value = markRaw(new THREE.Scene())
      scene.value.background = new THREE.Color(0xf0f0f0)

      // Create camera - mark as raw to prevent Vue reactivity
      camera.value = markRaw(new THREE.PerspectiveCamera(
        30,
        canvasContainer.value.clientWidth / canvasContainer.value.clientHeight,
        0.1,
        1000
      ))
      camera.value.position.set(30, 30, 30)

      // Create renderer - mark as raw to prevent Vue reactivity
      renderer.value = markRaw(new THREE.WebGLRenderer({ antialias: true }))
      renderer.value.setSize(
        canvasContainer.value.clientWidth,
        canvasContainer.value.clientHeight
      )
      renderer.value.shadowMap.enabled = true
      renderer.value.shadowMap.type = THREE.PCFSoftShadowMap

      canvasContainer.value.appendChild(renderer.value.domElement)

      // Add OrbitControls - mark as raw to prevent Vue reactivity
      controls.value = markRaw(new OrbitControls(camera.value, renderer.value.domElement))
      controls.value.enableDamping = true
      controls.value.dampingFactor = 0.05
      controls.value.autoRotate = settings.value.autoRotate
      controls.value.autoRotateSpeed = 0.5
      controls.value.enableZoom = true
      controls.value.enablePan = true
      controls.value.enableRotate = true
      controls.value.maxPolarAngle = Math.PI // Allow full rotation
      controls.value.minDistance = 10
      controls.value.maxDistance = 500 // Maximum zoom out distance

      // Add event listeners for debugging
      controls.value.addEventListener('start', () => {
        console.log('3D Controls: Interaction started')
      })
      controls.value.addEventListener('change', () => {
        console.log('3D Controls: Camera position changed')
      })
      controls.value.addEventListener('end', () => {
        console.log('3D Controls: Interaction ended')
      })

      console.log('3D Controls initialized:', {
        enableRotate: controls.value.enableRotate,
        enableZoom: controls.value.enableZoom,
        enablePan: controls.value.enablePan,
        domElement: controls.value.domElement
      })

      setupLighting()
      createBoard()
      createNails()

      // Start the animation loop
      animate()

      // Add resize listener
      window.addEventListener('resize', onWindowResize)

      isLoading.value = false
      isSceneReady.value = true
      sceneReadyResolve()
    } catch (error) {
      console.error('Failed to initialize 3D scene:', error)
      isLoading.value = false
      throw error
    }
  }

  const setupLighting = () => {
    if (!scene.value) return

    // Clear existing lights
    lights.forEach(light => scene.value.remove(light))
    lights = []

    // Ambient light
    const ambientLight = new THREE.AmbientLight(0x404040, 0.4)
    scene.value.add(ambientLight)
    lights.push(ambientLight)

    // Directional light
    const directionalLight = new THREE.DirectionalLight(0xffffff, settings.value.lightIntensity)
    directionalLight.position.set(50, 50, 50)
    directionalLight.castShadow = true
    
    // Configure shadow camera to cover the entire board area
    const boardWidth = settings.value.boardWidth || settings.value.boardSize
    const boardDepth = settings.value.boardDepth || settings.value.boardSize
    const shadowCameraSize = Math.max(boardWidth, boardDepth) * 0.8
    
    directionalLight.shadow.camera.left = -shadowCameraSize
    directionalLight.shadow.camera.right = shadowCameraSize
    directionalLight.shadow.camera.top = shadowCameraSize
    directionalLight.shadow.camera.bottom = -shadowCameraSize
    directionalLight.shadow.camera.near = 0.5
    directionalLight.shadow.camera.far = 150
    
    // Higher resolution for better shadow quality
    directionalLight.shadow.mapSize.width = 2048
    directionalLight.shadow.mapSize.height = 2048
    directionalLight.shadow.bias = -0.0001 // Reduce shadow acne
    
    scene.value.add(directionalLight)
    lights.push(directionalLight)
  }

  const createBoard = () => {
    if (!scene.value) return

    if (board) {
      scene.value.remove(board)
    }

    // Use separate width and depth values, fallback to boardSize for backward compatibility
    const boardWidth = settings.value.boardWidth || settings.value.boardSize
    const boardDepth = settings.value.boardDepth || settings.value.boardSize

    const geometry = new THREE.BoxGeometry(
      boardWidth,
      settings.value.boardHeight,
      boardDepth
    )
    const material = new THREE.MeshStandardMaterial({
      color: settings.value.boardColor,
      roughness: 0.8,
      metalness: 0.1
    })
    board = markRaw(new THREE.Mesh(geometry, material))
    board.position.y = -settings.value.boardHeight / 2
    board.receiveShadow = true
    scene.value.add(board)
  }

  const createNailGeometry = () => {
    const detail = settings.value.nailDetail
    let segments = 8

    if (detail === 'low') segments = 6
    else if (detail === 'high') segments = 16

    return markRaw(new THREE.CylinderGeometry(
      settings.value.nailRadius,
      settings.value.nailRadius,
      1, // Height will be scaled per instance
      segments
    ))
  }

  const createNailHeadGeometry = () => {
    const detail = settings.value.nailDetail
    let segments = 8

    if (detail === 'low') segments = 6
    else if (detail === 'high') segments = 16

    return markRaw(new THREE.CylinderGeometry(
      settings.value.nailRadius * settings.value.headSizeRatio,
      settings.value.nailRadius * settings.value.headSizeRatio,
      0.2,
      segments
    ))
  }

  const createNails = () => {
    if (!scene.value) return

    // Remove existing nails
    if (nailInstancedMesh) {
      scene.value.remove(nailInstancedMesh)
      nailInstancedMesh.geometry.dispose()
      nailInstancedMesh.material.dispose()
      nailInstancedMesh = null
    }
    if (nailHeadInstancedMesh) {
      scene.value.remove(nailHeadInstancedMesh)
      nailHeadInstancedMesh.geometry.dispose()
      nailHeadInstancedMesh.material.dispose()
      nailHeadInstancedMesh = null
    }

    // Check if we have custom nail data and it has nails
    if (settings.value.customNailData &&
      settings.value.customNailData.nails &&
      Object.keys(settings.value.customNailData.nails).length > 0) {
      createCustomNails()
    } else {
      // Don't create any pattern nails - only show nails from 2D editor
      // createPatternNails() - commented out to prevent default patterns
    }
  }

  const createCustomNails = () => {
    const customData = settings.value.customNailData
    const nailsData = customData.nails
    const gridWidth = customData.gridWidth
    const gridHeight = customData.gridHeight
    const marginBetweenNails = customData.marginBetweenNails / 10 // Convert mm to cm
    const paddingBoard = customData.paddingBoard / 10 // Convert mm to cm

    // Calculate the actual board dimensions including padding
    // The grid represents nail positions, so we need (gridSize - 1) * spacing for the nail area
    const nailAreaWidth = (gridWidth - 1) * marginBetweenNails
    const nailAreaDepth = (gridHeight - 1) * marginBetweenNails
    
    // Add padding on all sides (2x padding for both sides)
    const totalBoardWidth = nailAreaWidth + (paddingBoard * 2)
    const totalBoardDepth = nailAreaDepth + (paddingBoard * 2)
    
    // Update board dimensions and recreate it with padding
    settings.value.boardWidth = totalBoardWidth
    settings.value.boardDepth = totalBoardDepth
    createBoard()

    // Get nail positions from the data
    const nailPositions = Object.keys(nailsData)
    const instanceCount = nailPositions.length

    // If no nails, just return without creating any geometry
    if (instanceCount === 0) return

    // Create nail geometries - mark as raw to prevent reactivity issues
    const nailGeometry = markRaw(createNailGeometry())
    const nailMaterial = markRaw(new THREE.MeshStandardMaterial({
      color: 0x888888,
      metalness: settings.value.metalness,
      roughness: 0.4
    }))

    const headGeometry = markRaw(createNailHeadGeometry())
    const headMaterial = markRaw(new THREE.MeshStandardMaterial({
      color: 0x666666,
      metalness: settings.value.metalness,
      roughness: 0.3
    }))

    nailInstancedMesh = markRaw(new THREE.InstancedMesh(nailGeometry, nailMaterial, instanceCount))
    nailInstancedMesh.castShadow = true
    nailInstancedMesh.receiveShadow = true

    nailHeadInstancedMesh = markRaw(new THREE.InstancedMesh(headGeometry, headMaterial, instanceCount))
    nailHeadInstancedMesh.castShadow = true
    nailHeadInstancedMesh.receiveShadow = true

    // Generate nail positions and heights - mark matrices as raw
    const matrix = markRaw(new THREE.Matrix4())
    const headMatrix = markRaw(new THREE.Matrix4())

    let index = 0
    nailPositions.forEach(position => {
      const [x, y] = position.split(',').map(Number)
      const nailData = nailsData[position]

      // Calculate actual position on the board
      const posX = (x - (gridWidth - 1) / 2) * marginBetweenNails
      const posZ = (y - (gridHeight - 1) / 2) * marginBetweenNails

      // Get nail height (convert mm to cm)
      // Apply 1.2x visual multiplier to emphasize height differences in 3D
      const nailHeight = ((nailData.height || 10) / 10) * 1.2

      // Get nail dimensions - these are likely thickness multipliers, not absolute measurements
      // Apply 2.5x visual multipliers to emphasize dimension differences in 3D
      const bodyWidthMultiplier = (nailData.body_width || 1) * 2.5
      const headWidthMultiplier = (nailData.head_width || 1) * 2.5

      // Calculate actual dimensions based on default nail radius and multipliers
      const bodyWidth = settings.value.nailRadius * bodyWidthMultiplier
      const headWidth = settings.value.nailRadius * settings.value.headSizeRatio * headWidthMultiplier

      // Set nail shaft transform
      matrix.makeScale(bodyWidth, nailHeight, bodyWidth)
      matrix.setPosition(posX, nailHeight / 2, posZ)
      nailInstancedMesh.setMatrixAt(index, matrix)

      // Set nail head transform
      // Position head center at the top of the nail body for seamless connection
      headMatrix.makeScale(headWidth, 0.2, headWidth)
      headMatrix.setPosition(posX, nailHeight, posZ)
      nailHeadInstancedMesh.setMatrixAt(index, headMatrix)

      index++
    })

    nailInstancedMesh.instanceMatrix.needsUpdate = true
    nailHeadInstancedMesh.instanceMatrix.needsUpdate = true

    scene.value.add(nailInstancedMesh)
    scene.value.add(nailHeadInstancedMesh)
  }

  const createPatternNails = () => {
    const gridSize = settings.value.nailGrid
    const spacing = settings.value.nailSpacing
    const instanceCount = gridSize * gridSize

    // Create nail shafts - mark as raw to prevent reactivity issues
    const nailGeometry = markRaw(createNailGeometry())
    const nailMaterial = markRaw(new THREE.MeshStandardMaterial({
      color: 0x888888,
      metalness: settings.value.metalness,
      roughness: 0.4
    }))

    nailInstancedMesh = markRaw(new THREE.InstancedMesh(nailGeometry, nailMaterial, instanceCount))
    nailInstancedMesh.castShadow = true
    nailInstancedMesh.receiveShadow = true

    // Create nail heads - mark as raw to prevent reactivity issues
    const headGeometry = markRaw(createNailHeadGeometry())
    const headMaterial = markRaw(new THREE.MeshStandardMaterial({
      color: 0x666666,
      metalness: settings.value.metalness,
      roughness: 0.3
    }))

    nailHeadInstancedMesh = markRaw(new THREE.InstancedMesh(headGeometry, headMaterial, instanceCount))
    nailHeadInstancedMesh.castShadow = true
    nailHeadInstancedMesh.receiveShadow = true

    // Generate nail positions and heights - mark matrices as raw
    const matrix = markRaw(new THREE.Matrix4())
    const headMatrix = markRaw(new THREE.Matrix4())
    const colors = colorUtils.generateColorScheme(
      settings.value.baseColor,
      settings.value.colorScheme,
      instanceCount
    )

    let index = 0
    for (let x = 0; x < gridSize; x++) {
      for (let z = 0; z < gridSize; z++) {
        // Calculate position
        const posX = (x - gridSize / 2) * spacing
        const posZ = (z - gridSize / 2) * spacing

        // Calculate height based on pattern
        const patternFunc = patterns[settings.value.pattern] || patterns.fingerprint
        const heightFactor = patternFunc(x, z, gridSize, settings.value.patternScale, settings.value.patternIntensity)
        const nailHeight = settings.value.minNailHeight +
          (settings.value.maxNailHeight - settings.value.minNailHeight) * heightFactor

        // Set nail shaft transform
        matrix.makeScale(1, nailHeight, 1)
        matrix.setPosition(posX, nailHeight / 2, posZ)
        nailInstancedMesh.setMatrixAt(index, matrix)

        // Set nail head transform
        headMatrix.makeScale(1, 1, 1)
        headMatrix.setPosition(posX, nailHeight + 0.1, posZ)
        nailHeadInstancedMesh.setMatrixAt(index, headMatrix)

        // Set color variation
        if (settings.value.colorScheme !== 'custom') {
          const color = new THREE.Color(colors[index % colors.length])
          nailInstancedMesh.setColorAt(index, color)
          nailHeadInstancedMesh.setColorAt(index, color.clone().multiplyScalar(0.8))
        }

        index++
      }
    }

    nailInstancedMesh.instanceMatrix.needsUpdate = true
    nailHeadInstancedMesh.instanceMatrix.needsUpdate = true

    scene.value.add(nailInstancedMesh)
    scene.value.add(nailHeadInstancedMesh)
  }

  const updatePerformanceStats = () => {
    frameCount++
    const currentTime = performance.now()

    if (currentTime - lastTime >= 1000) {
      fps.value = Math.round((frameCount * 1000) / (currentTime - lastTime))
      frameCount = 0
      lastTime = currentTime

      // Update memory usage
      if (performance.memory) {
        memoryUsage.value = Math.round(performance.memory.usedJSHeapSize / 1048576)
      }
    }
  }

  const animate = () => {
    requestAnimationFrame(animate)

    updatePerformanceStats()

    if (controls.value) {
      controls.value.update()
    }

    if (renderer.value && scene.value && camera.value) {
      renderer.value.render(scene.value, camera.value)
    }
  }

  const onWindowResize = () => {
    if (!canvasContainer.value || !camera.value || !renderer.value) return

    camera.value.aspect = canvasContainer.value.clientWidth / canvasContainer.value.clientHeight
    camera.value.updateProjectionMatrix()
    renderer.value.setSize(canvasContainer.value.clientWidth, canvasContainer.value.clientHeight)
  }

  const takeScreenshot = () => {
    if (!renderer.value) return

    const link = document.createElement('a')
    link.download = 'nirmana-3d-screenshot.png'
    link.href = renderer.value.domElement.toDataURL()
    link.click()
  }

  const updateSettings = (newSettings) => {
    if (!scene.value) return

    Object.assign(settings.value, newSettings)

    if (newSettings.lightIntensity !== undefined) {
      setupLighting()
    }

    if (newSettings.boardColor !== undefined || newSettings.boardSize !== undefined ||
      newSettings.boardWidth !== undefined || newSettings.boardDepth !== undefined) {
      createBoard()
    }

    // Recreate nails if any nail-related settings changed
    const nailSettings = [
      'nailGrid', 'pattern', 'patternIntensity', 'patternScale',
      'minNailHeight', 'maxNailHeight', 'nailRadius', 'headSizeRatio',
      'colorScheme', 'baseColor', 'nailDetail', 'metalness', 'nailSpacing',
      'customNailData'
    ]

    if (nailSettings.some(key => newSettings[key] !== undefined)) {
      createNails()
    }

    if (controls.value && newSettings.autoRotate !== undefined) {
      controls.value.autoRotate = newSettings.autoRotate
    }
  }

  // Lifecycle
  onUnmounted(() => {
    window.removeEventListener('resize', onWindowResize)
    if (renderer.value) {
      renderer.value.dispose()
    }
  })

  return {
    scene,
    camera,
    renderer,
    controls,
    isLoading,
    isSceneReady,
    settings,
    fps,
    memoryUsage,
    patterns: Object.keys(patterns),
    sceneReadyPromise,
    initScene,
    createNails,
    updateSettings,
    takeScreenshot,
    onWindowResize
  }
}
