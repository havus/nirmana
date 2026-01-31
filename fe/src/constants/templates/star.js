/**
 * Star Template
 * A 16x16 grid with nails arranged in a star pattern
 */

export default {
  id: 'star',
  name: 'Star',
  description: 'A five-pointed star arrangement on a 16×16 grid',
  boardConfig: {
    dotsCountHorizontal: 16,
    dotsCountVertical: 16,
    marginBetweenNails: 18,
    paddingBoard: 10,
    boardColor: '#CD853F'
  },
  nails: {
    // Top point of star
    '8,0': { height: 30, width: 2, headType: 'flat', bodyType: 'round' },
    '8,1': { height: 30, width: 2, headType: 'flat', bodyType: 'round' },
    
    // Upper left line (from top to left upper point)
    '7,2': { height: 30, width: 2, headType: 'flat', bodyType: 'round' },
    '6,3': { height: 30, width: 2, headType: 'flat', bodyType: 'round' },
    '5,4': { height: 30, width: 2, headType: 'flat', bodyType: 'round' },
    '4,5': { height: 30, width: 2, headType: 'flat', bodyType: 'round' },
    
    // Left upper point
    '3,6': { height: 30, width: 2, headType: 'flat', bodyType: 'round' },
    '2,6': { height: 30, width: 2, headType: 'flat', bodyType: 'round' },
    
    // Left inner angle
    '4,7': { height: 30, width: 2, headType: 'flat', bodyType: 'round' },
    '5,8': { height: 30, width: 2, headType: 'flat', bodyType: 'round' },
    
    // Left lower point
    '5,10': { height: 30, width: 2, headType: 'flat', bodyType: 'round' },
    '4,11': { height: 30, width: 2, headType: 'flat', bodyType: 'round' },
    '3,12': { height: 30, width: 2, headType: 'flat', bodyType: 'round' },
    
    // Bottom left line
    '4,13': { height: 30, width: 2, headType: 'flat', bodyType: 'round' },
    '5,14': { height: 30, width: 2, headType: 'flat', bodyType: 'round' },
    '6,15': { height: 30, width: 2, headType: 'flat', bodyType: 'round' },
    
    // Bottom center
    '7,15': { height: 30, width: 2, headType: 'flat', bodyType: 'round' },
    '8,15': { height: 30, width: 2, headType: 'flat', bodyType: 'round' },
    '9,15': { height: 30, width: 2, headType: 'flat', bodyType: 'round' },
    
    // Bottom right line
    '10,15': { height: 30, width: 2, headType: 'flat', bodyType: 'round' },
    '11,14': { height: 30, width: 2, headType: 'flat', bodyType: 'round' },
    '12,13': { height: 30, width: 2, headType: 'flat', bodyType: 'round' },
    
    // Right lower point
    '13,12': { height: 30, width: 2, headType: 'flat', bodyType: 'round' },
    '12,11': { height: 30, width: 2, headType: 'flat', bodyType: 'round' },
    '11,10': { height: 30, width: 2, headType: 'flat', bodyType: 'round' },
    
    // Right inner angle
    '11,8': { height: 30, width: 2, headType: 'flat', bodyType: 'round' },
    '12,7': { height: 30, width: 2, headType: 'flat', bodyType: 'round' },
    
    // Right upper point
    '14,6': { height: 30, width: 2, headType: 'flat', bodyType: 'round' },
    '13,6': { height: 30, width: 2, headType: 'flat', bodyType: 'round' },
    
    // Upper right line (from right point to top)
    '12,5': { height: 30, width: 2, headType: 'flat', bodyType: 'round' },
    '11,4': { height: 30, width: 2, headType: 'flat', bodyType: 'round' },
    '10,3': { height: 30, width: 2, headType: 'flat', bodyType: 'round' },
    '9,2': { height: 30, width: 2, headType: 'flat', bodyType: 'round' },
    
    // Center inner points
    '7,8': { height: 30, width: 2, headType: 'flat', bodyType: 'round' },
    '8,8': { height: 30, width: 2, headType: 'flat', bodyType: 'round' },
    '9,8': { height: 30, width: 2, headType: 'flat', bodyType: 'round' },
  }
}
