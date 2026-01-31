/**
 * Circle Template
 * A 15x15 grid with nails arranged in a circle pattern
 */

export default {
  id: 'circle',
  name: 'Circle',
  description: 'A circular arrangement of nails on a 15×15 grid',
  boardConfig: {
    dotsCountHorizontal: 15,
    dotsCountVertical: 15,
    marginBetweenNails: 18,
    paddingBoard: 10,
    boardColor: '#D2691E'
  },
  nails: {
    // Circle approximation using grid coordinates
    // Center at (7, 7), radius ~6 units
    // Top arc
    '5,0': { height: 24, width: 2, headType: 'flat', bodyType: 'round' },
    '6,0': { height: 24, width: 2, headType: 'flat', bodyType: 'round' },
    '7,0': { height: 24, width: 2, headType: 'flat', bodyType: 'round' },
    '8,0': { height: 24, width: 2, headType: 'flat', bodyType: 'round' },
    '9,0': { height: 24, width: 2, headType: 'flat', bodyType: 'round' },
    
    // Upper right
    '10,1': { height: 24, width: 2, headType: 'flat', bodyType: 'round' },
    '11,2': { height: 24, width: 2, headType: 'flat', bodyType: 'round' },
    '12,3': { height: 24, width: 2, headType: 'flat', bodyType: 'round' },
    '13,4': { height: 24, width: 2, headType: 'flat', bodyType: 'round' },
    '13,5': { height: 24, width: 2, headType: 'flat', bodyType: 'round' },
    
    // Right side
    '14,6': { height: 24, width: 2, headType: 'flat', bodyType: 'round' },
    '14,7': { height: 24, width: 2, headType: 'flat', bodyType: 'round' },
    '14,8': { height: 24, width: 2, headType: 'flat', bodyType: 'round' },
    
    // Lower right
    '13,9': { height: 24, width: 2, headType: 'flat', bodyType: 'round' },
    '13,10': { height: 24, width: 2, headType: 'flat', bodyType: 'round' },
    '12,11': { height: 24, width: 2, headType: 'flat', bodyType: 'round' },
    '11,12': { height: 24, width: 2, headType: 'flat', bodyType: 'round' },
    '10,13': { height: 24, width: 2, headType: 'flat', bodyType: 'round' },
    
    // Bottom arc
    '9,14': { height: 24, width: 2, headType: 'flat', bodyType: 'round' },
    '8,14': { height: 24, width: 2, headType: 'flat', bodyType: 'round' },
    '7,14': { height: 24, width: 2, headType: 'flat', bodyType: 'round' },
    '6,14': { height: 24, width: 2, headType: 'flat', bodyType: 'round' },
    '5,14': { height: 24, width: 2, headType: 'flat', bodyType: 'round' },
    
    // Lower left
    '4,13': { height: 24, width: 2, headType: 'flat', bodyType: 'round' },
    '3,12': { height: 24, width: 2, headType: 'flat', bodyType: 'round' },
    '2,11': { height: 24, width: 2, headType: 'flat', bodyType: 'round' },
    '1,10': { height: 24, width: 2, headType: 'flat', bodyType: 'round' },
    '1,9': { height: 24, width: 2, headType: 'flat', bodyType: 'round' },
    
    // Left side
    '0,8': { height: 24, width: 2, headType: 'flat', bodyType: 'round' },
    '0,7': { height: 24, width: 2, headType: 'flat', bodyType: 'round' },
    '0,6': { height: 24, width: 2, headType: 'flat', bodyType: 'round' },
    
    // Upper left
    '1,5': { height: 24, width: 2, headType: 'flat', bodyType: 'round' },
    '1,4': { height: 24, width: 2, headType: 'flat', bodyType: 'round' },
    '2,3': { height: 24, width: 2, headType: 'flat', bodyType: 'round' },
    '3,2': { height: 24, width: 2, headType: 'flat', bodyType: 'round' },
    '4,1': { height: 24, width: 2, headType: 'flat', bodyType: 'round' },
  }
}
