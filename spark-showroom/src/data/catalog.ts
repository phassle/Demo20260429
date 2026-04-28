// Mock data for kitchen configurator
// Prices in SEK. Names mix realistic Swedish/Nordic kitchen vocabulary.

export type CategoryId =
  | 'layout'
  | 'cabinets'
  | 'countertop'
  | 'appliances'
  | 'hardware'
  | 'lighting'

export interface Option {
  id: string
  name: string
  price: number
  /** CSS color or material descriptor for swatch fill */
  swatch?: string
  /** Material color used in 3D scene */
  color?: string
  description?: string
}

export interface Category {
  id: CategoryId
  name: string
  eyebrow: string
  why: string
  options: Option[]
}

export const CATEGORIES: Category[] = [
  {
    id: 'layout',
    name: 'Layout',
    eyebrow: 'Step 1',
    why:
      'The shape of your kitchen sets the rhythm of how you cook. An L-shape opens the room. A galley keeps everything within arm’s reach.',
    options: [
      { id: 'l-shape', name: 'L-shape', price: 0, swatch: '#E5DDD1' },
      { id: 'u-shape', name: 'U-shape', price: 4800, swatch: '#D9CFC0' },
      { id: 'galley', name: 'Galley', price: -2400, swatch: '#EFE9E1' },
      { id: 'island', name: 'L-shape with island', price: 12400, swatch: '#CDC0AE' },
    ],
  },
  {
    id: 'cabinets',
    name: 'Cabinets',
    eyebrow: 'Step 2',
    why:
      'Doors are the single largest visual element in a kitchen. Choose a finish you’ll still love in ten years — colour comes off the wall first, doors come off last.',
    options: [
      { id: 'shaker-white', name: 'Shaker White', price: 0, swatch: '#F4F0EA', color: '#F2EEE6' },
      { id: 'modern-oak', name: 'Modern Oak', price: 8400, swatch: '#C5A47A', color: '#B8946A' },
      { id: 'matte-charcoal', name: 'Matte Charcoal', price: 6200, swatch: '#2E2E2E', color: '#2E2E2E' },
      { id: 'sage-green', name: 'Sage Green', price: 7100, swatch: '#A6B19A', color: '#9DA993' },
    ],
  },
  {
    id: 'countertop',
    name: 'Countertop',
    eyebrow: 'Step 3',
    why:
      'A countertop is the working surface of the kitchen. Quartz is forgiving and quiet. Wood is warm but asks for a little maintenance.',
    options: [
      { id: 'carrara-quartz', name: 'Carrara Quartz', price: 18900, swatch: '#E8E5DE', color: '#E8E5DE' },
      { id: 'walnut-block', name: 'Walnut Butcher Block', price: 14200, swatch: '#6B4E32', color: '#6B4E32' },
      { id: 'black-granite', name: 'Black Granite', price: 22400, swatch: '#1F1F1F', color: '#1F1F1F' },
      { id: 'white-laminate', name: 'White Laminate', price: 0, swatch: '#FAFAF8', color: '#FAFAF8' },
    ],
  },
  {
    id: 'appliances',
    name: 'Appliances',
    eyebrow: 'Step 4',
    why:
      'Integrated appliances disappear into the cabinetry. Free-standing makes a statement and is easier to swap later.',
    options: [
      { id: 'electrolux', name: 'Electrolux Series 800', price: 32400, swatch: '#B8B8B8' },
      { id: 'siemens', name: 'Siemens iQ500', price: 38600, swatch: '#9E9E9E' },
      { id: 'bosch', name: 'Bosch Serie 6', price: 28900, swatch: '#A8A8A8' },
      { id: 'aeg', name: 'AEG 7000 SteamPro', price: 41200, swatch: '#7A7A7A' },
    ],
  },
  {
    id: 'hardware',
    name: 'Hardware',
    eyebrow: 'Step 5',
    why:
      'Handles are the only part of the kitchen you touch every day. Spend a little more here than you think you need to.',
    options: [
      { id: 'brushed-brass', name: 'Brushed Brass', price: 2800, swatch: '#B5984F' },
      { id: 'matte-black', name: 'Matte Black', price: 1600, swatch: '#1A1A1A' },
      { id: 'satin-nickel', name: 'Satin Nickel', price: 1900, swatch: '#A8A89E' },
      { id: 'no-handles', name: 'Push-to-open (no handles)', price: 4200, swatch: '#EFE9E1' },
    ],
  },
  {
    id: 'lighting',
    name: 'Lighting',
    eyebrow: 'Step 6',
    why:
      'Layered lighting — ambient, task, accent — turns a kitchen from a workspace into a room you want to linger in.',
    options: [
      { id: 'ambient', name: 'Ambient ceiling only', price: 0, swatch: '#FFF4E0' },
      { id: 'under-cabinet', name: 'Ambient + under-cabinet', price: 4200, swatch: '#FFE9C4' },
      { id: 'pendant', name: 'Ambient + pendant island', price: 6800, swatch: '#FFD89E' },
      { id: 'full', name: 'Layered (all three)', price: 9400, swatch: '#FFCB7A' },
    ],
  },
]

export type Configuration = Record<CategoryId, string>

export const DEFAULT_CONFIG: Configuration = {
  layout: 'l-shape',
  cabinets: 'shaker-white',
  countertop: 'carrara-quartz',
  appliances: 'electrolux',
  hardware: 'brushed-brass',
  lighting: 'under-cabinet',
}

/** Format SEK amount with Swedish thousands separator (space). */
export function formatSEK(amount: number): string {
  const sign = amount < 0 ? '−' : ''
  const abs = Math.abs(amount)
  const withSpaces = abs.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ' ')
  return `${sign}${withSpaces} SEK`
}

export function priceDelta(amount: number): string {
  if (amount === 0) return 'Included'
  if (amount > 0) return `+ ${formatSEK(amount)}`
  return `− ${formatSEK(Math.abs(amount))}`
}

export function calculateTotal(config: Configuration): number {
  // Base price + sum of all option deltas
  const BASE = 89000
  let total = BASE
  for (const category of CATEGORIES) {
    const opt = category.options.find((o) => o.id === config[category.id])
    if (opt) total += opt.price
  }
  return total
}

export function getOption(categoryId: CategoryId, optionId: string): Option | undefined {
  const cat = CATEGORIES.find((c) => c.id === categoryId)
  return cat?.options.find((o) => o.id === optionId)
}
