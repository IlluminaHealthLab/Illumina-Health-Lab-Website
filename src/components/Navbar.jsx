import { useState, useEffect } from 'react'
import { Link, NavLink } from 'react-router-dom'
import Button from './Button.jsx'
import logo from '../assets/logo.png'

const links = [
  { label: 'About Us', to: '/about' },
  { label: 'Research', to: '/research' },
  { label: 'Impact', to: '/impact' },
  { label: 'Team', to: '/team' },
]

const SearchIcon = () => (
  <svg width="18" height="18" viewBox="0 0 18 18" fill="none" xmlns="http://www.w3.org/2000/svg">
    <circle cx="8" cy="8" r="6" stroke="currentColor" strokeWidth="1.4" />
    <path d="M16 16L12.5 12.5" stroke="currentColor" strokeWidth="1.4" strokeLinecap="round" />
  </svg>
)

const MenuIcon = ({ open }) => (
  <svg width="22" height="22" viewBox="0 0 22 22" fill="none" xmlns="http://www.w3.org/2000/svg">
    {open ? (
      <path d="M5 5L17 17M17 5L5 17" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" />
    ) : (
      <>
        <path d="M3 6H19" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" />
        <path d="M3 11H19" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" />
        <path d="M3 16H19" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" />
      </>
    )}
  </svg>
)

export default function Navbar() {
  const [scrolled, setScrolled] = useState(false)
  const [open, setOpen] = useState(false)

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 12)
    window.addEventListener('scroll', onScroll)
    return () => window.removeEventListener('scroll', onScroll)
  }, [])

  useEffect(() => {
    setOpen(false)
  }, [])

  return (
    <header
      className={`sticky top-0 z-50 w-full transition-all duration-300 ${
        scrolled ? 'bg-white/90 backdrop-blur-md shadow-sm' : 'bg-white/70 backdrop-blur-sm'
      }`}
    >
      <nav className="container-page flex items-center justify-between h-28 md:h-32">
        <Link to="/" className="flex items-center gap-2.5 shrink-0" onClick={() => setOpen(false)}>
          <img src={logo} alt="Illumina Health Lab" className="h-20 md:h-24 w-auto object-contain" />
        </Link>

        <div className="hidden lg:flex items-center gap-9">
          {links.map((l) => (
            <NavLink
              key={l.to}
              to={l.to}
              className={({ isActive }) =>
                `relative text-[15px] font-medium text-navy/80 hover:text-navy transition-colors py-1 ${
                  isActive ? 'text-navy after:absolute after:left-0 after:right-0 after:-bottom-1 after:h-[1.5px] after:bg-coral' : ''
                }`
              }
            >
              {l.label}
            </NavLink>
          ))}
        </div>

        <div className="hidden lg:flex items-center gap-5">
          <button
            aria-label="Search"
            className="text-navy/60 hover:text-navy transition-colors"
          >
            <SearchIcon />
          </button>
          <Button to="/get-involved" arrow>
            Get Involved
          </Button>
        </div>

        <button
          className="lg:hidden text-navy"
          aria-label="Toggle menu"
          onClick={() => setOpen((v) => !v)}
        >
          <MenuIcon open={open} />
        </button>
      </nav>

      {open && (
        <div className="lg:hidden border-t border-navy/10 bg-white px-6 pb-6 pt-2 animate-fade-in">
          <div className="flex flex-col gap-4">
            {links.map((l) => (
              <NavLink
                key={l.to}
                to={l.to}
                onClick={() => setOpen(false)}
                className="text-[16px] font-medium text-navy/80 py-1.5"
              >
                {l.label}
              </NavLink>
            ))}
            <Button to="/get-involved" arrow className="mt-2 self-start" onClick={() => setOpen(false)}>
              Get Involved
            </Button>
          </div>
        </div>
      )}
    </header>
  )
}
