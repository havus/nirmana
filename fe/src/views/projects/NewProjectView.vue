<template>
  <div class="flex h-screen w-screen overflow-hidden">
    <!-- Left Side - 2D Editor -->
    <div 
      class="h-full transition-all duration-300 ease-in-out overflow-hidden"
      :class="show3DPreview ? 'border-r border-gray-200 dark:border-gray-700' : 'w-full'"
      :style="show3DPreview ? { width: `${100 - previewWidth}%` } : {}"
    >
      <ProjectForm
        :title="show3DPreview ? 'New MDF Project - 2D Editor' : 'New MDF Project'"
        mode="new"
        :is-saving="isSaving"
        @save-project="handleSaveProject"
        @reset-3d-camera="handle3DCameraReset"
        @toggle-3d-auto-rotate="handle3DAutoRotateToggle"
        ref="projectFormRef"
      />
    </div>

    <!-- Toggle Button (when 3D preview is hidden) -->
    <div 
      v-if="!show3DPreview" 
      class="fixed right-6 top-1/2 transform -translate-y-1/2 z-40"
    >
      <button
        @click="toggle3DPreview"
        :disabled="!canShow3D"
        :title="canShow3D ? 'Show 3D Preview' : 'Place some nails to see 3D preview'"
        class="flex items-center gap-3 px-4 py-2 bg-gradient-to-r from-indigo-500 to-purple-600 text-white border-none rounded-full font-semibold cursor-pointer shadow-lg transition-all duration-300 disabled:bg-gray-400 disabled:cursor-not-allowed disabled:shadow-md hover:not(:disabled):-translate-y-0.5 hover:not(:disabled):shadow-xl"
      >
        <svg class="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M20 7l-8-4-8 4m16 0l-8 4m8-4v10l-8 4m0-10L4 7m8 4v10M4 7v10l8 4" />
        </svg>
        <span>Show 3D Preview</span>
      </button>
    </div>

    <!-- Right Side - 3D Preview -->
    <div 
      v-if="show3DPreview" 
      class="h-full bg-gray-50 dark:bg-gray-900 flex flex-col relative"
      :style="{ width: `${previewWidth}%` }"
    >
      <!-- Resize Handle -->
      <div
        @mousedown="startResize"
        class="absolute left-0 top-0 w-2 h-full cursor-col-resize z-50 bg-gray-300 dark:bg-gray-600 transition-all duration-200 group"
        title="Drag to resize"
      >
        <div class="absolute left-1/2 top-1/2 transform -translate-x-1/2 -translate-y-1/2 w-1 h-8 bg-gray-500 dark:bg-gray-400 rounded-full group-hover:bg-indigo-500 transition-colors"></div>
      </div>
      <!-- Header -->
      <div class="flex justify-between items-center px-4 py-2 bg-white dark:bg-gray-800 border-b border-gray-200 dark:border-gray-700 shadow-sm">
        <div class="flex items-center gap-3">
          <h2 class="text-lg font-semibold text-gray-700 dark:text-gray-200 m-0">3D Preview</h2>
        </div>
        <button
          @click="hide3DPreview"
          title="Hide 3D Preview"
          class="flex items-center justify-center w-8 h-8 bg-gray-100 dark:bg-gray-700 border-none rounded-lg cursor-pointer transition-all duration-200 text-gray-600 dark:text-gray-300 hover:bg-gray-200 dark:hover:bg-gray-600 hover:text-gray-800 dark:hover:text-gray-100"
        >
          <svg class="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M6 18L18 6M6 6l12 12" />
          </svg>
        </button>
      </div>

      <!-- 3D Preview Content -->
      <div class="flex-1 overflow-hidden relative">
        <!-- Empty state when no nails -->
        <div v-if="!canShow3D" class="absolute inset-0 flex items-center justify-center">
          <div class="text-center text-gray-500 dark:text-gray-400 px-8">
            <svg class="w-16 h-16 mx-auto mb-4 opacity-50" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M20 7l-8-4-8 4m16 0l-8 4m8-4v10l-8 4m0-10L4 7m8 4v10M4 7v10l8 4" />
            </svg>
            <p class="text-lg font-medium mb-2">No nails placed yet</p>
            <p class="text-sm">Click on the grid to place nails and see them in 3D</p>
          </div>
        </div>

        <!-- 3D Preview Component -->
        <ThreeDPreview
          v-if="canShow3D"
          :nails-data="nailsData"
          :board-config="boardConfig"
          :auto-rotate="autoRotate3D"
          :reset-camera-trigger="resetCameraTrigger"
          :resize-trigger="resizeTrigger"
        />
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref, computed, watch, nextTick, onUnmounted } from 'vue'
import { useRouter } from 'vue-router'
import ProjectForm from '@/components/2D/ProjectForm.vue'
import ThreeDPreview from '@/components/ThreeDPreview.vue'
import { useToast } from '@/composables/useToast'

// Router
const router = useRouter()

// Toast composable
const { success, error, warning } = useToast()

// Refs
const projectFormRef = ref(null)

// State
const isSaving = ref(false)
const show3DPreview = ref(false)
const previewKey = ref(0) // Force re-render of 3D preview

