<template>
  <div class="min-h-screen bg-gradient-to-br from-indigo-100 via-white to-cyan-100 dark:from-slate-900 dark:via-slate-800 dark:to-slate-900 transition-colors duration-300">
    <!-- Navigation Bar -->
    <nav class="fixed top-0 left-0 right-0 z-50 bg-white/80 dark:bg-slate-900/80 backdrop-blur-sm border-b border-gray-200 dark:border-gray-700">
      <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div class="flex justify-between items-center h-16">
          <div class="flex items-center space-x-3">
            <router-link to="/" class="flex items-center space-x-3">
              <div class="w-8 h-8 bg-gradient-to-br from-indigo-500 to-purple-600 rounded-lg flex items-center justify-center">
                <svg class="w-5 h-5 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M19 11H5m14 0a2 2 0 012 2v6a2 2 0 01-2 2H5a2 2 0 01-2-2v-6a2 2 0 012-2m14 0V9a2 2 0 00-2-2M5 11V9a2 2 0 012-2m0 0V5a2 2 0 012-2h6a2 2 0 012 2v2M7 7h10" />
                </svg>
              </div>
              <h1 class="text-xl font-bold text-gray-900 dark:text-white">Nirmana</h1>
            </router-link>
          </div>
          
          <div class="flex items-center space-x-4">
            <ProfileButton />
          </div>
        </div>
      </div>
    </nav>

    <!-- Main Content -->
    <div class="pt-24 pb-12 px-4 sm:px-6 lg:px-8">
      <div class="max-w-7xl mx-auto">
        <!-- Header -->
        <div class="flex flex-col sm:flex-row sm:items-center sm:justify-between mb-8">
          <div>
            <h1 class="text-3xl font-bold text-gray-900 dark:text-white mb-2">My Projects</h1>
            <p class="text-gray-600 dark:text-gray-400">Manage and view all your Nirmana projects</p>
          </div>
          <router-link 
            to="/projects/new"
            class="mt-4 sm:mt-0 inline-flex items-center px-6 py-3 bg-gradient-to-r from-indigo-500 to-purple-600 hover:from-indigo-600 hover:to-purple-700 text-white rounded-lg font-semibold shadow-md hover:shadow-lg transition-all duration-200 transform hover:scale-105"
          >
            <svg class="w-5 h-5 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 4v16m8-8H4" />
            </svg>
            New Project
          </router-link>
        </div>

        <!-- Loading State -->
        <div v-if="loading" class="flex flex-col items-center justify-center py-20">
          <svg class="animate-spin h-12 w-12 text-indigo-600 mb-4" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
            <circle class="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" stroke-width="4"></circle>
            <path class="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
          </svg>
          <p class="text-gray-600 dark:text-gray-400">Loading projects...</p>
        </div>

        <!-- Error State -->
        <div v-else-if="error" class="bg-red-50 dark:bg-red-900/20 border border-red-200 dark:border-red-800 rounded-lg p-6 text-center">
          <svg class="w-12 h-12 text-red-500 mx-auto mb-3" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 8v4m0 4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
          </svg>
          <h3 class="text-lg font-semibold text-red-800 dark:text-red-300 mb-2">Failed to Load Projects</h3>
          <p class="text-red-600 dark:text-red-400 mb-4">{{ error }}</p>
          <button 
            @click="fetchProjects"
            class="px-4 py-2 bg-red-600 hover:bg-red-700 text-white rounded-lg transition-colors duration-200"
          >
            Try Again
          </button>
        </div>

        <!-- Empty State -->
        <div v-else-if="projects.length === 0" class="bg-white dark:bg-slate-800 rounded-xl shadow-sm border border-gray-200 dark:border-gray-700 p-12 text-center">
          <div class="w-24 h-24 bg-gradient-to-br from-indigo-100 to-purple-100 dark:from-indigo-900/30 dark:to-purple-900/30 rounded-full flex items-center justify-center mx-auto mb-6">
            <svg class="w-12 h-12 text-indigo-600 dark:text-indigo-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 13h6m-3-3v6m5 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
            </svg>
          </div>
          <h3 class="text-2xl font-bold text-gray-900 dark:text-white mb-3">No Projects Yet</h3>
          <p class="text-gray-600 dark:text-gray-400 mb-6 max-w-md mx-auto">
            Start creating your first Nirmana project and bring your artistic vision to life in 3D!
          </p>
          <router-link 
            to="/projects/new"
            class="inline-flex items-center px-6 py-3 bg-gradient-to-r from-indigo-500 to-purple-600 hover:from-indigo-600 hover:to-purple-700 text-white rounded-lg font-semibold shadow-md hover:shadow-lg transition-all duration-200 transform hover:scale-105"
          >
            <svg class="w-5 h-5 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 4v16m8-8H4" />
            </svg>
            Create Your First Project
          </router-link>
        </div>

        <!-- Projects Grid -->
        <div v-else class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          <div 
            v-for="project in projects" 
            :key="project.id"
            class="bg-white dark:bg-slate-800 rounded-xl shadow-sm border border-gray-200 dark:border-gray-700 overflow-hidden hover:shadow-lg transition-all duration-300 transform hover:scale-105 group"
          >
            <!-- Project Info -->
            <div class="p-6">
              <h3 class="text-xl font-bold text-gray-900 dark:text-white mb-2 truncate">
                {{ project.name || 'Untitled Project' }}
              </h3>
              <p v-if="project.description" class="text-gray-600 dark:text-gray-400 text-sm mb-4 line-clamp-2">
                {{ project.description }}
              </p>
              <p v-else class="text-gray-400 dark:text-gray-500 text-sm italic mb-4">
                No description
              </p>

              <!-- Project Metadata -->
              <div class="flex items-center justify-between text-xs text-gray-500 dark:text-gray-400 mb-4">
                <div class="flex items-center space-x-4">
                  <span class="flex items-center">
                    <svg class="w-4 h-4 mr-1" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
                    </svg>
                    {{ formatDate(project.updated_at || project.created_at) }}
                  </span>
                </div>
              </div>

              <!-- Action Buttons -->
              <div class="flex space-x-2">
                <router-link 
                  :to="`/projects/${project.id}/edit`"
                  class="flex-1 flex items-center justify-center px-4 py-2 bg-indigo-600 hover:bg-indigo-700 text-white rounded-lg font-medium transition-colors duration-200"
                >
                  <svg class="w-4 h-4 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M11 5H6a2 2 0 00-2 2v11a2 2 0 002 2h11a2 2 0 002-2v-5m-1.414-9.414a2 2 0 112.828 2.828L11.828 15H9v-2.828l8.586-8.586z" />
                  </svg>
                  Edit
                </router-link>
              </div>
            </div>
          </div>
        </div>

        <!-- Pagination -->
        <div v-if="pagination && pagination.total_pages > 1" class="mt-8 flex items-center justify-center space-x-2">
          <button 
            @click="goToPage(pagination.current_page - 1)"
            :disabled="pagination.current_page === 1"
            class="px-4 py-2 bg-white dark:bg-slate-800 border border-gray-300 dark:border-gray-600 rounded-lg text-gray-700 dark:text-gray-300 hover:bg-gray-50 dark:hover:bg-slate-700 disabled:opacity-50 disabled:cursor-not-allowed transition-colors duration-200"
          >
            Previous
          </button>
          
          <div class="flex items-center space-x-2">
            <template v-for="page in visiblePages" :key="page">
              <button 
                v-if="page !== '...'"
                @click="goToPage(page)"
                :class="[
                  'px-4 py-2 rounded-lg transition-colors duration-200',
                  page === pagination.current_page
                    ? 'bg-indigo-600 text-white'
                    : 'bg-white dark:bg-slate-800 border border-gray-300 dark:border-gray-600 text-gray-700 dark:text-gray-300 hover:bg-gray-50 dark:hover:bg-slate-700'
                ]"
              >
                {{ page }}
              </button>
              <span v-else class="px-2 text-gray-500 dark:text-gray-400">...</span>
            </template>
          </div>
          
          <button 
            @click="goToPage(pagination.current_page + 1)"
            :disabled="pagination.current_page === pagination.total_pages"
            class="px-4 py-2 bg-white dark:bg-slate-800 border border-gray-300 dark:border-gray-600 rounded-lg text-gray-700 dark:text-gray-300 hover:bg-gray-50 dark:hover:bg-slate-700 disabled:opacity-50 disabled:cursor-not-allowed transition-colors duration-200"
          >
            Next
          </button>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref, onMounted, computed } from 'vue'
