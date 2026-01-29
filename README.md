# 💝 A Love Letter Website

An elegant, scroll-driven storytelling website designed as a romantic gift. Built with modern web technologies and thoughtful design.

## 🎨 Design Philosophy

This is not a flashy tech demo. This is **slow, intentional storytelling**.

**Prioritizes:**
- White space and breathing room
- Beautiful typography
- Smooth scroll-based animation
- Subtle, meaningful motion
- High-quality imagery
- Emotional resonance

**Inspired by:**
- Apple product pages
- Personal love letters
- Modern editorial design
- Intimate storytelling

## ✨ Features

- **8 Thoughtfully Crafted Sections** - Each with its own emotional purpose
- **Smooth Scroll Animations** - Using GSAP ScrollTrigger
- **Parallax Effects** - Subtle depth and motion
- **Elegant Typography** - Serif for emotion, sans-serif for clarity
- **Fully Responsive** - Beautiful on desktop and mobile
- **Easy to Personalize** - Change text, images, and colors

## 🛠️ Tech Stack

- **HTML5** - Semantic structure
- **CSS3** - Modern styling with custom properties
- **JavaScript (ES6+)** - Clean, modular code
- **GSAP** - Professional-grade animations
- **Lenis** - Buttery smooth scrolling
- **Vite** - Fast development and optimized builds

## 📦 Project Structure

```
love-letter-website/
├── index.html              # Main HTML structure
├── src/
│   ├── style.css          # All styles
│   └── app.js             # Animations and interactions
├── Slike/                 # Images folder
├── package.json           # Dependencies
└── README.md              # This file
```

## 🚀 Getting Started

### Prerequisites
- Node.js (v16 or higher)
- npm or yarn

### Installation

1. **Navigate to the project:**
   ```bash
   cd f:/Desktop/25m
   ```

2. **Install dependencies:**
   ```bash
   npm install
   ```

3. **Start development server:**
   ```bash
   npm run dev
   ```

4. **Open in browser:**
   - Go to `http://localhost:5173`

### Building for Production

```bash
npm run build
```

Output will be in the `dist/` folder, ready to deploy.

## 📝 Personalization

See the complete [PERSONALIZATION_GUIDE.md](PERSONALIZATION_GUIDE.md) for detailed instructions on:

- Changing text in all sections
- Replacing the image
- Adjusting colors
- Modifying fonts
- Tweaking animation timing
- Adding background music

### Quick Personalization

**Change the main text:**
Edit [`index.html`](index.html) - all text is clearly marked by section

**Change the image:**
Replace the image path in Section 3 (line 35)

**Change colors:**
Edit [`src/style.css`](src/style.css) - search for color values

## 🎯 The 8 Sections

### 1. Opening
Full-screen hero with a simple, powerful message.

### 2. Why She Matters
Emotional depth revealed line by line as you scroll.

### 3. Memory / Moment
A beautiful image with parallax effect and caption.

### 4. Words from the Heart
Specific, personal observations that show you notice the details.

### 5. Quiet Pause
White space to let emotion settle.

### 6. The Journey
Metaphorical language about time and growth together.

### 7. The Promise
The emotional peak - short, powerful, sincere.

### 8. Closing
A final, warm message to end on.

## 🎨 Design Details

### Color Palette
- **Background:** Soft cream (#faf8f5)
- **Text:** Charcoal (#2a2a2a)
- **Accent:** Rose gold (#d4af9b)

### Typography
- **Serif:** Cormorant Garamond (emotional moments)
- **Sans-serif:** Inter (body text)

### Animation Principles
- **Gentle fades** - Nothing harsh or sudden
- **Parallax scrolling** - Subtle depth
- **Sequential reveals** - Text appears thoughtfully
- **Smooth scrubbing** - Animations tied to scroll position

## 📱 Mobile Responsive

The site is fully responsive and tested on:
- Desktop (1920px+)
- Tablet (768px - 1024px)
- Mobile (320px - 767px)

Touch scrolling works beautifully on mobile devices.

## 🎵 Optional: Adding Music

See [PERSONALIZATION_GUIDE.md](PERSONALIZATION_GUIDE.md#-adding-background-music-optional) for instructions on adding ambient background music.

**Important:** Never auto-play audio. Always require user interaction.

## 🚢 Deployment

### Recommended Hosts:

**Netlify (Easiest):**
1. Drag and drop the `dist/` folder
2. Done!

**Vercel:**
1. Connect your GitHub repo
2. Auto-deploys on push

**GitHub Pages:**
1. Push `dist/` folder to `gh-pages` branch
2. Enable in repository settings

## 💡 Tips for Success

### Do:
- ✅ Use your own words
- ✅ Be specific and personal
- ✅ Keep it simple
- ✅ Test on mobile
- ✅ Read it out loud before sharing

### Don't:
- ❌ Use clichés
- ❌ Make sections too long
- ❌ Overcomplicate the design
- ❌ Add too many effects
- ❌ Forget to proofread

## 🎯 Quality Bar

The site should feel:
- **Modern** - Clean, contemporary design
- **Premium** - Attention to detail
- **Emotionally mature** - Sincere, not cheesy
- **Intimate** - Personal and thoughtful

**Nothing flashy. Nothing gimmicky.**

This is a love letter, not a spectacle.

## 📚 Documentation

- [PERSONALIZATION_GUIDE.md](PERSONALIZATION_GUIDE.md) - How to customize everything
- [QUICKSTART.md](QUICKSTART.md) - Quick setup guide

## 🔧 Development Commands

```bash
npm run dev      # Start development server
npm run build    # Build for production
npm run preview  # Preview production build
```

## 🌟 Credits

**Fonts:**
- [Cormorant Garamond](https://fonts.google.com/specimen/Cormorant+Garamond) by Christian Thalmann
- [Inter](https://fonts.google.com/specimen/Inter) by Rasmus Andersson

**Libraries:**
- [GSAP](https://greensock.com/gsap/) - Animation library
- [Lenis](https://github.com/studio-freight/lenis) - Smooth scroll
- [Vite](https://vitejs.dev/) - Build tool

## 💝 Final Note

This website is designed to be a **private gift** for someone you love deeply.

The words matter more than the effects.
The emotion matters more than the technology.

**Be honest. Be specific. Be you.**

---

*Made with love and careful attention to detail.*
