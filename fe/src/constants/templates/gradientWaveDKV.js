/**
 * Gradient Wave Template
 * A popular design for visual communication students (DKV)
 * Creates a dynamic gradient effect with flowing waves using strategic height combinations
 * Perfect for modern, artistic string art installations
 */

export default {
  id: 'gradient-wave-dkv',
  name: 'Gradient Wave (DKV Style)',
  description: 'A flowing gradient wave pattern popular in visual communication design - creates stunning depth and movement',
  boardConfig: {
    dotsCountHorizontal: 19,
    dotsCountVertical: 13,
    marginBetweenNails: 10,
    paddingBoard: 10,
    boardColor: '#8B4513'
  },
  nails: {
    // Row 0 - Base level (lowest points)
    '2,0': { height: 4, width: 2, headType: 'flat', bodyType: 'round' },
    '4,0': { height: 6, width: 2, headType: 'flat', bodyType: 'round' },
    '6,0': { height: 8, width: 2, headType: 'flat', bodyType: 'round' },
    '8,0': { height: 10, width: 2, headType: 'flat', bodyType: 'round' },
    '10,0': { height: 12, width: 2, headType: 'flat', bodyType: 'round' },
    '12,0': { height: 10, width: 2, headType: 'flat', bodyType: 'round' },
    '14,0': { height: 8, width: 2, headType: 'flat', bodyType: 'round' },
    '16,0': { height: 6, width: 2, headType: 'flat', bodyType: 'round' },
    '18,0': { height: 4, width: 2, headType: 'flat', bodyType: 'round' },
    
    // Row 1 - Rising gradient
    '1,1': { height: 6, width: 2, headType: 'flat', bodyType: 'round' },
    '3,1': { height: 10, width: 2, headType: 'flat', bodyType: 'round' },
    '5,1': { height: 14, width: 2, headType: 'flat', bodyType: 'round' },
    '7,1': { height: 18, width: 2, headType: 'flat', bodyType: 'round' },
    '9,1': { height: 22, width: 2, headType: 'flat', bodyType: 'round' },
    '11,1': { height: 22, width: 2, headType: 'flat', bodyType: 'round' },
    '13,1': { height: 18, width: 2, headType: 'flat', bodyType: 'round' },
    '15,1': { height: 14, width: 2, headType: 'flat', bodyType: 'round' },
    '17,1': { height: 10, width: 2, headType: 'flat', bodyType: 'round' },
    
    // Row 2 - First wave peak
    '0,2': { height: 8, width: 2, headType: 'flat', bodyType: 'round' },
    '2,2': { height: 14, width: 2, headType: 'flat', bodyType: 'round' },
    '4,2': { height: 20, width: 2, headType: 'flat', bodyType: 'round' },
    '6,2': { height: 26, width: 2, headType: 'flat', bodyType: 'round' },
    '8,2': { height: 30, width: 2, headType: 'flat', bodyType: 'round' },
    '10,2': { height: 32, width: 2, headType: 'flat', bodyType: 'round' },
    '12,2': { height: 30, width: 2, headType: 'flat', bodyType: 'round' },
    '14,2': { height: 26, width: 2, headType: 'flat', bodyType: 'round' },
    '16,2': { height: 20, width: 2, headType: 'flat', bodyType: 'round' },
    '18,2': { height: 14, width: 2, headType: 'flat', bodyType: 'round' },
    
    // Row 3 - Building up
    '1,3': { height: 12, width: 2, headType: 'flat', bodyType: 'round' },
    '3,3': { height: 18, width: 2, headType: 'flat', bodyType: 'round' },
    '5,3': { height: 24, width: 2, headType: 'flat', bodyType: 'round' },
    '7,3': { height: 30, width: 2, headType: 'flat', bodyType: 'round' },
    '9,3': { height: 34, width: 2, headType: 'flat', bodyType: 'round' },
    '11,3': { height: 34, width: 2, headType: 'flat', bodyType: 'round' },
    '13,3': { height: 30, width: 2, headType: 'flat', bodyType: 'round' },
    '15,3': { height: 24, width: 2, headType: 'flat', bodyType: 'round' },
    '17,3': { height: 18, width: 2, headType: 'flat', bodyType: 'round' },
    
    // Row 4 - Second wave peak
    '0,4': { height: 14, width: 2, headType: 'flat', bodyType: 'round' },
    '2,4': { height: 22, width: 2, headType: 'flat', bodyType: 'round' },
    '4,4': { height: 28, width: 2, headType: 'flat', bodyType: 'round' },
    '6,4': { height: 34, width: 2, headType: 'flat', bodyType: 'round' },
    '8,4': { height: 38, width: 2, headType: 'flat', bodyType: 'round' },
    '10,4': { height: 40, width: 2, headType: 'flat', bodyType: 'round' },
    '12,4': { height: 38, width: 2, headType: 'flat', bodyType: 'round' },
    '14,4': { height: 34, width: 2, headType: 'flat', bodyType: 'round' },
    '16,4': { height: 28, width: 2, headType: 'flat', bodyType: 'round' },
    '18,4': { height: 22, width: 2, headType: 'flat', bodyType: 'round' },
    
    // Row 5 - Ascending
    '1,5': { height: 16, width: 2, headType: 'flat', bodyType: 'round' },
    '3,5': { height: 24, width: 2, headType: 'flat', bodyType: 'round' },
    '5,5': { height: 30, width: 2, headType: 'flat', bodyType: 'round' },
    '7,5': { height: 36, width: 2, headType: 'flat', bodyType: 'round' },
    '9,5': { height: 40, width: 2, headType: 'flat', bodyType: 'round' },
    '11,5': { height: 40, width: 2, headType: 'flat', bodyType: 'round' },
    '13,5': { height: 36, width: 2, headType: 'flat', bodyType: 'round' },
    '15,5': { height: 30, width: 2, headType: 'flat', bodyType: 'round' },
    '17,5': { height: 24, width: 2, headType: 'flat', bodyType: 'round' },
    
    // Row 6-7 - Peak zone (tallest section)
    '0,6': { height: 18, width: 2, headType: 'flat', bodyType: 'round' },
    '2,6': { height: 26, width: 2, headType: 'flat', bodyType: 'round' },
    '4,6': { height: 32, width: 2, headType: 'flat', bodyType: 'round' },
    '6,6': { height: 38, width: 2, headType: 'flat', bodyType: 'round' },
    '8,6': { height: 40, width: 2, headType: 'flat', bodyType: 'round' },
    '10,6': { height: 40, width: 2, headType: 'flat', bodyType: 'round' },
    '12,6': { height: 40, width: 2, headType: 'flat', bodyType: 'round' },
    '14,6': { height: 38, width: 2, headType: 'flat', bodyType: 'round' },
    '16,6': { height: 32, width: 2, headType: 'flat', bodyType: 'round' },
    '18,6': { height: 26, width: 2, headType: 'flat', bodyType: 'round' },
    
    '1,7': { height: 20, width: 2, headType: 'flat', bodyType: 'round' },
    '3,7': { height: 28, width: 2, headType: 'flat', bodyType: 'round' },
    '5,7': { height: 34, width: 2, headType: 'flat', bodyType: 'round' },
    '7,7': { height: 38, width: 2, headType: 'flat', bodyType: 'round' },
    '9,7': { height: 40, width: 2, headType: 'flat', bodyType: 'round' },
    '11,7': { height: 40, width: 2, headType: 'flat', bodyType: 'round' },
    '13,7': { height: 38, width: 2, headType: 'flat', bodyType: 'round' },
    '15,7': { height: 34, width: 2, headType: 'flat', bodyType: 'round' },
    '17,7': { height: 28, width: 2, headType: 'flat', bodyType: 'round' },
    
    // Row 8 - Descending from peak
    '0,8': { height: 16, width: 2, headType: 'flat', bodyType: 'round' },
    '2,8': { height: 24, width: 2, headType: 'flat', bodyType: 'round' },
    '4,8': { height: 30, width: 2, headType: 'flat', bodyType: 'round' },
    '6,8': { height: 36, width: 2, headType: 'flat', bodyType: 'round' },
    '8,8': { height: 38, width: 2, headType: 'flat', bodyType: 'round' },
    '10,8': { height: 38, width: 2, headType: 'flat', bodyType: 'round' },
    '12,8': { height: 36, width: 2, headType: 'flat', bodyType: 'round' },
    '14,8': { height: 30, width: 2, headType: 'flat', bodyType: 'round' },
    '16,8': { height: 24, width: 2, headType: 'flat', bodyType: 'round' },
    '18,8': { height: 16, width: 2, headType: 'flat', bodyType: 'round' },
    
    // Row 9 - Continuing descent
    '1,9': { height: 14, width: 2, headType: 'flat', bodyType: 'round' },
    '3,9': { height: 20, width: 2, headType: 'flat', bodyType: 'round' },
    '5,9': { height: 26, width: 2, headType: 'flat', bodyType: 'round' },
    '7,9': { height: 32, width: 2, headType: 'flat', bodyType: 'round' },
    '9,9': { height: 34, width: 2, headType: 'flat', bodyType: 'round' },
    '11,9': { height: 32, width: 2, headType: 'flat', bodyType: 'round' },
    '13,9': { height: 26, width: 2, headType: 'flat', bodyType: 'round' },
    '15,9': { height: 20, width: 2, headType: 'flat', bodyType: 'round' },
    '17,9': { height: 14, width: 2, headType: 'flat', bodyType: 'round' },
    
    // Row 10 - Lower wave
    '0,10': { height: 12, width: 2, headType: 'flat', bodyType: 'round' },
    '2,10': { height: 18, width: 2, headType: 'flat', bodyType: 'round' },
    '4,10': { height: 24, width: 2, headType: 'flat', bodyType: 'round' },
    '6,10': { height: 28, width: 2, headType: 'flat', bodyType: 'round' },
    '8,10': { height: 30, width: 2, headType: 'flat', bodyType: 'round' },
    '10,10': { height: 30, width: 2, headType: 'flat', bodyType: 'round' },
    '12,10': { height: 28, width: 2, headType: 'flat', bodyType: 'round' },
    '14,10': { height: 24, width: 2, headType: 'flat', bodyType: 'round' },
    '16,10': { height: 18, width: 2, headType: 'flat', bodyType: 'round' },
    '18,10': { height: 12, width: 2, headType: 'flat', bodyType: 'round' },
    
    // Row 11 - Gentle wave
    '1,11': { height: 10, width: 2, headType: 'flat', bodyType: 'round' },
    '3,11': { height: 14, width: 2, headType: 'flat', bodyType: 'round' },
    '5,11': { height: 18, width: 2, headType: 'flat', bodyType: 'round' },
    '7,11': { height: 22, width: 2, headType: 'flat', bodyType: 'round' },
    '9,11': { height: 24, width: 2, headType: 'flat', bodyType: 'round' },
    '11,11': { height: 22, width: 2, headType: 'flat', bodyType: 'round' },
    '13,11': { height: 18, width: 2, headType: 'flat', bodyType: 'round' },
    '15,11': { height: 14, width: 2, headType: 'flat', bodyType: 'round' },
    '17,11': { height: 10, width: 2, headType: 'flat', bodyType: 'round' },
    
    // Row 12 - Soft descent
    '0,12': { height: 8, width: 2, headType: 'flat', bodyType: 'round' },
    '2,12': { height: 12, width: 2, headType: 'flat', bodyType: 'round' },
    '4,12': { height: 16, width: 2, headType: 'flat', bodyType: 'round' },
    '6,12': { height: 18, width: 2, headType: 'flat', bodyType: 'round' },
    '8,12': { height: 20, width: 2, headType: 'flat', bodyType: 'round' },
    '10,12': { height: 20, width: 2, headType: 'flat', bodyType: 'round' },
    '12,12': { height: 18, width: 2, headType: 'flat', bodyType: 'round' },
    '14,12': { height: 16, width: 2, headType: 'flat', bodyType: 'round' },
    '16,12': { height: 12, width: 2, headType: 'flat', bodyType: 'round' },
    '18,12': { height: 8, width: 2, headType: 'flat', bodyType: 'round' },
  }
}
