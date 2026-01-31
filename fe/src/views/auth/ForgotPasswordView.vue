<template>
  <div class="min-h-screen bg-gradient-to-br from-indigo-100 via-white to-cyan-100 dark:from-slate-900 dark:via-slate-800 dark:to-slate-900 transition-colors duration-300 text-gray-900 dark:text-white">
    <!-- Navigation Bar -->
    <nav class="fixed top-0 left-0 right-0 z-50 bg-white/80 dark:bg-slate-900/80 backdrop-blur-sm border-b border-gray-200 dark:border-gray-700">
      <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div class="flex justify-between items-center h-16">
          <!-- Logo/Title -->
          <router-link to="/" class="flex items-center space-x-3 hover:opacity-80 transition-opacity">
            <div class="w-8 h-8 bg-gradient-to-br from-indigo-500 to-purple-600 rounded-lg flex items-center justify-center">
              <svg class="w-5 h-5 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M19 11H5m14 0a2 2 0 012 2v6a2 2 0 01-2 2H5a2 2 0 01-2-2v-6a2 2 0 012-2m14 0V9a2 2 0 00-2-2M5 11V9a2 2 0 012-2m0 0V5a2 2 0 012-2h6a2 2 0 012 2v2M7 7h10" />
              </svg>
            </div>
            <h1 class="text-xl font-bold">Nirmana</h1>
          </router-link>
          
          <!-- Theme Toggle -->
          <ThemeToggle />
        </div>
      </div>
    </nav>

    <!-- Main Content -->
    <div class="pt-16 min-h-screen flex items-center justify-center px-4">
      <div class="max-w-md w-full space-y-8">
        <!-- Header -->
        <div class="text-center">
          <div class="w-16 h-16 mx-auto mb-6 bg-gradient-to-br from-indigo-500 via-purple-500 to-pink-500 rounded-xl shadow-lg flex items-center justify-center">
            <svg class="w-8 h-8 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M15 7a3 3 0 11-6 0 3 3 0 016 0zM2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z" />
            </svg>
          </div>
          <h2 class="text-3xl font-bold mb-2">Forgot Password?</h2>
          <p class="text-gray-600 dark:text-gray-400">No worries! Enter your email and we'll send you a reset link</p>
        </div>

        <!-- Forgot Password Form -->
        <div class="bg-white/60 dark:bg-slate-800/60 backdrop-blur-sm rounded-2xl p-8 border border-gray-200 dark:border-gray-700 shadow-xl">
          <form @submit.prevent="handleForgotPassword" class="space-y-6">
            <!-- Email Field -->
            <div>
              <label for="email" class="block text-sm font-medium mb-2">
                Email Address
              </label>
              <div class="relative">
                <div class="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                  <svg class="h-5 w-5 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M16 12a4 4 0 10-8 0 4 4 0 008 0zm0 0v1.5a2.5 2.5 0 005 0V12a9 9 0 10-9 9m4.5-1.206a8.959 8.959 0 01-4.5 1.207" />
                  </svg>
                </div>
                <input
                  id="email"
                  v-model="form.email"
                  type="email"
                  required
                  class="block w-full pl-10 pr-3 py-3 border border-gray-300 dark:border-gray-600 rounded-lg bg-white/50 dark:bg-slate-700/50 text-gray-900 dark:text-white placeholder-gray-500 dark:placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-transparent transition-colors duration-200"
                  placeholder="Enter your email address"
                />
              </div>
            </div>

            <!-- Submit Button -->
            <button
              type="submit"
              :disabled="isLoading"
              class="w-full flex justify-center py-3 px-4 border border-transparent rounded-lg shadow-sm text-sm font-medium text-white bg-gradient-to-r from-indigo-500 to-purple-600 hover:from-indigo-600 hover:to-purple-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500 disabled:opacity-50 disabled:cursor-not-allowed transition-all duration-200 transform hover:scale-105"
            >
              <svg v-if="isLoading" class="animate-spin -ml-1 mr-3 h-5 w-5 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M4 4v5h.582m15.356 2A8.001 8.001 0 004.582 9m0 0H9m11 11v-5h-.581m0 0a8.003 8.003 0 01-15.357-2m15.357 2H15" />
              </svg>
              {{ isLoading ? 'Sending reset link...' : 'Send Reset Link' }}
            </button>
          </form>

          <!-- Back to Sign In Link -->
          <div class="mt-6 text-center">
            <p class="text-sm text-gray-600 dark:text-gray-400">
              Remember your password?
              <router-link to="/login" class="font-medium text-indigo-600 dark:text-indigo-400 hover:text-indigo-500 dark:hover:text-indigo-300 ml-1">
                Back to Sign In
              </router-link>
            </p>
          </div>
        </div>
      </div>
    </div>

    <!-- Success Notification -->
    <div
      v-if="showSuccessNotification"
      class="fixed top-4 right-4 z-50 bg-green-500 text-white px-6 py-4 rounded-lg shadow-lg flex items-center space-x-3 transform transition-all duration-300"
      :class="{ 'translate-x-full opacity-0': !showSuccessNotification }"
    >
      <svg class="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
        <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
      </svg>
      <div>
        <p class="font-medium">Reset Link Sent!</p>
        <p class="text-sm opacity-90">Check your email for password reset instructions</p>
      </div>
      <button @click="showSuccessNotification = false" class="ml-4 text-white hover:text-gray-200">
        <svg class="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M6 18L18 6M6 6l12 12" />
        </svg>
      </button>
    </div>

    <!-- Error Notification -->
    <div
      v-if="showErrorNotification"
      class="fixed top-4 right-4 z-50 bg-red-500 text-white px-6 py-4 rounded-lg shadow-lg flex items-center space-x-3 transform transition-all duration-300"
      :class="{ 'translate-x-full opacity-0': !showErrorNotification }"
    >
      <svg class="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
        <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 8v4m0 4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
      </svg>
      <div>
        <p class="font-medium">Request Failed</p>
        <p class="text-sm opacity-90">{{ errorMessage }}</p>
      </div>
      <button @click="showErrorNotification = false" class="ml-4 text-white hover:text-gray-200">
        <svg class="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M6 18L18 6M6 6l12 12" />
        </svg>
      </button>
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
import { ref } from 'vue'
import { useRouter } from 'vue-router'
import ThemeToggle from '@/components/ThemeToggle.vue'

