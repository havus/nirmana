<template>
  <ProjectForm
    title="Edit MDF Project"
    mode="edit"
    :project-id="projectId"
    :project-info="projectInfo"
    :is-loading="isLoading"
    :loading-message="loadingMessage"
    :is-saving="isSaving"
    @save-project="handleSaveProject"
    ref="projectFormRef"
  />
</template>

<script setup>
import { ref, onMounted, nextTick } from 'vue'
import { useRoute, useRouter } from 'vue-router'
import ProjectForm from '@/components/2D/ProjectForm.vue'
import { useToast } from '@/composables/useToast'

// Router and route
const route = useRoute()
const router = useRouter()

// Toast composable
const { success, error, warning } = useToast()

// Refs
const projectFormRef = ref(null)

// State
const projectId = ref(route.params.id)
const projectInfo = ref(null)
const isLoading = ref(false)
const loadingMessage = ref('Loading project...')
const isSaving = ref(false)

// Helper function to get auth token
const getCookie = (name) => {
  const value = `; ${document.cookie}`
  const parts = value.split(`; ${name}=`)
  if (parts.length === 2) return parts.pop().split(';').shift()
  return null
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
      warning('Please login to edit projects')
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
        throw new Error('You do not have permission to edit this project')
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

    // Wait for the ProjectForm component to be ready
    await nextTick()

    if (!projectFormRef.value) {
      throw new Error('ProjectForm component not ready')
    }

    // Populate board settings
    if (data.project.board_config) {
      Object.assign(projectFormRef.value.boardSettings, {
        dotsCountHorizontal: data.project.board_config.dotsCountHorizontal || 20,
        dotsCountVertical: data.project.board_config.dotsCountVertical || 20,
        marginBetweenNails: data.project.board_config.marginBetweenNails || 10,
        paddingBoard: data.project.board_config.paddingBoard || 40,
        boardColor: data.project.board_config.boardColor || '#8B4513'
      })
    }

    // Set project name
    projectFormRef.value.projectName = data.project.name || ''

    // Load nails data
    if (data.project.nails) {
      // Set nails data
      projectFormRef.value.nails = data.project.nails
    }

    // Regenerate grid with loaded data
    await nextTick()
    projectFormRef.value.generateGrid()

    success(`Project "${data.project.name}" loaded successfully`)

  } catch (err) {
    console.error('Failed to load project:', err)
    error(err.message || 'Failed to load project')
  } finally {
    isLoading.value = false
  }
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

    // Create new project (PUT request), without key "project", not like POST
    const projectData = {
      name: projectFormRef.value.projectName.trim(),
      board_config: boardConfig,
      nails: nailsRef
    }

    const response = await fetch(`${backendUrl}/api/v1/projects/${projectId.value}`, {
      method: 'PUT',
      headers: {
        'Authorization': `Bearer ${token}`,
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(projectData)
    })

    if (!response.ok) {
      if (response.status === 404) {
        throw new Error('Project not found')
      } else if (response.status === 403) {
        throw new Error('You do not have permission to update this project')
      } else {
        throw new Error(`Failed to update project: ${response.status} ${response.statusText}`)
      }
    }

    const result = await response.json()
    console.log('Project updated successfully:', result)

    success(`Project "${projectFormRef.value.projectName}" updated successfully!`)

  } catch (err) {
    console.error('Failed to update project:', err)
    error(err.message || 'Failed to update project')
  } finally {
    isSaving.value = false
  }
}

// Load project on component mount
onMounted(() => {
  loadProject()
})
</script>
