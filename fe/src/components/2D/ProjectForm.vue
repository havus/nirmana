<template>
  <div class="h-screen w-screen overflow-hidden bg-slate-50 dark:bg-slate-900 relative text-gray-900 dark:text-white">
    <!-- Mobile Alert -->
    <div 
      v-if="showMobileAlert" 
      class="fixed inset-0 bg-black/80 backdrop-blur-sm z-50 flex items-center justify-center"
    >
      <div class="bg-white dark:bg-slate-800 rounded-2xl p-8 max-w-md mx-4 text-center">
        <div class="w-16 h-16 bg-indigo-500 rounded-full flex items-center justify-center mx-auto mb-4">
          <svg class="w-8 h-8 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-2.5L13.732 4c-.77-.833-1.964-.833-2.732 0L4.082 16.5c-.77.833.192 2.5 1.732 2.5z" />
          </svg>
        </div>
        <h2 class="text-2xl font-bold text-indigo-600 mb-4">Mobile Warning</h2>
        <p class="text-gray-600 dark:text-gray-300 mb-6">
          This application is optimized for desktop. For the best experience, use a computer or laptop.
        </p>
        <button 
          @click="showMobileAlert = false"
          class="bg-indigo-600 text-white px-6 py-2 rounded-lg hover:bg-indigo-700 transition-colors"
        >
          Continue
        </button>
      </div>
    </div>
    
    <!-- Navigation Buttons -->
    <div class="fixed top-5 left-5 z-20 flex gap-2">
      <!-- Home Button -->
      <router-link 
        to="/"
        class="p-2 bg-white/80 dark:bg-slate-800/80 rounded-full shadow-lg backdrop-blur hover:bg-white/90 dark:hover:bg-slate-800/90 transition-colors"
        title="Back to Home"
      >
        <svg class="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M3 12l2-2m0 0l7-7 7 7M5 10v10a1 1 0 001 1h3m10-11l2 2m-2-2v10a1 1 0 01-1 1h-3m-6 0a1 1 0 001-1v-4a1 1 0 011-1h2a1 1 0 011 1v4a1 1 0 001 1m-6 0h6" />
        </svg>
      </router-link>
      
      <!-- 3D Mode Toggle -->
      <!-- <router-link 
        to="/3d"
        class="p-2 bg-white/80 dark:bg-slate-800/80 rounded-full shadow-lg backdrop-blur hover:bg-white/90 dark:hover:bg-slate-800/90 transition-colors"
        title="Switch to 3D Mode"
      >
        <svg class="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M20 7l-8-4-8 4m16 0l-8 4m8-4v10l-8 4m0-10L4 7m8 4v10M4 7v10l8 4" />
        </svg>
      </router-link> -->
      
      <!-- Dark Mode Toggle -->
      <ThemeToggle variant="rounded" />
      
      <!-- Pan Mode Toggle -->
      <button 
        @click="togglePanMode()"
        :class="[
          'p-2 rounded-full shadow-lg backdrop-blur transition-colors',
          isPanModeActive
            ? 'bg-indigo-500 hover:bg-indigo-600 text-white'
            : 'bg-white/80 dark:bg-slate-800/80 hover:bg-white/90 dark:hover:bg-slate-800/90'
        ]"
        :title="isPanModeActive ? 'Pan Mode Active (Space to toggle)' : 'Enable Pan Mode (Space to toggle)'"
      >
        <svg class="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M7 11.5V14m0-2.5v-6a1.5 1.5 0 113 0m-3 6a1.5 1.5 0 00-3 0v2a7.5 7.5 0 0015 0v-5a1.5 1.5 0 00-3 0m-6-3V11m0-5.5v-1a1.5 1.5 0 013 0v1m0 0V11m0-5.5a1.5 1.5 0 013 0v3m0 0V11" />
        </svg>
      </button>
    </div>
    
    <!-- Zoom Info & Reset View -->
    <div class="fixed top-15 left-5 z-10 flex flex-col items-start gap-2">
      <div class="flex items-center gap-2">
        <div class="bg-white/80 dark:bg-slate-800/80 px-3 py-2 rounded-lg shadow-lg backdrop-blur text-sm">
          Zoom: {{ zoomPercentage }}%
        </div>
        <button 
          @click="resetView()"
          class="px-3 py-2 bg-white/80 dark:bg-slate-800/80 rounded-lg shadow-lg backdrop-blur hover:bg-white/90 dark:hover:bg-slate-800/90 transition-colors flex items-center gap-1 text-sm"
          title="Reset View"
        >
          <span>Reset View</span>
          <svg class="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M4 4v5h.582m15.356 2A8.001 8.001 0 004.582 9m0 0H9m11 11v-5h-.581m0 0a8.003 8.003 0 01-15.357-2m15.357 2H15" />
          </svg>
        </button>
      </div>
      <div class="bg-white/80 dark:bg-slate-800/80 px-3 py-2 rounded-lg shadow-lg backdrop-blur text-xs text-gray-600 dark:text-gray-300 max-w-48 text-right">
        <div><kbd class="px-1 py-0.5 bg-gray-200 dark:bg-gray-600 rounded text-xs">Ctrl</kbd> + scroll to zoom</div>
        <div><kbd class="px-1 py-0.5 bg-gray-200 dark:bg-gray-600 rounded text-xs">Space</kbd> + drag to pan</div>
      </div>
    </div>

    <!-- Loading Overlay -->
    <div v-if="isLoading" class="fixed inset-0 bg-black/50 backdrop-blur-sm z-50 flex items-center justify-center">
      <div class="bg-white dark:bg-slate-800 rounded-2xl p-8 max-w-md mx-4 text-center">
        <div class="w-16 h-16 border-4 border-indigo-200 border-t-indigo-600 rounded-full animate-spin mx-auto mb-4"></div>
        <h3 class="text-lg font-semibold mb-2">{{ loadingMessage }}</h3>
        <p class="text-gray-600 dark:text-gray-300">Please wait...</p>
      </div>
    </div>

    <!-- Grid Container -->
    <div class="absolute inset-0 flex items-center justify-center p-20">
      <div 
        id="grid-container"
        class="transition-transform duration-200 ease-out cursor-pointer select-none"
        style="transform-origin: center center;"
        title="Click dots to place nails. Hold Ctrl/Cmd + scroll over the grid to zoom, drag background to pan"
      ></div>
    </div>

    <!-- Floating Control Panel -->
    <VueDraggableResizable
      :x="panelPosition.x"
      :y="panelPosition.y"
      :w="panelSize.width"
      :h="panelSize.height"
      :min-width="PANEL_DEFAULTS.MIN_WIDTH"
      :min-height="PANEL_DEFAULTS.MIN_HEIGHT"
      :max-width="PANEL_DEFAULTS.MAX_WIDTH"
      :max-height="PANEL_DEFAULTS.MAX_HEIGHT"
      :resizable="true"
      :draggable="true"
      :parent="false"
      :drag-handle="'.panel-drag-handle'"
      class-name="z-50 draggable-panel"
      class-name-draggable="cursor-move"
      class-name-resizable="resize-handle"
      @resize="onPanelResize"
      @drag="onPanelDrag"
    >
      <div class="h-full bg-white/90 dark:bg-slate-800/90 backdrop-blur rounded-xl shadow-2xl border border-gray-200 dark:border-gray-700 flex flex-col control-panel floating-panel">
        <!-- Panel Header -->
        <div class="p-4 border-b border-gray-200 dark:border-gray-700 flex-shrink-0 flex items-center justify-between panel-drag-handle">
          <h3 class="text-lg font-semibold text-gray-900 dark:text-white">Control Panel</h3>
          <div class="flex items-center gap-2">
            <!-- Minimize/Maximize Button -->
            <button
              @click="toggleMinimize"
              class="p-1 text-gray-500 dark:text-gray-400 hover:text-gray-700 dark:hover:text-gray-300 transition-colors"
              :title="isMinimized ? 'Maximize' : 'Minimize'"
            >
              <svg v-if="!isMinimized" class="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M20 12H4" />
              </svg>
              <svg v-else class="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 4v16m8-8H4" />
              </svg>
            </button>
          </div>
        </div>

        <!-- Tab Navigation -->
        <div v-if="!isMinimized" class="flex border-b border-gray-200 dark:border-gray-700 flex-shrink-0">
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
        <div v-if="!isMinimized" class="p-4 overflow-y-auto flex-1">
          <!-- Project Tab -->
          <div v-if="activeTab === 'project'" class="space-y-4">
            <div>
              <label class="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                Project Name
              </label>
              <input
                v-model="projectName"
                type="text"
                placeholder="Enter project name"
                class="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-md bg-white dark:bg-slate-700 text-gray-900 dark:text-white focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500"
              />
            </div>

            <div class="flex gap-2">
              <button
                @click="() => {$emit('save-project'); testo()}"
                :disabled="isSaving"
                class="hover:cursor-pointer flex-1 bg-indigo-600 text-white px-4 py-2 rounded-md hover:bg-indigo-700 disabled:bg-gray-400 transition-colors flex items-center justify-center gap-2"
              >
                <svg v-if="isSaving" class="w-4 h-4 animate-spin" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <circle class="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" stroke-width="4"></circle>
                  <path class="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                </svg>
                {{ mode === 'edit' ? 'Update Project' : 'Save Project' }}
              </button>
            </div>

            <!-- Load Template Button (only in new mode) -->
            <div v-if="mode === 'new'">
              <button
                @click="showTemplateModal = true"
                class="w-full bg-purple-600 text-white px-4 py-2 rounded-md hover:bg-purple-700 transition-colors flex items-center justify-center gap-2"
              >
                <svg class="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M4 5a1 1 0 011-1h14a1 1 0 011 1v2a1 1 0 01-1 1H5a1 1 0 01-1-1V5zM4 13a1 1 0 011-1h6a1 1 0 011 1v6a1 1 0 01-1 1H5a1 1 0 01-1-1v-6zM16 13a1 1 0 011-1h2a1 1 0 011 1v6a1 1 0 01-1 1h-2a1 1 0 01-1-1v-6z" />
                </svg>
                Load Template
              </button>
            </div>

            <!-- Project Info (for edit mode) -->
            <div v-if="mode === 'edit' && projectInfo" class="bg-gray-50 dark:bg-slate-800 p-3 rounded-md">
              <h4 class="text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">Project Info</h4>
              <div class="text-xs text-gray-600 dark:text-gray-400 space-y-1">
                <p><strong>ID:</strong> {{ projectInfo.id }}</p>
                <p><strong>Owner:</strong> {{ projectInfo.owner?.full_name }}</p>
                <p><strong>Created:</strong> {{ formatDate(projectInfo.created_at) }}</p>
                <p><strong>Modified:</strong> {{ formatDate(projectInfo.updated_at) }}</p>
              </div>
            </div>

            <!-- Nails Statistics -->
            <div class="bg-gray-50 dark:bg-slate-800 p-3 rounded-md">
              <h4 class="text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">Statistics</h4>
              <div class="text-sm text-gray-600 dark:text-gray-400">
                <p>Total Nails: {{ Object.keys(nails).length }}</p>
                <p>Grid Size: {{ boardSettings.dotsCountHorizontal }}×{{ boardSettings.dotsCountVertical }}</p>
              </div>
            </div>
          </div>

          <!-- Board Tab -->
          <div v-if="activeTab === 'board'" class="space-y-4">
            <div>
              <label class="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                Dots Count Horizontal
              </label>
              <input
                v-model.number="boardSettings.dotsCountHorizontal"
                type="number"
                :min="BOARD_CONSTRAINTS.DOTS_COUNT_MIN"
                :max="BOARD_CONSTRAINTS.DOTS_COUNT_MAX"
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
                :min="BOARD_CONSTRAINTS.DOTS_COUNT_MIN"
                :max="BOARD_CONSTRAINTS.DOTS_COUNT_MAX"
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
                id="margin-between-nails"
                :min="BOARD_CONSTRAINTS.MARGIN_MIN"
                :max="BOARD_CONSTRAINTS.MARGIN_MAX"
                :step="BOARD_CONSTRAINTS.MARGIN_STEP"
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
                :min="BOARD_CONSTRAINTS.PADDING_MIN"
                :max="BOARD_CONSTRAINTS.PADDING_MAX"
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
                    <svg v-if="colorOption.id === 'custom'" class="w-4 h-4 absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 text-white drop-shadow" fill="currentColor" viewBox="0 0 20 20">
                      <path d="M13.586 3.586a2 2 0 112.828 2.828l-.793.793-2.828-2.828.793-.793zM11.379 5.793L3 14.172V17h2.828l8.38-8.379-2.83-2.828z" />
                    </svg>
                  </div>
                  
                  <!-- Selected indicator -->
                  <div v-if="selectedBoardColor === colorOption.id" class="absolute -top-1 -right-1 w-5 h-5 bg-indigo-600 rounded-full flex items-center justify-center">
                    <svg class="w-3 h-3 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M5 13l4 4L19 7" />
                    </svg>
                  </div>
                </div>
              </div>
              
              <!-- Custom Color Picker -->
              <div v-if="selectedBoardColor === 'custom'" class="mt-3">
                <label class="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                  Custom Color
                </label>
                <input
                  v-model="customBoardColor"
                  type="color"
                  class="w-full h-10 border border-gray-300 dark:border-gray-600 rounded-md cursor-pointer"
                />
              </div>
            </div>
          </div>

          <!-- Nails Tab -->
          <div v-if="activeTab === 'nails'" class="space-y-4">
            <div>
              <label class="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                Nail Body Width
              </label>
              <div class="flex gap-2">
                <button
                  v-for="bodyOption in nailBodyOptions"
                  :key="bodyOption.id"
                  @click="selectedNailWidth = bodyOption.id"
                  :class="[
                    'w-12 h-12 rounded-lg border-2 transition-all flex items-center justify-center font-bold text-white shadow-md',
                    selectedNailWidth === bodyOption.id
                      ? 'border-indigo-500 ring-2 ring-indigo-300 scale-110'
                      : 'border-gray-300 dark:border-gray-600 hover:scale-105 hover:border-gray-400'
                  ]"
                  :style="{ backgroundColor: bodyOption.color }"
                  :title="bodyOption.label"
                >
                  {{ bodyOption.size }}
                </button>
              </div>
            </div>

            <!-- Nail Head Width Section -->
            <div>
              <label class="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                Nail Head Width
              </label>
              <div class="flex gap-2">
                <button
                  v-for="headOption in nailHeadOptions"
                  :key="headOption.id"
                  @click="selectedNailHead = headOption.id"
                  :class="[
                    'w-12 h-12 rounded-lg border-2 transition-all flex items-center justify-center font-bold text-white shadow-md relative',
                    selectedNailHead === headOption.id
                      ? 'border-indigo-500 ring-2 ring-indigo-300 scale-110'
                      : 'border-gray-300 dark:border-gray-600 hover:scale-105 hover:border-gray-400'
                  ]"
                  :style="{ backgroundColor: headOption.color }"
                  :title="headOption.label"
                >
                  <!-- Inner circle with border percentage as arc -->
                  <svg class="absolute w-full h-full" viewBox="0 0 24 24">
                    <circle
                      cx="12"
                      cy="12"
                      r="8"
                      fill="none"
                      stroke="white"
                      stroke-width="2"
                      stroke-linecap="round"
                      :stroke-dasharray="`${(headOption.borderPercentage / 100) * 50.27} 50.27`"
                      transform="rotate(-90 12 12)"
                    />
                  </svg>
                  <span class="relative z-10">{{ headOption.size }}</span>
                </button>
              </div>
            </div>

            <div>
              <label class="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                Nail Height (mm)
              </label>
              <div class="grid grid-cols-4 gap-2">
                <button
                  v-for="height in nailHeightOptions"
                  :key="height"
                  @click="selectedNailHeight = height"
                  :class="[
                    'p-2 text-sm font-medium rounded-md border transition-colors',
                    selectedNailHeight === height
                      ? 'bg-indigo-600 text-white border-indigo-600'
                      : 'bg-white dark:bg-slate-700 text-gray-700 dark:text-gray-300 border-gray-300 dark:border-gray-600 hover:bg-gray-50 dark:hover:bg-slate-600'
                  ]"
                >
                  {{ height }}
                </button>
              </div>
            </div>

            <div class="text-sm text-gray-600 dark:text-gray-400 bg-blue-50 dark:bg-blue-900/20 p-3 rounded-md">
              <p class="font-medium text-blue-700 dark:text-blue-300 mb-1">💡 How to use:</p>
              <ul class="space-y-1 text-blue-600 dark:text-blue-400">
                <li>• Click any position to place a nail</li>
                <li>• Click again with same settings to remove</li>
                <li>• Right-click to remove any nail</li>
              </ul>
            </div>

            <div class="flex gap-2">
              <button
                @click="clearAllNails()"
                class="w-full bg-red-500 text-white px-4 py-2 rounded-md hover:bg-red-600 transition-colors hover:cursor-pointer"
              >
                Clear All Nails
              </button>
            </div>
          </div>

          <!-- 3D Preview Tab -->
          <div v-if="activeTab === '3d-preview'" class="space-y-4">
            <div class="bg-gray-50 dark:bg-slate-800 p-3 rounded-md">
              <h4 class="text-sm font-medium text-gray-700 dark:text-gray-300 mb-3">Rendering Mode</h4>
              <div class="space-y-3">
                <!-- Use InstancedMesh Toggle -->
                <div class="flex items-center justify-between p-3 bg-white dark:bg-slate-700 rounded-lg">
                  <div class="flex-1 mr-3">
                    <div class="flex items-center gap-2 mb-1">
                      <svg class="w-4 h-4 text-gray-600 dark:text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M13 10V3L4 14h7v7l9-11h-7z" />
                      </svg>
                      <span class="text-sm font-semibold text-gray-700 dark:text-gray-300">Use InstancedMesh</span>
                    </div>
                    <p class="text-xs text-gray-500 dark:text-gray-400">
                      Optimizes rendering by using a single draw call for all nails instead of individual meshes. Toggle OFF to compare performance.
                    </p>
                  </div>
                  
                  <!-- Toggle Switch -->
                  <button
                    @click="toggleInstancedMesh"
                    :class="[
                      'relative inline-flex h-6 w-11 flex-shrink-0 cursor-pointer rounded-full border-2 border-transparent transition-colors duration-200 ease-in-out focus:outline-none focus:ring-2 focus:ring-indigo-600 focus:ring-offset-2',
                      useInstancedMesh ? 'bg-green-600' : 'bg-gray-300 dark:bg-gray-600'
                    ]"
                    role="switch"
                    :aria-checked="useInstancedMesh"
                  >
                    <span
                      :class="[
                        'pointer-events-none inline-block h-5 w-5 transform rounded-full bg-white shadow ring-0 transition duration-200 ease-in-out',
                        useInstancedMesh ? 'translate-x-5' : 'translate-x-0'
                      ]"
                    />
                  </button>
                </div>
                
                <!-- Info Text -->
                <div class="text-xs text-gray-600 dark:text-gray-400 bg-blue-50 dark:bg-blue-900/20 p-3 rounded-md">
                  <p class="font-medium text-blue-700 dark:text-blue-300 mb-1">💡 What is InstancedMesh?</p>
                  <ul class="space-y-1 text-blue-600 dark:text-blue-400">
                    <li>• <strong>ON:</strong> Single draw call for all nails → Better performance (recommended)</li>
                    <li>• <strong>OFF:</strong> Individual draw call per nail → Lower FPS with many nails</li>
                    <li>• Toggle to benchmark and compare FPS in the Performance Monitor below</li>
                  </ul>
                </div>
              </div>
            </div>
            
            <div class="bg-gray-50 dark:bg-slate-800 p-3 rounded-md">
              <h4 class="text-sm font-medium text-gray-700 dark:text-gray-300 mb-3">3D Scene Controls</h4>
              <div class="space-y-3">
                <!-- Reset Camera Button -->
                <button
                  @click="resetCamera"
                  class="w-full flex items-center justify-center gap-2 px-4 py-3 bg-gray-100 dark:bg-gray-600 hover:bg-gray-200 dark:hover:bg-gray-500 rounded-lg transition-colors text-gray-700 dark:text-gray-300"
                  title="Reset Camera"
                >
                  <svg class="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M4 4v5h.582m15.356 2A8.001 8.001 0 004.582 9m0 0H9m11 11v-5h-.581m0 0a8.003 8.003 0 01-15.357-2m15.357 2H15" />
                  </svg>
                  <span>Reset Camera</span>
                </button>
                
                <!-- Auto Rotate Button -->
                <button
                  @click="toggleAutoRotate"
                  class="w-full flex items-center justify-center gap-2 px-4 py-3 rounded-lg transition-colors"
                  :class="autoRotate ? 'bg-indigo-500 hover:bg-indigo-600 text-white' : 'bg-gray-100 dark:bg-gray-600 hover:bg-gray-200 dark:hover:bg-gray-500 text-gray-700 dark:text-gray-300'"
                  title="Toggle Auto Rotation"
                >
                  <svg class="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M4 4v5h.582m15.356 2A8.001 8.001 0 004.582 9m0 0H9m11 11v-5h-.581m0 0a8.003 8.003 0 01-15.357-2m15.357 2H15" />
                  </svg>
                  <span>{{ autoRotate ? 'Stop Auto Rotate' : 'Auto Rotate' }}</span>
                </button>
              </div>
            </div>

            <!-- Performance Monitor -->
            <div class="bg-gray-50 dark:bg-slate-800 p-3 rounded-md">
              <h4 class="text-sm font-medium text-gray-700 dark:text-gray-300 mb-3 flex items-center justify-between">
                <span>Performance Monitor</span>
                <span class="text-xs px-2 py-1 rounded" :class="useInstancedMesh ? 'bg-green-100 text-green-700 dark:bg-green-900/30 dark:text-green-300' : 'bg-orange-100 text-orange-700 dark:bg-orange-900/30 dark:text-orange-300'">
                  {{ useInstancedMesh ? 'Instanced' : 'Regular' }}
                </span>
              </h4>
              <div class="space-y-2">
                <!-- FPS Display -->
                <div class="flex items-center justify-between p-2 bg-white dark:bg-slate-700 rounded">
                  <span class="text-sm text-gray-600 dark:text-gray-400">FPS:</span>
                  <span class="text-lg font-bold" :class="fpsColor">{{ currentFPS }}</span>
                </div>
                
                <!-- Frame Time Display -->
                <div class="flex items-center justify-between p-2 bg-white dark:bg-slate-700 rounded">
                  <span class="text-sm text-gray-600 dark:text-gray-400">Frame Time:</span>
                  <span class="text-sm font-semibold text-gray-700 dark:text-gray-300">{{ currentFrameTime }}ms</span>
                </div>
                
                <!-- Render Time Display -->
                <div class="flex items-center justify-between p-2 bg-white dark:bg-slate-700 rounded">
                  <span class="text-sm text-gray-600 dark:text-gray-400">Render Time:</span>
                  <span class="text-sm font-semibold text-gray-700 dark:text-gray-300">{{ renderTime }}ms</span>
                </div>
                
                <!-- Draw Calls Display -->
                <div class="flex items-center justify-between p-2 bg-white dark:bg-slate-700 rounded">
                  <span class="text-sm text-gray-600 dark:text-gray-400">Draw Calls:</span>
                  <span class="text-sm font-semibold" :class="drawCalls > 100 ? 'text-orange-600 dark:text-orange-400' : 'text-gray-700 dark:text-gray-300'">
                    {{ drawCalls }}
                  </span>
                </div>
                
                <!-- Triangles Display -->
                <div class="flex items-center justify-between p-2 bg-white dark:bg-slate-700 rounded">
                  <span class="text-sm text-gray-600 dark:text-gray-400">Triangles:</span>
                  <span class="text-sm font-semibold text-gray-700 dark:text-gray-300">{{ triangles.toLocaleString() }}</span>
                </div>
                
                <!-- Geometries Display -->
                <div class="flex items-center justify-between p-2 bg-white dark:bg-slate-700 rounded">
                  <span class="text-sm text-gray-600 dark:text-gray-400">Geometries:</span>
                  <span class="text-sm font-semibold text-gray-700 dark:text-gray-300">{{ geometries }}</span>
                </div>
                
                <!-- Memory Usage (if available) -->
                <div v-if="memoryUsage" class="flex items-center justify-between p-2 bg-white dark:bg-slate-700 rounded">
                  <span class="text-sm text-gray-600 dark:text-gray-400">Memory:</span>
                  <span class="text-sm font-semibold text-gray-700 dark:text-gray-300">{{ memoryUsage }}</span>
                </div>
              </div>
              
              <!-- Benchmark Comparison -->
              <!-- <div v-if="benchmarkData.instanced && benchmarkData.regular" class="mt-3 p-3 bg-blue-50 dark:bg-blue-900/20 rounded-md">
                <h5 class="text-xs font-semibold text-blue-700 dark:text-blue-300 mb-2">📊 Comparison</h5>
                <div class="space-y-1 text-xs">
                  <div class="flex justify-between">
                    <span class="text-blue-600 dark:text-blue-400">FPS Improvement:</span>
                    <span class="font-semibold" :class="benchmarkData.instanced.fps > benchmarkData.regular.fps ? 'text-green-600 dark:text-green-400' : 'text-red-600 dark:text-red-400'">
                      {{ (((benchmarkData.instanced.fps - benchmarkData.regular.fps) / benchmarkData.regular.fps) * 100).toFixed(1) }}%
                    </span>
                  </div>
                  <div class="flex justify-between">
                    <span class="text-blue-600 dark:text-blue-400">Draw Calls Reduced:</span>
                    <span class="font-semibold text-green-600 dark:text-green-400">
                      {{ benchmarkData.regular.drawCalls - benchmarkData.instanced.drawCalls }}
                    </span>
                  </div>
                  <div class="flex justify-between">
                    <span class="text-blue-600 dark:text-blue-400">Instanced FPS:</span>
                    <span class="font-semibold">{{ benchmarkData.instanced.fps }}</span>
                  </div>
                  <div class="flex justify-between">
                    <span class="text-blue-600 dark:text-blue-400">Regular FPS:</span>
                    <span class="font-semibold">{{ benchmarkData.regular.fps }}</span>
                  </div>
                </div>
              </div> -->
              
              <!-- Export Buttons -->
              <!-- <div class="mt-3 flex gap-2">
                <button
                  @click="exportBenchmarkCSV"
                  :disabled="performanceHistory.length === 0"
                  class="flex-1 text-xs px-2 py-1.5 bg-indigo-600 text-white rounded hover:bg-indigo-700 disabled:bg-gray-400 disabled:cursor-not-allowed transition-colors"
                  title="Export benchmark data as CSV for Excel/analysis"
                >
                  📥 CSV
                </button>
                <button
                  @click="exportBenchmarkData"
                  :disabled="performanceHistory.length === 0"
                  class="flex-1 text-xs px-2 py-1.5 bg-purple-600 text-white rounded hover:bg-purple-700 disabled:bg-gray-400 disabled:cursor-not-allowed transition-colors"
                  title="Export benchmark data as JSON"
                >
                  📥 JSON
                </button>
                <button
                  @click="resetBenchmarkData"
                  :disabled="performanceHistory.length === 0"
                  class="flex-1 text-xs px-2 py-1.5 bg-red-600 text-white rounded hover:bg-red-700 disabled:bg-gray-400 disabled:cursor-not-allowed transition-colors"
                  title="Reset benchmark data"
                >
                  🗑️ Reset
                </button>
              </div> -->
              
              <!-- Hint Text -->
              <!-- <div class="mt-3 text-xs text-gray-600 dark:text-gray-400 bg-yellow-50 dark:bg-yellow-900/20 p-2 rounded">
                <p class="font-medium text-yellow-700 dark:text-yellow-300 mb-1">💡 How to benchmark:</p>
                <ol class="space-y-0.5 text-yellow-600 dark:text-yellow-400 list-decimal list-inside">
                  <li>Load a complex template (e.g., Stress Test)</li>
                  <li>Wait 5-10 seconds with <strong>InstancedMesh ON</strong></li>
                  <li>Toggle to <strong>OFF</strong> and wait 5-10 seconds</li>
                  <li>Check comparison above and export data</li>
                </ol>
              </div> -->
            </div>

            <!-- 3D Scene Info -->
            <div class="bg-gray-50 dark:bg-slate-800 p-3 rounded-md">
              <h4 class="text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">3D Scene Info</h4>
              <div class="text-sm text-gray-600 dark:text-gray-400 space-y-1">
                <p>Use mouse/trackpad to rotate, zoom, and pan the 3D view</p>
                <p>The 3D preview updates automatically when you modify the 2D grid</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </VueDraggableResizable>

    <!-- Template Selection Modal -->
    <div 
      v-if="showTemplateModal" 
      class="fixed inset-0 bg-black/60 backdrop-blur-sm z-[60] flex items-center justify-center p-4"
      @click.self="showTemplateModal = false"
    >
      <div class="bg-white dark:bg-slate-800 rounded-xl max-w-3xl w-full max-h-[85vh] overflow-hidden shadow-2xl">
        <!-- Modal Header -->
        <div class="px-4 py-3 border-b border-gray-200 dark:border-gray-700 flex items-center justify-between">
          <h3 class="text-lg font-semibold text-gray-900 dark:text-white">Select Project Template</h3>
          <button
            @click="showTemplateModal = false"
            class="p-1.5 text-gray-500 dark:text-gray-400 hover:text-gray-700 dark:hover:text-gray-300 transition-colors rounded-lg hover:bg-gray-100 dark:hover:bg-gray-700"
          >
            <svg class="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M6 18L18 6M6 6l12 12" />
            </svg>
          </button>
        </div>

        <!-- Modal Content -->
        <div class="p-4 overflow-y-auto max-h-[calc(85vh-60px)]">
          <div class="grid grid-cols-1 md:grid-cols-2 gap-3">
            <div
              v-for="template in projectTemplates"
              :key="template.id"
              @click="loadTemplate(template)"
              class="p-3 border-2 border-gray-200 dark:border-gray-600 rounded-lg hover:border-indigo-500 dark:hover:border-indigo-400 transition-all cursor-pointer hover:shadow-md bg-white dark:bg-slate-700 group"
            >
              <div class="flex items-start gap-3">
                <!-- Template Icon -->
                <div class="w-10 h-10 bg-gradient-to-br from-purple-500 to-indigo-600 rounded-lg flex items-center justify-center flex-shrink-0 group-hover:scale-110 transition-transform">
                  <svg class="w-5 h-5 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M4 5a1 1 0 011-1h14a1 1 0 011 1v2a1 1 0 01-1 1H5a1 1 0 01-1-1V5zM4 13a1 1 0 011-1h6a1 1 0 011 1v6a1 1 0 01-1 1H5a1 1 0 01-1-1v-6zM16 13a1 1 0 011-1h2a1 1 0 011 1v6a1 1 0 01-1 1h-2a1 1 0 01-1-1v-6z" />
                  </svg>
                </div>

                <!-- Template Info -->
                <div class="flex-1 min-w-0">
                  <h4 class="text-sm font-semibold text-gray-900 dark:text-white mb-1 truncate">{{ template.name }}</h4>
                  <p class="text-xs text-gray-600 dark:text-gray-400 mb-2 line-clamp-2">{{ template.description }}</p>
                  <div class="flex flex-wrap gap-1.5 text-xs">
                    <span class="px-2 py-0.5 bg-indigo-100 dark:bg-indigo-900/30 text-indigo-700 dark:text-indigo-300 rounded-full whitespace-nowrap">
                      {{ template.boardConfig.dotsCountHorizontal }}×{{ template.boardConfig.dotsCountVertical }}
                    </span>
                    <span class="px-2 py-0.5 bg-purple-100 dark:bg-purple-900/30 text-purple-700 dark:text-purple-300 rounded-full whitespace-nowrap">
                      {{ Object.keys(template.nails).length }} Nails
                    </span>
                  </div>
                </div>

                <!-- Load Icon -->
                <div class="flex-shrink-0 self-center">
                  <svg class="w-5 h-5 text-gray-400 dark:text-gray-500 group-hover:text-indigo-500 transition-colors" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 5l7 7-7 7" />
                  </svg>
                </div>
              </div>
            </div>
          </div>

          <!-- Empty state if no templates -->
          <div v-if="projectTemplates.length === 0" class="text-center py-8">
            <svg class="w-12 h-12 mx-auto mb-3 text-gray-400 dark:text-gray-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
            </svg>
            <p class="text-sm text-gray-600 dark:text-gray-400">No templates available</p>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref, reactive, onMounted, onUnmounted, computed, watch, nextTick } from 'vue'
