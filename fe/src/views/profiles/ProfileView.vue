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
          
          <!-- Navigation Links -->
          <div class="hidden md:flex items-center space-x-6">
            <router-link to="/" class="text-gray-700 dark:text-gray-300 hover:text-indigo-600 dark:hover:text-indigo-400 font-medium transition-colors duration-200">
              Home
            </router-link>
            <router-link to="/projects/new" class="text-gray-700 dark:text-gray-300 hover:text-indigo-600 dark:hover:text-indigo-400 font-medium transition-colors duration-200">
              New Project
            </router-link>
          </div>

          <!-- Right Section -->
          <div class="flex items-center space-x-3">
            <!-- Profile Button -->
            <ProfileButton />
            
            <!-- Theme Toggle -->
            <ThemeToggle />
          </div>
        </div>
      </div>
    </nav>

    <!-- Main Content -->
    <div class="pt-16 min-h-screen py-8">
      <div class="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
        
        <!-- Loading State -->
        <div v-if="isLoadingProfile" class="flex items-center justify-center min-h-[50vh]">
          <div class="text-center">
            <svg class="animate-spin -ml-1 mr-3 h-12 w-12 text-indigo-600 mx-auto mb-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M4 4v5h.582m15.356 2A8.001 8.001 0 004.582 9m0 0H9m11 11v-5h-.581m0 0a8.003 8.003 0 01-15.357-2m15.357 2H15" />
            </svg>
            <p class="text-gray-600 dark:text-gray-400">Loading your profile...</p>
          </div>
        </div>

        <!-- Profile Content -->
        <div v-else>
          <!-- Page Header -->
          <div class="mb-8">
            <h1 class="text-3xl font-bold mb-2">Profile</h1>
            <p class="text-gray-600 dark:text-gray-400">Manage your account settings and preferences</p>
          </div>

        <!-- Profile Content -->
        <div class="grid grid-cols-1 lg:grid-cols-3 gap-8">
          <!-- Profile Card -->
          <div class="lg:col-span-1">
            <div class="bg-white/60 dark:bg-slate-800/60 backdrop-blur-sm rounded-2xl p-6 border border-gray-200 dark:border-gray-700 shadow-xl">
              <!-- Profile Avatar -->
              <div class="text-center mb-6">
                <div class="w-24 h-24 bg-gradient-to-br from-indigo-500 via-purple-500 to-pink-500 rounded-full flex items-center justify-center mx-auto mb-4">
                  <span class="text-white text-2xl font-bold">{{ userInitials }}</span>
                </div>
                <h2 class="text-xl font-semibold mb-1">{{ userFullName }}</h2>
                <p class="text-gray-600 dark:text-gray-400">@{{ userData?.username }}</p>
                <div v-if="userData?.email_verified_at" class="mt-3 inline-flex items-center px-3 py-1 rounded-full text-xs font-medium bg-green-100 dark:bg-green-900 text-green-800 dark:text-green-200">
                  <svg class="w-3 h-3 mr-1" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
                  </svg>
                  Email Verified
                </div>
                <div v-else class="mt-3 inline-flex items-center px-3 py-1 rounded-full text-xs font-medium bg-yellow-100 dark:bg-yellow-900 text-yellow-800 dark:text-yellow-200">
                  <svg class="w-3 h-3 mr-1" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z" />
                  </svg>
                  Email Not Verified
                </div>
              </div>

              <!-- Quick Stats -->
              <div class="space-y-4">
                <div class="flex items-center justify-between py-3 border-t border-gray-200 dark:border-gray-600">
                  <span class="text-gray-600 dark:text-gray-400">Member since</span>
                  <span class="font-medium">{{ memberSince }}</span>
                </div>
                <div v-if="userData?.date_of_birth" class="flex items-center justify-between py-3 border-t border-gray-200 dark:border-gray-600">
                  <span class="text-gray-600 dark:text-gray-400">Date of Birth</span>
                  <span class="font-medium">{{ formatDate(userData.date_of_birth) }}</span>
                </div>
                <div class="flex items-center justify-between py-3 border-t border-gray-200 dark:border-gray-600">
                  <span class="text-gray-600 dark:text-gray-400">Total Projects</span>
                  <span class="font-medium">0</span>
                </div>
                <div class="flex items-center justify-between py-3 border-t border-gray-200 dark:border-gray-600">
                  <span class="text-gray-600 dark:text-gray-400">Last Active</span>
                  <span class="font-medium">Today</span>
                </div>
              </div>
              
              <!-- Description -->
              <div v-if="userData?.description" class="mt-6 pt-4 border-t border-gray-200 dark:border-gray-600">
                <h3 class="text-sm font-medium text-gray-600 dark:text-gray-400 mb-2">About</h3>
                <p class="text-gray-700 dark:text-gray-300 text-sm leading-relaxed">{{ userData.description }}</p>
              </div>
            </div>
          </div>

          <!-- Profile Details -->
          <div class="lg:col-span-2">
            <div class="bg-white/60 dark:bg-slate-800/60 backdrop-blur-sm rounded-2xl border border-gray-200 dark:border-gray-700 shadow-xl">
              <!-- Tabs -->
              <div class="border-b border-gray-200 dark:border-gray-600">
                <nav class="flex">
                  <button 
                    @click="activeTab = 'account'"
                    :class="[
                      'px-6 py-4 font-medium text-sm border-b-2 transition-colors duration-200',
                      activeTab === 'account' 
                        ? 'border-indigo-500 text-indigo-600 dark:text-indigo-400' 
                        : 'border-transparent text-gray-500 dark:text-gray-400 hover:text-gray-700 dark:hover:text-gray-300 hover:border-gray-300'
                    ]"
                  >
                    Account Details
                  </button>
                  <button 
                    @click="activeTab = 'preferences'"
                    :class="[
                      'px-6 py-4 font-medium text-sm border-b-2 transition-colors duration-200',
                      activeTab === 'preferences' 
                        ? 'border-indigo-500 text-indigo-600 dark:text-indigo-400' 
                        : 'border-transparent text-gray-500 dark:text-gray-400 hover:text-gray-700 dark:hover:text-gray-300 hover:border-gray-300'
                    ]"
                  >
                    Preferences
                  </button>
                </nav>
              </div>

              <!-- Tab Content -->
              <div class="p-6">
                <!-- Account Details Tab -->
                <div v-if="activeTab === 'account'" class="space-y-6">
                  <div class="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <!-- First Name -->
                    <div>
                      <label class="block text-sm font-medium mb-2">First Name</label>
                      <input
                        v-model="editableData.first_name"
                        type="text"
                        class="block w-full px-3 py-3 border border-gray-300 dark:border-gray-600 rounded-lg bg-white/50 dark:bg-slate-700/50 text-gray-900 dark:text-white placeholder-gray-500 dark:placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-transparent transition-colors duration-200"
                      />
                    </div>

                    <!-- Last Name -->
                    <div>
                      <label class="block text-sm font-medium mb-2">Last Name</label>
                      <input
                        v-model="editableData.last_name"
                        type="text"
                        class="block w-full px-3 py-3 border border-gray-300 dark:border-gray-600 rounded-lg bg-white/50 dark:bg-slate-700/50 text-gray-900 dark:text-white placeholder-gray-500 dark:placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-transparent transition-colors duration-200"
                      />
                    </div>
                  </div>

                  <!-- Email -->
                  <div>
                    <label class="block text-sm font-medium mb-2">Email Address</label>
                    <input
                      v-model="editableData.email"
                      type="email"
                      class="block w-full px-3 py-3 border border-gray-300 dark:border-gray-600 rounded-lg bg-white/50 dark:bg-slate-700/50 text-gray-900 dark:text-white placeholder-gray-500 dark:placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-transparent transition-colors duration-200"
                    />
                  </div>

                  <!-- Username -->
                  <div>
                    <label class="block text-sm font-medium mb-2">Username</label>
                    <input
                      v-model="editableData.username"
                      type="text"
                      class="block w-full px-3 py-3 border border-gray-300 dark:border-gray-600 rounded-lg bg-white/50 dark:bg-slate-700/50 text-gray-900 dark:text-white placeholder-gray-500 dark:placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-transparent transition-colors duration-200"
                    />
                  </div>

                  <!-- Date of Birth -->
                  <div>
                    <label class="block text-sm font-medium mb-2">Date of Birth</label>
                    <input
                      v-model="editableData.date_of_birth"
                      type="date"
                      class="block w-full px-3 py-3 border border-gray-300 dark:border-gray-600 rounded-lg bg-white/50 dark:bg-slate-700/50 text-gray-900 dark:text-white placeholder-gray-500 dark:placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-transparent transition-colors duration-200"
                    />
                  </div>

                  <!-- Description -->
                  <div>
                    <label class="block text-sm font-medium mb-2">Description</label>
                    <textarea
                      v-model="editableData.description"
                      rows="4"
                      placeholder="Tell us about yourself..."
                      class="block w-full px-3 py-3 border border-gray-300 dark:border-gray-600 rounded-lg bg-white/50 dark:bg-slate-700/50 text-gray-900 dark:text-white placeholder-gray-500 dark:placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-transparent transition-colors duration-200 resize-vertical"
                    ></textarea>
                  </div>

                  <!-- User ID (Read-only) -->
                  <div>
                    <label class="block text-sm font-medium mb-2">User ID</label>
                    <input
                      :value="userData?.uid"
                      type="text"
                      readonly
                      class="block w-full px-3 py-3 border border-gray-300 dark:border-gray-600 rounded-lg bg-gray-100 dark:bg-slate-600 text-gray-700 dark:text-gray-300 cursor-not-allowed"
                    />
                    <p class="text-xs text-gray-500 dark:text-gray-400 mt-1">This is your unique identifier and cannot be changed</p>
                  </div>

                  <!-- Save Button -->
                  <div class="flex justify-end pt-4">
                    <button
                      @click="saveProfile"
                      :disabled="isLoading"
                      class="px-6 py-3 bg-gradient-to-r from-indigo-500 to-purple-600 hover:from-indigo-600 hover:to-purple-700 text-white rounded-lg font-medium transition-all duration-200 transform hover:scale-105 shadow-sm hover:shadow-md disabled:opacity-50 disabled:cursor-not-allowed flex items-center"
                    >
                      <svg v-if="isLoading" class="animate-spin -ml-1 mr-3 h-5 w-5 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M4 4v5h.582m15.356 2A8.001 8.001 0 004.582 9m0 0H9m11 11v-5h-.581m0 0a8.003 8.003 0 01-15.357-2m15.357 2H15" />
                      </svg>
                      {{ isLoading ? 'Saving...' : 'Save Changes' }}
                    </button>
                  </div>
                </div>

                <!-- Preferences Tab -->
                <div v-if="activeTab === 'preferences'" class="space-y-6">
                  <!-- Theme Preference -->
                  <div>
                    <label class="block text-sm font-medium mb-3">Theme Preference</label>
                    <div class="space-y-2">
                      <label class="flex items-center">
                        <input
                          type="radio"
                          name="theme"
                          value="light"
                          :checked="!isDark"
                          @change="setTheme('light')"
                          class="h-4 w-4 text-indigo-600 focus:ring-indigo-500 border-gray-300"
                        />
                        <span class="ml-2 text-gray-700 dark:text-gray-300">Light Mode</span>
                      </label>
                      <label class="flex items-center">
                        <input
                          type="radio"
                          name="theme"
                          value="dark"
                          :checked="isDark"
                          @change="setTheme('dark')"
                          class="h-4 w-4 text-indigo-600 focus:ring-indigo-500 border-gray-300"
                        />
                        <span class="ml-2 text-gray-700 dark:text-gray-300">Dark Mode</span>
                      </label>
                    </div>
                  </div>

                  <!-- Notifications -->
                  <div v-if="false">
                    <label class="block text-sm font-medium mb-3">Notifications</label>
                    <div class="space-y-3">
                      <label class="flex items-center justify-between">
                        <span class="text-gray-700 dark:text-gray-300">Email notifications</span>
                        <input
                          type="checkbox"
                          v-model="preferences.emailNotifications"
                          class="h-4 w-4 text-indigo-600 focus:ring-indigo-500 border-gray-300 rounded"
                        />
                      </label>
                      <label class="flex items-center justify-between">
                        <span class="text-gray-700 dark:text-gray-300">Browser notifications</span>
                        <input
                          type="checkbox"
                          v-model="preferences.browserNotifications"
                          class="h-4 w-4 text-indigo-600 focus:ring-indigo-500 border-gray-300 rounded"
                        />
                      </label>
                    </div>
                  </div>

                  <!-- Language -->
                  <div>
                    <label class="block text-sm font-medium mb-2">Language</label>
                    <select
                      v-model="preferences.language"
                      class="block w-full px-3 py-3 border border-gray-300 dark:border-gray-600 rounded-lg bg-white/50 dark:bg-slate-700/50 text-gray-900 dark:text-white focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-transparent transition-colors duration-200"
                    >
                      <option value="en">English</option>
                      <option value="id">Bahasa Indonesia</option>
                    </select>
                  </div>

                  <!-- Save Preferences Button -->
                  <div class="flex justify-end pt-4">
                    <button
                      @click="savePreferences"
                      class="px-6 py-3 bg-gradient-to-r from-indigo-500 to-purple-600 hover:from-indigo-600 hover:to-purple-700 text-white rounded-lg font-medium transition-all duration-200 transform hover:scale-105 shadow-sm hover:shadow-md"
                    >
                      Save Preferences
                    </button>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
        </div> <!-- End of v-else (Profile Content) -->
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
        <p class="font-medium">Profile Updated!</p>
        <p class="text-sm opacity-90">Your changes have been saved successfully</p>
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
        <p class="font-medium">Update Failed</p>
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
import { ref, reactive, onMounted } from 'vue'
import { useRouter } from 'vue-router'
import { useDarkMode } from '@/composables/useDarkMode'
import ThemeToggle from '@/components/ThemeToggle.vue'
import ProfileButton from '@/components/ProfileButton.vue'

