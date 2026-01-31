/**
 * Diamond Template
 * A 12x12 grid with nails arranged in a diamond (rotated square) pattern
 */

export default {
  id: 'diamond',
  name: 'Diamond',
  description: 'A diamond-shaped arrangement of nails on a 12×12 grid',
  boardConfig: {
    dotsCountHorizontal: 12,
    dotsCountVertical: 12,
    marginBetweenNails: 20,
    paddingBoard: 10,
    boardColor: '#8B4513'
  },
  nails: {
    // Top point
    '6,0': { height: 22, width: 2, headType: 'flat', bodyType: 'round' },
    
    // Upper left edge
    '5,1': { height: 22, width: 2, headType: 'flat', bodyType: 'round' },
    '4,2': { height: 22, width: 2, headType: 'flat', bodyType: 'round' },
    '3,3': { height: 22, width: 2, headType: 'flat', bodyType: 'round' },
    '2,4': { height: 22, width: 2, headType: 'flat', bodyType: 'round' },
    '1,5': { height: 22, width: 2, headType: 'flat', bodyType: 'round' },
    
    // Left point
    '0,6': { height: 22, width: 2, headType: 'flat', bodyType: 'round' },
    
    // Lower left edge
    '1,7': { height: 22, width: 2, headType: 'flat', bodyType: 'round' },
    '2,8': { height: 22, width: 2, headType: 'flat', bodyType: 'round' },
    '3,9': { height: 22, width: 2, headType: 'flat', bodyType: 'round' },
    '4,10': { height: 22, width: 2, headType: 'flat', bodyType: 'round' },
    '5,11': { height: 22, width: 2, headType: 'flat', bodyType: 'round' },
    
    // Bottom point
    '6,12': { height: 22, width: 2, headType: 'flat', bodyType: 'round' },
    
    // Lower right edge
    '7,11': { height: 22, width: 2, headType: 'flat', bodyType: 'round' },
    '8,10': { height: 22, width: 2, headType: 'flat', bodyType: 'round' },
    '9,9': { height: 22, width: 2, headType: 'flat', bodyType: 'round' },
    '10,8': { height: 22, width: 2, headType: 'flat', bodyType: 'round' },
    '11,7': { height: 22, width: 2, headType: 'flat', bodyType: 'round' },
    
    // Right point
    '12,6': { height: 22, width: 2, headType: 'flat', bodyType: 'round' },
    
    // Upper right edge
    '11,5': { height: 22, width: 2, headType: 'flat', bodyType: 'round' },
    '10,4': { height: 22, width: 2, headType: 'flat', bodyType: 'round' },
    '9,3': { height: 22, width: 2, headType: 'flat', bodyType: 'round' },
    '8,2': { height: 22, width: 2, headType: 'flat', bodyType: 'round' },
    '7,1': { height: 22, width: 2, headType: 'flat', bodyType: 'round' },
  }
}
