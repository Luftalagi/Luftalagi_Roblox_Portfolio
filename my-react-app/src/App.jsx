import { useEffect, useRef, useState, useCallback } from 'react'
import { Link } from 'react-router-dom'
import heroImg from './assets/MB339ViewportScreenshot.png'
import wireframeImg from './assets/MB339ViewportScreenshotWireFrame.png'
import faaLogo from './assets/FAALogo.webp'
import robloxLogo from './assets/Roblox_Logo_2025.png'
import ucfLogo from './assets/UCF.png'
import luauLogo from './assets/Luau_Logo.png'
import pythonLogo from './assets/python.png'
import cLogo from './assets/C_Logo.png'
import jsLogo from './assets/JavaScript-logo.png'
import './App.css'

function useWireframeReveal(canvasRef, heroSectionRef) {
  const wireCanvasRef = useRef(null)
  const tempCanvasRef = useRef(null)
  const mousePos = useRef({ x: -9999, y: -9999 })
  const solidImgRef = useRef(null)
  const wireImgRef = useRef(null)
  const rafRef = useRef(null)
  const loadedRef = useRef(0)
  const revealRadius = 180

  const drawCover = useCallback((ctx, img, cw, ch, yBias = 0.5) => {
    const iw = img.width || img.naturalWidth
    const ih = img.height || img.naturalHeight
    const imgRatio = iw / ih
    const canvasRatio = cw / ch
    let sx, sy, sw, sh
    if (canvasRatio > imgRatio) {
      sw = iw
      sh = iw / canvasRatio
      sx = 0
      sy = (ih - sh) * yBias
    } else {
      sh = ih
      sw = ih * canvasRatio
      sx = (iw - sw) / 2
      sy = 0
    }
    ctx.drawImage(img, sx, sy, sw, sh, 0, 0, cw, ch)
  }, [])

  useEffect(() => {
    const canvas = canvasRef.current
    if (!canvas) return
    const ctx = canvas.getContext('2d')

    const solidImg = new Image()
    solidImg.src = heroImg
    solidImgRef.current = solidImg

    const wireImg = new Image()
    wireImg.src = wireframeImg
    wireImgRef.current = wireImg

    const onLoad = () => {
      loadedRef.current++
      if (loadedRef.current < 2) return

      canvas.width = window.innerWidth
      canvas.height = window.innerHeight

      wireCanvasRef.current = document.createElement('canvas')
      wireCanvasRef.current.width = canvas.width
      wireCanvasRef.current.height = canvas.height
      const wctx = wireCanvasRef.current.getContext('2d')
      drawCover(wctx, wireImg, canvas.width, canvas.height, 0.65)

      const imgData = wctx.getImageData(0, 0, canvas.width, canvas.height)
      const d = imgData.data
      for (let i = 0; i < d.length; i += 4) {
        d[i] = 255 - d[i]
        d[i + 1] = 255 - d[i + 1]
        d[i + 2] = 255 - d[i + 2]
      }
      wctx.putImageData(imgData, 0, 0)

      tempCanvasRef.current = document.createElement('canvas')
      tempCanvasRef.current.width = canvas.width
      tempCanvasRef.current.height = canvas.height

      draw()
    }

    solidImg.onload = onLoad
    wireImg.onload = onLoad

    const resize = () => {
      if (loadedRef.current < 2) return
      canvas.width = window.innerWidth
      canvas.height = window.innerHeight

      if (wireCanvasRef.current) {
        wireCanvasRef.current.width = canvas.width
        wireCanvasRef.current.height = canvas.height
        const wctx = wireCanvasRef.current.getContext('2d')
        drawCover(wctx, wireImgRef.current, canvas.width, canvas.height, 0.65)
        const imgData = wctx.getImageData(0, 0, canvas.width, canvas.height)
        const d = imgData.data
        for (let i = 0; i < d.length; i += 4) {
          d[i] = 255 - d[i]
          d[i + 1] = 255 - d[i + 1]
          d[i + 2] = 255 - d[i + 2]
        }
        wctx.putImageData(imgData, 0, 0)
      }
      if (tempCanvasRef.current) {
        tempCanvasRef.current.width = canvas.width
        tempCanvasRef.current.height = canvas.height
      }
    }

    window.addEventListener('resize', resize)

    const draw = () => {
      if (loadedRef.current < 2 || !wireCanvasRef.current) {
        rafRef.current = requestAnimationFrame(draw)
        return
      }
      const w = canvas.width
      const h = canvas.height

      ctx.clearRect(0, 0, w, h)
      ctx.save()
      ctx.filter = 'brightness(0.55) contrast(1.1)'
      drawCover(ctx, solidImgRef.current, w, h, 0.65)
      ctx.restore()

      const mx = mousePos.current.x
      const my = mousePos.current.y

      if (mx > -999 && tempCanvasRef.current) {
        const tc = tempCanvasRef.current
        const tctx = tc.getContext('2d')
        tctx.clearRect(0, 0, w, h)

        tctx.drawImage(wireCanvasRef.current, 0, 0)

        tctx.globalCompositeOperation = 'destination-in'
        const gradient = tctx.createRadialGradient(mx, my, 0, mx, my, revealRadius)
        gradient.addColorStop(0, 'rgba(255,255,255,1)')
        gradient.addColorStop(0.4, 'rgba(255,255,255,0.9)')
        gradient.addColorStop(0.7, 'rgba(255,255,255,0.4)')
        gradient.addColorStop(1, 'rgba(255,255,255,0)')
        tctx.fillStyle = gradient
        tctx.fillRect(0, 0, w, h)
        tctx.globalCompositeOperation = 'source-over'

        ctx.drawImage(tc, 0, 0)
      }

      rafRef.current = requestAnimationFrame(draw)
    }

    return () => {
      window.removeEventListener('resize', resize)
      if (rafRef.current) cancelAnimationFrame(rafRef.current)
    }
  }, [canvasRef, drawCover])

  useEffect(() => {
    const handleMouseMove = (e) => {
      const canvas = canvasRef.current
      const hero = heroSectionRef.current
      if (!canvas || !hero) return
      const heroRect = hero.getBoundingClientRect()
      if (e.clientY > heroRect.bottom || e.clientY < heroRect.top) {
        mousePos.current = { x: -9999, y: -9999 }
        return
      }
      const rect = canvas.getBoundingClientRect()
      const scaleX = canvas.width / rect.width
      const scaleY = canvas.height / rect.height
      mousePos.current = {
        x: (e.clientX - rect.left) * scaleX,
        y: (e.clientY - rect.top) * scaleY,
      }
    }

    const handleMouseLeave = () => {
      mousePos.current = { x: -9999, y: -9999 }
    }

    window.addEventListener('mousemove', handleMouseMove)
    document.addEventListener('mouseleave', handleMouseLeave)
    return () => {
      window.removeEventListener('mousemove', handleMouseMove)
      document.removeEventListener('mouseleave', handleMouseLeave)
    }
  }, [canvasRef, heroSectionRef])
}

