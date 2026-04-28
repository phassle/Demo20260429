import { useState } from 'react'
import { Save, Share2, FileText } from 'lucide-react'

export function TopBar() {
  const [name, setName] = useState('Untitled kitchen')
  const [toast, setToast] = useState<string | null>(null)

  const showToast = (msg: string) => {
    setToast(msg)
    setTimeout(() => setToast(null), 1800)
  }

  return (
    <header className="topbar">
      <div className="brand">
        <div className="brand-mark">S</div>
        <span>Spark</span>
        <span className="brand-divider" />
        <span className="brand-product">Showroom</span>
      </div>
      <input
        className="project-name"
        value={name}
        onChange={(e) => setName(e.target.value)}
        spellCheck={false}
        aria-label="Project name"
      />
      <div className="topbar-actions">
        <button className="btn btn-ghost" onClick={() => showToast('Saved')}>
          <Save size={16} strokeWidth={1.5} />
          Save
        </button>
        <button className="btn btn-ghost" onClick={() => showToast('Link copied')}>
          <Share2 size={16} strokeWidth={1.5} />
          Share
        </button>
        <button className="btn btn-primary">
          <FileText size={16} strokeWidth={1.5} />
          Continue in showroom
        </button>
      </div>
      {toast && (
        <div
          style={{
            position: 'fixed',
            top: 80,
            right: 32,
            background: 'var(--fg-1)',
            color: 'var(--fg-on-dark)',
            padding: '12px 18px',
            borderRadius: 'var(--radius-sm)',
            fontFamily: 'var(--font-display)',
            fontSize: 14,
            boxShadow: 'var(--shadow-modal)',
            zIndex: 100,
          }}
        >
          {toast}
        </div>
      )}
    </header>
  )
}
