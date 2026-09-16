import { useEffect } from 'react'
import { createPortal } from 'react-dom'

const CloseIcon = () => (
  <svg width="18" height="18" viewBox="0 0 18 18" fill="none" xmlns="http://www.w3.org/2000/svg">
    <path d="M4 4L14 14M14 4L4 14" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" />
  </svg>
)

const LinkedInIcon = () => (
  <svg width="16" height="16" viewBox="0 0 24 24" fill="currentColor" xmlns="http://www.w3.org/2000/svg">
    <path d="M20.45 20.45h-3.55v-5.57c0-1.33-.02-3.03-1.85-3.03-1.86 0-2.14 1.45-2.14 2.94v5.66H9.36V9h3.41v1.56h.05c.47-.9 1.63-1.85 3.36-1.85 3.6 0 4.27 2.37 4.27 5.45v6.29zM5.34 7.43a2.06 2.06 0 1 1 0-4.12 2.06 2.06 0 0 1 0 4.12zM7.12 20.45H3.56V9h3.56v11.45z" />
  </svg>
)

const MailIcon = () => (
  <svg width="16" height="16" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
    <rect x="2.5" y="5" width="19" height="14" rx="2" stroke="currentColor" strokeWidth="1.5" />
    <path d="M3.5 6.5L12 13L20.5 6.5" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
  </svg>
)

const InstitutionIcon = () => (
  <svg width="14" height="14" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
    <path
      d="M12 3L2 8.5L12 13L22 8.5L12 3Z M6 10.5V16C6 16 8.5 18.5 12 18.5C15.5 18.5 18 16 18 16V10.5"
      stroke="currentColor"
      strokeWidth="1.5"
      strokeLinejoin="round"
    />
  </svg>
)

export default function TeamMemberModal({ member, avatarBg, onClose }) {
  useEffect(() => {
    const onKey = (e) => e.key === 'Escape' && onClose()
    document.addEventListener('keydown', onKey)
    document.body.style.overflow = 'hidden'
    return () => {
      document.removeEventListener('keydown', onKey)
      document.body.style.overflow = ''
    }
  }, [onClose])

  if (!member) return null

  return createPortal(
    <div
      className="fixed inset-0 z-[100] flex items-center justify-center px-4 py-8 animate-fade-in"
      role="dialog"
      aria-modal="true"
      aria-label={`${member.name} details`}
    >
      {/* backdrop */}
      <div className="absolute inset-0 bg-black/50 backdrop-blur-sm" onClick={onClose} />

      {/* panel */}
      <div className="relative bg-navy rounded-3xl max-w-lg w-full max-h-[92vh] overflow-y-auto scrollbar-dark p-7 md:p-9 shadow-2xl border border-white/10">
        <button
          onClick={onClose}
          aria-label="Close"
          className="absolute top-5 right-5 text-white/40 hover:text-white transition-colors"
        >
          <CloseIcon />
        </button>

        <div className="flex flex-col items-center text-center">
          <div
            className="w-24 h-24 rounded-full grid place-items-center font-serif text-2xl text-navy/70 border border-white/10 mb-4 overflow-hidden"
            style={{ backgroundColor: avatarBg }}
          >
            {member.photo ? (
              <img src={member.photo} alt={member.name} className="w-full h-full object-cover object-top" />
            ) : (
              member.name
                .split(' ')
                .filter(Boolean)
                .slice(0, 2)
                .map((n) => n[0])
                .join('')
                .toUpperCase()
            )}
          </div>

          <h3 className="font-serif text-2xl text-white mb-1">{member.name}</h3>
          {member.role && <p className="text-coral text-sm font-semibold mb-1">{member.role}</p>}
          {member.institution && (
            <p className="inline-flex items-center gap-1.5 text-white/55 text-sm mb-5">
              <InstitutionIcon />
              {member.institution}
            </p>
          )}
          {!member.institution && member.role && <div className="mb-4" />}

          <p className="text-white/70 text-[15px] leading-relaxed mb-5">
            {member.bio || 'Bio coming soon.'}
          </p>

          {(member.linkedin || member.email) && (
            <div className="flex items-center gap-4 pt-5 border-t border-white/15 w-full justify-center">
              {member.linkedin && (
                <a
                  href={member.linkedin}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-2 text-sm font-semibold text-white hover:text-coral transition-colors"
                >
                  <LinkedInIcon />
                  LinkedIn
                </a>
              )}
              {member.email && (
                <a
                  href={`mailto:${member.email}`}
                  className="inline-flex items-center gap-2 text-sm font-semibold text-white hover:text-coral transition-colors"
                >
                  <MailIcon />
                  Email
                </a>
              )}
            </div>
          )}
        </div>
      </div>
    </div>,
    document.body
  )
}
