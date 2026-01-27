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
    </nav>

    <!-- Main Content -->
    <div class="pt-16 min-h-screen flex items-center justify-center px-4 py-8">
      <div class="max-w-md w-full space-y-8">
        <!-- Header -->
        <div class="text-center">
          <div class="w-16 h-16 mx-auto mb-6 bg-gradient-to-br from-blue-500 via-indigo-500 to-purple-500 rounded-xl shadow-lg flex items-center justify-center">
            <svg v-if="isVerifying" class="w-8 h-8 text-white animate-spin" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M4 4v5h.582m15.356 2A8.001 8.001 0 004.582 9m0 0H9m11 11v-5h-.581m0 0a8.003 8.003 0 01-15.357-2m15.357 2H15" />
            </svg>
            <svg v-else-if="verificationSuccess" class="w-8 h-8 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
            </svg>
            <svg v-else class="w-8 h-8 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M16 12a4 4 0 10-8 0 4 4 0 008 0zm0 0v1.5a2.5 2.5 0 005 0V12a9 9 0 10-9 9m4.5-1.206a8.959 8.959 0 01-4.5 1.207" />
            </svg>
          </div>
          <h2 class="text-3xl font-bold mb-2">
            <span v-if="isVerifying">Verifying Your Email</span>
            <span v-else-if="verificationSuccess">Email Verified!</span>
            <span v-else>Verification Failed</span>
          </h2>
          <p class="text-gray-600 dark:text-gray-400">
            <span v-if="isVerifying">Please wait while we verify your email address...</span>
            <span v-else-if="verificationSuccess">Your email has been successfully verified. You can now sign in.</span>
            <span v-else>There was an issue verifying your email. Please try again or contact support.</span>
          </p>
        </div>

        <!-- Verification Status Card -->
        <div class="bg-white/60 dark:bg-slate-800/60 backdrop-blur-sm rounded-2xl p-8 border border-gray-200 dark:border-gray-700 shadow-xl">
          <div class="text-center">
            <!-- Loading State -->
            <div v-if="isVerifying" class="space-y-4">
              <div class="flex justify-center">
                <div class="animate-pulse flex space-x-1">
                  <div class="w-2 h-2 bg-indigo-500 rounded-full animate-bounce"></div>
                  <div class="w-2 h-2 bg-indigo-500 rounded-full animate-bounce" style="animation-delay: 0.1s"></div>
                  <div class="w-2 h-2 bg-indigo-500 rounded-full animate-bounce" style="animation-delay: 0.2s"></div>
                </div>
              </div>
              <p class="text-gray-600 dark:text-gray-400">Verifying your email token...</p>
            </div>

            <!-- Success State -->
            <div v-else-if="verificationSuccess" class="space-y-4">
              <div class="w-16 h-16 mx-auto bg-green-100 dark:bg-green-900 rounded-full flex items-center justify-center">
                <svg class="w-8 h-8 text-green-600 dark:text-green-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M5 13l4 4L19 7" />
                </svg>
              </div>
              <p class="text-green-600 dark:text-green-400 font-medium">Email verification successful!</p>
              <p class="text-sm text-gray-600 dark:text-gray-400">Redirecting to sign in page in {{ redirectCountdown }} seconds...</p>
              <button
                @click="redirectToLogin"
                class="w-full mt-4 py-3 px-4 border border-transparent rounded-lg shadow-sm text-sm font-medium text-white bg-gradient-to-r from-indigo-500 to-purple-600 hover:from-indigo-600 hover:to-purple-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500 transition-all duration-200 transform hover:scale-105"
              >
                Sign In Now
              </button>
            </div>

            <!-- Error State -->
            <div v-else class="space-y-4">
              <div class="w-16 h-16 mx-auto bg-red-100 dark:bg-red-900 rounded-full flex items-center justify-center">
                <svg class="w-8 h-8 text-red-600 dark:text-red-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M6 18L18 6M6 6l12 12" />
                </svg>
              </div>
              <p class="text-red-600 dark:text-red-400 font-medium">Verification failed</p>
              <p class="text-sm text-gray-600 dark:text-gray-400">{{ errorMessage }}</p>
              <div class="space-y-2">
                <button
                  @click="retryVerification"
                  class="w-full py-3 px-4 border border-transparent rounded-lg shadow-sm text-sm font-medium text-white bg-gradient-to-r from-indigo-500 to-purple-600 hover:from-indigo-600 hover:to-purple-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500 transition-all duration-200 transform hover:scale-105"
                >
                  Try Again
                </button>
                <button
                  @click="redirectToLogin"
                  class="w-full py-3 px-4 border border-gray-300 dark:border-gray-600 rounded-lg shadow-sm text-sm font-medium text-gray-700 dark:text-gray-300 bg-white dark:bg-slate-700 hover:bg-gray-50 dark:hover:bg-slate-600 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500 transition-all duration-200"
                >
                  Back to Sign In
                </button>
              </div>
            </div>
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
        <p class="font-medium">Email Verified Successfully!</p>
        <p class="text-sm opacity-90">You can now sign in to your account</p>
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
        <p class="font-medium">Verification Failed</p>
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
import { ref, onMounted } from 'vue'
import { useRouter, useRoute } from 'vue-router'
import { useDark, useToggle } from '@vueuse/core'

