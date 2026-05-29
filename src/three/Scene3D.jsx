import { useRef, useEffect } from 'react'

/* Pure canvas-based 3D wireframe scene — no R3F dependency needed,
   runs on a fixed canvas behind the whole app */

const PHI = (1 + Math.sqrt(5)) / 2

const ICO_V = [
  [0,1,PHI],[0,-1,PHI],[0,1,-PHI],[0,-1,-PHI],
  [1,PHI,0],[-1,PHI,0],[1,-PHI,0],[-1,-PHI,0],
  [PHI,0,1],[PHI,0,-1],[-PHI,0,1],[-PHI,0,-1],
].map(v => { const l = Math.hypot(...v); return v.map(x => x / l) })

const ICO_E = [
  [0,1],[0,4],[0,5],[0,8],[0,10],[1,6],[1,7],[1,8],[1,10],
  [2,3],[2,4],[2,5],[2,9],[2,11],[3,6],[3,7],[3,9],[3,11],
  [4,5],[4,8],[4,9],[5,10],[5,11],[6,7],[6,8],[6,9],[7,10],[7,11],[8,9],[10,11],
]

const TET_V = [[1,1,1],[1,-1,-1],[-1,1,-1],[-1,-1,1]]
const TET_E = [[0,1],[0,2],[0,3],[1,2],[1,3],[2,3]]

const OCT_V = [[1,0,0],[-1,0,0],[0,1,0],[0,-1,0],[0,0,1],[0,0,-1]]
const OCT_E = [[0,2],[0,3],[0,4],[0,5],[1,2],[1,3],[1,4],[1,5],[2,4],[2,5],[3,4],[3,5]]

const SHAPES = ['ico','tet','oct','ring','ring2']

function rotX([x,y,z], a) { return [x, y*Math.cos(a)-z*Math.sin(a), y*Math.sin(a)+z*Math.cos(a)] }
function rotY([x,y,z], a) { return [x*Math.cos(a)+z*Math.sin(a), y, -x*Math.sin(a)+z*Math.cos(a)] }
function rotZ([x,y,z], a) { return [x*Math.cos(a)-y*Math.sin(a), x*Math.sin(a)+y*Math.cos(a), z] }
function project([x,y,z], cx, cy) {
  const d = 600 / (600 + z + 260)
  return [cx + x * d, cy + y * d]
}

function makeObjects(W, H, n) {
  return Array.from({ length: n }, (_, i) => ({
    shape: SHAPES[i % SHAPES.length],
    x: (Math.random() - 0.5) * W * 1.3,
    y: (Math.random() - 0.5) * H * 1.3,
    scale: 38 + Math.random() * 95,
    rx: Math.random() * Math.PI * 2,
    ry: Math.random() * Math.PI * 2,
    rz: Math.random() * Math.PI * 2,
    vrx: (Math.random() - 0.5) * 0.006,
    vry: (Math.random() - 0.5) * 0.005,
    vrz: (Math.random() - 0.5) * 0.004,
    vx: (Math.random() - 0.5) * 0.18,
    vy: (Math.random() - 0.5) * 0.13,
    ci: i % 4,
    alpha: 0.10 + Math.random() * 0.14,
    ph: Math.random() * Math.PI * 2,
  }))
}

function makeBlobs(W, H) {
  return [
    { fx:0.15, fy:0.28, fr:260, ci:0, ph:0,   spd:0.0025 },
    { fx:0.88, fy:0.18, fr:220, ci:1, ph:1.2,  spd:0.003  },
    { fx:0.55, fy:0.78, fr:300, ci:2, ph:2.1,  spd:0.002  },
    { fx:0.08, fy:0.82, fr:180, ci:3, ph:0.6,  spd:0.0035 },
    { fx:0.94, fy:0.60, fr:160, ci:0, ph:1.8,  spd:0.004  },
  ]
}

