/**
 * Basic Square Template
 * A simple 10x10 grid with nails around the perimeter forming a square
 */

export default {
  id: 'basic-square',
  name: 'Basic Square',
  description: 'A simple 10×10 grid with nails around the perimeter',
  boardConfig: {
    dotsCountHorizontal: 10,
    dotsCountVertical: 10,
    marginBetweenNails: 20,
    paddingBoard: 10,
    boardColor: '#8B4513'
  },
  nails: {
    // Top row
    '0,0': { height: 20, width: 2, headType: 'flat', bodyType: 'round' },
    '1,0': { height: 20, width: 2, headType: 'flat', bodyType: 'round' },
    '2,0': { height: 20, width: 2, headType: 'flat', bodyType: 'round' },
    '3,0': { height: 20, width: 2, headType: 'flat', bodyType: 'round' },
    '4,0': { height: 20, width: 2, headType: 'flat', bodyType: 'round' },
    '5,0': { height: 20, width: 2, headType: 'flat', bodyType: 'round' },
    '6,0': { height: 20, width: 2, headType: 'flat', bodyType: 'round' },
    '7,0': { height: 20, width: 2, headType: 'flat', bodyType: 'round' },
    '8,0': { height: 20, width: 2, headType: 'flat', bodyType: 'round' },
    '9,0': { height: 20, width: 2, headType: 'flat', bodyType: 'round' },
    
    // Bottom row
    '0,9': { height: 20, width: 2, headType: 'flat', bodyType: 'round' },
    '1,9': { height: 20, width: 2, headType: 'flat', bodyType: 'round' },
    '2,9': { height: 20, width: 2, headType: 'flat', bodyType: 'round' },
    '3,9': { height: 20, width: 2, headType: 'flat', bodyType: 'round' },
    '4,9': { height: 20, width: 2, headType: 'flat', bodyType: 'round' },
    '5,9': { height: 20, width: 2, headType: 'flat', bodyType: 'round' },
    '6,9': { height: 20, width: 2, headType: 'flat', bodyType: 'round' },
    '7,9': { height: 20, width: 2, headType: 'flat', bodyType: 'round' },
    '8,9': { height: 20, width: 2, headType: 'flat', bodyType: 'round' },
    '9,9': { height: 20, width: 2, headType: 'flat', bodyType: 'round' },
    
    // Left column (excluding corners)
    '0,1': { height: 20, width: 2, headType: 'flat', bodyType: 'round' },
    '0,2': { height: 20, width: 2, headType: 'flat', bodyType: 'round' },
    '0,3': { height: 20, width: 2, headType: 'flat', bodyType: 'round' },
    '0,4': { height: 20, width: 2, headType: 'flat', bodyType: 'round' },
    '0,5': { height: 20, width: 2, headType: 'flat', bodyType: 'round' },
    '0,6': { height: 20, width: 2, headType: 'flat', bodyType: 'round' },
    '0,7': { height: 20, width: 2, headType: 'flat', bodyType: 'round' },
    '0,8': { height: 20, width: 2, headType: 'flat', bodyType: 'round' },
    
    // Right column (excluding corners)
    '9,1': { height: 20, width: 2, headType: 'flat', bodyType: 'round' },
    '9,2': { height: 20, width: 2, headType: 'flat', bodyType: 'round' },
    '9,3': { height: 20, width: 2, headType: 'flat', bodyType: 'round' },
    '9,4': { height: 20, width: 2, headType: 'flat', bodyType: 'round' },
    '9,5': { height: 20, width: 2, headType: 'flat', bodyType: 'round' },
    '9,6': { height: 20, width: 2, headType: 'flat', bodyType: 'round' },
    '9,7': { height: 20, width: 2, headType: 'flat', bodyType: 'round' },
    '9,8': { height: 20, width: 2, headType: 'flat', bodyType: 'round' },
  }
}