import { useRouter } from 'vue-router'
import ProfileButton from '@/components/ProfileButton.vue'

const router = useRouter()

// State
const projects = ref([])
const loading = ref(true)
const error = ref(null)
const pagination = ref(null)
const currentPage = ref(1)

// Backend URL
const backendUrl = import.meta.env.VITE_BACKEND_BASE_URL || 'http://localhost:3000'

// Cookie utility function
const getCookie = (name) => {
  const value = `; ${document.cookie}`
  const parts = value.split(`; ${name}=`)
  if (parts.length === 2) return parts.pop().split(';').shift()
  return null
}

// Fetch projects from API
const fetchProjects = async (page = 1) => {
  const token = getCookie('sess_token')
  
  if (!token) {
    error.value = 'Please login to view your projects'
    router.push('/login')
    return
  }

  // Ensure page is a valid number
  const pageNum = typeof page === 'number' ? page : parseInt(page, 10)
  if (isNaN(pageNum)) {
    console.error('Invalid page number passed to fetchProjects:', page)
    return
  }

  loading.value = true
  error.value = null

  try {
    const url = `${backendUrl}/api/v1/projects?page_number=${pageNum}&page_size=12`
    console.log('Fetching projects from:', url)
    
    const response = await fetch(url, {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${token}`
      },
      credentials: 'include'
    })

    if (response.ok) {
      const data = await response.json()
      projects.value = data.projects || []
      pagination.value = data.pagination || null
      currentPage.value = pageNum
    } else if (response.status === 401) {
      error.value = 'Session expired. Please login again.'
      router.push('/login')
    } else {
      const errorData = await response.text()
      console.error('API Error Response:', response.status, errorData)
      error.value = `Failed to load projects (${response.status}). Please try again.`
    }
  } catch (err) {
    console.error('Error fetching projects:', err)
    // Check if it's a CORS error
    if (err.message.includes('CORS') || err.message.includes('fetch')) {
      error.value = 'CORS error. Please check backend CORS configuration.'
    } else {
      error.value = 'Network error. Please check your connection.'
    }
  } finally {
    loading.value = false
  }
}

// Go to specific page
const goToPage = (page) => {
  // Ensure page is a valid number
  const pageNum = typeof page === 'number' ? page : parseInt(page, 10)
  
  if (isNaN(pageNum) || pageNum < 1 || (pagination.value && pageNum > pagination.value.total_pages)) {
    console.error('Invalid page number:', page)
    return
  }
  
  fetchProjects(pageNum)
  window.scrollTo({ top: 0, behavior: 'smooth' })
}

// Calculate visible page numbers for pagination
const visiblePages = computed(() => {
  if (!pagination.value) return []
  
  const current = pagination.value.current_page
  const total = pagination.value.total_pages
  const pages = []
  
  if (total <= 7) {
    // Show all pages if total is 7 or less
    for (let i = 1; i <= total; i++) {
      pages.push(i)
    }
  } else {
    // Always show first page
    pages.push(1)
    
    if (current > 3) {
      pages.push('...')
    }
    
    // Show pages around current
    for (let i = Math.max(2, current - 1); i <= Math.min(total - 1, current + 1); i++) {
      pages.push(i)
    }
    
    if (current < total - 2) {
      pages.push('...')
    }
    
    // Always show last page
    pages.push(total)
  }
  
  return pages
})

// Format date helper
const formatDate = (dateString) => {
  if (!dateString) return 'N/A'
  
  const date = new Date(dateString)
  const now = new Date()
  const diffMs = now - date
  const diffMins = Math.floor(diffMs / 60000)
  const diffHours = Math.floor(diffMs / 3600000)
  const diffDays = Math.floor(diffMs / 86400000)
  
  if (diffMins < 1) return 'Just now'
  if (diffMins < 60) return `${diffMins}m ago`
  if (diffHours < 24) return `${diffHours}h ago`
  if (diffDays < 7) return `${diffDays}d ago`
  
  return date.toLocaleDateString('en-US', { month: 'short', day: 'numeric', year: 'numeric' })
}

// Load projects on mount
onMounted(() => {
  fetchProjects()
})
</script>

<style scoped>
.line-clamp-2 {
  display: -webkit-box;
  -webkit-line-clamp: 2;
  line-clamp: 2;
  -webkit-box-orient: vertical;
  overflow: hidden;
}
</style>
