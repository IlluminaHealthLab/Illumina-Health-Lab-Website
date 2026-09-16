import { useState } from 'react'
import TeamMemberModal from './TeamMemberModal.jsx'

function initials(name) {
  return name
    .split(' ')
    .filter(Boolean)
    .slice(0, 2)
    .map((n) => n[0])
    .join('')
    .toUpperCase()
}

const palette = ['#FFF3F0', '#DDEEF7', '#FDE7DA', '#EAF0FB']

// Section headings already say "Core Team" / "Board Members" / etc., so a
// generic "Core Team Member" line under every photo is redundant. Prefer the
// more specific institution (or a real title like "Director of AI") when the
// stored role is just that generic label; otherwise show the role as-is.
function secondaryLine(role, institution) {
  const isGeneric = role && /\bmember\b/i.test(role)
  if (isGeneric && institution) return institution
  return role || institution || ''
}

export default function TeamCard({
  name,
  role,
  institution,
  bio,
  linkedin,
  email,
  photo,
  size = 'md',
  featured = false,
  index = 0,
  badge,
}) {
  const [open, setOpen] = useState(false)
  const bg = palette[index % palette.length]
  const secondary = secondaryLine(role, institution)

  // Avatar size forms a hierarchy: featured (Core Team / Board) largest, "lg"
  // (Senior Researchers) next, "md" (Members / Web Dev) smallest.
  const dims = featured
    ? 'w-24 h-24 md:w-28 md:h-28 text-xl'
    : size === 'lg'
    ? 'w-20 h-20 md:w-24 md:h-24 text-lg'
    : 'w-[4.5rem] h-[4.5rem] md:w-20 md:h-20 text-base'

  return (
    <>
      <button
        type="button"
        onClick={() => setOpen(true)}
        className="flex flex-col items-center text-center gap-2 group w-full"
        aria-haspopup="dialog"
      >
        <div
          className={`${dims} rounded-full grid place-items-center font-serif text-navy/70 border border-navy/10 shadow-sm transition-transform duration-300 group-hover:-translate-y-1 group-hover:shadow-md overflow-hidden`}
          style={{ backgroundColor: bg }}
        >
          {photo ? (
            <img src={photo} alt={name} className="w-full h-full object-cover object-top" />
          ) : (
            initials(name)
          )}
        </div>
        <div>
          <p
            className={`font-serif text-navy leading-tight group-hover:text-coral transition-colors ${
              featured ? 'text-base md:text-lg' : size === 'lg' ? 'text-sm md:text-[15px]' : 'text-[13px] md:text-sm'
            }`}
          >
            {name}
          </p>
          {secondary && (
            <p className={`text-navy/50 mt-0.5 leading-snug ${featured ? 'text-xs md:text-sm' : 'text-[12px] md:text-[13px]'}`}>
              {secondary}
            </p>
          )}
        </div>
      </button>

      {open && (
        <TeamMemberModal
          member={{
            name,
            role: badge ? `${role} · ${badge}` : role,
            institution,
            bio,
            linkedin,
            email,
            photo,
          }}
          avatarBg={bg}
          onClose={() => setOpen(false)}
        />
      )}
    </>
  )
}
