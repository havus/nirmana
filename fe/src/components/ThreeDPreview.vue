<template>
  <div class="threed-preview w-full h-full relative bg-gray-100 dark:bg-gray-800">
    <!-- Loading overlay -->
    <div v-if="isLoading" class="absolute inset-0 bg-white dark:bg-gray-800 bg-opacity-90 flex items-center justify-center z-10">
      <div class="text-center">
        <div class="w-12 h-12 border-4 border-indigo-200 border-t-indigo-600 rounded-full animate-spin mx-auto mb-4"></div>
        <p class="text-gray-600 dark:text-gray-300">{{ loadingMessage }}</p>
      </div>
    </div>

    <!-- Canvas container -->
    <div ref="canvasContainer" class="w-full h-full" style="touch-action: none;"></div>
  </div>
</template>

<script setup>
import { ref, onMounted, onUnmounted, watch, nextTick, computed } from 'vue'
import { use3DScene } from '@/composables/use3DScene'

// Props
const props = defineProps({
  nailsData: {
    type: Object,
    default: () => ({})
  },
  boardConfig: {
    type: Object,
    default: () => ({})
  },
  autoRotate: {
    type: Boolean,
    default: false
  },
  resetCameraTrigger: {
    type: Number,
    default: 0
  },
  resizeTrigger: {
    type: Number,
    default: 0
  },
  useInstancedMesh: {
    type: Boolean,
    default: true
  }
})

// Refs
const canvasContainer = ref(null)

// State
const isLoading = ref(true)
const loadingMessage = ref('Initializing 3D scene...')

// Computed
const nailCount = computed(() => Object.keys(props.nailsData).length)
const gridDimensions = computed(() => {
  const horizontal = props.boardConfig?.dotsCountHorizontal || 0
  const vertical = props.boardConfig?.dotsCountVertical || 0
  return `${horizontal}×${vertical}`
})

// Use 3D Scene composable
const {
  scene,
  camera,
  renderer,
  controls,
  fps,
  memoryUsage,
  drawCalls,
  triangles,
  geometries,
  textures,
  renderTime,
  initScene,
  createNails,
  updateSettings,
  onWindowResize
} = use3DScene(canvasContainer)

// Convert 2D board config to 3D settings
const convertBoardConfigTo3D = (boardConfig, nailsData) => {
  if (!boardConfig) return {}
  
  // Handle color conversion - remove # and convert to hex number
  let boardColorHex = 0xa4846a // default brown color
  if (boardConfig.boardColor) {
    const colorStr = boardConfig.boardColor.replace('#', '')
    boardColorHex = parseInt(colorStr, 16)
  }

  // Calculate board dimensions properly:
  // The nail area size = (gridSize - 1) * spacing (distance between first and last nail)
  // Total board size = nail area + padding on both sides
  const gridWidth = boardConfig.dotsCountHorizontal || 20
  const gridHeight = boardConfig.dotsCountVertical || 20
  const marginBetweenNails = (boardConfig.marginBetweenNails || 10) / 10 // mm to cm
  const paddingBoard = (boardConfig.paddingBoard || 40) / 10 // mm to cm

  const nailAreaWidth = (gridWidth - 1) * marginBetweenNails
  const nailAreaDepth = (gridHeight - 1) * marginBetweenNails
  const totalBoardWidth = nailAreaWidth + (paddingBoard * 2)
  const totalBoardDepth = nailAreaDepth + (paddingBoard * 2)

  const settings = {
    boardColor: boardColorHex,
    boardWidth: totalBoardWidth,
    boardDepth: totalBoardDepth,
    boardHeight: 2,
    nailSpacing: marginBetweenNails,
    edgeMargin: paddingBoard,
    useInstancedMesh: props.useInstancedMesh !== undefined ? props.useInstancedMesh : true,
    // Add custom nail data for the 3D scene
    customNailData: {
      nails: nailsData || {},
      gridWidth: gridWidth,
      gridHeight: gridHeight,
      marginBetweenNails: boardConfig.marginBetweenNails || 10,
      paddingBoard: boardConfig.paddingBoard || 40
    }
  }

  return settings
}

// Initialize 3D scene
const init3DScene = async () => {
  if (!canvasContainer.value) return
  
  try {
    loadingMessage.value = 'Setting up 3D environment...'
    
    // Initialize the scene
    await initScene()
    
    // Convert and apply board settings with nail data
    const settings3D = convertBoardConfigTo3D(props.boardConfig, props.nailsData)
    await updateSettings(settings3D)
    
    // Only create nails if we have nail data
    if (Object.keys(props.nailsData).length > 0) {
      loadingMessage.value = 'Adding nails...'
      // Create nails in the scene
      await createNails()
    }
    
    isLoading.value = false
    
  } catch (error) {
    console.error('Failed to initialize 3D scene:', error)
    isLoading.value = false
  }
}

// Update 3D scene when data changes
const update3DScene = async () => {
  if (!scene.value || isLoading.value) return
  
  try {
    // Convert and update settings with new nail data
    const settings3D = convertBoardConfigTo3D(props.boardConfig, props.nailsData)
    await updateSettings(settings3D)
    
    // Only create nails if we have nail data
    if (Object.keys(props.nailsData).length > 0) {
      // Recreate nails with new data
      await createNails()
    }
    
  } catch (error) {
    console.error('Failed to update 3D scene:', error)
  }
}

// Watch for changes in props - with improved debouncing
let updateTimeout
watch(() => props.nailsData, () => {
  if (updateTimeout) clearTimeout(updateTimeout)
  updateTimeout = setTimeout(() => {
    nextTick(() => {
      update3DScene()
    })
  }, 150) // Debounce updates for better performance
}, { deep: true })

watch(() => props.boardConfig, () => {
  if (updateTimeout) clearTimeout(updateTimeout)
  updateTimeout = setTimeout(() => {
    nextTick(() => {
      update3DScene()
    })
  }, 150)
}, { deep: true })

// Watch for auto rotate changes
watch(() => props.autoRotate, (newValue) => {
  if (controls.value) {
    controls.value.autoRotate = newValue
  }
})

// Watch for reset camera trigger
watch(() => props.resetCameraTrigger, () => {
  if (controls.value) {
    controls.value.reset()
  }
})

// Emits
const emit = defineEmits(['performance-update'])

// Watch for resize trigger
watch(() => props.resizeTrigger, () => {
  nextTick(() => {
    onWindowResize()
  })
})

// Watch for performance changes and emit to parent
watch([fps, memoryUsage, drawCalls, triangles, geometries, renderTime], 
  ([newFps, newMemory, newDrawCalls, newTriangles, newGeometries, newRenderTime]) => {
  // Calculate frame time from FPS
  const frameTime = newFps > 0 ? 1000 / newFps : 0
  
  // Format memory for display
  const memoryDisplay = newMemory > 0 ? `${newMemory} MB` : null
  
  emit('performance-update', {
    fps: newFps,
    frameTime: frameTime,
    memory: memoryDisplay,
    drawCalls: newDrawCalls,
    triangles: newTriangles,
    geometries: newGeometries,
    renderTime: newRenderTime.toFixed(2)
  })
})

// Lifecycle
onMounted(() => {
  nextTick(() => {
    init3DScene()
  })
})

onUnmounted(() => {
  // Clear any pending timeout
  if (updateTimeout) clearTimeout(updateTimeout)
  
  // Cleanup is handled by the composable
})
</script>