import VueDraggableResizable from 'vue-draggable-resizable'
import 'vue-draggable-resizable/style.css'
import { use2DGridCanvas } from '@/composables/use2DGridCanvas'
import Toast from '@/components/Toast.vue'
import { useToast } from '@/composables/useToast'
import ThemeToggle from '@/components/ThemeToggle.vue'
import { getAllTemplates } from '@/constants/projectTemplates'
import {
  BOARD_DEFAULTS,
  BOARD_CONSTRAINTS,
  NAIL_DEFAULTS,
  NAIL_BODY_OPTIONS,
  NAIL_HEAD_OPTIONS,
  BOARD_COLOR_OPTIONS,
  PANEL_DEFAULTS
} from '@/constants/boardDefaults'

// Props
const props = defineProps({
  title: {
    type: String,
    default: 'MDF Board Simulation with Margin'
  },
  mode: {
    type: String,
    default: 'new', // 'new' or 'edit'
    validator: (value) => ['new', 'edit'].includes(value)
  },
  projectId: {
    type: [String, Number],
    default: null
  },
  projectInfo: {
    type: Object,
    default: null
  },
  isLoading: {
    type: Boolean,
    default: false
  },
  loadingMessage: {
    type: String,
    default: 'Loading project...'
  },
  isSaving: {
    type: Boolean,
    default: false
  }
})

