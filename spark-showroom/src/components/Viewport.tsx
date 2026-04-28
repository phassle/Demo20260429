import { useState } from 'react'
import { Maximize2, RotateCcw } from 'lucide-react'
import { KitchenScene } from '../three/KitchenScene'
import type { Configuration } from '../data/catalog'

interface ViewportProps {
  config: Configuration
}

export function Viewport({ config }: ViewportProps) {
  const [view, setView] = useState<'3d' | 'top'>('3d')
  const [resetKey, setResetKey] = useState(0)

  return (
    <div className="viewport">
      <div className="view-toggle">
        <button className={view === '3d' ? 'active' : ''} onClick={() => setView('3d')}>
          3D view
        </button>
        <button className={view === 'top' ? 'active' : ''} onClick={() => setView('top')}>
          Top-down
        </button>
      </div>

      <div className="viewport-controls">
        <button
          className="vc-btn"
          title="Reset view"
          onClick={() => setResetKey((k) => k + 1)}
        >
          <RotateCcw size={18} strokeWidth={1.5} />
        </button>
        <button
          className="vc-btn"
          title="Fullscreen"
          onClick={() => {
            const el = document.querySelector('.viewport') as HTMLElement | null
            if (el && !document.fullscreenElement) el.requestFullscreen?.()
            else document.exitFullscreen?.()
          }}
        >
          <Maximize2 size={18} strokeWidth={1.5} />
        </button>
      </div>

      <div className="viewport-canvas" key={resetKey}>
        <KitchenScene config={config} view={view} />
      </div>

      <div className="viewport-eyebrow">Showroom · Live preview</div>
    </div>
  )
}
