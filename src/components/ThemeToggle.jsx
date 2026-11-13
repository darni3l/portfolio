import Icon from './Icon.jsx'
import { useTheme } from '../hooks/useTheme.js'
import './ThemeToggle.css'

const OPTIONS = [
  { value: 'light', icon: 'sun', label: 'Use light theme' },
  { value: 'dark', icon: 'moon', label: 'Use dark theme' },
  { value: 'system', icon: 'monitor', label: 'Follow system theme' },
]

// Three real buttons in one group. aria-pressed marks the active one.
export default function ThemeToggle() {
  const { preference, choose } = useTheme()
  return (
    <div className="theme-toggle" role="group" aria-label="Colour theme">
      {OPTIONS.map(({ value, icon, label }) => (
        <button
          key={value}
          type="button"
          className="theme-toggle__btn"
          aria-pressed={preference === value}
          aria-label={label}
          title={label}
          onClick={() => choose(value)}
        >
          <Icon name={icon} size={18} />
        </button>
      ))}
    </div>
  )
}