// 3D Preview controls state
const autoRotate3D = ref(false)
const resetCameraTrigger = ref(0)
const resizeTrigger = ref(0)

// Resizable 3D preview state
const previewWidth = ref(50) // Percentage of screen width
const isResizing = ref(false)

// Computed properties for 3D preview
const nailsData = computed(() => {
  if (!projectFormRef.value?.nails) return {}
  return projectFormRef.value.nails
})

const boardConfig = computed(() => {
  if (!projectFormRef.value?.boardSettings) return {}
  return projectFormRef.value.boardSettings
})

const canShow3D = computed(() => {
  return Object.keys(nailsData.value).length > 0
})

const nailCount = computed(() => {
  return Object.keys(nailsData.value).length
})

// 3D Preview functions
const toggle3DPreview = () => {
  if (canShow3D.value) {
    show3DPreview.value = true
    // Only increment key when initially showing the 3D preview
    // Use a slight delay to ensure proper mounting
    nextTick(() => {
      previewKey.value++
    })
  }
}

const hide3DPreview = () => {
  show3DPreview.value = false
}

// 3D Control event handlers
const handle3DCameraReset = () => {
  resetCameraTrigger.value++
}

const handle3DAutoRotateToggle = (isEnabled) => {
  autoRotate3D.value = isEnabled
}

// Resize handlers
const startResize = (event) => {
  isResizing.value = true
  document.addEventListener('mousemove', handleResize)
  document.addEventListener('mouseup', stopResize)
  event.preventDefault()
}

const handleResize = (event) => {
  if (!isResizing.value) return
  
  const containerWidth = window.innerWidth
  const newWidth = ((containerWidth - event.clientX) / containerWidth) * 100
  
  // Constrain between 20% and 80%
  previewWidth.value = Math.min(80, Math.max(20, newWidth))
}

const stopResize = () => {
  isResizing.value = false
  document.removeEventListener('mousemove', handleResize)
  document.removeEventListener('mouseup', stopResize)
  
  // Trigger 3D canvas resize after resize is complete
  nextTick(() => {
    resizeTrigger.value++
  })
}

// Watch for changes in nails to update 3D preview
watch(nailsData, () => {
  // Don't force re-render, let the ThreeDPreview component handle updates internally
  // The ThreeDPreview component already watches nailsData changes
}, { deep: true })

watch(boardConfig, () => {
  // Don't force re-render, let the ThreeDPreview component handle updates internally  
  // The ThreeDPreview component already watches boardConfig changes
}, { deep: true })

// Helper function to get auth token
const getCookie = (name) => {
  const value = `; ${document.cookie}`
  const parts = value.split(`; ${name}=`)
  if (parts.length === 2) return parts.pop().split(';').shift()
  return null
}

// Save project to backend
const handleSaveProject = async () => {
  if (!projectFormRef.value) {
    error('Project form not ready')
    return
  }

  if (!projectFormRef.value.projectName.trim()) {
    warning('Please enter a project name')
    return
  }

  // Check if nails reference is properly initialized
  if (!projectFormRef.value.nails) {
    error('Nails data not initialized. Please wait for the project to fully load.')
    return
  }

  isSaving.value = true
  
  try {
    const token = getCookie('sess_token')
    if (!token) {
      warning('Please login to save projects')
      return
    }

    const backendUrl = import.meta.env.VITE_BACKEND_BASE_URL
    if (!backendUrl) {
      throw new Error('Backend URL not configured')
    }

    // Prepare board configuration
    const boardConfig = {
      dotsCountHorizontal: projectFormRef.value.boardSettings.dotsCountHorizontal,
      dotsCountVertical: projectFormRef.value.boardSettings.dotsCountVertical,
      marginBetweenNails: projectFormRef.value.boardSettings.marginBetweenNails,
      paddingBoard: projectFormRef.value.boardSettings.paddingBoard,
      boardColor: projectFormRef.value.boardSettings.boardColor
    }

    // Access the nails ref correctly - nails is already the reactive object
    const nailsRef = projectFormRef.value.nails || {}

    // Create new project (POST request)
    const projectData = {
      project: {
        name: projectFormRef.value.projectName.trim(),
        board_config: boardConfig,
        nails: nailsRef
      }
    }

    const response = await fetch(`${backendUrl}/api/v1/projects`, {
      method: 'POST',
      headers: {
        'Authorization': `Bearer ${token}`,
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(projectData)
    })

    if (!response.ok) {
      throw new Error(`Failed to create project: ${response.status} ${response.statusText}`)
    }

    const result = await response.json()
    console.log('Project created successfully:', result)

    success(`Project "${projectFormRef.value.projectName}" created successfully!`)
    
    // Navigate to edit mode for the new project
    if (result.project && result.project.id) {
      router.push(`/2d/edit/${result.project.id}`)
    }

  } catch (err) {
    console.error('Failed to create project:', err)
    error(err.message || 'Failed to create project')
  } finally {
    isSaving.value = false
  }
}

// Cleanup event listeners on unmount
onUnmounted(() => {
  if (isResizing.value) {
    document.removeEventListener('mousemove', handleResize)
    document.removeEventListener('mouseup', stopResize)
  }
})
</script>
