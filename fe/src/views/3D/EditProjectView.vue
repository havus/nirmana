<template>
  <div class="edit-project-3d">
    <!-- Loading overlay -->
    <div v-if="isLoading" class="loading-overlay">
      <div class="loading-content">
        <div class="spinner"></div>
        <p>{{ loadingMessage }}</p>
      </div>
    </div>

    <!-- Main content -->
    <div class="scene-container">
      <!-- Canvas container -->
      <div ref="canvasContainer" class="canvas-container"></div>

      <!-- Control panel -->
      <div class="control-panel">
        <div class="project-info">
          <h2 v-if="projectInfo">{{ projectInfo.name }}</h2>
          <p v-if="projectInfo" class="project-meta">
            Version: {{ projectInfo.version }} | 
            Owner: {{ projectInfo.owner?.full_name }}
          </p>
        </div>

        <div class="board-info">
          <h3>Board Configuration</h3>
          <div class="info-grid">
            <div class="info-item">
              <span class="label">Dimensions:</span>
              <span class="value">{{ boardDimensions }}</span>
            </div>
            <div class="info-item">
              <span class="label">Grid Size:</span>
              <span class="value">{{ gridSize }}</span>
            </div>
            <div class="info-item">
              <span class="label">Nail Count:</span>
              <span class="value">{{ nailCount }}</span>
            </div>
            <div class="info-item">
              <span class="label">Margin:</span>
              <span class="value">{{ marginBetweenNails }}mm</span>
            </div>
          </div>
        </div>

        <div class="performance-stats">
          <h3>Performance</h3>
          <div class="stats-grid">
            <div class="stat-item">
              <span class="label">FPS:</span>
              <span class="value">{{ fps }}</span>
            </div>
            <div class="stat-item">
              <span class="label">Memory:</span>
              <span class="value">{{ memoryUsage }}MB</span>
            </div>
          </div>
        </div>

        <div class="actions">
          <button @click="takeScreenshot" class="btn btn-primary">
            📸 Take Screenshot
          </button>
          <button @click="resetCamera" class="btn btn-secondary">
            🔄 Reset Camera
          </button>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref, computed, onMounted, nextTick } from 'vue'
import { useRoute, useRouter } from 'vue-router'
import { use3DScene } from '@/composables/use3DScene'
import { useToast } from '@/composables/useToast'

// Router and route
const route = useRoute()
const router = useRouter()

// Toast composable
const { success, error, warning } = useToast()

// Refs
const canvasContainer = ref(null)

// State
const projectId = ref(route.params.id)
const projectInfo = ref(null)
const isLoading = ref(false)
const loadingMessage = ref('Loading project...')

// 3D Scene composable
const {
  scene,
  camera,
  renderer,
  controls,
  isLoading: sceneLoading,
  isSceneReady,
  settings,
  fps,
  memoryUsage,
  sceneReadyPromise,
  initScene,
  updateSettings,
  takeScreenshot: takeSceneScreenshot
} = use3DScene(canvasContainer)

// Computed properties
const boardDimensions = computed(() => {
  if (!projectInfo.value?.board_config) return 'N/A'
  const config = projectInfo.value.board_config
  const width = (config.dotsCountHorizontal - 1) * config.marginBetweenNails + config.paddingBoard * 2
  const height = (config.dotsCountVertical - 1) * config.marginBetweenNails + config.paddingBoard * 2
  return `${width}mm × ${height}mm`
})

const gridSize = computed(() => {
  if (!projectInfo.value?.board_config) return 'N/A'
  const config = projectInfo.value.board_config
  return `${config.dotsCountHorizontal} × ${config.dotsCountVertical}`
})

const nailCount = computed(() => {
  if (!projectInfo.value?.nails) return 0
  return Object.keys(projectInfo.value.nails).length
})

const marginBetweenNails = computed(() => {
  return projectInfo.value?.board_config?.marginBetweenNails || 0
})

// Helper function to get auth token
const getCookie = (name) => {
  const value = `; ${document.cookie}`
  const parts = value.split(`; ${name}=`)
  if (parts.length === 2) return parts.pop().split(';').shift()
  return null
}

// Convert hex color to THREE color format
const hexToThreeColor = (hex) => {
  return parseInt(hex.replace('#', ''), 16)
}

// Load project data from backend
const loadProject = async () => {
  if (!projectId.value) {
    error('Project ID is required')
    router.push('/')
    return
  }

  isLoading.value = true
  loadingMessage.value = 'Loading project data...'
  
  try {
    const token = getCookie('sess_token')
    if (!token) {
      warning('Please login to view projects')
      router.push('/login')
      return
    }

    const backendUrl = import.meta.env.VITE_BACKEND_BASE_URL
    if (!backendUrl) {
      throw new Error('Backend URL not configured')
    }

    console.log(`Loading project ${projectId.value} from ${backendUrl}/api/v1/projects/${projectId.value}`)

    const response = await fetch(`${backendUrl}/api/v1/projects/${projectId.value}`, {
      method: 'GET',
      headers: {
        'Authorization': `Bearer ${token}`,
        'Content-Type': 'application/json',
      }
    })

    if (!response.ok) {
      if (response.status === 404) {
        throw new Error('Project not found')
      } else if (response.status === 403) {
        throw new Error('You do not have permission to view this project')
      } else {
        throw new Error(`Failed to load project: ${response.status} ${response.statusText}`)
      }
    }

    const data = await response.json()
    console.log('Loaded project data:', data)

    if (!data.project) {
      throw new Error('Invalid response format: missing project data')
    }

    // Store project info
    projectInfo.value = data.project

    // Wait for scene to be ready
    await nextTick()
    loadingMessage.value = 'Initializing 3D scene...'

    // Configure 3D scene settings based on project data
    await configure3DScene()

    success(`Project "${data.project.name}" loaded successfully`)

  } catch (err) {
    console.error('Failed to load project:', err)
    error(err.message || 'Failed to load project')
  } finally {
    isLoading.value = false
  }
}

