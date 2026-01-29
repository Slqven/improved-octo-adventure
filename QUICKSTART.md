# 🚀 Quick Start Guide

## Running the Project in VS Code

### Step 1: Open Terminal in VS Code
- Press `` Ctrl + ` `` (backtick) to open the integrated terminal
- Or go to **Terminal → New Terminal** from the menu

### Step 2: Start the Development Server

The server is already running! If you need to restart it:

```bash
npm run dev
```

### Step 3: Open in Browser

1. Look for the output in the terminal:
   ```
   ➜  Local:   http://localhost:5173/
   ```

2. **Ctrl + Click** on the URL to open it in your browser
   - Or manually navigate to `http://localhost:5173`

### Step 4: Experience the Journey

1. **Wait** for the universe to load (2-3 seconds)
2. **Click the beating heart** in the center
3. **Sit back and enjoy** the cinematic experience

---

## 🎬 What to Expect

### Timeline (Total: ~30 seconds)

1. **Universe Scene** (0:00 - Click)
   - Stars, galaxies, and nebulae
   - Beating heart in center
   - Click hint appears

2. **Black Hole** (Click - 0:08)
   - Matter collapses
   - 5-second countdown
   - Energy builds

3. **Big Bang** (0:08 - 0:11)
   - Explosive expansion
   - Screen flash
   - Camera shake

4. **New Universe** (0:11 - 0:19)
   - Fresh starfield
   - Date appears: "24th December 2023"
   - Camera rotates

5. **Journey to Earth** (0:19 - 0:27)
   - Text: "For you, my dear"
   - Smooth approach to Earth

6. **Heart Transformation** (0:27 - ∞)
   - Earth becomes beating heart
   - Eternal loop with embers
   - Volumetric glow

---

## ⚡ Quick Commands

### Development
```bash
npm run dev          # Start dev server
```

### Production
```bash
npm run build        # Build for production
npm run preview      # Preview production build
```

### Stop Server
- Press `Ctrl + C` in the terminal

---

## 🎨 Quick Customizations

### Change the Date
**File:** `src/scenes/Scene4NewUniverse.js` (Line 145)
```javascript
const dateText = "Your Date Here";
```

### Change the Message
**File:** `src/scenes/Scene5JourneyToEarth.js` (Line 78)
```javascript
textEl.innerHTML = 'Your message<br>goes here';
```

### Adjust Bloom Intensity
**File:** `src/main.js` (Line 30)
```javascript
this.bloomPass = new UnrealBloomPass(
    new THREE.Vector2(window.innerWidth, window.innerHeight),
    2.0,  // Increase this for more glow (default: 1.5)
    0.4,
    0.85
);
```

---

## 🐛 Common Issues

### Issue: Black screen
**Solution:** Check browser console (F12) for errors

### Issue: Heart not clickable
**Solution:** Wait for scene to fully load (look for "Click the heart" text)

### Issue: Low FPS
**Solution:** Close other applications, try Chrome browser

### Issue: Port already in use
**Solution:** 
```bash
# Kill the process or use a different port
npm run dev -- --port 3000
```

---

## 📱 Browser Compatibility

✅ **Recommended:**
- Chrome (latest)
- Firefox (latest)
- Edge (latest)

⚠️ **Limited Support:**
- Safari (may have performance issues)
- Mobile browsers (not optimized)

---

## 💡 Pro Tips

1. **Full Screen:** Press `F11` for immersive experience
2. **Best Quality:** Use a monitor with good color reproduction
3. **Lighting:** View in a dark room for maximum impact
4. **Audio:** Consider adding background music manually
5. **Recording:** Use OBS or similar to record the experience

---

## 🎯 Next Steps

1. **Customize the date** to your special date
2. **Personalize the message** in Scene 5
3. **Adjust timing** if scenes feel too fast/slow
4. **Share** with your loved one!

---

**Need help?** Check the full [README.md](README.md) for detailed documentation.

**Ready to share?** Run `npm run build` and deploy the `dist/` folder to any web host.

---

*Made with ❤️ - Enjoy the experience!*
