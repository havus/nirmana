/**
 * Heart Template
 * A 14x14 grid with nails arranged in a heart shape
 */

export default {
  id: 'heart',
  name: 'Heart',
  description: 'A heart-shaped arrangement of nails on a 14×14 grid',
  boardConfig: {
    dotsCountHorizontal: 14,
    dotsCountVertical: 14,
    marginBetweenNails: 18,
    paddingBoard: 10,
    boardColor: '#D2691E'
  },
  nails: {
    // Left top lobe
    '3,2': { height: 28, width: 2, headType: 'flat', bodyType: 'round' },
    '4,2': { height: 28, width: 2, headType: 'flat', bodyType: 'round' },
    '2,3': { height: 28, width: 2, headType: 'flat', bodyType: 'round' },
    '5,3': { height: 28, width: 2, headType: 'flat', bodyType: 'round' },
    '1,4': { height: 28, width: 2, headType: 'flat', bodyType: 'round' },
    '6,4': { height: 28, width: 2, headType: 'flat', bodyType: 'round' },
    '1,5': { height: 28, width: 2, headType: 'flat', bodyType: 'round' },
    '6,5': { height: 28, width: 2, headType: 'flat', bodyType: 'round' },
    
    // Right top lobe
    '8,2': { height: 28, width: 2, headType: 'flat', bodyType: 'round' },
    '9,2': { height: 28, width: 2, headType: 'flat', bodyType: 'round' },
    '7,3': { height: 28, width: 2, headType: 'flat', bodyType: 'round' },
    '10,3': { height: 28, width: 2, headType: 'flat', bodyType: 'round' },
    '6,4': { height: 28, width: 2, headType: 'flat', bodyType: 'round' },
    '11,4': { height: 28, width: 2, headType: 'flat', bodyType: 'round' },
    '6,5': { height: 28, width: 2, headType: 'flat', bodyType: 'round' },
    '11,5': { height: 28, width: 2, headType: 'flat', bodyType: 'round' },
    
    // Left side
    '1,6': { height: 28, width: 2, headType: 'flat', bodyType: 'round' },
    '2,7': { height: 28, width: 2, headType: 'flat', bodyType: 'round' },
    '2,8': { height: 28, width: 2, headType: 'flat', bodyType: 'round' },
    '3,9': { height: 28, width: 2, headType: 'flat', bodyType: 'round' },
    '4,10': { height: 28, width: 2, headType: 'flat', bodyType: 'round' },
    '5,11': { height: 28, width: 2, headType: 'flat', bodyType: 'round' },
    
    // Right side
    '11,6': { height: 28, width: 2, headType: 'flat', bodyType: 'round' },
    '10,7': { height: 28, width: 2, headType: 'flat', bodyType: 'round' },
    '10,8': { height: 28, width: 2, headType: 'flat', bodyType: 'round' },
    '9,9': { height: 28, width: 2, headType: 'flat', bodyType: 'round' },
    '8,10': { height: 28, width: 2, headType: 'flat', bodyType: 'round' },
    '7,11': { height: 28, width: 2, headType: 'flat', bodyType: 'round' },
    
    // Bottom point
    '6,12': { height: 28, width: 2, headType: 'flat', bodyType: 'round' },
    '6,13': { height: 28, width: 2, headType: 'flat', bodyType: 'round' },
  }
}