// Emits
const emit = defineEmits(['save-project', 'reset-3d-camera', 'toggle-3d-auto-rotate', 'toggle-instanced-mesh'])

// Toast composable
const { success, error, warning } = useToast()

// Dark mode and mobile detection
const showMobileAlert = ref(false)

// Pan mode state
const isPanModeActive = ref(false)
const isSpaceKeyPressed = ref(false)

// Panel state for draggable/resizable functionality
const isMinimized = ref(false)
const panelPosition = reactive({
  x: PANEL_DEFAULTS.POSITION_X,
  y: PANEL_DEFAULTS.POSITION_Y
})
const panelSize = reactive({
  width: PANEL_DEFAULTS.WIDTH,
  height: PANEL_DEFAULTS.HEIGHT
})

// Panel event handlers
const onPanelResize = (x, y, width, height) => {
  panelSize.width = width
  panelSize.height = height
}

const onPanelDrag = (x, y) => {
  panelPosition.x = x
  panelPosition.y = y
}

const toggleMinimize = () => {
  isMinimized.value = !isMinimized.value
  if (isMinimized.value) {
    // Store current size and minimize
    panelSize.height = PANEL_DEFAULTS.MINIMIZED_HEIGHT
  } else {
    // Restore to a reasonable size
    panelSize.height = PANEL_DEFAULTS.HEIGHT
  }
}

