import Lenis from '@studio-freight/lenis';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

// Register GSAP plugins
gsap.registerPlugin(ScrollTrigger);

// ===================================
// SMOOTH SCROLL SETUP (SMOOTHER)
// ===================================

const lenis = new Lenis({
    duration: 2.0,  // Increased for smoother scroll
    easing: (t) => Math.min(1, 1.001 - Math.pow(2, -10 * t)),
    smooth: true,
    smoothTouch: false,
    wheelMultiplier: 0.8,  // Slower scroll speed
});

function raf(time) {
    lenis.raf(time);
    requestAnimationFrame(raf);
}

requestAnimationFrame(raf);

// Connect Lenis with GSAP ScrollTrigger
lenis.on('scroll', ScrollTrigger.update);

gsap.ticker.add((time) => {
    lenis.raf(time * 1000);
});

gsap.ticker.lagSmoothing(0);

// ===================================
// SECTION 2: WHY SHE MATTERS (SEQUENTIAL)
// ===================================

const revealLines = gsap.utils.toArray('.reveal-line');

revealLines.forEach((line, index) => {
    gsap.fromTo(line,
        {
            opacity: 0,
            y: 40
        },
        {
            opacity: 1,
            y: 0,
            duration: 1.5,
            delay: index * 0.3,  // Sequential delay
            ease: 'power3.out',
            scrollTrigger: {
                trigger: '.why-matters',
                start: 'top 70%',
                toggleActions: 'play none none none'
            }
        }
    );
});

// ===================================
// SECTION 3: PHOTO GALLERY
// ===================================

// Animate section title with fade in
const sectionTitle = document.querySelector('.section-title');
if (sectionTitle) {
    gsap.fromTo(sectionTitle,
        {
            opacity: 0,
            y: 30
        },
        {
            opacity: 1,
            y: 0,
            duration: 1.5,
            ease: 'power2.out',
            scrollTrigger: {
                trigger: sectionTitle,
                start: 'top 80%',
                toggleActions: 'play none none none'
            }
        }
    );
}

// Animate gallery items with stagger
const galleryItems = gsap.utils.toArray('.gallery-item');

galleryItems.forEach((item, index) => {
    gsap.fromTo(item,
        {
            opacity: 0,
            y: 60,
            scale: 0.95
        },
        {
            opacity: 1,
            y: 0,
            scale: 1,
            duration: 1.2,
            delay: index * 0.1,  // Staggered delay
            ease: 'power3.out',
            scrollTrigger: {
                trigger: item,
                start: 'top 90%',
                toggleActions: 'play none none none'
            }
        }
    );

    // Add subtle parallax to images
    const image = item.querySelector('.gallery-image');
    if (image) {
        gsap.to(image, {
            y: -30,
            ease: 'none',
            scrollTrigger: {
                trigger: item,
                start: 'top bottom',
                end: 'bottom top',
                scrub: true,
            }
        });
    }
});

// Animate gallery caption
const galleryCaption = document.querySelector('.gallery-caption');
if (galleryCaption) {
    gsap.fromTo(galleryCaption,
        {
            opacity: 0,
            y: 20
        },
        {
            opacity: 1,
            y: 0,
            duration: 1.5,
            ease: 'power2.out',
            scrollTrigger: {
                trigger: galleryCaption,
                start: 'top 85%',
                toggleActions: 'play none none none'
            }
        }
    );
}

// ===================================
// SECTION 4: WORDS FROM THE HEART (SEQUENTIAL)
// ===================================

const wordLines = gsap.utils.toArray('.word-line');

wordLines.forEach((line, index) => {
    gsap.fromTo(line,
        {
            opacity: 0,
            y: 30
        },
        {
            opacity: 1,
            y: 0,
            duration: 1.2,
            delay: index * 0.25,  // Sequential delay
            ease: 'power3.out',
            scrollTrigger: {
                trigger: '.words-heart',
                start: 'top 70%',
                toggleActions: 'play none none none'
            }
        }
    );
});

