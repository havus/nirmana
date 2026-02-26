/**
 * Dense Mandala Template - FOR THESIS PERFORMANCE TESTING
 * 
 * A 30×30 grid with ~800 nails arranged in a dense circular mandala pattern
 * 
 * This template provides a middle-ground performance benchmark between 
 * regular templates (~50-100 nails) and the extreme stress test (2,500 nails).
 * 
 * Performance Impact:
 * - With InstancedMesh: Should maintain 60 FPS on most hardware
 * - Without InstancedMesh: May drop to 35-50 FPS depending on hardware
 * 
 * This demonstrates:
 * - Realistic complex string art scenario
 * - Clear performance benefits of InstancedMesh
 * - Still practical for actual fabrication (though very dense)
 */

/**
 * Generate a dense mandala pattern with multiple concentric circles and radial lines
 */
function generateDenseMandala() {
  const nails = {}
  const gridSize = 30
  const centerX = (gridSize - 1) / 2
  const centerY = (gridSize - 1) / 2
  const maxRadius = gridSize / 2
  
  // Helper function to add a nail if within grid bounds
  const addNail = (x, y, height) => {
    if (x >= 0 && x < gridSize && y >= 0 && y < gridSize) {
      const key = `${Math.round(x)},${Math.round(y)}`
      if (!nails[key]) { // Avoid duplicates
        nails[key] = {
          height: Math.round(height),
          width: 2,
          headType: 'flat',
          bodyType: 'round'
        }
      }
    }
  }
  
  // 1. Concentric circles (10 circles, ~40 points each = ~400 nails)
  const numCircles = 10
  for (let circleIndex = 1; circleIndex <= numCircles; circleIndex++) {
    const radius = (maxRadius * circleIndex) / numCircles
    const pointsInCircle = Math.floor(40 + circleIndex * 4) // More points in outer circles
    
    for (let i = 0; i < pointsInCircle; i++) {
      const angle = (i / pointsInCircle) * 2 * Math.PI
      const x = centerX + radius * Math.cos(angle)
      const y = centerY + radius * Math.sin(angle)
      
      // Height increases toward outer rings
      const height = 15 + (circleIndex * 1.5)
      
      addNail(x, y, height)
    }
  }
  
  // 2. Radial lines (16 lines, ~15 points each = ~240 nails)
  const numRadialLines = 16
  for (let lineIndex = 0; lineIndex < numRadialLines; lineIndex++) {
    const angle = (lineIndex / numRadialLines) * 2 * Math.PI
    
    for (let dist = 0.5; dist <= maxRadius; dist += 0.5) {
      const x = centerX + dist * Math.cos(angle)
      const y = centerY + dist * Math.sin(angle)
      
      // Height varies along the radial line
      const height = 18 + Math.sin(dist / maxRadius * Math.PI) * 8
      
      addNail(x, y, height)
    }
  }
  
  // 3. Decorative spiral (adds ~160 more nails)
  const spiralRotations = 5
  const pointsPerRotation = 32
  for (let i = 0; i < spiralRotations * pointsPerRotation; i++) {
    const t = i / (spiralRotations * pointsPerRotation)
    const angle = t * spiralRotations * 2 * Math.PI
    const radius = t * maxRadius * 0.9
    
    const x = centerX + radius * Math.cos(angle)
    const y = centerY + radius * Math.sin(angle)
    
    // Height follows spiral
    const height = 20 + Math.sin(angle) * 5
    
    addNail(x, y, height)
  }
  
  return nails
}

export default {
  id: 'dense-mandala',
  name: '🔬 Dense Mandala Pattern',
  description: 'THESIS BENCHMARK - ~800 nails in intricate mandala. Good middle-ground for performance testing.',
  category: 'benchmark',
  boardConfig: {
    dotsCountHorizontal: 30,
    dotsCountVertical: 30,
    marginBetweenNails: 16,
    paddingBoard: 10,
    boardColor: '#34495E'
  },
  nails: generateDenseMandala(),
  metadata: {
    nailCount: '~800',
    purpose: 'performance-benchmark',
    recommendedFor: 'thesis-testing',
    fabricationViability: 'possible-but-dense',
    expectedPerformance: {
      withInstancedMesh: '60 FPS',
      withoutInstancedMesh: '35-50 FPS',
      performanceGain: '50-150%'
    }
  }
}
