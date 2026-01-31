<template>
  <div class="relative">
    <button 
      @click="toggleMenu"
      class="flex items-center space-x-3 px-3 py-2 rounded-lg bg-gray-100 dark:bg-slate-800 hover:bg-gray-200 dark:hover:bg-slate-700 transition-colors duration-200"
    >
      <div class="w-8 h-8 bg-gradient-to-br from-indigo-500 to-purple-600 rounded-full flex items-center justify-center">
        <span class="text-white text-sm font-semibold">{{ userInitials }}</span>
      </div>
      <span class="hidden sm:block text-gray-700 dark:text-gray-300 font-medium">{{ userFullName }}</span>
      <svg class="w-4 h-4 text-gray-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
        <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M19 9l-7 7-7-7" />
      </svg>
    </button>
    
    <!-- Profile Dropdown -->
    <div v-if="showMenu" class="absolute right-0 mt-2 w-48 bg-white dark:bg-slate-800 rounded-lg shadow-lg border border-gray-200 dark:border-gray-700 py-2 z-10">
      <router-link 
        to="/profile"
        @click="closeMenu"
        class="flex items-center px-4 py-2 text-gray-700 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-slate-700 transition-colors duration-200"
      >
        <svg class="w-4 h-4 mr-3" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" />
        </svg>
        View Profile
      </router-link>
      <router-link 
        to="/projects"
        @click="closeMenu"
        class="flex items-center px-4 py-2 text-gray-700 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-slate-700 transition-colors duration-200"
      >
        <svg class="w-4 h-4 mr-3" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M19 11H5m14 0a2 2 0 012 2v6a2 2 0 01-2 2H5a2 2 0 01-2-2v-6a2 2 0 012-2m14 0V9a2 2 0 00-2-2M5 11V9a2 2 0 012-2m0 0V5a2 2 0 012-2h6a2 2 0 012 2v2M7 7h10" />
        </svg>
        My Projects
      </router-link>
      <hr class="my-1 border-gray-200 dark:border-gray-600">
      <button 
        @click="handleSignOut"
        class="w-full flex items-center px-4 py-2 text-red-600 dark:text-red-400 hover:bg-gray-100 dark:hover:bg-slate-700 transition-colors duration-200"
      >
        <svg class="w-4 h-4 mr-3" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M17 16l4-4m0 0l-4-4m4 4H7m6 4v1a3 3 0 01-3 3H6a3 3 0 01-3-3V7a3 3 0 013-3h4a3 3 0 013 3v1" />
        </svg>
        Sign Out
      </button>
    </div>
  </div>
</template>

<script setup>
import { ref, computed, onMounted, onUnmounted } from 'vue'

const showMenu = ref(false)

// Cookie utility function
const getCookie = (name) => {
  const value = `; ${document.cookie}`
  const parts = value.split(`; ${name}=`)
  if (parts.length === 2) return parts.pop().split(';').shift()
  return null
}

// Get user data from cookie
const getUserData = () => {
  const userDataCookie = getCookie('user_data')
  if (userDataCookie) {
    try {
      return JSON.parse(userDataCookie)
    } catch (error) {
      console.error('Error parsing user data:', error)
      return null
    }
  }
  return null
}

// Computed properties for user info
const userData = computed(() => getUserData())

const userFullName = computed(() => {
  const data = userData.value
  if (data && data.first_name && data.last_name) {
    return `${data.first_name} ${data.last_name}`
  }
  return 'User'
})

const userInitials = computed(() => {
  const data = userData.value
  if (data && data.first_name && data.last_name) {
    return `${data.first_name.charAt(0)}${data.last_name.charAt(0)}`.toUpperCase()
  }
  return 'U'
})

// Toggle menu
const toggleMenu = () => {
  showMenu.value = !showMenu.value
}

// Close menu
const closeMenu = () => {
  showMenu.value = false
}

// Handle sign out
const handleSignOut = () => {
  // Clear cookies
  document.cookie = 'sess_token=; expires=Thu, 01 Jan 1970 00:00:00 UTC; path=/;'
  document.cookie = 'user_data=; expires=Thu, 01 Jan 1970 00:00:00 UTC; path=/;'
  
  // Close menu
  showMenu.value = false
  
  // Redirect to home and refresh
  window.location.href = '/'
}

// Close menu when clicking outside
const handleClickOutside = (event) => {
  const dropdown = event.target.closest('.relative')
  if (!dropdown && showMenu.value) {
    showMenu.value = false
  }
}

onMounted(() => {
  document.addEventListener('click', handleClickOutside)
})

onUnmounted(() => {
  document.removeEventListener('click', handleClickOutside)
})
</script>