// ===================================
// SECTION 5: QUIET PAUSE
// ===================================

const pauseText = document.querySelector('.pause-text');

if (pauseText) {
    gsap.fromTo(pauseText,
        {
            opacity: 0,
            scale: 0.8
        },
        {
            opacity: 0.8,
            scale: 1,
            duration: 2,
            ease: 'power1.inOut',
            scrollTrigger: {
                trigger: pauseText,
                start: 'top 70%',
                toggleActions: 'play none none none'
            }
        }
    );
}

// ===================================
// SECTION 6: THE JOURNEY (SEQUENTIAL)
// ===================================

const journeyLines = gsap.utils.toArray('.journey-line');

journeyLines.forEach((line, index) => {
    gsap.fromTo(line,
        {
            opacity: 0,
            y: 40
        },
        {
            opacity: 1,
            y: 0,
            duration: 1.5,
            delay: index * 0.3,  // Sequential delay
            ease: 'power3.out',
            scrollTrigger: {
                trigger: '.journey',
                start: 'top 70%',
                toggleActions: 'play none none none'
            }
        }
    );
});

// ===================================
// SECTION 7: THE PROMISE
// ===================================

const promiseText = document.querySelector('.promise-text');

if (promiseText) {
    gsap.fromTo(promiseText,
        {
            opacity: 0,
            scale: 0.9
        },
        {
            opacity: 1,
            scale: 1,
            duration: 2,
            ease: 'power3.out',
            scrollTrigger: {
                trigger: promiseText,
                start: 'top 75%',
                toggleActions: 'play none none none'
            }
        }
    );
}

// ===================================
// SECTION 8: CLOSING (SEQUENTIAL)
// ===================================

const closingText = document.querySelector('.closing-text');
const closingTextSmall = gsap.utils.toArray('.closing-text-small');
const infinityText = document.querySelector('.infinity-text');

if (closingText) {
    gsap.fromTo(closingText,
        {
            opacity: 0,
            y: 30
        },
        {
            opacity: 1,
            y: 0,
            duration: 2,
            ease: 'power2.out',
            scrollTrigger: {
                trigger: closingText,
                start: 'top 75%',
                toggleActions: 'play none none none'
            }
        }
    );
}

closingTextSmall.forEach((text, index) => {
    gsap.fromTo(text,
        {
            opacity: 0,
            y: 20
        },
        {
            opacity: 0.7,
            y: 0,
            duration: 1.5,
            delay: 0.5 + (index * 0.3),  // Sequential delay
            ease: 'power2.out',
            scrollTrigger: {
                trigger: closingText,
                start: 'top 75%',
                toggleActions: 'play none none none'
            }
        }
    );
});

if (infinityText) {
    gsap.fromTo(infinityText,
        {
            opacity: 0,
            y: 20
        },
        {
            opacity: 1,
            y: 0,
            duration: 2,
            delay: 2,  // Appears last
            ease: 'power2.out',
            scrollTrigger: {
                trigger: closingText,
                start: 'top 75%',
                toggleActions: 'play none none none'
            }
        }
    );
}

// ===================================
// HERO BACKGROUND ANIMATION
// ===================================

gsap.to('.hero::before', {
    backgroundPosition: '60% 60%',
    ease: 'none',
    scrollTrigger: {
        trigger: '.hero',
        start: 'top top',
        end: 'bottom top',
        scrub: true,
    }
});

// ===================================
// PROMISE BACKGROUND ANIMATION
// ===================================

gsap.to('.promise::before', {
    scale: 1.2,
    opacity: 0.3,
    ease: 'none',
    scrollTrigger: {
        trigger: '.promise',
        start: 'top bottom',
        end: 'bottom top',
        scrub: true,
    }
});

// ===================================
// CONSOLE MESSAGE
// ===================================

console.log('%c💝 Made with love and devotion', 'color: #d4af9b; font-size: 18px; font-family: serif; font-style: italic;');