// Check for mobile device
const checkMobile = () => {
  const userAgent = navigator.userAgent || navigator.vendor || window.opera
  return /android|iphone|ipad|ipod|blackberry|iemobile|opera mini/i.test(userAgent.toLowerCase())
}

const testo = () => {
  console.log('Testo function called...', nails.value)
}

// Add zoom functionality
const handleWheel = (event) => {
  // Check if we're over UI elements (control panel, etc.)
  const isUIElement = event.target.closest('.fixed, button, input, select, textarea, [role="button"], .control-panel, .floating-panel')
  
  // Check if we're in 3D preview area (ignore events from 3D scene)
  // Don't check for just 'canvas' - be specific about 3D canvas by checking for threejs/threed-preview context
  const is3DPreviewArea = event.target.closest('[class*="threejs"]') || event.target.closest('.threed-preview')
  
  // Only handle zoom if Ctrl/Cmd is held
  if (event.ctrlKey || event.metaKey) {
    // Prevent browser zoom when Ctrl/Cmd is held
    event.preventDefault()
    
    // Allow zooming anywhere in 2D section (not over UI elements or 3D area)
    if (!isUIElement && !is3DPreviewArea) {
      const delta = event.deltaY
      const zoomFactor = 0.15
      
      if (delta < 0) {
        // Zoom in
        scale.value = Math.min(scale.value + zoomFactor, 100) // Max 10000% zoom
      } else {
        // Zoom out
        scale.value = Math.max(scale.value - zoomFactor, 0.1)
      }
      
      updateTransform()
    }
  }
}