function AnimatedCounter({ end, suffix = '', duration = 2000 }) {
  const [count, setCount] = useState(0)
  const ref = useRef(null)
  const counted = useRef(false)

  useEffect(() => {
    const el = ref.current
    if (!el) return
    const observer = new IntersectionObserver(([entry]) => {
      if (entry.isIntersecting && !counted.current) {
        counted.current = true
        const start = performance.now()
        const step = (now) => {
          const progress = Math.min((now - start) / duration, 1)
          const eased = 1 - Math.pow(1 - progress, 3)
          setCount(Math.floor(eased * end))
          if (progress < 1) requestAnimationFrame(step)
        }
        requestAnimationFrame(step)
      }
    }, { threshold: 0.5 })
    observer.observe(el)
    return () => observer.disconnect()
  }, [end, duration])

  return <span ref={ref}>{count.toLocaleString()}{suffix}</span>
}

const techStack = [
  { name: 'Luau', icon: <img src={luauLogo} alt="Luau" className="tech-logo" /> },
  { name: 'Python', icon: <img src={pythonLogo} alt="Python" className="tech-logo" /> },
  { name: 'C', icon: <img src={cLogo} alt="C" className="tech-logo" /> },
  { name: 'JavaScript', icon: <img src={jsLogo} alt="JavaScript" className="tech-logo" /> },
]

