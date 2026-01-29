'use client'

import { useState, useEffect, useRef } from 'react'
import LightRays from '@/components/LightRays'

export default function Home() {
  const [isExpanded, setIsExpanded] = useState(false)
  const [timerText, setTimerText] = useState('')
  const canvasRef = useRef<HTMLCanvasElement>(null)
  const particlesRef = useRef<any[]>([])

  useEffect(() => {
    const canvas = canvasRef.current
    if (!canvas) return

    canvas.width = window.innerWidth
    canvas.height = window.innerHeight

    const handleResize = () => {
      if (canvas) {
        canvas.width = window.innerWidth
        canvas.height = window.innerHeight
      }
    }

    window.addEventListener('resize', handleResize)
    return () => window.removeEventListener('resize', handleResize)
  }, [])

  useEffect(() => {
    const updateTimer = () => {
      const startDate = new Date(2023, 11, 24)
      const now = new Date()
      const diff = now.getTime() - startDate.getTime()

      const days = Math.floor(diff / (1000 * 60 * 60 * 24))
      const months = Math.floor(days / 30.44)
      const remainingDays = days % Math.floor(30.44)
      const seconds = Math.floor((diff / 1000) % 60)

      setTimerText(`${months}M ${remainingDays}D ${seconds}S`)
    }

    updateTimer()
    const interval = setInterval(updateTimer, 1000)
    return () => clearInterval(interval)
  }, [])

  const handleHeartClick = () => {
    if (!isExpanded) {
      setIsExpanded(true)
      createFlameSweep()
      createHeartFlames()
    }
  }

  const createFlameSweep = () => {
    const centerX = window.innerWidth / 2
    const centerY = window.innerHeight / 2

    for (let i = 0; i < 100; i++) {
      setTimeout(() => {
        const angle = (Math.PI * 2 / 100) * i
        const speed = 3 + Math.random() * 2

        particlesRef.current.push({
          x: centerX,
          y: centerY,
          vx: Math.cos(angle) * speed,
          vy: Math.sin(angle) * speed,
          life: 1,
          size: 20 + Math.random() * 30,
          type: 'sweep',
        })
      }, i * 5)
    }
  }

  const createHeartFlames = () => {
    const interval = setInterval(() => {
      if (isExpanded) {
        for (let i = 0; i < 3; i++) {
          const angle = Math.random() * Math.PI * 2
          const speed = 1 + Math.random() * 2

          particlesRef.current.push({
            x: window.innerWidth / 2,
            y: window.innerHeight / 2,
            vx: Math.cos(angle) * speed,
            vy: Math.sin(angle) * speed - 1,
            life: 1,
            size: 15 + Math.random() * 25,
            type: 'heart',
          })
        }
      }
    }, 50)

    return () => clearInterval(interval)
  }

  useEffect(() => {
    const canvas = canvasRef.current
    if (!canvas) return

    const ctx = canvas.getContext('2d')
    if (!ctx) return

    const animate = () => {
      ctx.clearRect(0, 0, canvas.width, canvas.height)

      for (let i = particlesRef.current.length - 1; i >= 0; i--) {
        const p = particlesRef.current[i]

        p.x += p.vx
        p.y += p.vy
        p.vy -= 0.1
        p.life -= 0.015

        if (p.life <= 0) {
          particlesRef.current.splice(i, 1)
          continue
        }

        const gradient = ctx.createRadialGradient(p.x, p.y, 0, p.x, p.y, p.size)

        if (p.type === 'sweep') {
          gradient.addColorStop(0, `rgba(255, 200, 0, ${p.life * 0.8})`)
          gradient.addColorStop(0.5, `rgba(255, 100, 0, ${p.life * 0.5})`)
          gradient.addColorStop(1, `rgba(255, 0, 0, ${p.life * 0.2})`)
        } else {
          gradient.addColorStop(0, `rgba(255, 255, 100, ${p.life * 0.9})`)
          gradient.addColorStop(0.5, `rgba(255, 150, 0, ${p.life * 0.6})`)
          gradient.addColorStop(1, `rgba(200, 50, 0, ${p.life * 0.1})`)
        }

        ctx.fillStyle = gradient
        ctx.beginPath()
        ctx.arc(p.x, p.y, p.size, 0, Math.PI * 2)
        ctx.fill()
      }

      requestAnimationFrame(animate)
    }

    animate()
  }, [])

  return (
    <div className="w-full h-screen bg-black flex items-center justify-center relative overflow-hidden">
      <canvas
        ref={canvasRef}
        className="absolute inset-0 z-0"
      />

      {!isExpanded && (
        <div className="absolute inset-0 z-0">
          <LightRays
            raysOrigin="top-center"
            raysColor="#ffffff"
            raysSpeed={1}
            lightSpread={1}
            rayLength={2}
            pulsating={false}
            fadeDistance={1}
            saturation={1}
            followMouse
            mouseInfluence={0.1}
            noiseAmount={0}
            distortion={0}
          />
        </div>
      )}

      <div
        className={`relative z-10 cursor-pointer transition-all duration-500 ${
          isExpanded ? 'scale-150' : 'scale-100'
        }`}
        onClick={handleHeartClick}
      >
        <svg
          width={isExpanded ? 120 : 80}
          height={isExpanded ? 120 : 80}
          viewBox="0 0 100 100"
          xmlns="http://www.w3.org/2000/svg"
          className={`drop-shadow-lg ${
            isExpanded
              ? 'drop-shadow-[0_0_40px_rgba(255,100,150,1)]'
              : 'drop-shadow-[0_0_20px_rgba(255,100,150,0.8)] animate-pulse'
          }`}
          style={
            isExpanded
              ? {}
              : {
                  animation: 'beat 1.5s ease-in-out infinite',
                }
          }
        >
          <path
            d="M50 90 C25 75, 10 60, 10 45 C10 30, 20 20, 30 20 C40 20, 50 30, 50 30 C50 30, 60 20, 70 20 C80 20, 90 30, 90 45 C90 60, 75 75, 50 90 Z"
            fill="#FF6496"
            stroke="#FF0066"
            strokeWidth="1"
          />
        </svg>

        {isExpanded && (
          <div className="absolute inset-0 flex items-center justify-center text-white text-sm font-bold text-center pointer-events-none">
            {timerText}
          </div>
        )}
      </div>

      <style>{`
        @keyframes beat {
          0%, 100% { transform: scale(1); }
          25% { transform: scale(1.1); }
          50% { transform: scale(1); }
        }
      `}</style>
    </div>
  )
}
