/**
 * Nirmana 2D to 3D Conversion Script
 * Thesis Demonstration - Three.js Implementation
 * 
 * This script demonstrates the conversion of 2D nail grid data structure
 * into a 3D visualization using Three.js and InstancedMesh for performance.
 */

import * as THREE from 'three';
import { OrbitControls } from 'three/addons/controls/OrbitControls.js';

// ============================
// SAMPLE 2D DATA STRUCTURE
// ============================
// This data structure represents nails on a 2D grid
// Each nail has position (x,y), height, body width, and head width
const sampleData = {
  version: "1.0.0",
  timestamp: new Date().toISOString(),

  // Grid configuration
  gridWidth: 20,
  gridHeight: 20,
  marginBetweenNails: 10,  // mm spacing between nails
  paddingBoard: 10,        // mm padding around board

  // Nail data - key format: "x,y"
  nails: {
    // Add circular pattern (moved to coordinate 1,1)
    "1,1": { height: 30, body_width: 1, head_width: 1 },
    "2,1": { height: 30, body_width: 1, head_width: 1 },
    "3,1": { height: 30, body_width: 1, head_width: 1 },
    "1,2": { height: 30, body_width: 1, head_width: 1 },
    "3,2": { height: 30, body_width: 1, head_width: 1 },
    "1,3": { height: 30, body_width: 1, head_width: 1 },
    "2,3": { height: 30, body_width: 1, head_width: 1 },
    "3,3": { height: 30, body_width: 1, head_width: 1 },

    // Create a diamond pattern (♦) with pyramid heights
    // Diamond shape: wide in the middle, points at top and bottom
    // Height pattern: Increases from edges (30mm) to center (90mm) like a pyramid
    //
    // ASCII Grid Layout (showing heights in mm):
    //        X: 9   10   11   12   13
    //     Y:  ─────────────────────────
    //     8:            30              ← Row 8: Top point (shortest)
    //     9:       30   40   30         ← Row 9: Upper layer
    //    10:  30   40   50   40   30    ← Row 10: Middle (PEAK at 70mm)
    //    11:       30   40   30         ← Row 11: Lower layer
    //    12:            30              ← Row 12: Bottom point (shortest)
    //
    // Pyramid visualization: Heights increase toward center (11,10)
    // Each position is written as "X,Y" (column,row):
    // - "11,8" = X:11, Y:8, height:30mm (top point)
    // - "11,10" = X:11, Y:10, height:70mm (CENTER PEAK)
    "11,8": { height: 30, body_width: 2, head_width: 2 },   // Top point (shortest)
    "10,9": { height: 30, body_width: 2, head_width: 2 },   // Upper left
    "11,9": { height: 40, body_width: 2, head_width: 2 },   // Upper middle
    "12,9": { height: 30, body_width: 2, head_width: 2 },   // Upper right
    "9,10": { height: 30, body_width: 3, head_width: 2 },   // Middle left
    "10,10": { height: 40, body_width: 3, head_width: 2 },  // Middle left-center
    "11,10": { height: 50, body_width: 3, head_width: 3 },  // Center (TALLEST - peak of pyramid)
    "12,10": { height: 40, body_width: 3, head_width: 2 },  // Middle right-center
    "13,10": { height: 30, body_width: 3, head_width: 2 },  // Middle right
    "10,11": { height: 30, body_width: 2, head_width: 2 },  // Lower left
    "11,11": { height: 40, body_width: 2, head_width: 2 },  // Lower middle
    "12,11": { height: 30, body_width: 2, head_width: 2 },  // Lower right
    "11,12": { height: 30, body_width: 2, head_width: 2 },  // Bottom point (shortest)
  }
};

