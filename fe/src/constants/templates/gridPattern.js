/**
 * Grid Pattern Template
 * A 12x12 grid with nails in a 3x3 grid pattern
 */

export default {
  id: 'grid-pattern',
  name: 'Grid Pattern',
  description: 'A 3×3 pattern of nail groups on a 12×12 grid',
  boardConfig: {
    dotsCountHorizontal: 12,
    dotsCountVertical: 12,
    marginBetweenNails: 20,
    paddingBoard: 10,
    boardColor: '#DEB887'
  },
  nails: {
    // Top-left group
    '1,1': { height: 20, width: 2, headType: 'flat', bodyType: 'round' },
    '2,1': { height: 20, width: 2, headType: 'flat', bodyType: 'round' },
    '1,2': { height: 20, width: 2, headType: 'flat', bodyType: 'round' },
    '2,2': { height: 20, width: 2, headType: 'flat', bodyType: 'round' },
    
    // Top-center group
    '5,1': { height: 20, width: 2, headType: 'flat', bodyType: 'round' },
    '6,1': { height: 20, width: 2, headType: 'flat', bodyType: 'round' },
    '5,2': { height: 20, width: 2, headType: 'flat', bodyType: 'round' },
    '6,2': { height: 20, width: 2, headType: 'flat', bodyType: 'round' },
    
    // Top-right group
    '9,1': { height: 20, width: 2, headType: 'flat', bodyType: 'round' },
    '10,1': { height: 20, width: 2, headType: 'flat', bodyType: 'round' },
    '9,2': { height: 20, width: 2, headType: 'flat', bodyType: 'round' },
    '10,2': { height: 20, width: 2, headType: 'flat', bodyType: 'round' },
    
    // Middle-left group
    '1,5': { height: 20, width: 2, headType: 'flat', bodyType: 'round' },
    '2,5': { height: 20, width: 2, headType: 'flat', bodyType: 'round' },
    '1,6': { height: 20, width: 2, headType: 'flat', bodyType: 'round' },
    '2,6': { height: 20, width: 2, headType: 'flat', bodyType: 'round' },
    
    // Center group
    '5,5': { height: 20, width: 2, headType: 'flat', bodyType: 'round' },
    '6,5': { height: 20, width: 2, headType: 'flat', bodyType: 'round' },
    '5,6': { height: 20, width: 2, headType: 'flat', bodyType: 'round' },
    '6,6': { height: 20, width: 2, headType: 'flat', bodyType: 'round' },
    
    // Middle-right group
    '9,5': { height: 20, width: 2, headType: 'flat', bodyType: 'round' },
    '10,5': { height: 20, width: 2, headType: 'flat', bodyType: 'round' },
    '9,6': { height: 20, width: 2, headType: 'flat', bodyType: 'round' },
    '10,6': { height: 20, width: 2, headType: 'flat', bodyType: 'round' },
    
    // Bottom-left group
    '1,9': { height: 20, width: 2, headType: 'flat', bodyType: 'round' },
    '2,9': { height: 20, width: 2, headType: 'flat', bodyType: 'round' },
    '1,10': { height: 20, width: 2, headType: 'flat', bodyType: 'round' },
    '2,10': { height: 20, width: 2, headType: 'flat', bodyType: 'round' },
    
    // Bottom-center group
    '5,9': { height: 20, width: 2, headType: 'flat', bodyType: 'round' },
    '6,9': { height: 20, width: 2, headType: 'flat', bodyType: 'round' },
    '5,10': { height: 20, width: 2, headType: 'flat', bodyType: 'round' },
    '6,10': { height: 20, width: 2, headType: 'flat', bodyType: 'round' },
    
    // Bottom-right group
    '9,9': { height: 20, width: 2, headType: 'flat', bodyType: 'round' },
    '10,9': { height: 20, width: 2, headType: 'flat', bodyType: 'round' },
    '9,10': { height: 20, width: 2, headType: 'flat', bodyType: 'round' },
    '10,10': { height: 20, width: 2, headType: 'flat', bodyType: 'round' },
  }
}