const router = useRouter()

// Form data
const form = ref({
  email: ''
})

// Form state
const isLoading = ref(false)

// Notification state
const showSuccessNotification = ref(false)
const showErrorNotification = ref(false)
const errorMessage = ref('')

// Handle forgot password
const handleForgotPassword = async () => {
  isLoading.value = true
  
  try {
    const backendUrl = import.meta.env.VITE_BACKEND_BASE_URL
    if (!backendUrl) {
      throw new Error('Backend URL not configured')
    }
    
    // Prepare the data for the API request
    const requestData = {
      email: form.value.email
    }
    
    // Make the API request
    const response = await fetch(`${backendUrl}/api/v1/auth/forgot_password`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(requestData)
    })
    
    if (response.ok) {
      // Show success notification
      showSuccessNotification.value = true
      
      // Clear the form
      form.value.email = ''
      
      // Hide notification after 5 seconds
      setTimeout(() => {
        showSuccessNotification.value = false
      }, 5000)
    } else {
      // Handle error response
      const errorData = await response.json().catch(() => ({ message: 'Failed to send reset link' }))
      let errorMsg = 'Failed to send reset link. Please try again.'
      
      // Try to extract meaningful error message from response
      if (errorData.errors) {
        if (typeof errorData.errors === 'string') {
          errorMsg = errorData.errors
        } else if (Array.isArray(errorData.errors)) {
          errorMsg = errorData.errors.join(', ')
        } else if (typeof errorData.errors === 'object') {
          const errors = []
          for (const [field, messages] of Object.entries(errorData.errors)) {
            if (Array.isArray(messages)) {
              errors.push(`${field}: ${messages.join(', ')}`)
            } else {
              errors.push(`${field}: ${messages}`)
            }
          }
          errorMsg = errors.join('; ')
        }
      } else if (errorData.message) {
        errorMsg = errorData.message
      }
      
      errorMessage.value = errorMsg
      showErrorNotification.value = true
      
      // Hide error notification after 5 seconds
      setTimeout(() => {
        showErrorNotification.value = false
      }, 5000)
    }
  } catch (error) {
    console.error('Forgot password error:', error)
    
    // Handle network or other errors
    errorMessage.value = error.message || 'Network error. Please check your connection and try again.'
    showErrorNotification.value = true
    
    // Hide error notification after 5 seconds
    setTimeout(() => {
      showErrorNotification.value = false
    }, 5000)
  } finally {
    isLoading.value = false
  }
}
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