export default function Scene3D({ palette }) {
  const canvasRef = useRef(null)
  const paletteRef = useRef(palette)
  const rafRef = useRef(null)

  // Keep palette ref fresh without re-mounting
  useEffect(() => { paletteRef.current = palette }, [palette])

  useEffect(() => {
    const canvas = canvasRef.current
    if (!canvas) return
    const ctx = canvas.getContext('2d')
    const mob = window.innerWidth < 768
    let W, H, t = 0, mx = 0, my = 0

    let objects = []
    const blobs = makeBlobs(window.innerWidth, window.innerHeight)

    function resize() {
      W = canvas.width  = window.innerWidth
      H = canvas.height = window.innerHeight
      objects = makeObjects(W, H, mob ? 6 : 13)
    }
    resize()
    window.addEventListener('resize', resize)
    if (!mob) window.addEventListener('mousemove', e => { mx = e.clientX; my = e.clientY })

    function drawObj(o) {
      const colors = paletteRef.current
      const [r, g, b] = colors[o.ci]
      const a = o.alpha * (0.65 + 0.35 * Math.sin(t * 0.5 + o.ph))
      const cx = o.x + (mob ? 0 : (mx - W / 2) * 0.018)
      const cy = o.y + (mob ? 0 : (my - H / 2) * 0.018)

      if (o.shape === 'ring' || o.shape === 'ring2') {
        const segs = o.shape === 'ring' ? 26 : 18
        const sc = o.scale * (o.shape === 'ring' ? 1 : 0.65)
        ctx.strokeStyle = `rgba(${r},${g},${b},${a})`
        ctx.lineWidth = 0.8
        ctx.beginPath()
        for (let i = 0; i <= segs; i++) {
          const ang = (i / segs) * Math.PI * 2
          const px = cx + sc * Math.cos(ang + o.rz)
          const py = cy + sc * 0.32 * Math.sin(ang + o.rz) + sc * 0.15 * Math.cos(ang * 2.8 + o.rx)
          i === 0 ? ctx.moveTo(px, py) : ctx.lineTo(px, py)
        }
        ctx.closePath(); ctx.stroke()
        ctx.beginPath()
        for (let i = 0; i <= segs; i++) {
          const ang = (i / segs) * Math.PI * 2
          const px = cx + sc * 0.5 * Math.cos(ang - o.ry)
          const py = cy + sc * 0.2 * Math.sin(ang - o.ry)
          i === 0 ? ctx.moveTo(px, py) : ctx.lineTo(px, py)
        }
        ctx.closePath(); ctx.stroke()
        return
      }

      const src = o.shape === 'ico' ? { v: ICO_V, e: ICO_E }
                : o.shape === 'tet' ? { v: TET_V, e: TET_E }
                : { v: OCT_V, e: OCT_E }

      const pts = src.v.map(pt => {
        let p = pt.map(x => x * o.scale)
        p = rotX(p, o.rx); p = rotY(p, o.ry); p = rotZ(p, o.rz)
        return project(p, cx, cy)
      })

      ctx.strokeStyle = `rgba(${r},${g},${b},${a})`
      ctx.lineWidth = 0.85
      src.e.forEach(([a2, b2]) => {
        ctx.beginPath(); ctx.moveTo(pts[a2][0], pts[a2][1])
        ctx.lineTo(pts[b2][0], pts[b2][1]); ctx.stroke()
      })
      ctx.fillStyle = `rgba(${r},${g},${b},${a * 1.4})`
      pts.forEach(([px, py]) => {
        ctx.beginPath(); ctx.arc(px, py, 1.3, 0, Math.PI * 2); ctx.fill()
      })
    }

    function frame() {
      ctx.clearRect(0, 0, W, H)
      t += 0.013
      const colors = paletteRef.current

      blobs.forEach(bl => {
        bl.ph += bl.spd
        const bx = bl.fx * W + Math.sin(bl.ph) * 55
        const by = bl.fy * H + Math.cos(bl.ph * 0.75) * 42
        const [r, g, bv] = colors[bl.ci]
        const grd = ctx.createRadialGradient(bx, by, 0, bx, by, bl.fr)
        grd.addColorStop(0, `rgba(${r},${g},${bv},0.042)`)
        grd.addColorStop(1, 'rgba(0,0,0,0)')
        ctx.fillStyle = grd; ctx.fillRect(0, 0, W, H)
      })

      objects.forEach(o => {
        o.rx += o.vrx; o.ry += o.vry; o.rz += o.vrz
        o.x  += o.vx;  o.y  += o.vy
        if (o.x < -W * 0.85) o.x = W * 0.85
        if (o.x >  W * 0.85) o.x = -W * 0.85
        if (o.y < -H * 0.85) o.y = H * 0.85
        if (o.y >  H * 0.85) o.y = -H * 0.85
        drawObj(o)
      })

      rafRef.current = requestAnimationFrame(frame)
    }
    frame()

    return () => {
      cancelAnimationFrame(rafRef.current)
      window.removeEventListener('resize', resize)
    }
  }, []) // mount once

  return (
    <canvas
      ref={canvasRef}
      id="three-canvas"
      style={{ position:'fixed', inset:0, zIndex:0, pointerEvents:'none' }}
    />
  )
}
