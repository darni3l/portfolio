import './MetricGrid.css'

export default function MetricGrid({ metrics }) {
  return (
    <ul className="metrics">
      {metrics.map(({ value, label }) => (
        <li key={value + label} className="metrics__item">
          <p className="metrics__value">{value}</p>
          <p className="metrics__label">{label}</p>
        </li>
      ))}
    </ul>
  )
}
