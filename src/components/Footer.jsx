import { Link, useLocation } from 'react-router-dom'
import CTASection from './CTASection.jsx'
import logo from '../assets/logo.png'

const ctaOverrides = {
  '/about': {
    text: 'The future of heart health is collaborative.',
    subtext: 'Join us in building a world where every heart has the chance to thrive.',
  },
  '/get-involved': {
    hideButton: true,
  },
}

export default function Footer() {
  const year = new Date().getFullYear()
  const { pathname } = useLocation()
  const cta = ctaOverrides[pathname]

  return (
    <footer className="bg-white">
      <CTASection text={cta?.text} subtext={cta?.subtext} hideButton={cta?.hideButton} />
      <div className="container-page py-8 flex flex-col md:flex-row items-center justify-between gap-5 thin-divider">
        <Link to="/" className="flex items-center">
          <img src={logo} alt="Illumina Health Lab" className="h-20 w-auto object-contain" />
        </Link>

        <p className="text-sm text-navy/50 text-center md:text-right">
          © {year} Illumina Health Lab. All rights reserved. ·{' '}
          <a
            href="mailto:illuminahealthresearch@gmail.com"
            className="text-navy/60 hover:text-navy transition-colors"
          >
            Contact Us
          </a>
        </p>
      </div>
    </footer>
  )
}