// Pan functionality with grab cursor
let isPanning = false
let lastPanX = 0
let lastPanY = 0

const handleMouseDown = (event) => {
  // Check if we're clicking on UI elements that should not trigger panning
  const isUIElement = event.target.closest('.fixed, button, input, select, textarea, [role="button"], .control-panel, .floating-panel')
  
  // Check if we're clicking on the grid canvas (2D board)
  const isGridCanvas = event.target.classList.contains('grid-canvas')
  
  // Check if we're in 3D preview area (different from 2D grid canvas)
  const is3DPreviewArea = event.target.closest('[class*="threejs"]') || event.target.closest('.threed-preview')
  
  // Don't handle panning if clicking on UI elements or 3D preview area
  if (isUIElement || is3DPreviewArea) {
    return
  }
  
  // Pan conditions:
  // 1) Middle mouse button - pan anywhere
  // 2) Left click on background (not on canvas)
  // 3) Alt/Ctrl + left click - pan anywhere
  // 4) Space key held + left click - pan anywhere (NEW)
  // 5) Pan mode active + left click - pan anywhere (NEW)
  const shouldPan = event.button === 1 || // Middle mouse button
                    (event.button === 0 && !isGridCanvas) || // Left click on background
                    (event.button === 0 && (event.altKey || event.ctrlKey)) || // Alt/Ctrl + left click
                    (event.button === 0 && isSpaceKeyPressed.value) || // Space + left click
                    (event.button === 0 && isPanModeActive.value) // Pan mode active + left click
  
  if (shouldPan) {
    event.preventDefault()
    isPanning = true
    lastPanX = event.clientX
    lastPanY = event.clientY
    
    // Set grabbing cursor on the entire document
    document.body.style.cursor = 'grabbing'
    
    // Prevent text selection during panning
    document.body.style.userSelect = 'none'
  }
}

