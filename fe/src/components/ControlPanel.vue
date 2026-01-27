<template>
  <!-- Floating Control Panel -->
  <div class="fixed bottom-5 left-5 z-30 bg-white/90 dark:bg-slate-800/90 backdrop-blur rounded-xl shadow-2xl border border-gray-200 dark:border-gray-700 w-80 max-h-[70vh] flex flex-col">
    <!-- Panel Header -->
    <div class="p-4 border-b border-gray-200 dark:border-gray-700 flex-shrink-0">
      <h3 class="text-lg font-semibold text-gray-900 dark:text-white">Control Panel</h3>
    </div>

    <!-- Tab Navigation -->
    <div class="flex border-b border-gray-200 dark:border-gray-700 flex-shrink-0">
      <button
        v-for="tab in tabs"
        :key="tab.id"
        @click="activeTab = tab.id"
        :class="[
          'flex-1 px-3 py-2 text-sm font-medium transition-colors',
          activeTab === tab.id
            ? 'bg-indigo-50 dark:bg-indigo-900/30 text-indigo-600 dark:text-indigo-400 border-b-2 border-indigo-600 dark:border-indigo-400'
            : 'text-gray-500 dark:text-gray-400 hover:text-gray-700 dark:hover:text-gray-300'
        ]"
      >
        {{ tab.label }}
      </button>
    </div>

    <!-- Tab Content (Scrollable) -->
    <div class="p-4 overflow-y-auto flex-1">
      <!-- Board Tab -->
      <div v-if="activeTab === 'board'" class="space-y-4">
        <div>
          <label class="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
            Dots Count Horizontal
          </label>
          <input
            v-model.number="boardSettings.dotsCountHorizontal"
            type="number"
            min="5"
            max="50"
            class="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-md bg-white dark:bg-slate-700 text-gray-900 dark:text-white focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500"
          />
        </div>
        
        <div>
          <label class="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
            Dots Count Vertical
          </label>
          <input
            v-model.number="boardSettings.dotsCountVertical"
            type="number"
            min="5"
            max="50"
            class="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-md bg-white dark:bg-slate-700 text-gray-900 dark:text-white focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500"
          />
        </div>
        
        <div>
          <label class="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
            Margin Between Nails (px)
          </label>
          <input
            v-model.number="boardSettings.marginBetweenNails"
            type="number"
            min="10"
            max="100"
            class="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-md bg-white dark:bg-slate-700 text-gray-900 dark:text-white focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500"
          />
        </div>
        
        <div>
          <label class="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
            Padding Board (px)
          </label>
          <input
            v-model.number="boardSettings.paddingBoard"
            type="number"
            min="10"
            max="100"
            class="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-md bg-white dark:bg-slate-700 text-gray-900 dark:text-white focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500"
          />
        </div>
        
        <!-- Board Color Section -->
        <div>
          <label class="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-3">
            Board Color
          </label>
          <div class="flex flex-wrap gap-3">
            <div
              v-for="colorOption in boardColorOptions"
              :key="colorOption.id"
              @click="selectBoardColor(colorOption)"
              :class="[
                'relative cursor-pointer transition-all',
                selectedBoardColor === colorOption.id
                  ? 'ring-2 ring-indigo-600 ring-offset-2'
                  : 'hover:ring-2 hover:ring-gray-400 hover:ring-offset-1'
              ]"
              :title="colorOption.label"
            >
              <div
                :style="{ backgroundColor: colorOption.id === 'custom' ? customBoardColor : colorOption.color }"
                class="w-10 h-10 rounded-full border-2 border-white shadow-md relative"
              >
                <!-- Pencil icon for custom color -->
                <div
                  v-if="colorOption.id === 'custom'"
                  class="absolute inset-0 flex items-center justify-center"
                >
                  <svg class="w-4 h-4 text-white drop-shadow-md" fill="currentColor" viewBox="0 0 20 20">
                    <path d="M13.586 3.586a2 2 0 112.828 2.828l-.793.793-2.828-2.828.793-.793zM11.379 5.793L3 14.172V17h2.828l8.38-8.379-2.83-2.828z" />
                  </svg>
                </div>
              </div>
              <!-- Selected indicator -->
              <div
                v-if="selectedBoardColor === colorOption.id && colorOption.id !== 'custom'"
                class="absolute inset-0 flex items-center justify-center"
              >
                <svg class="w-5 h-5 text-white drop-shadow-lg" fill="currentColor" viewBox="0 0 20 20">
                  <path fill-rule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clip-rule="evenodd" />
                </svg>
              </div>
            </div>
          </div>
          
          <!-- Custom Color Picker -->
          <div v-if="selectedBoardColor === 'custom'" class="mt-3">
            <label class="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
              Custom Color
            </label>
            <div class="flex items-center space-x-2">
              <input
                v-model="customBoardColor"
                type="color"
                class="w-12 h-10 border border-gray-300 dark:border-gray-600 rounded cursor-pointer"
                @input="updateCustomBoardColor"
              />
              <input
                v-model="customBoardColor"
                type="text"
                placeholder="#8B4513"
                class="flex-1 px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-md bg-white dark:bg-slate-700 text-gray-900 dark:text-white focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500"
                @input="updateCustomBoardColor"
              />
            </div>
          </div>
          
          <p class="text-sm text-gray-500 dark:text-gray-400 mt-2">
            Selected: {{ boardColorOptions.find(c => c.id === selectedBoardColor)?.label }}
          </p>
        </div>
      </div>

      <!-- Nail Settings Tab -->
      <div v-if="activeTab === 'nailSettings'" class="space-y-6">
        <!-- Nail Width Section -->
        <div>
          <label class="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-3">
            Select Nail Width (Color Coded)
          </label>
          <div class="space-y-3">
            <div
              v-for="width in nailWidthOptions"
              :key="width.id"
              @click="selectedNailWidth = width.id"
              :class="[
                'p-3 rounded-lg border-2 cursor-pointer transition-all',
                selectedNailWidth === width.id
                  ? 'border-indigo-600 bg-indigo-50 dark:bg-indigo-900/30'
                  : 'border-gray-300 dark:border-gray-600 hover:border-indigo-400'
              ]"
            >
              <div class="flex items-center space-x-3">
                <div
                  :style="{ backgroundColor: width.color }"
                  class="w-6 h-6 rounded-full border-2 border-white shadow-sm"
                ></div>
                <div>
                  <div class="font-medium text-gray-900 dark:text-white">
                    {{ width.label }}
                  </div>
                  <div class="text-sm text-gray-500 dark:text-gray-400">
                    {{ width.color }}
                  </div>
                </div>
                <div
                  v-if="selectedNailWidth === width.id"
                  class="ml-auto text-indigo-600 dark:text-indigo-400"
                >
                  <svg class="w-5 h-5" fill="currentColor" viewBox="0 0 20 20">
                    <path fill-rule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clip-rule="evenodd" />
                  </svg>
                </div>
              </div>
            </div>
          </div>
          <p class="text-sm text-gray-500 dark:text-gray-400 mt-2">
            Selected Width: {{ nailWidthOptions.find(w => w.id === selectedNailWidth)?.label }}
          </p>
        </div>
        
        <!-- Nail Height Section -->
        <div>
          <label class="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-3">
            Select Nail Height (1-10)
          </label>
          <div class="grid grid-cols-5 gap-2">
            <button
              v-for="height in nailHeightOptions"
              :key="height"
              @click="selectedNailHeight = height"
              :class="[
                'w-12 h-12 rounded-lg border-2 font-semibold transition-all',
                selectedNailHeight === height
                  ? 'bg-indigo-600 text-white border-indigo-600 shadow-lg'
                  : 'bg-white dark:bg-slate-700 text-gray-700 dark:text-gray-300 border-gray-300 dark:border-gray-600 hover:border-indigo-400'
              ]"
            >
              {{ height }}
            </button>
          </div>
          <p class="text-sm text-gray-500 dark:text-gray-400 mt-2">
            Selected Height: {{ selectedNailHeight }}
          </p>
        </div>
      </div>

      <!-- Settings Tab -->
      <div v-if="activeTab === 'settings'" class="space-y-4">
        <slot name="settings-content" />
        
        <div class="text-center text-gray-500 dark:text-gray-400 pt-4 border-t border-gray-200 dark:border-gray-700">
          <svg class="w-8 h-8 mx-auto mb-2 text-gray-300 dark:text-gray-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
          </svg>
          <p class="text-xs">
            Click dots to add nails<br>
            Right-click to remove<br>
            Ctrl+Scroll to zoom<br>
            Alt+Drag to pan
          </p>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref, computed } from 'vue'

