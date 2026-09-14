import { useRef, useState, useEffect, useCallback } from 'react'
import { Link } from 'react-router-dom'
import '../App.css'

function VertexBackground() {
  const canvasRef = useRef(null)
  const verticesRef = useRef([])
  const rafRef = useRef(null)
  const mouseRef = useRef({ x: -1000, y: -1000 })
  const dprRef = useRef(1)

  const VERTEX_COUNT = 120
  const CONNECT_DIST = 160
  const MOUSE_DIST = 220
  const DOT_SIZE = 2

  const initVertices = useCallback((w, h) => {
    const verts = []
    for (let i = 0; i < VERTEX_COUNT; i++) {
      verts.push({
        x: Math.random() * w,
        y: Math.random() * h,
        vx: (Math.random() - 0.5) * 0.5,
        vy: (Math.random() - 0.5) * 0.5,
      })
    }
    verticesRef.current = verts
  }, [])

  useEffect(() => {
    const canvas = canvasRef.current
    if (!canvas) return
    const ctx = canvas.getContext('2d')
    const dpr = window.devicePixelRatio || 1
    dprRef.current = dpr

    const resize = () => {
      const w = window.innerWidth
      const h = window.innerHeight
      canvas.width = w * dpr
      canvas.height = h * dpr
      canvas.style.width = w + 'px'
      canvas.style.height = h + 'px'
      ctx.setTransform(dpr, 0, 0, dpr, 0, 0)
      if (!verticesRef.current.length) initVertices(w, h)
    }
    resize()
    window.addEventListener('resize', resize)

    const onMouse = (e) => {
      mouseRef.current = { x: e.clientX, y: e.clientY }
    }
    window.addEventListener('mousemove', onMouse)

    const animate = () => {
      const w = canvas.width / dpr
      const h = canvas.height / dpr
      ctx.clearRect(0, 0, w, h)
      const verts = verticesRef.current

      for (const v of verts) {
        v.x += v.vx
        v.y += v.vy
        if (v.x < 0 || v.x > w) v.vx *= -1
        if (v.y < 0 || v.y > h) v.vy *= -1
      }

      for (let i = 0; i < verts.length; i++) {
        for (let j = i + 1; j < verts.length; j++) {
          const dx = verts[i].x - verts[j].x
          const dy = verts[i].y - verts[j].y
          const dist = Math.sqrt(dx * dx + dy * dy)
          if (dist < CONNECT_DIST) {
            const alpha = (1 - dist / CONNECT_DIST) * 0.12
            ctx.strokeStyle = `rgba(230, 130, 0, ${alpha})`
            ctx.lineWidth = 0.5
            ctx.beginPath()
            ctx.moveTo(verts[i].x, verts[i].y)
            ctx.lineTo(verts[j].x, verts[j].y)
            ctx.stroke()
          }
        }
      }

      const mx = mouseRef.current.x
      const my = mouseRef.current.y
      for (const v of verts) {
        const dx = v.x - mx
        const dy = v.y - my
        const dist = Math.sqrt(dx * dx + dy * dy)
        const mouseFactor = dist < MOUSE_DIST ? 1 - dist / MOUSE_DIST : 0

        const alpha = 0.15 + mouseFactor * 0.3
        const size = DOT_SIZE + mouseFactor * 2
        ctx.fillStyle = `rgba(230, 130, 0, ${alpha})`
        ctx.beginPath()
        ctx.arc(v.x, v.y, size, 0, Math.PI * 2)
        ctx.fill()

        if (mouseFactor > 0) {
          ctx.strokeStyle = `rgba(230, 130, 0, ${mouseFactor * 0.1})`
          ctx.lineWidth = 0.5
          ctx.beginPath()
          ctx.moveTo(mx, my)
          ctx.lineTo(v.x, v.y)
          ctx.stroke()
        }
      }

      rafRef.current = requestAnimationFrame(animate)
    }

    rafRef.current = requestAnimationFrame(animate)
    return () => {
      cancelAnimationFrame(rafRef.current)
      window.removeEventListener('resize', resize)
      window.removeEventListener('mousemove', onMouse)
    }
  }, [initVertices])

  return <canvas ref={canvasRef} className="vertex-bg" />
}

