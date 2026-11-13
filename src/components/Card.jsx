import './Card.css'

export default function Card({ as: Tag = 'div', inverse = false, className = '', children, ...rest }) {
  const classes = ['card', inverse && 'card--inverse', className].filter(Boolean).join(' ')
  return (
    <Tag className={classes} {...rest}>
      {children}
    </Tag>
  )
}
