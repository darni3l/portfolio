import './Placeholder.css'

// Missing text. Always clearly labelled, styled for both themes.
export function TextPlaceholder({ what }) {
  return (
    <div className="placeholder placeholder--text" role="note">
      <strong>Placeholder:</strong> {what}
    </div>
  )
}

// Missing image. Names the exact file to add and the recommended size.
export function ImagePlaceholder({ path, size, ratio = '16 / 9' }) {
  return (
    <div
      className="placeholder placeholder--image"
      style={{ aspectRatio: ratio }}
      role="img"
      aria-label={`Placeholder for a figure. Add the file ${path}`}
    >
      <p className="placeholder__tag">Placeholder: figure or screenshot</p>
      <p className="placeholder__path">{path}</p>
      <p className="placeholder__spec">
        Recommended {size}. Use PNG or SVG with a transparent background so it works in light and
        dark themes.
      </p>
    </div>
  )
}
