import { Link } from 'react-router-dom'

const ArrowIcon = ({ className = '' }) => (
  <svg
    className={className}
    width="16"
    height="16"
    viewBox="0 0 16 16"
    fill="none"
    xmlns="http://www.w3.org/2000/svg"
  >
    <path
      d="M3.5 8H12.5M12.5 8L8.5 4M12.5 8L8.5 12"
      stroke="currentColor"
      strokeWidth="1.5"
      strokeLinecap="round"
      strokeLinejoin="round"
    />
  </svg>
)

/**
 * variant: 'primary' (navy filled), 'secondary' (outline), 'ghost' (text only)
 * arrow: show trailing arrow icon
 * to: internal route (uses Link) | href: external link (uses <a>) | onClick: button
 */
export default function Button({
  children,
  variant = 'primary',
  arrow = true,
  to,
  href,
  onClick,
  className = '',
  type = 'button',
}) {
  const base =
    'group inline-flex items-center gap-2.5 rounded-full font-sans text-sm font-semibold px-6 py-3.5 transition-all duration-300 whitespace-nowrap'

  const variants = {
    primary: 'bg-navy text-white hover:bg-navy/90 hover:shadow-lg hover:shadow-navy/20',
    secondary: 'bg-white text-navy border border-navy/15 hover:border-navy/40 hover:bg-navy/[0.03]',
    outline: 'bg-transparent text-navy border border-navy/25 hover:bg-navy hover:text-white',
    coral: 'bg-coral text-white hover:bg-coral/90 hover:shadow-lg hover:shadow-coral/25',
  }

  const arrowWrap = arrow ? (
    <span className="grid place-items-center w-6 h-6 rounded-full bg-white/15 group-hover:translate-x-0.5 transition-transform duration-300 shrink-0">
      <ArrowIcon />
    </span>
  ) : null

  const content = (
    <>
      <span className="inline-flex items-center gap-2.5 leading-none">{children}</span>
      {arrow && variant === 'primary' && arrowWrap}
      {arrow && variant !== 'primary' && (
        <ArrowIcon className="group-hover:translate-x-0.5 transition-transform duration-300" />
      )}
    </>
  )

  const classes = `${base} ${variants[variant]} ${className}`

  if (to) {
    return (
      <Link to={to} className={classes}>
        {content}
      </Link>
    )
  }

  if (href) {
    return (
      <a href={href} className={classes} target="_blank" rel="noopener noreferrer">
        {content}
      </a>
    )
  }

  return (
    <button type={type} onClick={onClick} className={classes}>
      {content}
    </button>
  )
}
