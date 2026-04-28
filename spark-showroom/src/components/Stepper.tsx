import { Check } from 'lucide-react'
import { CATEGORIES, type CategoryId } from '../data/catalog'

interface StepperProps {
  active: CategoryId
  visited: Set<CategoryId>
  onSelect: (id: CategoryId) => void
}

export function Stepper({ active, visited, onSelect }: StepperProps) {
  return (
    <nav className="stepper">
      {CATEGORIES.map((cat, i) => {
        const isActive = active === cat.id
        const isDone = visited.has(cat.id) && !isActive
        return (
          <span key={cat.id} style={{ display: 'flex', alignItems: 'center' }}>
            <button
              className={`step ${isActive ? 'active' : ''} ${isDone ? 'done' : ''}`}
              onClick={() => onSelect(cat.id)}
            >
              <span className="step-dot">
                {isDone ? <Check size={10} strokeWidth={2.5} /> : i + 1}
              </span>
              <span>{cat.name}</span>
            </button>
            {i < CATEGORIES.length - 1 && <span className="step-divider" />}
          </span>
        )
      })}
    </nav>
  )
}