const router = useRouter()

// Dark mode composable
const { isDark, toggleDarkMode } = useDarkMode()

// State
const activeTab = ref('account')
const isLoading = ref(false)
const isLoadingProfile = ref(true)
const showSuccessNotification = ref(false)
const showErrorNotification = ref(false)
const errorMessage = ref('')

// User data
const userData = ref(null)
const userFullName = ref('')
const userInitials = ref('')
const memberSince = ref('')

// Editable user data
const editableData = reactive({
  first_name: '',
  last_name: '',
  email: '',
  username: '',
  date_of_birth: '',
  description: ''
})

// User preferences
const preferences = reactive({
  emailNotifications: true,
  browserNotifications: false,
  language: 'en'
})

// Cookie utility functions
const getCookie = (name) => {
  const value = `; ${document.cookie}`
  const parts = value.split(`; ${name}=`)
  if (parts.length === 2) return parts.pop().split(';').shift()
  return null
}

const setCookie = (name, value, expirationDate) => {
  const expires = expirationDate ? `expires=${new Date(expirationDate).toUTCString()};` : ''
  document.cookie = `${name}=${value}; ${expires} path=/; Secure; SameSite=Strict`
}

// Load user data
const loadUserData = async () => {
  isLoadingProfile.value = true
  const token = getCookie('sess_token')
  const userDataCookie = getCookie('user_data')
  
  if (!token) {
    router.push('/login')
    return
  }
  
  // Get UID from existing cookie or redirect to login
  let userUid = null
  if (userDataCookie) {
    try {
      const cookieData = JSON.parse(userDataCookie)
      userUid = cookieData.uid
    } catch (error) {
      console.error('Error parsing user data cookie:', error)
      router.push('/login')
      return
    }
  } else {
    router.push('/login')
    return
  }
  
  try {
    const backendUrl = import.meta.env.VITE_BACKEND_BASE_URL
    if (!backendUrl) {
      throw new Error('Backend URL not configured')
    }

    // Fetch fresh user data from API
    const response = await fetch(`${backendUrl}/api/v1/users/${userUid}`, {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json',
      }
    })

    if (!response.ok) {
      if (response.status === 401) {
        // Token expired or invalid, redirect to login
        document.cookie = 'sess_token=; expires=Thu, 01 Jan 1970 00:00:00 UTC; path=/;'
        document.cookie = 'user_data=; expires=Thu, 01 Jan 1970 00:00:00 UTC; path=/;'
        router.push('/login')
        return
      }
      throw new Error(`HTTP error! status: ${response.status}`)
    }

    const responseData = await response.json()
    const freshUserData = responseData.user
    
    // Update userData ref
    userData.value = freshUserData
    userFullName.value = `${freshUserData.first_name} ${freshUserData.last_name}`
    userInitials.value = `${freshUserData.first_name.charAt(0)}${freshUserData.last_name.charAt(0)}`.toUpperCase()
    
    // Update cookie with fresh data (keep existing expiration)
    setCookie('user_data', JSON.stringify(freshUserData))
    
    // Populate editable data
    editableData.first_name = freshUserData.first_name || ''
    editableData.last_name = freshUserData.last_name || ''
    editableData.email = freshUserData.email || ''
    editableData.username = freshUserData.username || ''
    editableData.date_of_birth = freshUserData.date_of_birth || ''
    editableData.description = freshUserData.description || ''
    
    // Set member since from API data
    if (freshUserData.created_at) {
      const createdDate = new Date(freshUserData.created_at)
      memberSince.value = createdDate.toLocaleDateString('en-US', { 
        year: 'numeric', 
        month: 'short' 
      })
    } else {
      memberSince.value = ''
    }
  } catch (error) {
    console.error('Error loading user data:', error)
    
    // Fall back to cookie data if API fails
    if (userDataCookie) {
      try {
        const cookieData = JSON.parse(userDataCookie)
        userData.value = cookieData
        userFullName.value = `${cookieData.first_name} ${cookieData.last_name}`
        userInitials.value = `${cookieData.first_name.charAt(0)}${cookieData.last_name.charAt(0)}`.toUpperCase()
        
        // Populate editable data from cookie
        editableData.first_name = cookieData.first_name || ''
        editableData.last_name = cookieData.last_name || ''
        editableData.email = cookieData.email || ''
        editableData.username = cookieData.username || ''
        editableData.date_of_birth = cookieData.date_of_birth || ''
        editableData.description = cookieData.description || ''
        
        memberSince.value = 'Aug 2025'
      } catch (fallbackError) {
        console.error('Error parsing fallback user data:', fallbackError)
        router.push('/login')
      }
    } else {
      router.push('/login')
    }
  } finally {
    isLoadingProfile.value = false
  }
}