// ============================
// THREE.JS SCENE SETUP
// ============================
class NirmanaScene {
  constructor(container) {
    this.container = container;
    this.scene = null;
    this.camera = null;
    this.renderer = null;
    this.controls = null;
    this.animationId = null;

    // Performance tracking
    this.frameCount = 0;
    this.lastTime = performance.now();

    // 3D Settings matching the Vue project
    this.settings = {
      boardColor: 0xa4846a,
      boardWidth: 42,
      boardDepth: 42,
      boardHeight: 2,
      nailRadius: 0.1,
      headSizeRatio: 2.0,
      metalness: 0.8,
      lightIntensity: 2.0,
      nailDetail: 'medium' // low, medium, high
    };

    // Store mesh references
    this.board = null;
    this.nailInstancedMesh = null;
    this.nailHeadInstancedMesh = null;
  }

  /**
   * Initialize the Three.js scene
   */
  init() {
    // ============================
    // SCENE - The container for all 3D objects
    // ============================
    // THREE.Scene() is like a stage or canvas where all 3D objects live.
    // It holds lights, cameras, and 3D meshes (objects).
    // Think of it as the "world" where everything exists in 3D space.
    this.scene = new THREE.Scene();
    this.scene.background = new THREE.Color(0xf0f0f0);

    // ============================
    // CAMERA - The eye viewing the 3D world
    // ============================
    // PerspectiveCamera simulates how human eyes see the world with depth perspective.
    // Objects further away appear smaller (realistic 3D view).
    // Parameters:
    // - Field of View (30°): How wide the camera can see (like zoom level)
    // - Aspect Ratio: Width/height ratio to prevent distortion
    // - Near plane (0.1): Closest distance the camera can see
    // - Far plane (1000): Farthest distance the camera can see
    const aspect = this.container.clientWidth / this.container.clientHeight;
    this.camera = new THREE.PerspectiveCamera(30, aspect, 0.1, 1000);

    // Position the camera in 3D space
    // camera.position.set(x, y, z) places the camera at specific coordinates:
    // - x: 30 (right of center)
    // - y: 30 (above the ground)
    // - z: 30 (forward/back from center)
    // This creates a diagonal view looking down at the scene from an angle
    this.camera.position.set(30, 30, 30);

    // ============================
    // RENDERER - Draws the 3D scene to the screen
    // ============================
    // WebGLRenderer uses the GPU to render 3D graphics efficiently.
    // It takes the Scene and Camera, then draws everything onto a <canvas> element.
    // Antialiasing smooths jagged edges for better visual quality.
    // Shadow maps allow objects to cast realistic shadows.
    this.renderer = new THREE.WebGLRenderer({ antialias: true });
    this.renderer.setSize(this.container.clientWidth, this.container.clientHeight);
    this.renderer.shadowMap.enabled = true;
    this.renderer.shadowMap.type = THREE.PCFSoftShadowMap;
    this.container.appendChild(this.renderer.domElement);

    // ============================
    // ORBITCONTROLS - Interactive camera movement
    // ============================
    // OrbitControls allows users to interact with the 3D scene:
    // - Left mouse drag: Rotate around the center
    // - Right mouse drag: Pan (move sideways)
    // - Scroll wheel: Zoom in/out
    // Damping adds smooth, physics-like motion when dragging.
    this.controls = new OrbitControls(this.camera, this.renderer.domElement);
    this.controls.enableDamping = true;
    this.controls.dampingFactor = 0.05;

    // Auto-rotation (currently disabled)
    // Set autoRotate = true to make the camera continuously rotate around the scene
    // autoRotateSpeed controls how fast it rotates (default: 2.0)
    this.controls.autoRotate = false;
    this.controls.autoRotateSpeed = 0.5;

    // ============================
    // ZOOM VELOCITY CONTROL
    // ============================
    // zoomSpeed controls how fast the camera zooms in/out
    // - Default: 1.0 (normal speed)
    // - Higher values (e.g., 2.0): Faster zoom (more sensitive)
    // - Lower values (e.g., 0.5): Slower zoom (more precise control)
    // Adjust this based on your scene size and user preference
    this.controls.zoomSpeed = 7; // 600% faster zoom, 1.5 is 50% faster

    // Alternative: panSpeed controls panning velocity (right-click drag)
    // Default: 1.0
    this.controls.panSpeed = 1.0;

    // Alternative: rotateSpeed controls rotation velocity (left-click drag)
    // Default: 1.0
    this.controls.rotateSpeed = 1.0;

    // Camera distance limits (zoom constraints)
    this.controls.minDistance = 10;
    this.controls.maxDistance = 200;

    // Setup lighting
    this.setupLighting();

    // Create board
    this.createBoard();

    // Handle window resize
    window.addEventListener('resize', () => this.onWindowResize());

    // Start animation loop
    this.animate();
  }

