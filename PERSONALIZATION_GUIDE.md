# 💝 Personalization Guide

This guide will help you customize the love website to make it truly yours.

## 📝 Changing the Text

### Section 1: Opening
**File:** [`index.html`](index.html) (Line 18)

```html
<h1 class="hero-title">This is for you.</h1>
```

**Suggestions:**
- "For you, always."
- "To my love."
- "You are everything."

---

### Section 2: Why She Matters
**File:** [`index.html`](index.html) (Lines 25-29)

```html
<p class="reveal-line">There are moments when I pause,</p>
<p class="reveal-line">and I realize how lucky I am</p>
<p class="reveal-line">to know someone like you.</p>
```

**Tips:**
- Keep lines short (5-10 words)
- Use natural, conversational language
- Focus on specific feelings
- 3-5 lines work best

---

### Section 3: Memory Caption
**File:** [`index.html`](index.html) (Line 38)

```html
<p class="image-caption">December 24th, 2023</p>
```

**Change to:**
- Your special date
- A meaningful location
- A simple phrase

---

### Section 4: Words from the Heart
**File:** [`index.html`](index.html) (Lines 45-51)

```html
<p class="word-line">I love the way you laugh,</p>
<p class="word-line">even at the smallest things.</p>
<!-- etc. -->
```

**Tips:**
- Use "I love..." or "I notice..." or "I cherish..."
- Be specific and personal
- 5-8 lines recommended
- Each line should stand alone

---

### Section 5: Quiet Pause
**File:** [`index.html`](index.html) (Line 60)

```html
<p class="pause-text">...</p>
```

**Options:**
- Keep as "..."
- Use a single word: "Always." or "Forever."
- Or a symbol: "♥" or "∞"

---

### Section 6: The Journey
**File:** [`index.html`](index.html) (Lines 68-72)

```html
<p class="journey-line">Time moves differently with you.</p>
<!-- etc. -->
```

**Tips:**
- Use metaphorical language
- Talk about time, growth, or shared experiences
- 4-6 lines work well

---

### Section 7: The Promise
**File:** [`index.html`](index.html) (Line 81)

```html
<h2 class="promise-text">I choose you,<br>every day.</h2>
```

**This is the emotional peak. Keep it:**
- Short (1-2 lines)
- Powerful
- Sincere

**Suggestions:**
- "You are my home."
- "I choose you,<br>always."
- "Forever grateful<br>for you."

---

### Section 8: Closing
**File:** [`index.html`](index.html) (Line 90)

```html
<p class="closing-text">I'm glad I get to love you.</p>
```

**Tips:**
- End with warmth
- Keep it simple
- This is the final impression

**Suggestions:**
- "Thank you for being you."
- "I love you, always."
- "You are my favorite person."

---

## 🖼️ Changing the Image

### Current Image
**File:** [`index.html`](index.html) (Line 35)

```html
<div class="parallax-image" style="background-image: url('/Slike/16e545fd-ec95-4bf7-9b43-35c223d10b6b.jfif');"></div>
```

### To Change:

1. **Add your image** to the `Slike/` folder (or create a new folder like `images/`)

2. **Update the path:**
```html
<div class="parallax-image" style="background-image: url('/images/your-photo.jpg');"></div>
```

### Image Tips:
- Use high-quality images (at least 1920px wide)
- Landscape orientation works best
- Soft, warm lighting is ideal
- Avoid busy backgrounds

---

## 🎨 Changing Colors

### Color Palette
**File:** [`src/style.css`](src/style.css)

Current colors:
- **Background:** `#faf8f5` (soft cream)
- **Text:** `#2a2a2a` (charcoal)
- **Accent:** `#d4af9b` (rose gold)

### To Change:

**Background colors:**
```css
/* Line 14 */
background-color: #faf8f5; /* Change this */
```

**Accent color (promise section):**
```css
/* Line 253 */
color: #d4af9b; /* Change this */
```

### Recommended Palettes:

**Warm & Romantic:**
- Background: `#faf8f5`
- Text: `#2a2a2a`
- Accent: `#d4af9b`

**Cool & Elegant:**
- Background: `#f5f7fa`
- Text: `#2c3e50`
- Accent: `#95a5a6`

**Soft & Dreamy:**
- Background: `#fff9f5`
- Text: `#3a3a3a`
- Accent: `#e8b4b8`

