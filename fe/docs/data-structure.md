# Nirmana Grid Data Structure

## Overview
This document describes the comprehensive data structure used for saving and loading grid states in the Nirmana MDF Board Simulation application.

## Complete Data Structure

```javascript
const gridState = {
  // Metadata
  version: "1.0.0",              // Schema version for future compatibility
  timestamp: "2025-08-08T10:30:00Z", // ISO 8601 timestamp
  
  // Board Configuration
  boardConfig: {
    dimensions: {
      dotsCountHorizontal: 20,    // Number of nail slots horizontally
      dotsCountVertical: 20,      // Number of nail slots vertically
      marginBetweenNails: 10,     // Spacing between nails in pixels
      paddingBoard: 40            // Board padding in pixels
    },
    appearance: {
      boardColor: "#8B4513"       // Board background color (hex)
    }
  },
  
  // Nail Type Definitions (reusable references)
  nailTypes: {
    thin: { 
      id: "thin", 
      label: "Thin (Red)", 
      color: "#ef4444",
      width: 1 
    },
    medium: { 
      id: "medium", 
      label: "Medium (Green)", 
      color: "#22c55e",
      width: 2 
    },
    thick: { 
      id: "thick", 
      label: "Thick (Blue)", 
      color: "#3b82f6",
      width: 3 
    }
  },
  
  // Actual nails placed on the grid
  nails: [
    {
      id: "nail_1672934400000_5_3", // Unique identifier: nail_timestamp_x_y
      position: {
        x: 5,                    // Grid column (0-based index)
        y: 3                     // Grid row (0-based index)
      },
      properties: {
        height: 7,               // Nail height (1-10)
        widthType: "medium",     // References nailTypes key
        color: "#22c55e",        // Computed from widthType (for performance)
        label: "Medium (Green)"  // Human-readable label (for display)
      },
      metadata: {
        createdAt: "2025-08-08T10:25:00Z",    // When nail was first created
        lastModified: "2025-08-08T10:27:00Z"  // When nail was last modified
      }
    }
    // ... more nails
  ],
  
  // View state (optional - for restoring user's viewport)
  viewState: {
    scale: 1.2,                  // Zoom level
    xOffset: 100,                // Horizontal pan offset
    yOffset: 50,                 // Vertical pan offset
    activeTab: "nailSettings"    // Last active control panel tab
  },
  
  // User preferences (optional - for future features)
  preferences: {
    defaultNailHeight: 1,        // Default height for new nails
    defaultNailWidth: "thin",    // Default width type for new nails
    autoSave: true,              // Auto-save on changes
    showGrid: true               // Show grid lines
  }
}
```

## Key Features

### 1. **Version Control**
- `version` field enables future schema migrations
- Backward compatibility with legacy formats

### 2. **Separation of Concerns**
- Board configuration separate from nail data
- Nail types defined once, referenced by nails
- View state isolated from data state

### 3. **Data Integrity**
- Unique nail IDs prevent duplicates
- Timestamp tracking for audit trails
- Position validation through x/y coordinates

### 4. **Performance Optimization**
- Computed values (color, label) stored for fast rendering
- Efficient lookup through nail type references
- Minimal data structure for storage

### 5. **Extensibility**
- Metadata fields for future features
- Preferences object for user customization
- Modular structure for easy additions

## Storage Locations

### Local Storage
- **Key**: `nirmana-grid-state`
- **Usage**: Auto-save/load for session persistence
- **Format**: JSON string

### File Export/Import
- **Format**: `.json` files
- **Usage**: Manual backup, sharing configurations
- **Naming**: `nirmana-grid-YYYY-MM-DD.json`

## API Methods

### Save Operations
- `saveGrid()` - Save to localStorage
- `exportGrid()` - Download as JSON file

### Load Operations
- `loadGrid()` - Load from localStorage
- `importGrid(file)` - Load from uploaded JSON file

### Legacy Support
- Automatic detection of old format
- Seamless migration to new structure
- No data loss during updates

## Example Usage

```javascript
// Save current state
saveGrid()

// Export for backup
exportGrid() // Downloads: nirmana-grid-2025-08-08.json

// Import from file
const fileInput = document.querySelector('input[type="file"]')
fileInput.addEventListener('change', async (e) => {
  const file = e.target.files[0]
  try {
    await importGrid(file)
    console.log('Grid imported successfully')
  } catch (error) {
    console.error('Import failed:', error)
  }
})
```

## Benefits

1. **Robust Data Management**: Complete state preservation
2. **User Experience**: Seamless save/load functionality
3. **Data Portability**: Export/import capabilities
4. **Future-Proof**: Versioned schema for upgrades
5. **Performance**: Optimized for rendering speed
6. **Debugging**: Rich metadata for troubleshooting