// Set theme
const setTheme = (theme) => {
  if (theme === 'dark' && !isDark.value) {
    toggleDarkMode()
  } else if (theme === 'light' && isDark.value) {
    toggleDarkMode()
  }
}

// Save profile
const saveProfile = async () => {
  isLoading.value = true
  
  try {
    const token = getCookie('sess_token')
    if (!token || !userData.value?.uid) {
      throw new Error('Authentication required')
    }

    const backendUrl = import.meta.env.VITE_BACKEND_BASE_URL
    if (!backendUrl) {
      throw new Error('Backend URL not configured')
    }

    // Prepare request data
    const requestData = {
      first_name: editableData.first_name,
      last_name: editableData.last_name,
      email: editableData.email,
      username: editableData.username,
      description: editableData.description
    }

    // Add date_of_birth only if it's provided
    if (editableData.date_of_birth) {
      requestData.date_of_birth = editableData.date_of_birth
    }

    // Make HTTP request to update profile
    const response = await fetch(`${backendUrl}/api/v1/users/${userData.value.uid}`, {
      method: 'PUT',
      headers: {
        'Authorization': `Bearer ${token}`,
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(requestData)
    })

    if (!response.ok) {
      const errorData = await response.json().catch(() => ({ message: 'Failed to update profile' }))
      throw new Error(errorData.message || `HTTP error! status: ${response.status}`)
    }

    const updatedData = await response.json()
    
    // Update user data in cookie with the response data
    const updatedUserData = {
      ...userData.value,
      first_name: updatedData.first_name || editableData.first_name,
      last_name: updatedData.last_name || editableData.last_name,
      email: updatedData.email || editableData.email,
      username: updatedData.username || editableData.username,
      date_of_birth: updatedData.date_of_birth || editableData.date_of_birth,
      description: updatedData.description || editableData.description
    }
    
    setCookie('user_data', JSON.stringify(updatedUserData))
    userData.value = updatedUserData
    userFullName.value = `${updatedUserData.first_name} ${updatedUserData.last_name}`
    userInitials.value = `${updatedUserData.first_name.charAt(0)}${updatedUserData.last_name.charAt(0)}`.toUpperCase()
    
    // Show success notification
    showSuccessNotification.value = true
    setTimeout(() => {
      showSuccessNotification.value = false
    }, 3000)
  } catch (error) {
    console.error('Error saving profile:', error)
    
    // Show error notification
    showErrorNotification.value = true
    errorMessage.value = error.message || 'Failed to update profile. Please try again.'
    setTimeout(() => {
      showErrorNotification.value = false
    }, 5000)
  } finally {
    isLoading.value = false
  }
}

// Save preferences
const savePreferences = () => {
  // Save preferences to localStorage
  localStorage.setItem('user_preferences', JSON.stringify(preferences))
  
  // Show success notification
  showSuccessNotification.value = true
  setTimeout(() => {
    showSuccessNotification.value = false
  }, 3000)
}

// Load preferences
const loadPreferences = () => {
  const savedPreferences = localStorage.getItem('user_preferences')
  if (savedPreferences) {
    Object.assign(preferences, JSON.parse(savedPreferences))
  }
}

// Format date utility
const formatDate = (dateString) => {
  if (!dateString) return ''
  try {
    const date = new Date(dateString)
    return date.toLocaleDateString('en-US', { 
      year: 'numeric', 
      month: 'long', 
      day: 'numeric' 
    })
  } catch (error) {
    return dateString
  }
}

// Initialize
onMounted(async () => {
  await loadUserData()
  loadPreferences()
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