---

## ✍️ Changing Fonts

### Current Fonts
- **Serif:** Cormorant Garamond (emotional moments)
- **Sans-serif:** Inter (body text)

### To Change:

1. **Visit [Google Fonts](https://fonts.google.com/)**

2. **Choose your fonts**

3. **Update the link in [`index.html`](index.html) (Line 8):**
```html
<link href="https://fonts.googleapis.com/css2?family=YourFont&display=swap" rel="stylesheet">
```

4. **Update CSS in [`src/style.css`](src/style.css):**
```css
/* Line 28 */
font-family: 'YourSerifFont', Georgia, serif;

/* Line 33 */
font-family: 'YourSansFont', sans-serif;
```

### Font Recommendations:

**Elegant Serifs:**
- Cormorant Garamond (current)
- Playfair Display
- Crimson Text
- Lora

**Clean Sans-serifs:**
- Inter (current)
- Work Sans
- Nunito Sans
- DM Sans

---

## ⏱️ Adjusting Animation Timing

### Making Animations Slower (More Emotional)

**File:** [`src/app.js`](src/app.js)

**Smooth scroll speed (Line 10):**
```javascript
duration: 1.2, // Increase for slower scroll (try 1.5 or 2.0)
```

**Text reveal duration (Lines 35, 70, 105):**
```javascript
duration: 1.2, // Increase for slower fade-in
```

**Scrub speed (Lines 40, 75, 110):**
```javascript
scrub: 1, // Increase for slower animation (try 2 or 3)
```

### Making Animations Faster

- Decrease `duration` values
- Decrease `scrub` values
- Adjust `start` and `end` positions

---

## 📱 Testing on Mobile

### Preview on Your Phone:

1. **Find your local IP:**
   - Windows: `ipconfig` in terminal
   - Mac/Linux: `ifconfig` in terminal

2. **Access from phone:**
   - Go to `http://YOUR_IP:5173`
   - Example: `http://192.168.1.100:5173`

3. **Make sure:**
   - Phone and computer are on same WiFi
   - Firewall allows connections

---

## 🎵 Adding Background Music (Optional)

### To Add Audio:

1. **Add audio file** to project (e.g., `audio/background.mp3`)

2. **Add to [`index.html`](index.html) before closing `</body>`:**
```html
<audio id="bgMusic" loop>
    <source src="/audio/background.mp3" type="audio/mpeg">
</audio>

<button id="musicToggle" style="position: fixed; bottom: 20px; right: 20px; z-index: 1000;">
    🔇 Music
</button>
```

3. **Add JavaScript to [`src/app.js`](src/app.js):**
```javascript
const music = document.getElementById('bgMusic');
const toggle = document.getElementById('musicToggle');

toggle.addEventListener('click', () => {
    if (music.paused) {
        music.play();
        toggle.textContent = '🔊 Music';
    } else {
        music.pause();
        toggle.textContent = '🔇 Music';
    }
});
```

### Music Tips:
- Use soft, ambient music
- Keep volume low (0.3-0.5)
- Never auto-play
- Provide clear toggle button

---

## 🚀 Building for Production

### To Create Final Version:

```bash
npm run build
```

This creates a `dist/` folder with optimized files.

### To Deploy:

Upload the `dist/` folder to:
- **Netlify** (drag & drop)
- **Vercel** (connect GitHub)
- **GitHub Pages**
- Any web host

---

## 💡 Tips for Personalization

### Do:
- ✅ Use your own words
- ✅ Be specific and personal
- ✅ Keep it simple
- ✅ Test on mobile
- ✅ Read it out loud

### Don't:
- ❌ Use clichés
- ❌ Make it too long
- ❌ Overcomplicate
- ❌ Use too many effects
- ❌ Forget to proofread

---

## 🎯 Final Checklist

Before sharing:

- [ ] All text is personalized
- [ ] Image is changed to your photo
- [ ] Date/caption is correct
- [ ] Tested on desktop
- [ ] Tested on mobile
- [ ] Proofread everything
- [ ] Animations feel right
- [ ] Colors match your style

---

## 💝 Remember

This is a love letter. The words matter more than the effects.

**Be honest. Be specific. Be you.**

---

**Need help?** Check the main [README.md](README.md) for technical details.
