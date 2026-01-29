/**
 * Board Configuration Default Values
 * These constants define the default settings for the 2D board/grid
 * 
 * Usage:
 * Import the constants you need in your component:
 * import { BOARD_DEFAULTS, BOARD_CONSTRAINTS, NAIL_DEFAULTS } from '@/constants/boardDefaults'
 * 
 * Example:
 * const boardSettings = reactive({
 *   dotsCountHorizontal: BOARD_DEFAULTS.DOTS_COUNT_HORIZONTAL,
 *   dotsCountVertical: BOARD_DEFAULTS.DOTS_COUNT_VERTICAL,
 *   marginBetweenNails: BOARD_DEFAULTS.MARGIN_BETWEEN_NAILS,
 *   paddingBoard: BOARD_DEFAULTS.PADDING_BOARD,
 *   boardColor: BOARD_DEFAULTS.BOARD_COLOR
 * })
 */

// Board Grid Configuration
export const BOARD_DEFAULTS = {
  DOTS_COUNT_HORIZONTAL: 20,
  DOTS_COUNT_VERTICAL: 20,
  MARGIN_BETWEEN_NAILS: 3, // Logical value (displays as 30px with DISPLAY_SCALE)
  PADDING_BOARD: 40,
  BOARD_COLOR: '#8B4513'
}

// Board Grid Constraints
export const BOARD_CONSTRAINTS = {
  DOTS_COUNT_MIN: 5,
  DOTS_COUNT_MAX: 50,
  MARGIN_MIN: 1,
  MARGIN_MAX: 100,
  MARGIN_STEP: 1,
  PADDING_MIN: 10,
  PADDING_MAX: 100
}

// Display Configuration
export const DISPLAY_CONSTANTS = {
  DISPLAY_SCALE: 10, // Multiplier to make margin=3 display as 30px
  DOT_SIZE_RATIO: 0.7, // Dot size as 70% of margin (leaves 30% spacing)
  MIN_DOT_SIZE: 0.7, // Minimum dot size in logical pixels
  MAX_DOT_SIZE: 20 // Maximum dot size in pixels
}

// Nail Configuration
export const NAIL_DEFAULTS = {
  DEFAULT_HEIGHT: 8,
  HEIGHT_OPTIONS: [
     2,  4,  6,  8, 10, 12, 14, 16, 18, 20,
    22, 24, 26, 28, 30, 32, 34, 36, 38, 40,
  ]
}

// Nail Body Width Options
export const NAIL_BODY_OPTIONS = [
  { id: 'thin', label: 'Thin Body', size: 'S', color: '#ef4444' },
  { id: 'medium', label: 'Medium Body', size: 'M', color: '#3b82f6' },
  { id: 'thick', label: 'Thick Body', size: 'L', color: '#10b981' }
]

// Nail Head Width Options
export const NAIL_HEAD_OPTIONS = [
  { id: 'small', label: 'Small Head', size: 'S', color: '#8b5cf6', borderPercentage: 30 },
  { id: 'medium', label: 'Medium Head', size: 'M', color: '#eab308', borderPercentage: 60 },
  { id: 'large', label: 'Large Head', size: 'L', color: '#00ffff', borderPercentage: 100 }
]

// Board Color Options
export const BOARD_COLOR_OPTIONS = [
  { id: '#8B4513', label: 'Brown', color: '#8B4513' },
  { id: '#D2691E', label: 'Chocolate', color: '#D2691E' },
  { id: '#CD853F', label: 'Peru', color: '#CD853F' },
  { id: '#DEB887', label: 'Burlywood', color: '#DEB887' },
  { id: '#F5DEB3', label: 'Wheat', color: '#F5DEB3' },
  { id: 'custom', label: 'Custom', color: '#8B4513' }
]

// Zoom Configuration
export const ZOOM_CONFIG = {
  DEFAULT_SCALE: 1,
  MIN_SCALE: 0.1,
  MAX_SCALE: 7, // 700% zoom
  ZOOM_FACTOR: 0.15
}

// Panel Configuration
export const PANEL_DEFAULTS = {
  POSITION_X: 20,
  POSITION_Y: 100,
  WIDTH: 320,
  HEIGHT: 500,
  MIN_WIDTH: 280,
  MIN_HEIGHT: 200,
  MAX_WIDTH: 600,
  MAX_HEIGHT: 800,
  MINIMIZED_HEIGHT: 60
}
