# 📁 Project Structure

```
cinematic-romantic-experience/
│
├── 📄 index.html                          # Main HTML entry point
├── 📄 package.json                        # Dependencies and scripts
├── 📄 .gitignore                          # Git ignore rules
│
├── 📚 Documentation/
│   ├── 📄 README.md                       # Complete project documentation
│   ├── 📄 QUICKSTART.md                   # Quick start guide
│   ├── 📄 TECHNICAL_NOTES.md              # Technical implementation details
│   └── 📄 PROJECT_STRUCTURE.md            # This file
│
├── 📂 src/                                # Source code directory
│   │
│   ├── 📄 main.js                         # Application entry point
│   │   ├── Initializes Three.js renderer
│   │   ├── Sets up post-processing
│   │   ├── Creates scene manager
│   │   └── Handles animation loop
│   │
│   ├── 📄 SceneManager.js                 # Scene orchestration
│   │   ├── Manages scene transitions
│   │   ├── Handles scene lifecycle
│   │   └── Coordinates interactions
│   │
│   ├── 📂 scenes/                         # Individual scene modules
│   │   │
│   │   ├── 📄 Scene1Universe.js          # Scene 1: Universe with Heart
│   │   │   ├── Creates starfield (15,000 stars)
│   │   │   ├── Generates nebulae and galaxies
│   │   │   ├── Renders beating heart
│   │   │   └── Handles heart click interaction
│   │   │
│   │   ├── 📄 Scene2BlackHole.js         # Scene 2: Black Hole Collapse
│   │   │   ├── Simulates gravitational collapse
│   │   │   ├── Creates black hole with accretion disk
│   │   │   ├── Displays 5-second countdown
│   │   │   └── Builds energy intensity
│   │   │
│   │   ├── 📄 Scene3BigBang.js           # Scene 3: Big Bang Explosion
│   │   │   ├── Explosive particle expansion
│   │   │   ├── Screen flash effect
│   │   │   ├── Camera shake
│   │   │   └── Shockwave animation
│   │   │
│   │   ├── 📄 Scene4NewUniverse.js       # Scene 4: New Universe
│   │   │   ├── Fresh starfield (20,000 stars)
│   │   │   ├── Multiple galaxy systems
│   │   │   ├── Date constellation display
│   │   │   └── Camera rotation
│   │   │
│   │   ├── 📄 Scene5JourneyToEarth.js    # Scene 5: Journey to Earth
│   │   │   ├── Renders Earth with atmosphere
│   │   │   ├── Smooth camera approach
│   │   │   ├── Text overlay: "For you, my dear"
│   │   │   └── Cinematic camera movement
│   │   │
│   │   └── 📄 Scene6HeartTransform.js    # Scene 6: Heart Transformation
│   │       ├── Earth-to-heart transformation
│   │       ├── Volumetric glow effects
│   │       ├── Particle ember system
│   │       └── Eternal heartbeat loop
│   │
│   └── 📂 shaders/                        # Custom GLSL shaders
│       └── 📄 GravityDistortionShader.js  # Gravitational lensing effect
│           ├── UV distortion
│           ├── Chromatic aberration
│           └── Event horizon darkness
│
├── 📂 node_modules/                       # Dependencies (auto-generated)
│   ├── three/                             # Three.js library
│   ├── gsap/                              # GSAP animation library
│   ├── postprocessing/                    # Post-processing effects
│   └── vite/                              # Build tool
│
└── 📂 dist/                               # Production build (generated)
    ├── index.html
    ├── assets/
    │   ├── index-[hash].js
    │   └── index-[hash].css
    └── ...

```

---

## 🎯 File Responsibilities

### Core Application Files

| File | Purpose | Key Features |
|------|---------|--------------|
| [`index.html`](../index.html) | HTML structure | Canvas element, overlay elements, styling |
| [`src/main.js`](../src/main.js) | Application core | Renderer setup, post-processing, animation loop |
| [`src/SceneManager.js`](../src/SceneManager.js) | Scene coordination | State management, transitions, lifecycle |

### Scene Files

| Scene | File | Duration | Auto-Progress |
|-------|------|----------|---------------|
| 1 | [`Scene1Universe.js`](../src/scenes/Scene1Universe.js) | Until click | ❌ (requires click) |
| 2 | [`Scene2BlackHole.js`](../src/scenes/Scene2BlackHole.js) | ~8 seconds | ✅ |
| 3 | [`Scene3BigBang.js`](../src/scenes/Scene3BigBang.js) | ~3 seconds | ✅ |
| 4 | [`Scene4NewUniverse.js`](../src/scenes/Scene4NewUniverse.js) | ~8 seconds | ✅ |
| 5 | [`Scene5JourneyToEarth.js`](../src/scenes/Scene5JourneyToEarth.js) | ~8 seconds | ✅ |
| 6 | [`Scene6HeartTransform.js`](../src/scenes/Scene6HeartTransform.js) | Infinite | ❌ (final scene) |

### Documentation Files

| File | Purpose | Audience |
|------|---------|----------|
| [`README.md`](../README.md) | Complete documentation | All users |
| [`QUICKSTART.md`](../QUICKSTART.md) | Quick setup guide | New users |
| [`TECHNICAL_NOTES.md`](../TECHNICAL_NOTES.md) | Implementation details | Developers |
| [`PROJECT_STRUCTURE.md`](../PROJECT_STRUCTURE.md) | File organization | Developers |

---

## 🔄 Data Flow

