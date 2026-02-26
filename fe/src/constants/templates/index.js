/**
 * Project Templates Index
 * 
 * Centralized export for all project templates
 */

import basicSquare from './basicSquare.js'
import circle from './circle.js'
import diamond from './diamond.js'
import star from './star.js'
import heart from './heart.js'
import gridPattern from './gridPattern.js'
import wavePattern from './wavePattern.js'
import gradientWaveDKV from './gradientWaveDKV.js'
import denseMandala from './denseMandala.js'
import stressTestGrid from './stressTestGrid.js'

/**
 * Array of all available project templates
 */
export const PROJECT_TEMPLATES = [
  basicSquare,
  circle,
  diamond,
  star,
  heart,
  gridPattern,
  wavePattern,
  gradientWaveDKV,
  // ⚠️ Performance benchmark templates (for thesis testing)
  denseMandala,
  stressTestGrid,
]

/**
 * Get a template by ID
 * @param {string} id - The template ID
 * @returns {Object|undefined} The template object or undefined if not found
 */
export function getTemplateById(id) {
  return PROJECT_TEMPLATES.find(template => template.id === id)
}

/**
 * Get all available templates
 * @returns {Array} Array of all template objects
 */
export function getAllTemplates() {
  return PROJECT_TEMPLATES
}

/**
 * Get templates by category (for future expansion)
 * @param {string} category - The category name
 * @returns {Array} Array of templates in the category
 */
export function getTemplatesByCategory(category) {
  return PROJECT_TEMPLATES.filter(template => template.category === category)
}
