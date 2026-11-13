import { ImagePlaceholder } from './Placeholder.jsx'
import { asset } from '../utils/asset.js'
import './FigureSlot.css'

// Shows the project figure, or a labelled placeholder when `src` is null.
// `darkSrc` (optional) swaps in a dark-friendly version; without it, images are dimmed slightly in dark mode.
export default function FigureSlot({ figure }) {
  if (!figure) return null
  const { src, darkSrc, alt, caption, width, height, expected, size } = figure

  if (!src) {
    return (
      <figure className="figure">
        <ImagePlaceholder path={expected} size={size} ratio={`${width} / ${height}`} />
      </figure>
    )
  }

  const common = { loading: 'lazy', decoding: 'async', width, height, alt }
  return (
    <figure className="figure">
      <div className="figure__plate">
        <img
          className={`figure__img ${darkSrc ? 'figure__img--for-light' : ''}`}
          src={asset(src)}
          {...common}
        />
        {darkSrc && (
          <img className="figure__img figure__img--for-dark" src={asset(darkSrc)} {...common} />
        )}
      </div>
      {caption && <figcaption className="figure__caption">{caption}</figcaption>}
    </figure>
  )
}