const router = useRouter()
const route = useRoute()

// Dark mode composable
const isDark = useDark({
  selector: 'body',
  attribute: 'class',
  valueDark: 'dark',
  valueLight: ''
})
const toggleDarkMode = useToggle(isDark)

// Verification state
const isVerifying = ref(true)
const verificationSuccess = ref(false)
const errorMessage = ref('')
const redirectCountdown = ref(5)

// Notification state
const showSuccessNotification = ref(false)
const showErrorNotification = ref(false)

// Verification function
const verifyEmail = async () => {
  const token = route.query.token

  if (!token) {
    isVerifying.value = false
    errorMessage.value = 'No verification token provided in the URL'
    showErrorNotification.value = true
    
    setTimeout(() => {
      showErrorNotification.value = false
    }, 5000)
    return
  }

  try {
    const response = await fetch(`${import.meta.env.VITE_BACKEND_BASE_URL}/api/v1/auth/verify_email`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({
        token: token
      })
    })

    if (response.ok) {
      // Success
      isVerifying.value = false
      verificationSuccess.value = true
      showSuccessNotification.value = true
      
      // Start countdown and redirect
      const countdown = setInterval(() => {
        redirectCountdown.value--
        if (redirectCountdown.value <= 0) {
          clearInterval(countdown)
          redirectToLogin()
        }
      }, 1000)

      // Hide success notification after 4 seconds
      setTimeout(() => {
        showSuccessNotification.value = false
      }, 4000)
    } else {
      // Handle error response
      const errorData = await response.json()
      let errorMsg = 'Email verification failed. Please try again.'
      
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
      
      isVerifying.value = false
      errorMessage.value = errorMsg
      showErrorNotification.value = true
      
      setTimeout(() => {
        showErrorNotification.value = false
      }, 5000)
    }
  } catch (error) {
    console.error('Email verification error:', error)
    isVerifying.value = false
    errorMessage.value = 'Network error. Please check your connection and try again.'
    showErrorNotification.value = true
    
    setTimeout(() => {
      showErrorNotification.value = false
    }, 5000)
  }
}

// Retry verification
const retryVerification = () => {
  isVerifying.value = true
  verificationSuccess.value = false
  errorMessage.value = ''
  showErrorNotification.value = false
  showSuccessNotification.value = false
  
  verifyEmail()
}

// Redirect to login
const redirectToLogin = () => {
  router.push('/login')
}

// Start verification when component mounts
onMounted(() => {
  verifyEmail()
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
