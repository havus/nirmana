<template>
  <div class="min-h-screen bg-gradient-to-br from-indigo-100 via-white to-cyan-100 dark:from-slate-900 dark:via-slate-800 dark:to-slate-900 transition-colors duration-300 text-gray-900 dark:text-white">
    <!-- Navigation Bar -->
    <nav class="fixed top-0 left-0 right-0 z-50 bg-white/80 dark:bg-slate-900/80 backdrop-blur-sm border-b border-gray-200 dark:border-gray-700">
      <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div class="flex justify-between items-center h-16">
          <!-- Logo/Title -->
          <div class="flex items-center space-x-3">
            <div class="w-8 h-8 bg-gradient-to-br from-indigo-500 to-purple-600 rounded-lg flex items-center justify-center">
              <svg class="w-5 h-5 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M19 11H5m14 0a2 2 0 012 2v6a2 2 0 01-2 2H5a2 2 0 01-2-2v-6a2 2 0 012-2m14 0V9a2 2 0 00-2-2M5 11V9a2 2 0 012-2m0 0V5a2 2 0 012-2h6a2 2 0 012 2v2M7 7h10" />
              </svg>
            </div>
            <h1 class="text-xl font-bold">Nirmana</h1>
          </div>
          
          <!-- Auth Buttons & Theme Toggle -->
          <div class="flex items-center space-x-3">
            <!-- Auth Buttons (when not logged in) -->
            <div v-if="!isLoggedIn" class="hidden sm:flex items-center space-x-3">
              <router-link 
                to="/login"
                class="px-4 py-2 text-gray-700 dark:text-gray-300 hover:text-indigo-600 dark:hover:text-indigo-400 font-medium transition-colors duration-200"
              >
                Sign In
              </router-link>
              <router-link 
                to="/register"
                class="px-4 py-2 bg-gradient-to-r from-indigo-500 to-purple-600 hover:from-indigo-600 hover:to-purple-700 text-white rounded-lg font-medium transition-all duration-200 transform hover:scale-105 shadow-sm hover:shadow-md"
              >
                Get Started
              </router-link>
            </div>

            <!-- Profile Section (when logged in) -->
            <div v-if="isLoggedIn" class="relative">
              <button 
                @click="showProfileMenu = !showProfileMenu"
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
              <div v-if="showProfileMenu" class="absolute right-0 mt-2 w-48 bg-white dark:bg-slate-800 rounded-lg shadow-lg border border-gray-200 dark:border-gray-700 py-2 z-10">
                <router-link 
                  to="/profile"
                  @click="showProfileMenu = false"
                  class="flex items-center px-4 py-2 text-gray-700 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-slate-700 transition-colors duration-200"
                >
                  <svg class="w-4 h-4 mr-3" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" />
                  </svg>
                  View Profile
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
            
            <!-- Mobile Auth Menu (when not logged in) -->
            <div v-if="!isLoggedIn" class="sm:hidden relative">
              <button 
                @click="showMobileMenu = !showMobileMenu"
                class="p-2 rounded-lg bg-gray-100 dark:bg-slate-800 hover:bg-gray-200 dark:hover:bg-slate-700 transition-colors duration-200"
              >
                <svg class="w-5 h-5 text-gray-700 dark:text-gray-300" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M4 6h16M4 12h16M4 18h16" />
                </svg>
              </button>
              
              <!-- Mobile Dropdown -->
              <div v-if="showMobileMenu" class="absolute right-0 mt-2 w-48 bg-white dark:bg-slate-800 rounded-lg shadow-lg border border-gray-200 dark:border-gray-700 py-2">
                <router-link 
                  to="/login"
                  @click="showMobileMenu = false"
                  class="block px-4 py-2 text-gray-700 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-slate-700 transition-colors duration-200"
                >
                  Sign In
                </router-link>
                <router-link 
                  to="/register"
                  @click="showMobileMenu = false"
                  class="block px-4 py-2 text-indigo-600 dark:text-indigo-400 hover:bg-gray-100 dark:hover:bg-slate-700 font-medium transition-colors duration-200"
                >
                  Get Started
                </router-link>
              </div>
            </div>
            
            <!-- Theme Toggle -->
            <button 
              @click="toggleDarkMode()"
              class="hover:cursor-pointer p-2 rounded-lg bg-gray-100 dark:bg-slate-800 hover:bg-gray-200 dark:hover:bg-slate-700 transition-colors duration-200"
              :title="isDark ? 'Switch to Light Mode' : 'Switch to Dark Mode'"
            >
              <svg v-if="!isDark" class="w-5 h-5 text-gray-700" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M20.354 15.354A9 9 0 018.646 3.646 9.003 9.003 0 0012 21a9.003 9.003 0 008.354-5.646z" />
              </svg>
              <svg v-else class="w-5 h-5 text-yellow-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 3v1m0 16v1m9-9h-1M4 12H3m15.364 6.364l-.707-.707M6.343 6.343l-.707-.707m12.728 0l-.707.707M6.343 17.657l-.707.707M16 12a4 4 0 11-8 0 4 4 0 018 0z" />
              </svg>
            </button>
          </div>
        </div>
      </div>
    </nav>

    <!-- Main Content -->
    <div class="pt-16 min-h-screen flex items-center justify-center px-4">
      <div class="max-w-4xl mx-auto text-center">
        <!-- Hero Section -->
        <div class="my-12">
          <!-- Main Logo/Icon -->
          <div class="w-24 h-24 mx-auto mb-8 bg-gradient-to-br from-indigo-500 via-purple-500 to-pink-500 rounded-2xl shadow-2xl flex items-center justify-center transform hover:scale-105 transition-transform duration-300">
            <svg class="w-12 h-12 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M19 11H5m14 0a2 2 0 012 2v6a2 2 0 01-2 2H5a2 2 0 01-2-2v-6a2 2 0 012-2m14 0V9a2 2 0 00-2-2M5 11V9a2 2 0 012-2m0 0V5a2 2 0 012-2h6a2 2 0 012 2v2M7 7h10" />
            </svg>
          </div>
          
          <!-- Welcome Text -->
          <h1 class="text-5xl md:text-6xl font-bold mb-6">
            Welcome to
            <span class="bg-gradient-to-r from-indigo-600 via-purple-600 to-pink-600 bg-clip-text text-transparent">
              Nirmana
            </span>
          </h1>
          
          <p class="text-xl md:text-2xl text-gray-600 dark:text-gray-300 mb-8 max-w-3xl mx-auto leading-relaxed">
            Three-Dimensional Nail Art Visualization and Design Application - 
            Create stunning artworks with MDF board simulation and artistic nails
          </p>
          
          <!-- Features Highlight -->
          <div class="grid grid-cols-1 md:grid-cols-3 gap-6 mb-12 max-w-4xl mx-auto">
            <div class="bg-white/60 dark:bg-slate-800/60 backdrop-blur-sm rounded-xl p-6 border border-gray-200 dark:border-gray-700 hover:shadow-lg transition-shadow duration-300">
              <div class="w-12 h-12 bg-blue-500 rounded-lg flex items-center justify-center mx-auto mb-4">
                <svg class="w-6 h-6 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M4 5a1 1 0 011-1h14a1 1 0 011 1v2a1 1 0 01-1 1H5a1 1 0 01-1-1V5zM4 13a1 1 0 011-1h6a1 1 0 011 1v6a1 1 0 01-1 1H5a1 1 0 01-1-1v-6zM16 13a1 1 0 011-1h2a1 1 0 011 1v6a1 1 0 01-1 1h-2a1 1 0 01-1-1v-6z" />
                </svg>
              </div>
              <h3 class="text-lg font-semibold mb-2">2D Simulation</h3>
              <p class="text-gray-600 dark:text-gray-400 text-sm">
                Design patterns with interactive grid and precision controls
              </p>
            </div>
            
            <div class="bg-white/60 dark:bg-slate-800/60 backdrop-blur-sm rounded-xl p-6 border border-gray-200 dark:border-gray-700 hover:shadow-lg transition-shadow duration-300">
              <div class="w-12 h-12 bg-purple-500 rounded-lg flex items-center justify-center mx-auto mb-4">
                <svg class="w-6 h-6 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M20 7l-8-4-8 4m16 0l-8 4m8-4v10l-8 4m0-10L4 7m8 4v10M4 7v10l8 4" />
                </svg>
              </div>
              <h3 class="text-lg font-semibold mb-2">3D Visualization</h3>
              <p class="text-gray-600 dark:text-gray-400 text-sm">
                Real-time rendering with Three.js and interactive camera controls
              </p>
            </div>
            
            <div class="bg-white/60 dark:bg-slate-800/60 backdrop-blur-sm rounded-xl p-6 border border-gray-200 dark:border-gray-700 hover:shadow-lg transition-shadow duration-300">
              <div class="w-12 h-12 bg-green-500 rounded-lg flex items-center justify-center mx-auto mb-4">
                <svg class="w-6 h-6 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M7 21a4 4 0 01-4-4V5a2 2 0 012-2h4a2 2 0 012 2v12a4 4 0 01-4 4zM21 5a2 2 0 00-2-2h-4a2 2 0 00-2 2v12a4 4 0 004 4h4a2 2 0 002-2V5z" />
                </svg>
              </div>
              <h3 class="text-lg font-semibold mb-2">Artistic Patterns</h3>
              <p class="text-gray-600 dark:text-gray-400 text-sm">
                Dozens of nirmana patterns and customizable color schemes
              </p>
            </div>
          </div>
        </div>
        
        <!-- Action Buttons -->
        <div class="flex flex-col space-y-6">
          <!-- Primary CTA -->
          <div v-if="!isLoggedIn" class="text-center">
            <router-link 
              to="/register"
              class="inline-flex items-center justify-center px-8 py-4 bg-gradient-to-r from-indigo-500 to-purple-600 hover:from-indigo-600 hover:to-purple-700 text-white rounded-xl font-semibold shadow-lg hover:shadow-xl transition-all duration-300 transform hover:scale-105 text-lg"
            >
              <svg class="w-6 h-6 mr-3" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M13 10V3L4 14h7v7l9-11h-7z" />
              </svg>
              Start Creating Now
            </router-link>
            <p class="text-sm text-gray-500 dark:text-gray-400 mt-2">
              Free to use • No credit card required
            </p>
          </div>
          
          <!-- Secondary Actions -->
          <div class="flex justify-center">
            <router-link 
              to="/projects/new"
              class="group w-full sm:w-auto bg-white/80 dark:bg-slate-800/80 hover:bg-white dark:hover:bg-slate-800 text-gray-900 dark:text-white px-6 py-3 rounded-xl font-semibold border border-gray-200 dark:border-gray-700 shadow-sm hover:shadow-md transition-all duration-300 transform hover:scale-105 flex items-center justify-center space-x-3"
            >
              <svg class="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 4v16m8-8H4" />
              </svg>
              <span>Create New Project</span>
            </router-link>
          </div>
          
          <!-- Existing User Link -->
          <div v-if="!isLoggedIn" class="text-center">
            <p class="text-gray-600 dark:text-gray-400 text-sm">
              Already have an account?
              <router-link to="/login" class="text-indigo-600 dark:text-indigo-400 hover:text-indigo-500 dark:hover:text-indigo-300 font-medium ml-1">
                Sign in here
              </router-link>
            </p>
          </div>
        </div>
        
        <!-- Additional Info -->
        <div class="mt-12 text-center">
          <p class="text-gray-500 dark:text-gray-400 text-sm">
            Built with ❤️ using Vue.js 3, Three.js, and Tailwind CSS
          </p>
        </div>
      </div>
    </div>
    
    <!-- Background Animation -->
    <div class="fixed inset-0 overflow-hidden pointer-events-none">
      <div class="absolute -top-1/2 -left-1/2 w-full h-full">
        <div class="absolute top-1/3 left-1/4 w-72 h-72 bg-blue-200 dark:bg-blue-900 rounded-full mix-blend-multiply filter blur-xl opacity-20 animate-blob"></div>
        <div class="absolute top-1/3 right-1/4 w-72 h-72 bg-purple-200 dark:bg-purple-900 rounded-full mix-blend-multiply filter blur-xl opacity-20 animate-blob animation-delay-2000"></div>
        <div class="absolute bottom-1/3 left-1/3 w-72 h-72 bg-pink-200 dark:bg-pink-900 rounded-full mix-blend-multiply filter blur-xl opacity-20 animate-blob animation-delay-4000"></div>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref, onMounted } from 'vue'