// media item: { type: 'image', src } | { type: 'video', src } | { type: 'embed', src }
// For backwards compat, plain string = image
function normalizeMedia(images, videos, embeds) {
  const media = []
  if (images) images.forEach((src) => media.push({ type: 'image', src }))
  if (videos) videos.forEach((src) => media.push({ type: 'video', src }))
  if (embeds) embeds.forEach((src) => media.push({ type: 'embed', src }))
  return media
}

function MediaViewer({ media }) {
  const [index, setIndex] = useState(0)

  if (!media.length) {
    return (
      <div className="viewer-empty">
        <span>No media yet</span>
      </div>
    )
  }

  const prev = () => setIndex((i) => (i - 1 + media.length) % media.length)
  const next = () => setIndex((i) => (i + 1) % media.length)
  const item = media[index]

  return (
    <div className="viewer-wrapper">
      {media.length > 1 && (
        <button className="viewer-btn viewer-btn-left" onClick={prev}>&lsaquo;</button>
      )}

      {item.type === 'image' && (
        <img src={item.src} alt="" className="viewer-img" />
      )}
      {item.type === 'video' && (
        <video src={item.src} controls className="viewer-img" />
      )}
      {item.type === 'embed' && (
        <iframe
          src={item.src}
          className="viewer-embed"
          allow="autoplay; fullscreen"
          allowFullScreen
        />
      )}

      {media.length > 1 && (
        <button className="viewer-btn viewer-btn-right" onClick={next}>&rsaquo;</button>
      )}
      {media.length > 1 && (
        <div className="viewer-dots">
          {media.map((_, i) => (
            <span
              key={i}
              className={`viewer-dot${i === index ? ' active' : ''}`}
              onClick={() => setIndex(i)}
            />
          ))}
        </div>
      )}
    </div>
  )
}

export default function DisciplinePage({ tag, title, subtitle, tools, projects, activePage }) {
  return (
    <>
      <VertexBackground />
      <nav className="nav">
        <Link to="/" className="nav-brand">
          <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" width="18" height="18"><path d="M3 12L12 3l9 9"/><path d="M9 21V12h6v9"/></svg>
        </Link>
        <div className="nav-links">
          <Link to="/scripting" className={activePage === 'scripting' ? 'nav-active' : ''}>SCRIPTING</Link>
          <Link to="/modeling" className={activePage === 'modeling' ? 'nav-active' : ''}>MODELING</Link>
          <Link to="/building" className={activePage === 'building' ? 'nav-active' : ''}>BUILDING</Link>
          <Link to="/environments" className={activePage === 'environments' ? 'nav-active' : ''}>ENVIRONMENTS</Link>
        </div>
      </nav>

      <section className="page-hero">
        <div className="page-hero-content">
          <span className="hero-tag">{tag}</span>
          <h1 className="hero-title">{title}</h1>
          <p className="hero-subtitle">{subtitle}</p>
          {tools && tools.length > 0 && (
            <div className="hero-tools">
              {tools.map((tool, i) => (
                <div key={i} className="hero-tool">
                  <img src={tool.logo} alt={tool.name} className="hero-tool-logo" />
                  <span className="hero-tool-name">{tool.name}</span>
                </div>
              ))}
            </div>
          )}
        </div>
      </section>

      <section className="projects-section">
        {projects.map((project, i) => {
          const media = normalizeMedia(project.images, project.videos, project.embeds)
          return (
            <div key={i} className="project-card">
              <div className="project-header">
                <h3 className="project-name">{project.name}</h3>
                <span className="project-date">{project.date}</span>
              </div>
              <p className="project-details">{project.details}</p>
              <MediaViewer media={media} />
            </div>
          )
        })}
      </section>
    </>
  )
}
