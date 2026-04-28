import { useState } from 'react'
import { TopBar } from './components/TopBar'
import { Sidebar } from './components/Sidebar'
import { Viewport } from './components/Viewport'
import { RightPanel } from './components/RightPanel'
import { Stepper } from './components/Stepper'
import { CATEGORIES, type CategoryId, DEFAULT_CONFIG } from './data/catalog'

export default function App() {
  const [activeCategory, setActiveCategory] = useState<CategoryId>('layout')
  const [config, setConfig] = useState(DEFAULT_CONFIG)
  const [visited, setVisited] = useState<Set<CategoryId>>(new Set(['layout']))

  const handleSelectOption = (categoryId: CategoryId, optionId: string) => {
    setConfig((prev) => ({ ...prev, [categoryId]: optionId }))
    setVisited((prev) => new Set(prev).add(categoryId))
  }

  const handleSelectCategory = (categoryId: CategoryId) => {
    setActiveCategory(categoryId)
    setVisited((prev) => new Set(prev).add(categoryId))
  }

  const handleContinue = () => {
    // Advance to next category, or stay if last
    const idx = CATEGORIES.findIndex((c) => c.id === activeCategory)
    const next = CATEGORIES[idx + 1]
    if (next) {
      setActiveCategory(next.id)
      setVisited((prev) => new Set(prev).add(next.id))
    }
  }

  return (
    <div className="app">
      <TopBar />
      <Sidebar
        active={activeCategory}
        onSelect={handleSelectCategory}
        config={config}
        visited={visited}
      />
      <Viewport config={config} />
      <RightPanel
        activeCategory={activeCategory}
        config={config}
        onSelect={handleSelectOption}
        onContinue={handleContinue}
      />
      <Stepper active={activeCategory} visited={visited} onSelect={handleSelectCategory} />
    </div>
  )
}