const handleMouseMove = (event) => {
  // Check if we're in 3D preview area (ignore events from 3D scene)
  const is3DPreviewArea = event.target.closest('[class*="threejs"]') || event.target.closest('.threed-preview')
  
  // Check if we're over UI elements (control panel, etc.)
  const isUIElement = event.target.closest('.fixed, button, input, select, textarea, [role="button"], .control-panel, .floating-panel')
  
  // Check if we're over the grid canvas
  const isGridCanvas = event.target.classList.contains('grid-canvas')
  
  if (isPanning) {
    event.preventDefault()
    const deltaX = event.clientX - lastPanX
    const deltaY = event.clientY - lastPanY
    
    xOffset.value += deltaX
    yOffset.value += deltaY
    
    lastPanX = event.clientX
    lastPanY = event.clientY
    
    updateTransform()
  } else if (!is3DPreviewArea) {
    // Handle cursor changes if not in 3D area
    if (isUIElement) {
      // Over UI elements - let them handle their own cursor
      return
    } else if (isGridCanvas && !isSpaceKeyPressed.value && !isPanModeActive.value) {
      // Over grid canvas - the canvas handles its own cursor (pointer for nails, default otherwise)
      // Don't override it here UNLESS space is pressed or pan mode is active
      return
    } else if (event.altKey || event.ctrlKey || isSpaceKeyPressed.value || isPanModeActive.value) {
      // Over background with modifier keys, space key, or pan mode active - show grab cursor
      document.body.style.cursor = 'grab'
    } else {
      // Over background without modifiers - show grab cursor (since click+drag will pan)
      document.body.style.cursor = 'grab'
    }
  }
}

const handleMouseUp = (event) => {
  if (isPanning) {
    isPanning = false
    
    // Reset cursors
    document.body.style.cursor = 'default'
    document.body.style.userSelect = 'auto'
  }
}

// Add keyboard event handlers for better UX
const handleKeyDown = (event) => {
  // Detect space key press (key code 32 or event.code === 'Space')
  if (event.code === 'Space' && !isSpaceKeyPressed.value) {
    // Prevent space from scrolling the page
    event.preventDefault()
    isSpaceKeyPressed.value = true
    
    // Update cursor to show grab is available
    const isOverUIElement = document.elementFromPoint(event.clientX || 0, event.clientY || 0)?.closest('.fixed, button, input, select, textarea, [role="button"], .control-panel, .floating-panel')
    
    if (!isOverUIElement && !isPanning) {
      document.body.style.cursor = 'grab'
    }
    return
  }
  
  // Update cursor when modifier keys are pressed (only if not over UI elements)
  if (event.altKey || event.ctrlKey) {
    const isOverUIElement = document.elementFromPoint(event.clientX || 0, event.clientY || 0)?.closest('.fixed, button, input, select, textarea, [role="button"], .control-panel, .floating-panel')
    
    if (!isOverUIElement && !isPanning) {
      document.body.style.cursor = 'grab'
    }
  }
}

