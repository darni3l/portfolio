import './Tag.css'

// variant: plain | solid | tint | dashed. The shape of the border/fill carries meaning too,
// not only the colour.
export default function Tag({ children, variant = 'plain' }) {
  return <li className={`tag tag--${variant}`}>{children}</li>
}
