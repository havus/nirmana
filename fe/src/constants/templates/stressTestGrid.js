/**
 * Stress Test Grid Template - FOR THESIS PERFORMANCE TESTING ONLY
 * 
 * A 50×50 full grid with 2,500 nails
 * 
 * ⚠️ WARNING: This template is designed for performance benchmarking purposes only.
 * It demonstrates the significant performance difference between InstancedMesh and 
 * regular Mesh rendering when dealing with large numbers of objects.
 * 
 * Performance Impact:
 * - With InstancedMesh: Should maintain 55-60 FPS on modern hardware
 * - Without InstancedMesh: May drop to 15-30 FPS depending on hardware
 * 
 * This template is NOT intended for actual string art fabrication due to 
 * the extreme nail density (2,500 nails).
 */

/**
 * Generate a full 50×50 grid of nails programmatically
 */
function generateFullGrid() {
  const nails = {}
  const gridSize = 50
  const nailHeight = 20 // Standard height in mm
  const nailWidth = 2   // Standard width in mm
  
  // Generate all positions in the 50×50 grid
  for (let x = 0; x < gridSize; x++) {
    for (let y = 0; y < gridSize; y++) {
      const key = `${x},${y}`
      
      // Add slight height variation for visual interest (10% variation)
      // This creates a subtle wave pattern across the grid
      const heightVariation = Math.sin(x / 5) * Math.cos(y / 5) * 2
      const adjustedHeight = nailHeight + heightVariation
      
      nails[key] = {
        height: Math.max(15, Math.min(25, adjustedHeight)), // Clamp between 15-25mm
        width: nailWidth,
        headType: 'flat',
        bodyType: 'round'
      }
    }
  }
  
  return nails
}

export default {
  id: 'stress-test-grid',
  name: '⚡ Stress Test Grid (50×50)',
  description: '⚠️ THESIS BENCHMARK ONLY - 2,500 nails for performance testing. Toggle InstancedMesh to see dramatic FPS difference.',
  category: 'benchmark',
  boardConfig: {
    dotsCountHorizontal: 50,
    dotsCountVertical: 50,
    marginBetweenNails: 15, // Reduced spacing for denser appearance
    paddingBoard: 10,
    boardColor: '#2C3E50' // Darker board to reduce visual clutter
  },
  nails: generateFullGrid(),
  metadata: {
    nailCount: 2500,
    purpose: 'performance-benchmark',
    recommendedFor: 'thesis-testing',
    warning: 'Not suitable for actual fabrication',
    expectedPerformance: {
      withInstancedMesh: '55-60 FPS',
      withoutInstancedMesh: '15-30 FPS',
      performanceGain: '200-400%'
    }
  }
}