const handleKeyUp = (event) => {
  // Detect space key release
  if (event.code === 'Space') {
    isSpaceKeyPressed.value = false
    
    // Reset cursor if not panning
    if (!isPanning && !isPanModeActive.value) {
      document.body.style.cursor = 'default'
    }
    return
  }
  
  // Update cursor when modifier keys are released
  if (!event.altKey && !event.ctrlKey && !isPanning && !isSpaceKeyPressed.value && !isPanModeActive.value) {
    const isOverUIElement = document.elementFromPoint(event.clientX || 0, event.clientY || 0)?.closest('.fixed, button, input, select, textarea, [role="button"], .control-panel, .floating-panel')
    const isOverNailDot = document.elementFromPoint(event.clientX || 0, event.clientY || 0)?.closest('.nail-slot')
    
    if (isOverUIElement) {
      // Over UI - let it handle cursor
      return
    } else if (isOverNailDot) {
      document.body.style.cursor = 'pointer'
    } else {
      document.body.style.cursor = 'default'
    }
  }
}

// Toggle pan mode
const togglePanMode = () => {
  isPanModeActive.value = !isPanModeActive.value
}

// Board settings
const boardSettings = reactive({
  dotsCountHorizontal: BOARD_DEFAULTS.DOTS_COUNT_HORIZONTAL,
  dotsCountVertical: BOARD_DEFAULTS.DOTS_COUNT_VERTICAL,
  marginBetweenNails: BOARD_DEFAULTS.MARGIN_BETWEEN_NAILS,
  paddingBoard: BOARD_DEFAULTS.PADDING_BOARD,
  boardColor: BOARD_DEFAULTS.BOARD_COLOR
})

// Nail options
const nailHeightOptions = NAIL_DEFAULTS.HEIGHT_OPTIONS
const selectedNailHeight = ref(NAIL_DEFAULTS.DEFAULT_HEIGHT)

const nailBodyOptions = NAIL_BODY_OPTIONS

const selectedNailWidth = ref('thick')

const nailHeadOptions = NAIL_HEAD_OPTIONS

const selectedNailHead = ref('medium')

// Board color options
const boardColorOptions = BOARD_COLOR_OPTIONS

const selectedBoardColor = ref(BOARD_DEFAULTS.BOARD_COLOR)
const customBoardColor = ref(BOARD_DEFAULTS.BOARD_COLOR)

// Tab management
const activeTab = ref('board')
const tabs = [
  { id: 'project', label: 'Project' },
  { id: 'board', label: 'Board' },
  { id: 'nails', label: 'Nails' },
  { id: '3d-preview', label: '3D Preview' }
]

// Project settings
const projectName = ref('')

// Template management
const showTemplateModal = ref(false)
const projectTemplates = getAllTemplates()

// Load template function
const loadTemplate = (template) => {
  // Apply board configuration
  boardSettings.dotsCountHorizontal = template.boardConfig.dotsCountHorizontal
  boardSettings.dotsCountVertical = template.boardConfig.dotsCountVertical
  boardSettings.marginBetweenNails = template.boardConfig.marginBetweenNails
  boardSettings.paddingBoard = template.boardConfig.paddingBoard
  boardSettings.boardColor = template.boardConfig.boardColor
  
  // Apply nails configuration
  // Clear existing nails first
  Object.keys(nails.value).forEach(key => {
    delete nails.value[key]
  })
  
  // Add template nails
  Object.entries(template.nails).forEach(([key, nail]) => {
    nails.value[key] = { ...nail }
  })
  
  // Close modal
  showTemplateModal.value = false
  
  // Show success message
  success(`Template "${template.name}" loaded successfully!`)
  
  // Reset view to see the full board
  nextTick(() => {
    resetView()
  })
}

// 3D Preview controls
const autoRotate = ref(false)
const useInstancedMesh = ref(true)

// Performance monitoring
const currentFPS = ref(0)
const currentFrameTime = ref(0)
const memoryUsage = ref(null)
const drawCalls = ref(0)
const triangles = ref(0)
const geometries = ref(0)
const renderTime = ref('0.00')

// Performance history for comparison
const performanceHistory = ref([])
const benchmarkData = ref({
  instanced: null,
  regular: null
})

// FPS color based on performance
const fpsColor = computed(() => {
  if (currentFPS.value >= 55) return 'text-green-600 dark:text-green-400'
  if (currentFPS.value >= 30) return 'text-yellow-600 dark:text-yellow-400'
  return 'text-red-600 dark:text-red-400'
})

// 3D Preview control functions
const resetCamera = () => {
  // Emit event to parent component to handle 3D camera reset
  emit('reset-3d-camera')
}

const toggleAutoRotate = () => {
  autoRotate.value = !autoRotate.value
  // Emit event to parent component to handle 3D auto rotate
  emit('toggle-3d-auto-rotate', autoRotate.value)
}

const toggleInstancedMesh = () => {
  useInstancedMesh.value = !useInstancedMesh.value
  // Emit event to parent component to toggle instanced mesh
  emit('toggle-instanced-mesh', useInstancedMesh.value)
}

// Update performance metrics (will be called from parent)
const updatePerformanceMetrics = (fps, frameTime, memory = null, additionalMetrics = {}) => {
  currentFPS.value = Math.round(fps)
  currentFrameTime.value = frameTime.toFixed(2)
  if (memory) {
    memoryUsage.value = memory
  }
  
  // Update additional metrics
  if (additionalMetrics.drawCalls !== undefined) drawCalls.value = additionalMetrics.drawCalls
  if (additionalMetrics.triangles !== undefined) triangles.value = additionalMetrics.triangles
  if (additionalMetrics.geometries !== undefined) geometries.value = additionalMetrics.geometries
  if (additionalMetrics.renderTime !== undefined) renderTime.value = additionalMetrics.renderTime
  
  // Track performance data for comparison
  const dataPoint = {
    timestamp: Date.now(),
    mode: useInstancedMesh.value ? 'instanced' : 'regular',
    fps,
    frameTime,
    memory,
    drawCalls: additionalMetrics.drawCalls || 0,
    triangles: additionalMetrics.triangles || 0,
    geometries: additionalMetrics.geometries || 0,
    renderTime: additionalMetrics.renderTime || 0,
    nailCount: Object.keys(nails.value).length
  }
  
  performanceHistory.value.push(dataPoint)
  
  // Keep only last 100 data points
  if (performanceHistory.value.length > 100) {
    performanceHistory.value.shift()
  }
  
  // Update benchmark comparison data
  if (useInstancedMesh.value) {
    benchmarkData.value.instanced = { ...dataPoint }
  } else {
    benchmarkData.value.regular = { ...dataPoint }
  }
}

