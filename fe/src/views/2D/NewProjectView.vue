<template>
  <ProjectForm
    title="New MDF Project"
    mode="new"
    :is-saving="isSaving"
    @save-project="handleSaveProject"
    ref="projectFormRef"
  />
</template>

<script setup>
import { ref } from 'vue'
import { useRouter } from 'vue-router'
import ProjectForm from '@/components/2D/ProjectForm.vue'
import { useToast } from '@/composables/useToast'

// Router
const router = useRouter()

// Toast composable
const { success, error, warning } = useToast()

// Refs
const projectFormRef = ref(null)

// State
const isSaving = ref(false)

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
        nails: nailsData
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
</script>