import { useDark, useToggle } from '@vueuse/core'

// Dark mode composable with explicit configuration
const isDark = useDark({
  selector: 'body',
  attribute: 'class',
  valueDark: 'dark',
  valueLight: ''
})
const toggleDarkMode = useToggle(isDark)

// Mobile menu state
const showMobileMenu = ref(false)
const showProfileMenu = ref(false)

// Authentication state
const isLoggedIn = ref(false)
const userData = ref(null)
const userFullName = ref('')
const userInitials = ref('')

// Cookie utility function
const getCookie = (name) => {
  const value = `; ${document.cookie}`
  const parts = value.split(`; ${name}=`)
  if (parts.length === 2) return parts.pop().split(';').shift()
  return null
}

// Check if user is logged in
const checkAuthStatus = () => {
  const token = getCookie('sess_token')
  const userDataCookie = getCookie('user_data')
  
  if (token && userDataCookie) {
    isLoggedIn.value = true
    try {
      userData.value = JSON.parse(userDataCookie)
      userFullName.value = `${userData.value.first_name} ${userData.value.last_name}`
      userInitials.value = `${userData.value.first_name.charAt(0)}${userData.value.last_name.charAt(0)}`.toUpperCase()
    } catch (error) {
      console.error('Error parsing user data:', error)
      isLoggedIn.value = false
    }
  } else {
    isLoggedIn.value = false
  }
}

// Handle sign out
const handleSignOut = () => {
  // Clear cookies
  document.cookie = 'sess_token=; expires=Thu, 01 Jan 1970 00:00:00 UTC; path=/;'
  document.cookie = 'user_data=; expires=Thu, 01 Jan 1970 00:00:00 UTC; path=/;'
  
  // Reset state
  isLoggedIn.value = false
  userData.value = null
  userFullName.value = ''
  userInitials.value = ''
  showProfileMenu.value = false
  
  // Refresh the page to update the UI
  window.location.reload()
}

// Check auth status when component mounts
onMounted(() => {
  checkAuthStatus()
})
</script>

<style scoped>
@keyframes blob {
  0% {
    transform: translate(0px, 0px) scale(1);
  }
  33% {
    transform: translate(30px, -50px) scale(1.1);
  }
  66% {
    transform: translate(-20px, 20px) scale(0.9);
  }
  100% {
    transform: translate(0px, 0px) scale(1);
  }
}

.animate-blob {
  animation: blob 7s infinite;
}

.animation-delay-2000 {
  animation-delay: 2s;
}

.animation-delay-4000 {
  animation-delay: 4s;
}
</style>