// Configure 3D scene based on project data
const configure3DScene = async () => {
  if (!projectInfo.value) return

  try {
    // Wait for scene to be ready
    loadingMessage.value = 'Initializing 3D scene...'
    await sceneReadyPromise

    const config = projectInfo.value.board_config
    const nailsData = projectInfo.value.nails

    // Calculate board size based on grid and margins
    const boardWidth = ((config.dotsCountHorizontal - 1) * config.marginBetweenNails + config.paddingBoard * 2) / 10 // Convert mm to cm
    const boardDepth = ((config.dotsCountVertical - 1) * config.marginBetweenNails + config.paddingBoard * 2) / 10 // Convert mm to cm

    // Calculate nail spacing (convert mm to cm)
    const nailSpacing = config.marginBetweenNails / 10

    // Update 3D scene settings
    const newSettings = {
      boardWidth: boardWidth,
      boardDepth: boardDepth,
      boardColor: config.boardColor ? hexToThreeColor(config.boardColor) : 0xa4846a,
      nailGrid: Math.max(config.dotsCountHorizontal, config.dotsCountVertical),
      nailSpacing: nailSpacing,
      // Keep other default settings
      nailDetail: 'medium',
      pattern: 'custom', // We'll use custom nail data
      minNailHeight: 0.5,
      maxNailHeight: 5.0
    }

    // Store nail data for custom rendering
    settings.value.customNailData = {
      nails: nailsData,
      gridWidth: config.dotsCountHorizontal,
      gridHeight: config.dotsCountVertical,
      marginBetweenNails: config.marginBetweenNails,
      paddingBoard: config.paddingBoard
    }

    updateSettings(newSettings)
  } catch (error) {
    console.error('Failed to configure 3D scene:', error)
    throw new Error('Failed to initialize 3D scene')
  }
}

// Reset camera to default position
const resetCamera = () => {
  if (camera.value && controls.value) {
    camera.value.position.set(30, 30, 30)
    camera.value.lookAt(0, 0, 0)
    controls.value.reset()
  }
}

// Take screenshot
const takeScreenshot = () => {
  takeSceneScreenshot()
  success('Screenshot saved!')
}

// Load project on component mount
onMounted(async () => {
  await loadProject()
})
</script>

<style scoped>
.edit-project-3d {
  position: relative;
  width: 100vw;
  height: 100vh;
  overflow: hidden;
  background-color: #f0f0f0;
}

.loading-overlay {
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background: rgba(240, 240, 240, 0.9);
  display: flex;
  justify-content: center;
  align-items: center;
  z-index: 1000;
}

.loading-content {
  text-align: center;
  color: #333;
}

.spinner {
  width: 50px;
  height: 50px;
  border: 5px solid rgba(0, 0, 0, 0.1);
  border-radius: 50%;
  border-top-color: #4CAF50;
  animation: spin 1s ease-in-out infinite;
  margin: 0 auto 16px;
}

@keyframes spin {
  to {
    transform: rotate(360deg);
  }
}

.scene-container {
  position: relative;
  width: 100%;
  height: 100%;
}

.canvas-container {
  width: 100%;
  height: 100%;
}

.control-panel {
  position: absolute;
  top: 20px;
  right: 20px;
  width: 320px;
  max-height: calc(100vh - 40px);
  background: rgba(255, 255, 255, 0.95);
  border-radius: 12px;
  padding: 20px;
  box-shadow: 0 4px 20px rgba(0, 0, 0, 0.1);
  overflow-y: auto;
  backdrop-filter: blur(10px);
}

.project-info h2 {
  margin: 0 0 8px 0;
  color: #333;
  font-size: 20px;
  font-weight: 600;
}

.project-meta {
  margin: 0 0 20px 0;
  color: #666;
  font-size: 13px;
}

.board-info,
.performance-stats {
  margin-bottom: 24px;
}

.board-info h3,
.performance-stats h3 {
  margin: 0 0 12px 0;
  color: #333;
  font-size: 16px;
  font-weight: 600;
  border-bottom: 2px solid #4CAF50;
  padding-bottom: 6px;
}

.info-grid,
.stats-grid {
  display: grid;
  gap: 8px;
}

.info-item,
.stat-item {
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 8px 12px;
  background: rgba(255, 255, 255, 0.7);
  border-radius: 6px;
  border: 1px solid rgba(0, 0, 0, 0.05);
}

.label {
  font-weight: 500;
  color: #555;
  font-size: 13px;
}

.value {
  font-weight: 600;
  color: #333;
  font-size: 13px;
}

.actions {
  display: grid;
  gap: 12px;
}

.btn {
  padding: 12px 16px;
  border: none;
  border-radius: 8px;
  font-weight: 600;
  font-size: 14px;
  cursor: pointer;
  transition: all 0.2s ease;
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 8px;
}

.btn-primary {
  background: #4CAF50;
  color: white;
}

.btn-primary:hover {
  background: #45a049;
  transform: translateY(-1px);
}

.btn-secondary {
  background: #f5f5f5;
  color: #333;
  border: 1px solid #ddd;
}

.btn-secondary:hover {
  background: #e9e9e9;
  transform: translateY(-1px);
}

/* Responsive design */
@media (max-width: 768px) {
  .control-panel {
    position: absolute;
    top: 10px;
    right: 10px;
    left: 10px;
    width: auto;
    max-height: 50vh;
  }
}
</style>
