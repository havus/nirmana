# Project Templates

This folder contains pre-designed project templates for the Nirmana MDF Board application.

## Structure

Each template is defined in its own file and exports a default object with the following structure:

```javascript
{
  id: 'unique-identifier',
  name: 'Display Name',
  description: 'Brief description of the template',
  boardConfig: {
    dotsCountHorizontal: number,
    dotsCountVertical: number,
    marginBetweenNails: number,
    paddingBoard: number,
    boardColor: string (hex color)
  },
  nails: {
    'x,y': { height, width, headType, bodyType },
    // ... more nail positions
  }
}
```

## Available Templates

### 1. Basic Square (`basicSquare.js`)
- **Grid**: 10×10
- **Nails**: 36 nails forming a square perimeter
- **Best for**: Simple borders and frames

### 2. Circle (`circle.js`)
- **Grid**: 15×15
- **Nails**: 37 nails forming a circular pattern
- **Best for**: Round designs and mandala-style patterns

### 3. Diamond (`diamond.js`)
- **Grid**: 12×12
- **Nails**: 24 nails forming a diamond shape
- **Best for**: Rotated square designs and geometric art

### 4. Star (`star.js`)
- **Grid**: 16×16
- **Nails**: 38 nails forming a five-pointed star
- **Best for**: Star patterns and decorative designs

### 5. Heart (`heart.js`)
- **Grid**: 14×14
- **Nails**: 32 nails forming a heart shape
- **Best for**: Valentine's day projects and romantic designs

### 6. Grid Pattern (`gridPattern.js`)
- **Grid**: 12×12
- **Nails**: 36 nails in a 3×3 pattern of groups
- **Best for**: Modular designs and tiled patterns

### 7. Wave Pattern 3D (`wavePattern.js`) ⭐ Complex
- **Grid**: 16×12
- **Nails**: 130+ nails with varying heights (15mm to 60mm)
- **Special**: Creates a 3D wave effect with height variation
- **Best for**: Advanced 3D string art, demonstrating depth and dimension

### 8. Gradient Wave DKV (`gradientWaveDKV.js`) ⭐⭐ Ultra Complex
- **Grid**: 20×14
- **Nails**: 180+ nails with strategic height gradient (4mm to 40mm)
- **Special**: Flowing gradient wave popular in visual communication design
- **Best for**: Professional string art, design portfolios, exhibitions, modern art installations

## Adding New Templates

To add a new template:

1. Create a new file in this folder (e.g., `myTemplate.js`)
2. Define your template following the structure above
3. Export it as default: `export default { ... }`
4. Import it in `index.js`
5. Add it to the `PROJECT_TEMPLATES` array

Example:

```javascript
// myTemplate.js
export default {
  id: 'my-template',
  name: 'My Custom Template',
  description: 'Description of my template',
  boardConfig: {
    dotsCountHorizontal: 10,
    dotsCountVertical: 10,
    marginBetweenNails: 30,
    paddingBoard: 50,
    boardColor: '#8B4513'
  },
  nails: {
    '5,5': { height: 20, width: 2, headType: 'flat', bodyType: 'round' },
    // ... more nails
  }
}
```

Then in `index.js`:

```javascript
import myTemplate from './myTemplate.js'

export const PROJECT_TEMPLATES = [
  // ... existing templates
  myTemplate,
]
```

## Nail Configuration

Each nail position is defined by:

- **Key**: `'x,y'` string representing grid coordinates
- **Value**: Object with properties:
  - `height`: Nail height in mm (typically 20-30)
  - `width`: Nail body width (2 for standard)
  - `headType`: 'flat' or other head types
  - `bodyType`: 'round' or other body types

## Tips for Creating Templates

1. **Plan your design**: Sketch out your pattern on paper first
2. **Use symmetry**: Symmetric patterns are easier to create and look better
3. **Test coordinates**: Grid coordinates start at (0,0) in the top-left
4. **Choose appropriate grid size**: Larger grids allow more complex patterns
5. **Consider spacing**: Adjust `marginBetweenNails` for optimal string art results
6. **Board colors**: Use hex colors that complement your design
7. **Nail count**: Balance between detail and usability (20-50 nails is ideal)

## Future Enhancements

Potential additions:
- Template categories (geometric, organic, holiday, etc.)
- Template preview images
- Difficulty ratings
- String pattern suggestions
- Template variations (sizes, orientations)
