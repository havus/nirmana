import { ref, reactive, computed, watch, nextTick } from 'vue'
import { DISPLAY_CONSTANTS } from '@/constants/boardDefaults'

export function use2DGridCanvas(boardSettings, selectedNailHeight, selectedNailWidth, nailBodyOptions, selectedNailHead, nailHeadOptions, isPanModeActive = ref(false)) {
  // Viewport and interaction state
  const scale = ref(1)
  const xOffset = ref(0)
  const yOffset = ref(0)
  
  // Canvas references
  let canvas = null
  let ctx = null
  let animationFrameId = null
  
  // Grid data - using coordinate-based structure
  const nails = ref({})
  
  // Mouse state for hover effects
  const hoveredCell = ref({ x: -1, y: -1 })
  
  // Constants from boardDefaults
  const CELL_SIZE = 23 // Size of each grid cell (deprecated, kept for reference)
  const DOT_SIZE_RATIO = DISPLAY_CONSTANTS.DOT_SIZE_RATIO
  const MIN_DOT_SIZE = DISPLAY_CONSTANTS.MIN_DOT_SIZE
  const MAX_DOT_SIZE = DISPLAY_CONSTANTS.MAX_DOT_SIZE
  const FONT_SIZE = 10 // Base font size for height text
  const DISPLAY_SCALE = DISPLAY_CONSTANTS.DISPLAY_SCALE
  
  // Helper function to get nail at position
  const getNailAt = (x, y) => {
    const key = `${x},${y}`
    return nails.value[key] || null
  }
  
  // Helper function to set nail at position
  const setNailAt = (x, y, nailData) => {
    const key = `${x},${y}`
    if (nailData) {
      nails.value[key] = nailData
    } else {
      delete nails.value[key]
    }
  }
  
  // Helper function to convert width number to width type
  const getWidthTypeFromNumber = (width) => {
    switch (width) {
      case 1: return 'thin'
      case 2: return 'medium'
      case 3: return 'thick'
      default: return 'thin'
    }
  }
  
  // Helper function to convert width type to number
  const getWidthNumberFromType = (widthType) => {
    switch (widthType) {
      case 'thin': return 1
      case 'medium': return 2
      case 'thick': return 3
      default: return 1
    }
  }
  
  // Helper function to get color from width number
  const getColorFromWidth = (width) => {
    const widthType = getWidthTypeFromNumber(width)
    const widthOption = nailBodyOptions.find(w => w.id === widthType)
    return widthOption?.color || '#ef4444'
  }
  
  // Helper function to convert head number to head type
  const getHeadTypeFromNumber = (head) => {
    switch (head) {
      case 1: return 'small'
      case 2: return 'medium'
      case 3: return 'large'
      default: return 'medium'
    }
  }
  
  // Helper function to convert head type to number
  const getHeadNumberFromType = (headType) => {
    switch (headType) {
      case 'small': return 1
      case 'medium': return 2
      case 'large': return 3
      default: return 2
    }
  }
  
  // Helper function to get head properties from head number
  const getHeadPropertiesFromNumber = (head) => {
    const headType = getHeadTypeFromNumber(head)
    const headOption = nailHeadOptions.find(h => h.id === headType)
    return {
      color: headOption?.color || '#eab308',
      borderPercentage: headOption?.borderPercentage || 60,
      label: headOption?.label || 'Medium Head'
    }
  }
  
  // Computed grid styles
  const gridStyles = computed(() => {
    const totalWidth = (boardSettings.dotsCountHorizontal * boardSettings.marginBetweenNails * DISPLAY_SCALE) + (boardSettings.paddingBoard * 2)
    const totalHeight = (boardSettings.dotsCountVertical * boardSettings.marginBetweenNails * DISPLAY_SCALE) + (boardSettings.paddingBoard * 2)
    
    return {
      width: `${totalWidth}px`,
      height: `${totalHeight}px`,
      backgroundColor: boardSettings.boardColor,
      padding: `${boardSettings.paddingBoard}px`,
      borderRadius: '8px',
      boxShadow: '0 10px 40px rgba(0,0,0,0.3)',
      position: 'relative'
    }
  })
  
  // Computed dot size based on marginBetweenNails
  const getDotSize = () => {
    // Calculate dot size as a percentage of margin, clamped between min and max
    const calculatedSize = boardSettings.marginBetweenNails * DOT_SIZE_RATIO
    return Math.max(MIN_DOT_SIZE, Math.min(MAX_DOT_SIZE, calculatedSize))
  }
  
  // Computed zoom percentage
  const zoomPercentage = computed(() => Math.round(scale.value * 100))
  
  // Initialize canvas
  const initCanvas = () => {
    const container = document.getElementById('grid-container')
    if (!container) return
    
    // Clear existing content
    container.innerHTML = ''
    
    // Create board wrapper
    const boardWrapper = document.createElement('div')
    boardWrapper.className = 'mdf-board-wrapper'
    Object.assign(boardWrapper.style, {
      ...gridStyles.value,
      position: 'relative',
      cursor: 'pointer'
    })
    
    // Create canvas
    canvas = document.createElement('canvas')
    canvas.className = 'grid-canvas'
    
    // Set canvas size (apply display scale)
    const gridWidth = boardSettings.dotsCountHorizontal * boardSettings.marginBetweenNails * DISPLAY_SCALE
    const gridHeight = boardSettings.dotsCountVertical * boardSettings.marginBetweenNails * DISPLAY_SCALE
    
    // Calculate resolution multiplier for high clarity when marginBetweenNails is small
    // When scaled margin < 50, increase canvas resolution for better clarity when zooming
    const scaledMargin = boardSettings.marginBetweenNails * DISPLAY_SCALE
    const resolutionMultiplier = scaledMargin < 50 
      ? Math.max(2, Math.ceil(50 / scaledMargin))
      : 1
    
    // Set actual canvas resolution (higher for small margins)
    canvas.width = gridWidth * resolutionMultiplier
    canvas.height = gridHeight * resolutionMultiplier
    
    // Set CSS display size (visual size remains the same)
    canvas.style.width = `${gridWidth}px`
    canvas.style.height = `${gridHeight}px`
    canvas.style.display = 'block'
    
    // Get context
    ctx = canvas.getContext('2d', { alpha: true })
    
    // Scale context to match resolution multiplier
    if (resolutionMultiplier > 1) {
      ctx.scale(resolutionMultiplier, resolutionMultiplier)
    }
    
    // Add canvas to wrapper
    boardWrapper.appendChild(canvas)
    container.appendChild(boardWrapper)
    
    // Add event listeners
    canvas.addEventListener('mousemove', handleMouseMove)
    canvas.addEventListener('mouseleave', handleMouseLeave)
    canvas.addEventListener('click', handleClick)
    canvas.addEventListener('contextmenu', handleRightClick)
    
    // Initial render
    renderGrid()
    updateTransform()
  }
  
  // Convert mouse coordinates to grid coordinates
  const getGridCoordinates = (event) => {
    if (!canvas) return null
    
    // Get canvas bounding rect (already accounts for all transforms)
    const rect = canvas.getBoundingClientRect()
    
    // Get mouse position relative to the canvas
    const mouseX = event.clientX - rect.left
    const mouseY = event.clientY - rect.top
    
    // Calculate logical grid size (with display scale applied)
    const logicalWidth = boardSettings.dotsCountHorizontal * boardSettings.marginBetweenNails * DISPLAY_SCALE
    const logicalHeight = boardSettings.dotsCountVertical * boardSettings.marginBetweenNails * DISPLAY_SCALE
    
    // Calculate scale factor from logical size to displayed size
    const scaleX = logicalWidth / rect.width
    const scaleY = logicalHeight / rect.height
    
    // Convert to logical canvas coordinates
    const canvasX = mouseX * scaleX
    const canvasY = mouseY * scaleY
    
    // Convert to grid coordinates (divide by scaled margin)
    const gridX = Math.floor(canvasX / (boardSettings.marginBetweenNails * DISPLAY_SCALE))
    const gridY = Math.floor(canvasY / (boardSettings.marginBetweenNails * DISPLAY_SCALE))
    
    // Check bounds
    if (gridX >= 0 && gridX < boardSettings.dotsCountHorizontal &&
        gridY >= 0 && gridY < boardSettings.dotsCountVertical) {
      return { x: gridX, y: gridY }
    }
    
    return null
  }
  
  // Mouse event handlers
  const handleMouseMove = (event) => {
    // Don't show hover effects when pan mode is active
    if (isPanModeActive.value) {
      if (hoveredCell.value.x !== -1 || hoveredCell.value.y !== -1) {
        hoveredCell.value = { x: -1, y: -1 }
        renderGrid()
      }
      return
    }
    
    const coords = getGridCoordinates(event)
    
    if (coords) {
      if (hoveredCell.value.x !== coords.x || hoveredCell.value.y !== coords.y) {
        hoveredCell.value = coords
        renderGrid()
      }
      canvas.style.cursor = 'pointer'
    } else {
      if (hoveredCell.value.x !== -1 || hoveredCell.value.y !== -1) {
        hoveredCell.value = { x: -1, y: -1 }
        renderGrid()
      }
      canvas.style.cursor = 'default'
    }
  }
  
  const handleMouseLeave = () => {
    hoveredCell.value = { x: -1, y: -1 }
    renderGrid()
  }
  
  const handleClick = (event) => {
    // Prevent clicking on nails when pan mode is active
    if (isPanModeActive.value) {
      return
    }
    
    const coords = getGridCoordinates(event)
    if (coords) {
      addNailAtPosition(coords.x, coords.y)
    }
  }
  
  const handleRightClick = (event) => {
    // Prevent right-clicking on nails when pan mode is active
    if (isPanModeActive.value) {
      return
    }
    
    event.preventDefault()
    const coords = getGridCoordinates(event)
    if (coords) {
      removeNailAtPosition(coords.x, coords.y)
    }
  }
  
  // Render the grid on canvas
  const renderGrid = () => {
    if (!ctx || !canvas) return
    
    // Save the current transform
    ctx.save()
    
    // Reset transform to clear the entire canvas
    ctx.setTransform(1, 0, 0, 1, 0, 0)
    ctx.clearRect(0, 0, canvas.width, canvas.height)
    
    // Restore the transform
    ctx.restore()
    
    // Draw each cell (apply display scale to coordinates)
    for (let row = 0; row < boardSettings.dotsCountVertical; row++) {
      for (let col = 0; col < boardSettings.dotsCountHorizontal; col++) {
        const x = col * boardSettings.marginBetweenNails * DISPLAY_SCALE
        const y = row * boardSettings.marginBetweenNails * DISPLAY_SCALE
        const isHovered = hoveredCell.value.x === col && hoveredCell.value.y === row
        
        drawCell(x, y, col, row, isHovered)
      }
    }
  }
  
  // Draw a single cell
  const drawCell = (x, y, col, row, isHovered) => {
    // Calculate scaled margin for this cell
    const scaledMargin = boardSettings.marginBetweenNails * DISPLAY_SCALE
    const centerX = x + scaledMargin / 2
    const centerY = y + scaledMargin / 2
    const nail = getNailAt(col, row)
    
    // Get dynamic dot size based on scaled margin
    const dotSize = getDotSize() * DISPLAY_SCALE
    const dotRadius = dotSize / 2
    
    // Draw hover effect for empty cells
    if (!nail && isHovered) {
      ctx.save()
      ctx.shadowColor = 'rgba(99, 102, 241, 0.4)'
      ctx.shadowBlur = Math.max(0.3, dotRadius * 0.6)
      ctx.fillStyle = 'rgba(99, 102, 241, 0.1)'
      ctx.beginPath()
      // Scale hover ring proportionally, ensuring it doesn't exceed cell boundaries
      const hoverRadius = dotRadius + Math.max(0.1, dotRadius * 0.15)
      ctx.arc(centerX, centerY, hoverRadius, 0, Math.PI * 2)
      ctx.fill()
      ctx.restore()
    }
    
    // Draw nail dot (body)
    ctx.save()
    
    const dotColor = nail ? getColorFromWidth(nail.body_width) : '#666666'
    
    // Shadow - scale proportionally
    ctx.shadowColor = 'rgba(0, 0, 0, 0.3)'
    ctx.shadowBlur = Math.max(0.5, dotRadius * 0.3)
    ctx.shadowOffsetY = Math.max(0.3, dotRadius * 0.15)
    
    // Draw body
    ctx.fillStyle = dotColor
    ctx.beginPath()
    ctx.arc(centerX, centerY, dotRadius, 0, Math.PI * 2)
    ctx.fill()
    
    ctx.restore()
    
    // Draw nail head (border) if nail exists
    if (nail) {
      const headProps = getHeadPropertiesFromNumber(nail.head_width)
      // Scale head radius proportionally based on dot size
      // For very small dots, keep the head ring minimal but visible
      const headRadius = dotRadius + Math.max(0.1, dotRadius * 0.2)
      const borderPercentage = headProps.borderPercentage / 100
      
      ctx.save()
      ctx.strokeStyle = headProps.color
      // Scale line width proportionally (minimum 0.3px for visibility at small sizes)
      ctx.lineWidth = Math.max(0.3, dotRadius * 0.15)
      ctx.lineCap = 'round'
      
      ctx.beginPath()
      ctx.arc(
        centerX,
        centerY,
        headRadius,
        -Math.PI / 2,
        -Math.PI / 2 + (Math.PI * 2 * borderPercentage)
      )
      ctx.stroke()
      ctx.restore()
      
      // Draw height text (always show if there's a height value)
      // The dotSize is already scaled, so we just need a reasonable minimum threshold
      const minDotSizeForText = 5 // Show text when dot is at least 5px (very small but visible when zoomed)
      if (nail.height > 0 && dotSize >= minDotSizeForText) {
        ctx.save()
        ctx.fillStyle = 'white'
        // Scale font size proportionally based on dot size
        // Use a smooth scaling formula
        const fontSize = Math.max(4, Math.min(100, dotRadius * 1.2))
        ctx.font = `bold ${fontSize}px sans-serif`
        ctx.textAlign = 'center'
        ctx.textBaseline = 'middle'
        ctx.shadowColor = 'rgba(0, 0, 0, 0.8)'
        ctx.shadowBlur = Math.max(0.2, dotRadius * 0.15)
        ctx.shadowOffsetY = Math.max(0.1, dotRadius * 0.08)
        ctx.fillText(nail.height.toString(), centerX, centerY)
        ctx.restore()
      }
    }
    
    // Draw hover scale effect
    if (isHovered && !nail) {
      ctx.save()
      ctx.strokeStyle = 'rgba(99, 102, 241, 0.5)'
      ctx.lineWidth = Math.max(0.2, dotRadius * 0.15)
      ctx.beginPath()
      // Keep hover ring within cell boundaries
      const hoverRingRadius = dotRadius + Math.max(0.15, dotRadius * 0.25)
      ctx.arc(centerX, centerY, hoverRingRadius, 0, Math.PI * 2)
      ctx.stroke()
      ctx.restore()
    }
  }
  
  // Add nail at position
  const addNailAtPosition = (x, y) => {
    if (selectedNailHeight.value === 0) {
      return
    }
    
    const selectedWidthNumber = getWidthNumberFromType(selectedNailWidth.value)
    const selectedHeadNumber = getHeadNumberFromType(selectedNailHead.value)
    const existingNail = getNailAt(x, y)
    
    if (existingNail &&
        existingNail.height === selectedNailHeight.value &&
        existingNail.body_width === selectedWidthNumber &&
        existingNail.head_width === selectedHeadNumber) {
      removeNailAtPosition(x, y)
    } else {
      setNailAt(x, y, {
        height: selectedNailHeight.value,
        body_width: selectedWidthNumber,
        head_width: selectedHeadNumber
      })
      renderGrid()
    }
  }
  
  // Remove nail at position
  const removeNailAtPosition = (x, y) => {
    const nail = getNailAt(x, y)
    if (nail) {
      setNailAt(x, y, null)
      renderGrid()
    }
  }
  
  // Clear all nails
  const clearAllNails = () => {
    nails.value = {}
    renderGrid()
  }
  
  // Update transform (zoom and pan)
  const updateTransform = () => {
    const container = document.getElementById('grid-container')
    if (!container) return
    
    container.style.transform = `translate(${xOffset.value}px, ${yOffset.value}px) scale(${scale.value})`
  }
  
  // Reset view
  const resetView = () => {
    scale.value = 1
    xOffset.value = 0
    yOffset.value = 0
    updateTransform()
  }
  
  // Generate grid (initialize canvas)
  const generateGrid = () => {
    initCanvas()
  }
  
  // Initialize grid with data
  const initializeGrid = (projectData) => {
    if (!projectData) return
    
    // Load board settings
    if (projectData.board_config) {
      Object.assign(boardSettings, projectData.board_config)
    }
    
    // Load nails
    if (projectData.nails) {
      nails.value = { ...projectData.nails }
    }
    
    // Regenerate grid
    nextTick(() => {
      generateGrid()
    })
  }
  
  // Save grid data
  const saveGrid = () => {
    return {
      board_config: {
        dotsCountHorizontal: boardSettings.dotsCountHorizontal,
        dotsCountVertical: boardSettings.dotsCountVertical,
        marginBetweenNails: boardSettings.marginBetweenNails,
        paddingBoard: boardSettings.paddingBoard,
        boardColor: boardSettings.boardColor
      },
      nails: { ...nails.value }
    }
  }
  
  // Export grid as JSON
  const exportGrid = () => {
    const data = saveGrid()
    const json = JSON.stringify(data, null, 2)
    const blob = new Blob([json], { type: 'application/json' })
    const url = URL.createObjectURL(blob)
    
    const link = document.createElement('a')
    link.href = url
    link.download = `grid-${Date.now()}.json`
    link.click()
    
    URL.revokeObjectURL(url)
  }
  
  // Import grid from JSON
  const importGrid = async (file) => {
    return new Promise((resolve, reject) => {
      const reader = new FileReader()
      
      reader.onload = (e) => {
        try {
          const data = JSON.parse(e.target.result)
          
          if (!data.board_config || !data.nails) {
            reject(new Error('Invalid grid data format'))
            return
          }
          
          Object.assign(boardSettings, data.board_config)
          nails.value = { ...data.nails }
          
          nextTick(() => {
            generateGrid()
            resolve()
          })
        } catch (error) {
          reject(error)
        }
      }
      
      reader.onerror = () => reject(new Error('Failed to read file'))
      reader.readAsText(file)
    })
  }
  
  // Watch for board setting changes
  watch(
    () => [
      boardSettings.dotsCountHorizontal,
      boardSettings.dotsCountVertical,
      boardSettings.marginBetweenNails,
      boardSettings.paddingBoard,
      boardSettings.boardColor
    ],
    () => {
      nextTick(() => {
        generateGrid()
      })
    },
    { deep: true }
  )
  
  // Cleanup on unmount
  const cleanup = () => {
    if (canvas) {
      canvas.removeEventListener('mousemove', handleMouseMove)
      canvas.removeEventListener('mouseleave', handleMouseLeave)
      canvas.removeEventListener('click', handleClick)
      canvas.removeEventListener('contextmenu', handleRightClick)
    }
    
    if (animationFrameId) {
      cancelAnimationFrame(animationFrameId)
    }
  }
  
  return {
    scale,
    xOffset,
    yOffset,
    nails,
    zoomPercentage,
    generateGrid,
    clearAllNails,
    resetView,
    saveGrid,
    exportGrid,
    importGrid,
    initializeGrid,
    updateTransform,
    cleanup
  }
}