  /**
   * Setup scene lighting
   */
  setupLighting() {
    // Ambient light
    const ambientLight = new THREE.AmbientLight(0x404040, 0.4);
    this.scene.add(ambientLight);

    // Directional light
    const directionalLight = new THREE.DirectionalLight(0xffffff, this.settings.lightIntensity);
    directionalLight.position.set(50, 50, 50);
    directionalLight.castShadow = true;
    directionalLight.shadow.mapSize.width = 2048;
    directionalLight.shadow.mapSize.height = 2048;
    this.scene.add(directionalLight);
  }

  /**
   * Create the board base
   */
  createBoard(boardWidth = null, boardDepth = null) {
    // Use provided dimensions or default settings
    const width = boardWidth || this.settings.boardWidth;
    const depth = boardDepth || this.settings.boardDepth;

    const geometry = new THREE.BoxGeometry(
      width,
      this.settings.boardHeight,
      depth
    );
    const material = new THREE.MeshStandardMaterial({
      color: this.settings.boardColor,
      roughness: 0.8,
      metalness: 0.1
    });
    this.board = new THREE.Mesh(geometry, material);
    this.board.position.y = this.settings.boardHeight / 2;
    this.board.receiveShadow = true;
    this.scene.add(this.board);
  }

  /**
   * Create nail geometry based on detail level
   */
  createNailGeometry() {
    let segments = 8;
    if (this.settings.nailDetail === 'low') segments = 6;
    else if (this.settings.nailDetail === 'high') segments = 16;

    return new THREE.CylinderGeometry(
      this.settings.nailRadius,
      this.settings.nailRadius,
      1, // Height will be scaled per instance
      segments
    );
  }

  /**
   * Create nail head geometry
   */
  createNailHeadGeometry() {
    let segments = 8;
    if (this.settings.nailDetail === 'low') segments = 6;
    else if (this.settings.nailDetail === 'high') segments = 16;

    return new THREE.CylinderGeometry(
      this.settings.nailRadius * this.settings.headSizeRatio,
      this.settings.nailRadius * this.settings.headSizeRatio,
      0.2,
      segments
    );
  }

