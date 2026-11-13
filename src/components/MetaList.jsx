import './MetaList.css'

// Case label + kind + context + period. Skips any field that is not provided.
export default function MetaList({ items }) {
  const visible = items.filter(Boolean)
  return (
    <ul className="meta">
      {visible.map((item) => (
        <li key={item}>{item}</li>
      ))}
    </ul>
  )
}