function App() {
  const heroRef = useRef(null)
  const heroCanvasRef = useRef(null)
  const particleCanvasRef = useRef(null)
  const glowRef = useRef(null)
  const scrollIndicatorRef = useRef(null)
  const particlesRef = useRef([])
  const rafRef = useRef(null)
  const [heroVisible, setHeroVisible] = useState(false)

  useWireframeReveal(heroCanvasRef, heroRef)

  const createParticle = useCallback((canvas) => {
    return {
      x: Math.random() * canvas.width,
      y: Math.random() * canvas.height,
      size: Math.random() * 1.5 + 0.3,
      speedX: (Math.random() - 0.5) * 0.2,
      speedY: -Math.random() * 0.4 - 0.05,
      opacity: Math.random() * 0.4 + 0.05,
      life: Math.random() * 300 + 150,
      maxLife: 0,
    }
  }, [])

  useEffect(() => {
    setTimeout(() => setHeroVisible(true), 300)
  }, [])

  useEffect(() => {
    const canvas = particleCanvasRef.current
    if (!canvas) return
    const ctx = canvas.getContext('2d')

    const resize = () => {
      canvas.width = window.innerWidth
      canvas.height = window.innerHeight
    }
    resize()
    window.addEventListener('resize', resize)

    for (let i = 0; i < 50; i++) {
      const p = createParticle(canvas)
      p.maxLife = p.life
      p.life = Math.random() * p.life
      particlesRef.current.push(p)
    }

    const animate = () => {
      ctx.clearRect(0, 0, canvas.width, canvas.height)

      particlesRef.current.forEach((p, i) => {
        p.x += p.speedX
        p.y += p.speedY
        p.life--

        if (p.life <= 0 || p.y < -10 || p.x < -10 || p.x > canvas.width + 10) {
          const newP = createParticle(canvas)
          newP.maxLife = newP.life
          newP.y = canvas.height + 10
          particlesRef.current[i] = newP
          return
        }

        const lifeRatio = p.life / p.maxLife
        const alpha = p.opacity * (lifeRatio < 0.3 ? lifeRatio / 0.3 : 1)
        ctx.fillStyle = `rgba(215, 215, 215, ${alpha})`
        ctx.beginPath()
        ctx.arc(p.x, p.y, p.size, 0, Math.PI * 2)
        ctx.fill()
      })

      rafRef.current = requestAnimationFrame(animate)
    }
    animate()

    return () => {
      window.removeEventListener('resize', resize)
      if (rafRef.current) cancelAnimationFrame(rafRef.current)
    }
  }, [createParticle])

  useEffect(() => {
    const handleScroll = () => {
      const scrollY = window.scrollY
      if (glowRef.current) {
        const vh = window.innerHeight
        glowRef.current.style.opacity = Math.min(scrollY / vh, 1) * 0.5
      }

      if (scrollIndicatorRef.current) {
        scrollIndicatorRef.current.style.opacity = Math.max(0, 1 - (scrollY / window.innerHeight) * 5)
      }
    }

    window.addEventListener('scroll', handleScroll, { passive: true })
    return () => window.removeEventListener('scroll', handleScroll)
  }, [])

  return (
    <>
      <nav className="nav">
        <Link to="/" className="nav-brand">
          <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" width="18" height="18"><path d="M3 12L12 3l9 9"/><path d="M9 21V12h6v9"/></svg>
        </Link>
        <div className="nav-links">
          <Link to="/scripting">SCRIPTING</Link>
          <Link to="/modeling">MODELING</Link>
          <Link to="/building">BUILDING</Link>
          <Link to="/environments">ENVIRONMENTS</Link>
        </div>
      </nav>

      <section className="hero" ref={heroRef}>
        <canvas className="hero-canvas" ref={heroCanvasRef} />

        <div className="hero-glow" ref={glowRef} />
        <div className="hero-vignette" />
        <div className="hero-gradient-top" />
        <div className="hero-gradient-bottom" />

        <canvas className="particles-canvas" ref={particleCanvasRef} />

        <div className={`hero-content ${heroVisible ? 'visible' : ''}`}>
          <div className="hero-tag">LUFTALAGI</div>
          <h1 className="hero-title">
            Crafting Virtual<br />
            <span className="accent">Worlds</span>
          </h1>
          <p className="hero-subtitle">
           Full stack developer doing all trades.
          </p>
        </div>

        <div className="scroll-indicator" ref={scrollIndicatorRef}>
          <span>Scroll</span>
          <div className="scroll-line" />
        </div>
      </section>

      <section className="credentials-section">
        <p className="section-label">Credentials</p>
        <div className="credentials-grid">
          <div className="credential-card">
            <div className="credential-icon">
              <img src={faaLogo} alt="FAA" className="faa-logo" />
            </div>
            <div className="credential-info">
              <h3 className="credential-title">Private Pilot License</h3>
              <p className="credential-issuer">Federal Aviation Administration</p>
            </div>
          </div>

          <div className="credential-card">
            <div className="credential-icon">
              <img src={ucfLogo} alt="UCF" className="credential-logo" />
            </div>
            <div className="credential-info">
              <h3 className="credential-title">Bachelor's in Computer Science</h3>
              <p className="credential-issuer">University of Central Florida · 2030</p>
            </div>
          </div>

          <div className="credential-card">
            <div className="credential-icon">
              <svg viewBox="0 0 120 80" xmlns="http://www.w3.org/2000/svg">
                <text x="60" y="45" textAnchor="middle" fontFamily="var(--heading)" fontSize="36" fontWeight="bold" fill="currentColor">8+</text>
                <text x="60" y="65" textAnchor="middle" fontFamily="var(--body)" fontSize="11" fill="currentColor">YEARS</text>
              </svg>
            </div>
            <div className="credential-info">
              <h3 className="credential-title">Development Experience</h3>
              <p className="credential-issuer">Since 2018</p>
            </div>
          </div>

          <div className="credential-card">
            <div className="credential-icon">
              <img src={robloxLogo} alt="Roblox" className="credential-logo" />
            </div>
            <div className="credential-info">
              <h3 className="credential-title">700K+ Place Visits</h3>
              <p className="credential-issuer">Roblox Platform</p>
            </div>
          </div>
        </div>
      </section>

      <section className="content-section">
        <p className="section-label">About</p>
        <h2 className="section-title">Built From The Ground Up</h2>
        <p className="section-text">
          Aviation has always been a passion of mine — from studying flight to modeling detailed aircraft in Blender.
          That same precision carries into everything I build on Roblox.{' '}
          <strong>I specialize in singular systems, not full games</strong> — weapon frameworks,
          vehicle mechanics, flight models, UI systems, and custom tools.
          If you need one thing done right, that's where I come in.
        </p>
        <div className="stats-row">
          <div className="stat">
            <span className="stat-number"><AnimatedCounter end={8} suffix="+" /></span>
            <span className="stat-label">Years Experience</span>
          </div>
          <div className="stat">
            <span className="stat-number"><AnimatedCounter end={700} suffix="K+" /></span>
            <span className="stat-label">Place Visits</span>
          </div>
          <div className="stat">
            <span className="stat-number"><AnimatedCounter end={50} suffix="+" /></span>
            <span className="stat-label">Systems Built</span>
          </div>
        </div>

        <div className="tech-carousel">
          <p className="tech-carousel-label">Tech Stack</p>
          <div className="tech-track">
            <div className="tech-track-inner">
              {[...techStack, ...techStack].map((tech, i) => (
                <div className="tech-item" key={i}>
                  <div className="tech-icon">{tech.icon}</div>
                  <span className="tech-name">{tech.name}</span>
                </div>
              ))}
            </div>
          </div>
        </div>

        <a href="#pricing" className="btn-primary">View Pricing</a>
      </section>

      <section className="pricing-section" id="pricing">
        <div className="section-inner">
          <p className="section-label">Pricing</p>
          <h2 className="section-title">Commission Rates</h2>
          <p className="section-text" style={{ margin: '0 auto 3rem' }}>
            All jobs start at <strong>$20 USD</strong> and scale with scope and complexity.
            No Robux — USD only.
          </p>

          <div className="pricing-grid">
            <div className="pricing-card">
              <h3 className="pricing-tier">Scripting</h3>
              <div className="pricing-price">From $20</div>
              <ul className="pricing-features">
                <li>Game mechanics &amp; systems</li>
                <li>UI/UX implementation</li>
                <li>Bug fixes &amp; optimization</li>
              </ul>
            </div>
            <div className="pricing-card featured">
              <h3 className="pricing-tier">Modeling</h3>
              <div className="pricing-price">From $30</div>
              <ul className="pricing-features">
                <li>Vehicles &amp; props</li>
                <li>Characters &amp; accessories</li>
                <li>Blender to Roblox pipeline</li>
              </ul>
            </div>
            <div className="pricing-card">
              <h3 className="pricing-tier">Building</h3>
              <div className="pricing-price">From $25</div>
              <ul className="pricing-features">
                <li>Maps &amp; interiors</li>
                <li>Structural layout</li>
                <li>Terrain sculpting</li>
              </ul>
            </div>
            <div className="pricing-card">
              <h3 className="pricing-tier">Environment</h3>
              <div className="pricing-price">From $35</div>
              <ul className="pricing-features">
                <li>Lighting &amp; atmosphere</li>
                <li>Post-processing</li>
                <li>Full scene composition</li>
              </ul>
            </div>
          </div>

          <div className="payment-methods">
            <p className="payment-label">Accepted Payments</p>
            <div className="payment-list">
              <div className="payment-icon" title="PayPal">
                <svg viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                  <path d="M7.076 21.337H2.47a.641.641 0 0 1-.633-.74L4.944.901C5.026.382 5.474 0 5.998 0h7.46c2.57 0 4.578.543 5.69 1.81 1.01 1.15 1.304 2.42 1.012 4.287-.023.143-.047.288-.077.437-.983 5.05-4.349 6.797-8.647 6.797H9.603c-.564 0-1.04.408-1.13.964L7.076 21.337z" fill="currentColor"/>
                  <path d="M18.429 7.706c-.025.162-.06.327-.1.494-1.076 5.525-4.745 7.438-9.44 7.438H7.024c-.573 0-1.058.414-1.148.98l-1.237 7.848a.548.548 0 0 0 .541.634h3.793c.502 0 .929-.362 1.007-.857l.042-.212.797-5.052.051-.276c.078-.496.505-.857 1.007-.857h.634c4.108 0 7.321-1.668 8.262-6.494.392-2.014.19-3.696-.85-4.878a4.04 4.04 0 0 0-1.294-.768z" fill="currentColor" opacity="0.7"/>
                </svg>
              </div>
              <div className="payment-icon" title="Venmo">
                <svg viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                  <path d="M20.727 0c.909 1.5 1.318 3.046 1.318 5.001 0 6.227-5.318 14.318-9.636 20H4.318L1.09 1.636l7.273-.682 1.727 13.91C12.182 11.318 14.5 6.182 14.5 3.409c0-1.864-.318-3.136-.818-4.091L20.727 0z" fill="currentColor"/>
                </svg>
              </div>
              <div className="payment-icon" title="CashApp">
                <svg viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                  <path d="M23.59 3.475A5.079 5.079 0 0 0 20.525.41C19.655.072 18.622 0 16.362 0H7.638c-2.26 0-3.293.072-4.163.41A5.079 5.079 0 0 0 .41 3.475C.072 4.345 0 5.378 0 7.638v8.724c0 2.26.072 3.293.41 4.163a5.079 5.079 0 0 0 3.065 3.065c.87.338 1.903.41 4.163.41h8.724c2.26 0 3.293-.072 4.163-.41a5.079 5.079 0 0 0 3.065-3.065c.338-.87.41-1.903.41-4.163V7.638c0-2.26-.072-3.293-.41-4.163zM17.793 14.09c-.347.548-.925.863-1.538.863a1.876 1.876 0 0 1-.497-.07l-1.904-.574c-.504-.152-.678-.068-.823.17l-.428.637a.586.586 0 0 1-.455.272.57.57 0 0 1-.478-.226l-.99-1.267-.075-.003c-1.627-.062-3.003-.725-3.898-1.864-.512-.651-.82-1.414-.92-2.23a.578.578 0 0 1 .165-.472.584.584 0 0 1 .464-.186l1.638.07c.266.012.415.174.468.329.16.465.437.88.812 1.202.552.474 1.273.63 1.708.388l.138-.077-1.003-1.803c-.458-.824-.627-1.73-.472-2.546.186-.97.812-1.741 1.717-2.112.443-.182.917-.27 1.387-.27.586 0 1.162.141 1.669.408.503.265.908.652 1.172 1.12a.58.58 0 0 1-.183.76l-1.308.855a.587.587 0 0 1-.766-.115 1.113 1.113 0 0 0-.505-.348c-.357-.136-.755-.035-.993.252-.152.184-.195.41-.12.621l.088.239 1.144 2.055c.123.22.097.405.073.483l1.584.474c.372.111.675.374.838.728a1.551 1.551 0 0 1 .055 1.16z" fill="currentColor"/>
                </svg>
              </div>
              <div className="payment-icon" title="Bank Transfer">
                <svg viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                  <path d="M2 20h20v2H2v-2zm1-7h2v7H3v-7zm4 0h2v7H7v-7zm4 0h2v7h-2v-7zm4 0h2v7h-2v-7zm4 0h2v7h-2v-7zM1 11l11-7 11 7v2H1v-2z" fill="currentColor"/>
                </svg>
              </div>
            </div>
          </div>

          <div className="pricing-cta">
            <p className="pricing-cta-text">Interested? Reach out to discuss your project.</p>
            <a href="https://discord.com/users/730589678868365393" target="_blank" rel="noopener noreferrer" className="btn-primary">Get In Touch</a>
            <p className="discord-tag">Luftalagi</p>
          </div>
        </div>
      </section>
    </>
  )
}

export default App
