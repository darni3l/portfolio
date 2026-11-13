import Icon from './Icon.jsx'
import './Button.css'

// Renders an <a> when `href` is given, otherwise a <button>.
export default function Button({ href, variant = 'primary', icon, children, className = '', ...rest }) {
  const classes = `btn btn--${variant} ${className}`.trim()
  const content = (
    <>
      {icon && <Icon name={icon} size={18} />}
      <span>{children}</span>
    </>
  )
  if (href) {
    return (
      <a className={classes} href={href} {...rest}>
        {content}
      </a>
    )
  }
  return (
    <button type="button" className={classes} {...rest}>
      {content}
    </button>
  )
}