  /**
   * MAIN CONVERSION LOGIC: 2D Data to 3D Visualization
   * This is the core algorithm that converts 2D nail data to 3D mesh
   */
  createNailsFrom2DData(data) {
    // Remove existing nails if any
    if (this.nailInstancedMesh) {
      this.scene.remove(this.nailInstancedMesh);
      this.nailInstancedMesh.geometry.dispose();
      this.nailInstancedMesh.material.dispose();
    }
    if (this.nailHeadInstancedMesh) {
      this.scene.remove(this.nailHeadInstancedMesh);
      this.nailHeadInstancedMesh.geometry.dispose();
      this.nailHeadInstancedMesh.material.dispose();
    }

    const nailsData = data.nails;
    const gridWidth = data.gridWidth;
    const gridHeight = data.gridHeight;
    const marginBetweenNails = data.marginBetweenNails / 10; // Convert mm to cm
    const paddingBoard = data.paddingBoard / 10; // Convert mm to cm

    // ============================
    // CALCULATE BOARD DIMENSIONS
    // ============================
    // Board size = (grid size - 1) × margin + padding × 2
    // This formula ensures the board perfectly fits all nails with proper padding
    const boardWidth = ((gridWidth - 1) * marginBetweenNails) + (paddingBoard * 2);
    const boardDepth = ((gridHeight - 1) * marginBetweenNails) + (paddingBoard * 2);

    console.log(`Board dimensions: ${boardWidth} cm × ${boardDepth} cm (with ${paddingBoard * 10}mm padding)`);

    // Recreate board with correct dimensions
    if (this.board) {
      this.scene.remove(this.board);
      this.board.geometry.dispose();
      this.board.material.dispose();
    }
    this.createBoard(boardWidth, boardDepth);

    // Get all nail positions
    const nailPositions = Object.keys(nailsData);
    const instanceCount = nailPositions.length;

    if (instanceCount === 0) {
      console.log('No nails to render');
      return;
    }

    console.log(`Converting ${instanceCount} nails from 2D to 3D`);

    // Step 1: Create base geometries and materials for instancing
    const nailGeometry = this.createNailGeometry();
    const nailMaterial = new THREE.MeshStandardMaterial({
      color: 0x888888,
      metalness: this.settings.metalness,
      roughness: 0.4
    });

    const headGeometry = this.createNailHeadGeometry();
    const headMaterial = new THREE.MeshStandardMaterial({
      color: 0x666666,
      metalness: this.settings.metalness,
      roughness: 0.3
    });

    // Step 2: Create instanced meshes
    this.nailInstancedMesh = new THREE.InstancedMesh(nailGeometry, nailMaterial, instanceCount);
    this.nailInstancedMesh.castShadow = false;

    this.nailHeadInstancedMesh = new THREE.InstancedMesh(headGeometry, headMaterial, instanceCount);
    this.nailHeadInstancedMesh.castShadow = false;

    // Step 3: Transform matrices for positioning and scaling
    // ============================
    // MATRIX4 - 4×4 Transformation Matrix
    // ============================
    // Matrix4 is a 4×4 (16 numbers) mathematical structure used to transform 3D objects.
    // It combines Translation, Rotation, and Scale into ONE compact representation.
    //
    // WHAT'S INSIDE A MATRIX4?
    // A 4×4 matrix contains 16 numbers arranged in rows and columns:
    //
    //   ┌                           ┐
    //   │ Sx   0    0   Tx  │  ← Row 0: Scale X (Sx) and Translation X (Tx)
    //   │ 0    Sy   0   Ty  │  ← Row 1: Scale Y (Sy) and Translation Y (Ty)
    //   │ 0    0    Sz  Tz  │  ← Row 2: Scale Z (Sz) and Translation Z (Tz)
    //   │ 0    0    0   1   │  ← Row 3: Homogeneous coordinate (always 1)
    //   └                           ┘
    //
    // Simplified version (ignoring rotation):
    // - Sx, Sy, Sz: Scale factors (make object bigger/smaller in X, Y, Z)
    // - Tx, Ty, Tz: Translation values (move object in X, Y, Z)
    // - Middle values: Rotation (complex, involves trigonometry)
    //
    // EXAMPLE VALUES for a nail at position (5, 3, -2) with height 4:
    //   ┌                              ┐
    //   │ 0.1   0     0     5    │  ← Scale X=0.1 (thin), Position X=5
    //   │ 0     4     0     3    │  ← Scale Y=4 (tall), Position Y=3
    //   │ 0     0     0.1   -2   │  ← Scale Z=0.1 (thin), Position Z=-2
    //   │ 0     0     0     1    │  ← Always 1 (standard)
    //   └                              ┘
    //
    // WHY USE MATRIX4?
    // 1. PERFORMANCE: One matrix = multiple transformations (scale + position + rotation)
    //    Instead of: object.position.set() + object.scale.set() + object.rotation.set()
    //    We use: object.setMatrixAt(index, matrix) - MUCH FASTER for thousands of objects
    //
    // 2. INSTANCED RENDERING: InstancedMesh uses matrices to render many copies efficiently
    //    Example: 1000 nails with ONE geometry = 1000 matrices = super fast
    //    Alternative: 1000 separate Mesh objects = super slow
    //
    // 3. COMPOSABILITY: Matrices can be multiplied to combine transformations
    //    matrix1.multiply(matrix2) combines both transformations
    //
    // COMMON METHODS:
    // - makeScale(x, y, z): Set scale factors (how big)
    // - setPosition(x, y, z): Set position (where to place)
    // - makeRotationX/Y/Z(angle): Set rotation (how to turn)
    // - compose(position, quaternion, scale): Combine all three
    // - multiply(matrix): Combine with another matrix
    //
    // USE CASES IN THIS PROJECT:
    // - Position each nail on the grid (Translation)
    // - Scale nail height based on 2D data (Scale Y)
    // - Scale nail width based on body_width (Scale X & Z)
    // - Render 1000+ nails efficiently with InstancedMesh
    //
    // REAL-WORLD ANALOGY:
    // Think of Matrix4 as a "recipe card" that tells the GPU:
    // "Take the base nail geometry, make it X cm tall, Y cm wide, and place it at position Z"
    // Instead of baking 1000 separate nails, we have 1 nail recipe with 1000 recipe cards!

    const matrix = new THREE.Matrix4();
    const headMatrix = new THREE.Matrix4();

    let index = 0;

    // Step 4: Iterate through each nail and convert 2D position to 3D
    nailPositions.forEach(position => {
      // Parse 2D coordinates
      const [x, y] = position.split(',').map(Number);
      const nailData = nailsData[position];

      // ============================
      // COORDINATE CONVERSION (2D → 3D)
      // ============================
      // Convert grid position (x, y) to 3D world coordinates

      // APPROACH COMPARISON: Three common methods for 2D → 3D conversion
      //
      // METHOD 1: Start from origin (0,0,0) ❌ NOT RECOMMENDED
      //   Formula: pos = gridCoord × spacing
      //   Result: Grid from (0,0) to (19,19) in 3D space
      //   Problems:
      //   - Object appears off-center in the scene
      //   - Camera must be positioned awkwardly (e.g., at 10,10 to see center)
      //   - Rotation around origin looks unnatural
      //   - Hard to align with other objects
      //
      // METHOD 2: Center at origin (0,0,0) ✅ BEST PRACTICE (USED HERE)
      //   Formula: pos = (gridCoord - (gridSize-1)/2) × spacing
      //   Result: Grid from (-9,-9) to (10,10) with center at (0,0)
      //   Benefits:
      //   - Scene is balanced around world origin (0,0,0)
      //   - OrbitControls rotates naturally around center
      //   - Camera positioning is intuitive
      //   - Easy to align multiple objects
      //   - Standard in 3D graphics (Three.js, Unity, Blender)
      //
      // METHOD 3: Custom offset ⚠️ SITUATIONAL
      //   Formula: pos = (gridCoord × spacing) + customOffset
      //   Use when: Need to position relative to other objects
      //   Example: Place grid next to an existing object at position (50, 0, 0)

      // WHY START FROM -9? (METHOD 2 calculation)
      // For a 20×20 grid (indices 0-19) with 1cm spacing:
      // - Grid center point: (19-1)/2 = 9
      // - Position 0 → (0 - 9) × 1 = -9 cm (leftmost/minimum)
      // - Position 9 → (9 - 9) × 1 = 0 cm (center) ← aligned with world origin
      // - Position 19 → (19 - 9) × 1 = 10 cm (rightmost/maximum)
      //
      // RANGE EXPLANATION:
      // - Minimum: -9 cm (at grid coordinate 0)
      // - Maximum: +10 cm (at grid coordinate 19)
      // - Total range: 19 cm (from -9 to +10)
      // - Center: 0 cm (perfectly balanced)
      //
      // CAN WE START FROM MAXIMUM (+10)? YES, but you'd need to reverse:
      // Formula: pos = ((gridSize-1) - gridCoord - (gridSize-1)/2) × spacing
      // Or simply: pos = -(gridCoord - (gridSize-1)/2) × spacing
      // Result: Position 0 → +10, Position 19 → -9
      // Note: This flips/mirrors the grid, useful for:
      //   - Mirroring designs
      //   - Converting between coordinate systems
      //   - Creating symmetrical patterns
      // However, standard convention is minimum to maximum (left to right)
      //
      // Visual grid representation (20×20 with 1cm spacing):
      // Grid X-axis (horizontal):
      //
      //   Grid coord:  0    1    2    3  ...  9   ...  17   18   19
      //                |----|----|----|----|----|----|----|----|
      //   3D position: +10  +9   +8   +7  ... 0   ...  -8   -9  -10
      //                ↑                       ↑              ↑
      //              start                  center          end
      //            (maximum)              (origin)       (minimum)
      //
      // Grid coordinate (1,1) in 2D → 3D position (+9, y, +9)
      // REVERSED/MIRRORED: Starting from positive (maximum) instead of negative

      // REVERSED FORMULA: Multiply by negative to flip the grid
      const posX = -((x - (gridWidth - 1) / 2) * marginBetweenNails);
      const posZ = -((y - (gridHeight - 1) / 2) * marginBetweenNails);

      // ============================
      // HEIGHT CONVERSION
      // ============================
      // Convert height from mm to cm and use as Y-axis scale
      // Apply 1.2x visual multiplier to emphasize height differences in 3D
      const nailHeight = ((nailData.height || 10) / 10) * 1.2;

      // ============================
      // WIDTH CONVERSION
      // ============================
      // body_width and head_width are multipliers (1, 2, or 3)
      // Apply 2.5x visual multipliers to emphasize dimension differences in 3D
      const bodyWidthMultiplier = (nailData.body_width || 1) * 2.5;
      const headWidthMultiplier = (nailData.head_width || 1) * 2.5;

      // Calculate actual dimensions
      const bodyWidth = this.settings.nailRadius * bodyWidthMultiplier;
      const headWidth = this.settings.nailRadius * this.settings.headSizeRatio * headWidthMultiplier;

      // ============================
      // MATRIX TRANSFORMATION
      // ============================
      // Matrix4 is a 4x4 transformation matrix that combines:
      // - Position (translation): Where to place the object
      // - Scale: How big to make the object
      // - Rotation: How to rotate the object (not used here)

      // Example: For a nail at grid (1,1) with height 30mm and body_width 1:
      // - posX = -9, posZ = -9 (converted from grid to 3D world)
      // - nailHeight = 3 (30mm = 3cm)
      // - bodyWidth = 0.1 (nailRadius * 1)

      // Step 1: Create scale matrix
      // makeScale(x, y, z) scales the geometry in each axis
      // - X and Z: bodyWidth (0.1) makes nail thin
      // - Y: nailHeight (3) stretches the 1-unit cylinder to 3cm tall
      matrix.makeScale(bodyWidth, nailHeight, bodyWidth);

      // Step 2: Set position in the matrix
      // setPosition(x, y, z) moves the object to specific coordinates
      // - X: posX (-9) horizontal position
      // - Y: nailHeight/2 (1.5) lifts nail so base sits on board (y=0)
      // - Z: posZ (-9) depth position
      matrix.setPosition(posX, nailHeight / 2, posZ);

      // Step 3: Apply matrix to this instance
      // setMatrixAt(index, matrix) sets the transformation for instance #index
      // InstancedMesh uses one geometry but renders multiple copies,
      // each with its own matrix for position/scale/rotation
      // This is much faster than creating separate Mesh objects for each nail
      this.nailInstancedMesh.setMatrixAt(index, matrix);

      // Same process for nail head (the flat top part)
      // Head is wider (headWidth) but fixed height (0.2)
      // Position head center at the top of the nail body for seamless connection
      // - Nail body top is at: nailHeight (full height from base)
      // - Head height is: 0.2 (0.1 above and below center)
      // - Head center at: nailHeight creates slight overlap for seamless appearance
      headMatrix.makeScale(headWidth, 0.2, headWidth);
      headMatrix.setPosition(posX, nailHeight, posZ);
      this.nailHeadInstancedMesh.setMatrixAt(index, headMatrix);

      index++;
    });

    // Step 5: Update instance matrices and add to scene
    this.nailInstancedMesh.instanceMatrix.needsUpdate = true;
    this.nailHeadInstancedMesh.instanceMatrix.needsUpdate = true;

    this.scene.add(this.nailInstancedMesh);
    this.scene.add(this.nailHeadInstancedMesh);

    console.log('3D conversion complete!');
  }

