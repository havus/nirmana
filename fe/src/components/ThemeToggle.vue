<template>
  <button 
    @click="toggleDarkMode()"
    :class="buttonClass"
    :title="isDark ? 'Switch to Light Mode' : 'Switch to Dark Mode'"
  >
    <svg v-if="!isDark" :class="iconClass" fill="none" stroke="currentColor" viewBox="0 0 24 24">
      <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M20.354 15.354A9 9 0 018.646 3.646 9.003 9.003 0 0012 21a9.003 9.003 0 008.354-5.646z" />
    </svg>
    <svg v-else :class="iconClass" fill="none" stroke="currentColor" viewBox="0 0 24 24">
      <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 3v1m0 16v1m9-9h-1M4 12H3m15.364 6.364l-.707-.707M6.343 6.343l-.707-.707m12.728 0l-.707.707M6.343 17.657l-.707.707M16 12a4 4 0 11-8 0 4 4 0 018 0z" />
    </svg>
  </button>
</template>

<script setup>
import { computed } from 'vue'
import { useDarkMode } from '@/composables/useDarkMode'

const props = defineProps({
  variant: {
    type: String,
    default: 'default', // 'default' or 'rounded'
  }
})

const { isDark, toggleDarkMode } = useDarkMode()

const buttonClass = computed(() => {
  if (props.variant === 'rounded') {
    return 'p-2 bg-white/80 dark:bg-slate-800/80 rounded-full shadow-lg backdrop-blur hover:bg-white/90 dark:hover:bg-slate-800/90 transition-colors'
  }
  return 'hover:cursor-pointer p-2 rounded-lg bg-gray-100 dark:bg-slate-800 hover:bg-gray-200 dark:hover:bg-slate-700 transition-colors duration-200'
})

const iconClass = computed(() => {
  if (props.variant === 'rounded') {
    return 'w-5 h-5'
  }
  return isDark.value ? 'w-5 h-5 text-yellow-400' : 'w-5 h-5 text-gray-700'
})
</script>