```
User Opens Browser
        ↓
    index.html loads
        ↓
    src/main.js executes
        ↓
    Three.js Renderer initialized
        ↓
    Post-processing pipeline setup
        ↓
    SceneManager created
        ↓
    Scene1Universe.enter()
        ↓
    [User clicks heart]
        ↓
    Scene1Universe.exit()
        ↓
    Scene2BlackHole.enter()
        ↓
    [Auto-progress after countdown]
        ↓
    Scene2BlackHole.exit()
        ↓
    Scene3BigBang.enter()
        ↓
    [Auto-progress after explosion]
        ↓
    Scene3BigBang.exit()
        ↓
    Scene4NewUniverse.enter()
        ↓
    [Auto-progress after 8 seconds]
        ↓
    Scene4NewUniverse.exit()
        ↓
    Scene5JourneyToEarth.enter()
        ↓
    [Auto-progress after journey]
        ↓
    Scene5JourneyToEarth.exit()
        ↓
    Scene6HeartTransform.enter()
        ↓
    [Infinite loop - final scene]
```

---

## 📊 Code Statistics

### Lines of Code (Approximate)

| Component | Lines | Complexity |
|-----------|-------|------------|
| Scene1Universe.js | ~350 | High |
| Scene2BlackHole.js | ~280 | High |
| Scene3BigBang.js | ~220 | Medium |
| Scene4NewUniverse.js | ~320 | High |
| Scene5JourneyToEarth.js | ~200 | Medium |
| Scene6HeartTransform.js | ~300 | High |
| main.js | ~100 | Low |
| SceneManager.js | ~60 | Low |
| **Total** | **~1,830** | - |

### Asset Counts

| Asset Type | Count | Total Size |
|------------|-------|------------|
| JavaScript Files | 9 | ~70 KB (unminified) |
| HTML Files | 1 | ~2 KB |
| Documentation | 4 | ~50 KB |
| Dependencies | 3 | ~2 MB |

---

## 🎨 Scene Object Hierarchy

### Scene 1: Universe
```
Scene
├── Stars (Points, 15,000 particles)
├── Nebulae (Mesh × 8)
├── Galaxies (Points × 12)
├── Heart (Mesh)
├── HeartLight (PointLight)
└── HeartGlow (Mesh)
```

### Scene 2: Black Hole
```
Scene
├── ParticleSystem (Points, 10,000 particles)
├── BlackHoleCenter (Mesh)
├── AccretionDisk (Mesh)
├── EventHorizon (Mesh)
└── BlackHoleLight (PointLight)
```

### Scene 3: Big Bang
```
Scene
├── ExplosionCenter (Mesh)
├── ExplosionLight (PointLight)
└── Shockwave (Points, 15,000 particles)
```

### Scene 4: New Universe
```
Scene
├── Stars (Points, 20,000 particles)
├── Galaxies (Points × 15)
├── Nebulae (Mesh × 10)
└── Constellation (Points, 200 particles)
```

### Scene 5: Journey to Earth
```
Scene
├── Stars (Points, 10,000 particles)
├── Earth (Mesh)
├── Clouds (Mesh)
├── Atmosphere (Mesh)
├── SunLight (DirectionalLight)
└── AmbientLight (AmbientLight)
```

### Scene 6: Heart Transform
```
Scene
├── Heart (Mesh)
├── InnerGlow (Mesh)
├── OuterGlow (Mesh)
├── HeartLight (PointLight)
├── Embers (Points, 500 particles)
├── MainLight (DirectionalLight)
└── AmbientLight (AmbientLight)
```

---

## 🔧 Build Process

### Development Mode
```bash
npm run dev
```
1. Vite starts dev server
2. Hot module replacement enabled
3. Source maps generated
4. No minification
5. Fast refresh on save

### Production Build
```bash
npm run build
```
1. Vite bundles all files
2. JavaScript minified
3. CSS extracted and minified
4. Assets optimized
5. Hash added to filenames
6. Output to `dist/` folder

### Preview Build
```bash
npm run preview
```
1. Serves production build locally
2. Tests optimized version
3. Verifies build integrity

---

## 📦 Dependencies

### Production Dependencies

| Package | Version | Purpose |
|---------|---------|---------|
| three | ^0.171.0 | 3D rendering engine |
| gsap | ^3.12.5 | Animation library |
| postprocessing | ^6.36.4 | Post-processing effects |

### Development Dependencies

| Package | Version | Purpose |
|---------|---------|---------|
| vite | ^6.0.7 | Build tool and dev server |

---

## 🎯 Entry Points

### For Users
1. Open `index.html` in browser (after running dev server)
2. Or visit `http://localhost:5173`

### For Developers
1. Start with [`src/main.js`](../src/main.js) - application initialization
2. Then [`src/SceneManager.js`](../src/SceneManager.js) - scene coordination
3. Then individual scene files - scene implementation

### For Customization
1. **Change date:** [`src/scenes/Scene4NewUniverse.js`](../src/scenes/Scene4NewUniverse.js) line 145
2. **Change message:** [`src/scenes/Scene5JourneyToEarth.js`](../src/scenes/Scene5JourneyToEarth.js) line 78
3. **Adjust bloom:** [`src/main.js`](../src/main.js) line 30
4. **Modify timing:** Each scene's `setTimeout` or animation duration

---

## 🚀 Deployment Structure

After running `npm run build`, the `dist/` folder contains:

```
dist/
├── index.html                    # Optimized HTML
├── assets/
│   ├── index-[hash].js          # Minified JavaScript bundle
│   └── index-[hash].css         # Extracted CSS (if any)
└── [other assets]
```

Upload the entire `dist/` folder to any static hosting service.

---

**This structure ensures clean separation of concerns, easy maintenance, and professional code organization.**