  /**
   * Animation loop
   */
  animate() {
    this.animationId = requestAnimationFrame(() => this.animate());

    // Update controls
    this.controls.update();

    // Render scene
    this.renderer.render(this.scene, this.camera);

    // Update FPS counter
    this.updateFPS();
  }

  /**
   * Update FPS display
   */
  updateFPS() {
    this.frameCount++;
    const currentTime = performance.now();

    if (currentTime - this.lastTime >= 1000) {
      const fps = Math.round((this.frameCount * 1000) / (currentTime - this.lastTime));
      document.getElementById('fps').textContent = fps;
      this.frameCount = 0;
      this.lastTime = currentTime;
    }
  }

  /**
   * Handle window resize
   */
  onWindowResize() {
    const width = this.container.clientWidth;
    const height = this.container.clientHeight;

    this.camera.aspect = width / height;
    this.camera.updateProjectionMatrix();

    this.renderer.setSize(width, height);
  }

  /**
   * Cleanup resources
   */
  dispose() {
    if (this.animationId) {
      cancelAnimationFrame(this.animationId);
    }

    if (this.renderer) {
      this.renderer.dispose();
    }

    window.removeEventListener('resize', this.onWindowResize);
  }
}

// ============================
// APPLICATION INITIALIZATION
// ============================