// Export benchmark data
const exportBenchmarkData = () => {
  const data = {
    timestamp: new Date().toISOString(),
    projectName: projectName.value,
    nailCount: Object.keys(nails.value).length,
    gridSize: `${boardSettings.dotsCountHorizontal}×${boardSettings.dotsCountVertical}`,
    comparison: benchmarkData.value,
    history: performanceHistory.value
  }
  
  const blob = new Blob([JSON.stringify(data, null, 2)], { type: 'application/json' })
  const url = URL.createObjectURL(blob)
  const link = document.createElement('a')
  link.href = url
  link.download = `benchmark-${projectName.value || 'project'}-${Date.now()}.json`
  link.click()
  URL.revokeObjectURL(url)
  
  success('Benchmark data exported successfully!')
}

// Export to CSV
const exportBenchmarkCSV = () => {
  const headers = ['Timestamp', 'Mode', 'FPS', 'Frame Time (ms)', 'Memory (MB)', 'Draw Calls', 'Triangles', 'Geometries', 'Render Time (ms)', 'Nail Count']
  const rows = performanceHistory.value.map(d => [
    new Date(d.timestamp).toISOString(),
    d.mode,
    d.fps,
    d.frameTime.toFixed(2),
    d.memory || 'N/A',
    d.drawCalls,
    d.triangles,
    d.geometries,
    d.renderTime,
    d.nailCount
  ])
  
  const csvContent = [headers.join(','), ...rows.map(r => r.join(','))].join('\n')
  const blob = new Blob([csvContent], { type: 'text/csv' })
  const url = URL.createObjectURL(blob)
  const link = document.createElement('a')
  link.href = url
  link.download = `benchmark-${projectName.value || 'project'}-${Date.now()}.csv`
  link.click()
  URL.revokeObjectURL(url)
  
  success('Benchmark CSV exported successfully!')
}

// Reset benchmark data
const resetBenchmarkData = () => {
  performanceHistory.value = []
  benchmarkData.value = { instanced: null, regular: null }
  success('Benchmark data reset!')
}

// Board color selection
const selectBoardColor = (colorOption) => {
  selectedBoardColor.value = colorOption.id
  if (colorOption.id !== 'custom') {
    boardSettings.boardColor = colorOption.color
  }
}

// Watch for custom color changes
watch(customBoardColor, (newColor) => {
  if (selectedBoardColor.value === 'custom') {
    boardSettings.boardColor = newColor
  }
})

// Use 2D Grid Canvas composable
const {
  scale,
  xOffset,
  yOffset,
  updateTransform,
  nails,
  zoomPercentage,
  generateGrid,
  clearAllNails,
  resetView,
  saveGrid,
  exportGrid,
  importGrid,
  initializeGrid,
  cleanup
} = use2DGridCanvas(boardSettings, selectedNailHeight, selectedNailWidth, nailBodyOptions, selectedNailHead, nailHeadOptions, isPanModeActive)

// File import handler
const handleFileImport = async (event) => {
  const file = event.target.files[0]
  if (!file) return

  try {
    await importGrid(file)
    success('Grid imported successfully')
  } catch (error) {
    console.error('Import error:', error)
    error('Failed to import grid: ' + error.message)
  }
  
  // Clear the input
  event.target.value = ''
}

// Helper function to get auth token
const getCookie = (name) => {
  const value = `; ${document.cookie}`
  const parts = value.split(`; ${name}=`)
  if (parts.length === 2) return parts.pop().split(';').shift()
  return null
}

// Helper function to format date
const formatDate = (dateString) => {
  if (!dateString) return 'N/A'
  return new Date(dateString).toLocaleString()
}

// Initialize component
onMounted(() => {
  // Check for mobile
  if (checkMobile()) {
    showMobileAlert.value = true
  }

  // Generate initial grid
  nextTick(() => {
    generateGrid()
  })

  // Add global event listeners for viewport interaction
  window.addEventListener('wheel', handleWheel, { passive: false })
  window.addEventListener('mousedown', handleMouseDown)
  window.addEventListener('mousemove', handleMouseMove)
  window.addEventListener('mouseup', handleMouseUp)
  window.addEventListener('keydown', handleKeyDown)
  window.addEventListener('keyup', handleKeyUp)
})

// Cleanup event listeners
onUnmounted(() => {
  window.removeEventListener('wheel', handleWheel)
  window.removeEventListener('mousedown', handleMouseDown)
  window.removeEventListener('mousemove', handleMouseMove)
  window.removeEventListener('mouseup', handleMouseUp)
  window.removeEventListener('keydown', handleKeyDown)
  window.removeEventListener('keyup', handleKeyUp)

  // Reset cursor and user-select styles
  document.body.style.cursor = ''
  document.body.style.userSelect = ''

  // Cleanup canvas
  cleanup()
})

// Expose methods for parent components
defineExpose({
  nails,
  boardSettings,
  projectName,
  generateGrid,
  initializeGrid,
  updatePerformanceMetrics
})
</script>

<style scoped>
/* Custom styles for vue-draggable-resizable */
:deep(.vdr) {
  border: none !important;
}

:deep(.vdr-handle) {
  background: rgba(99, 102, 241, 0.3) !important;
  border: 1px solid rgba(99, 102, 241, 0.5) !important;
}

:deep(.vdr-handle-tl),
:deep(.vdr-handle-tr),
:deep(.vdr-handle-bl),
:deep(.vdr-handle-br) {
  width: 8px !important;
  height: 8px !important;
  border-radius: 50% !important;
}

:deep(.vdr-handle-ml),
:deep(.vdr-handle-mr) {
  width: 4px !important;
  border-radius: 2px !important;
}

:deep(.vdr-handle-tm),
:deep(.vdr-handle-bm) {
  height: 4px !important;
  border-radius: 2px !important;
}

/* Custom scrollbar for the panel content */
.control-panel ::-webkit-scrollbar {
  width: 6px;
}

.control-panel ::-webkit-scrollbar-track {
  background: rgba(0, 0, 0, 0.1);
  border-radius: 3px;
}

.control-panel ::-webkit-scrollbar-thumb {
  background: rgba(99, 102, 241, 0.5);
  border-radius: 3px;
}

.control-panel ::-webkit-scrollbar-thumb:hover {
  background: rgba(99, 102, 241, 0.7);
}

/* Minimize transition */
.control-panel {
  transition: all 0.3s ease;
}

/* Draggable panel styles */
:deep(.draggable-panel) {
  z-index: 9999 !important;
  position: fixed !important;
}

:deep(.draggable-panel.draggable) {
  z-index: 10000 !important;
}

/* Drag handle styles */
.panel-drag-handle {
  cursor: move;
  user-select: none;
}

.panel-drag-handle:hover {
  background-color: rgba(0, 0, 0, 0.05);
}

.dark .panel-drag-handle:hover {
  background-color: rgba(255, 255, 255, 0.05);
}
</style>
