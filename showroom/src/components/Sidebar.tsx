import { LayoutGrid, Box, Square, Refrigerator, Wrench, Lamp, Check } from 'lucide-react'
import { CATEGORIES, type CategoryId, type Configuration, getOption } from '../data/catalog'

interface SidebarProps {
  active: CategoryId
  onSelect: (id: CategoryId) => void
  config: Configuration
  visited: Set<CategoryId>
}

const ICONS: Record<CategoryId, typeof LayoutGrid> = {
  layout: LayoutGrid,
  cabinets: Box,
  countertop: Square,
  appliances: Refrigerator,
  hardware: Wrench,
  lighting: Lamp,
}

export function Sidebar({ active, onSelect, config, visited }: SidebarProps) {
  return (
    <aside className="sidebar">
      <div className="sidebar-eyebrow">Configure</div>
      {CATEGORIES.map((cat) => {
        const Icon = ICONS[cat.id]
        const selected = getOption(cat.id, config[cat.id])
        const isActive = active === cat.id
        const isDone = visited.has(cat.id) && !isActive
        return (
          <button
            key={cat.id}
            className={`cat-item ${isActive ? 'active' : ''}`}
            onClick={() => onSelect(cat.id)}
          >
            <Icon className="cat-icon" />
            <div className="cat-content">
              <div className="cat-name">{cat.name}</div>
              <div className="cat-selection">{selected?.name ?? '—'}</div>
            </div>
            {isDone && <Check className="cat-check" />}
          </button>
        )
      })}
    </aside>
  )
}