let scene = null;

// Initialize when DOM is ready
document.addEventListener('DOMContentLoaded', () => {
  // Get container element
  const container = document.getElementById('canvas-container');

  // Initialize Three.js scene
  scene = new NirmanaScene(container);
  scene.init();

  // Load sample data into textarea
  const dataInput = document.getElementById('dataInput');
  dataInput.value = JSON.stringify(sampleData, null, 2);

  // Convert and display initial data
  updateVisualization();

  // Add update button listener
  document.getElementById('updateBtn').addEventListener('click', updateVisualization);

  // Add keyboard shortcut (Ctrl/Cmd + Enter)
  dataInput.addEventListener('keydown', (e) => {
    if ((e.ctrlKey || e.metaKey) && e.key === 'Enter') {
      updateVisualization();
    }
  });
});

/**
 * Update 3D visualization from JSON input
 */
function updateVisualization() {
  try {
    // Parse JSON data
    const dataInput = document.getElementById('dataInput');
    const data = JSON.parse(dataInput.value);

    // Validate data structure
    if (!data.nails || !data.gridWidth || !data.gridHeight) {
      throw new Error('Invalid data structure. Must include nails, gridWidth, and gridHeight.');
    }

    // Update nail count display
    const nailCount = Object.keys(data.nails).length;
    document.getElementById('nailCount').textContent = nailCount;

    // Convert 2D data to 3D visualization
    scene.createNailsFrom2DData(data);

    console.log('Visualization updated successfully');
  } catch (error) {
    console.error('Error updating visualization:', error);
    alert('Error parsing JSON data:\n' + error.message);
  }
}

// Cleanup on page unload
window.addEventListener('beforeunload', () => {
  if (scene) {
    scene.dispose();
  }
});
