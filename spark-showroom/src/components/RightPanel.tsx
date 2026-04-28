import { useState } from 'react'
import { Check, ChevronDown, ChevronUp } from 'lucide-react'
import {
  CATEGORIES,
  type CategoryId,
  type Configuration,
  type Option,
  calculateTotal,
  formatSEK,
  priceDelta,
} from '../data/catalog'

interface RightPanelProps {
  activeCategory: CategoryId
  config: Configuration
  onSelect: (categoryId: CategoryId, optionId: string) => void
  onContinue: () => void
}

export function RightPanel({ activeCategory, config, onSelect, onContinue }: RightPanelProps) {
  const cat = CATEGORIES.find((c) => c.id === activeCategory)!
  const [whyOpen, setWhyOpen] = useState(true)
  const total = calculateTotal(config)

  return (
    <section className="rightpanel">
      <div className="rp-header">
        <div className="rp-eyebrow">{cat.eyebrow} · {cat.name}</div>
        <h2 className="rp-title">{cat.name === 'Layout' ? 'Choose your shape' : `Choose your ${cat.name.toLowerCase()}`}</h2>
      </div>

      <div className="rp-body">
        <div className="option-grid">
          {cat.options.map((opt) => (
            <OptionCard
              key={opt.id}
              option={opt}
              selected={config[activeCategory] === opt.id}
              onClick={() => onSelect(activeCategory, opt.id)}
            />
          ))}
        </div>

        <div className="why-block">
          <button className="why-toggle" onClick={() => setWhyOpen(!whyOpen)}>
            <span>Why this matters</span>
            {whyOpen ? <ChevronUp size={14} strokeWidth={1.5} /> : <ChevronDown size={14} strokeWidth={1.5} />}
          </button>
          {whyOpen && <p className="why-body">{cat.why}</p>}
        </div>
      </div>

      <div className="rp-footer">
        <div className="total-row">
          <span className="total-label">Estimated total</span>
        </div>
        <div className="total-amount">{formatSEK(total)}</div>
        <p className="total-fineprint">
          Includes installation. Excludes appliances marked as add-on. Final pricing confirmed in showroom.
        </p>
        <button className="btn btn-dark btn-large btn-block" onClick={onContinue}>
          Continue in showroom
        </button>
      </div>
    </section>
  )
}

function OptionCard({
  option,
  selected,
  onClick,
}: {
  option: Option
  selected: boolean
  onClick: () => void
}) {
  return (
    <button className={`option-card ${selected ? 'selected' : ''}`} onClick={onClick}>
      <div className="option-swatch" style={{ background: option.swatch }} />
      <div className="option-name">{option.name}</div>
      <div className={`option-price ${option.price > 0 ? 'positive' : ''}`}>
        {priceDelta(option.price)}
      </div>
      <div className="option-check">
        <Check size={12} strokeWidth={2.5} />
      </div>
    </button>
  )
}
