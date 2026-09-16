import Button from './Button.jsx'

const HeartIcon = () => (
  <svg width="22" height="22" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
    <path
      d="M12 20.5s-7.5-4.6-10.2-9.4C0.2 8.1 1.4 4.6 4.7 3.6c2.2-0.7 4.4 0.2 5.6 2 1.2-1.8 3.4-2.7 5.6-2 3.3 1 4.5 4.5 2.9 7.5-2.7 4.8-10.2 9.4-10.2 9.4z"
      stroke="#F15B61"
      strokeWidth="1.4"
      strokeLinejoin="round"
    />
  </svg>
)

export default function CTASection({
  text = 'Together, we’re building a healthier tomorrow.',
  subtext,
  buttonLabel = 'Partner With Us',
  to = '/get-involved',
  hideButton = false,
}) {
  return (
    <section className="bg-blush">
      <div
        className={`container-page py-10 md:py-12 flex flex-col md:flex-row items-center gap-6 text-center md:text-left ${
          hideButton ? 'justify-center' : 'justify-between'
        }`}
      >
        <div className="flex items-center gap-3.5">
          <HeartIcon />
          <div>
            <p className="font-serif text-xl md:text-2xl text-navy">{text}</p>
            {subtext && <p className="text-navy/55 text-sm md:text-base mt-1">{subtext}</p>}
          </div>
        </div>
        {!hideButton && (
          <Button to={to} variant="secondary">
            {buttonLabel}
          </Button>
        )}
      </div>
    </section>
  )
}