const props = defineProps({
  boardSettings: {
    type: Object,
    required: true
  },
  selectedNailHeight: {
    type: Number,
    required: true
  },
  selectedNailWidth: {
    type: String,
    required: true
  },
  nailHeightOptions: {
    type: Array,
    required: true
  },
  nailWidthOptions: {
    type: Array,
    required: true
  }
})

const emit = defineEmits(['update:selectedNailHeight', 'update:selectedNailWidth'])

// Control Panel State
const activeTab = ref('nailSettings')

const tabs = [
  { id: 'board', label: 'Board' },
  { id: 'nailSettings', label: 'Nails' },
  { id: 'settings', label: 'Settings' }
]

// Board Color Options (Secondary Colors)
const selectedBoardColor = ref('brown')
const customBoardColor = ref('#8B4513')

const boardColorOptions = [
  { id: 'brown', label: 'Brown (MDF)', color: '#8B4513' },
  { id: 'orange', label: 'Orange', color: '#f97316' },
  { id: 'purple', label: 'Purple', color: '#a855f7' },
  { id: 'green', label: 'Green', color: '#22c55e' },
  { id: 'gray', label: 'Gray', color: '#6b7280' },
  { id: 'pink', label: 'Pink', color: '#ec4899' },
  { id: 'custom', label: 'Custom', color: customBoardColor }
]

// Board color selection methods
const selectBoardColor = (colorOption) => {
  selectedBoardColor.value = colorOption.id
  
  if (colorOption.id === 'custom') {
    props.boardSettings.boardColor = customBoardColor.value
  } else {
    props.boardSettings.boardColor = colorOption.color
  }
}

const updateCustomBoardColor = () => {
  if (selectedBoardColor.value === 'custom') {
    props.boardSettings.boardColor = customBoardColor.value
  }
}

// Update nail settings with emit
const selectedNailHeight = computed({
  get: () => props.selectedNailHeight,
  set: (value) => emit('update:selectedNailHeight', value)
})

const selectedNailWidth = computed({
  get: () => props.selectedNailWidth,
  set: (value) => emit('update:selectedNailWidth', value)
})
</script>
