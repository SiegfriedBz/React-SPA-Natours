import { Link } from 'react-router-dom'

// @ts-expect-error because we need to define all possible Tailwind utility classes
// This is because Tailwind's JIT mode purges unused classes, and dynamic classes
// are considered unused.
// eslint-disable-next-line @typescript-eslint/no-unused-vars
const trickTw = `
  text-stone-100 
  text-stone-800 
`

type TLinkUnderProps = {
  to: string
  label: string
  variant?: 'light' | 'dark'
}

const LinkUnder = ({ to, label, variant = 'light' }: TLinkUnderProps) => {
  return (
    <Link
      to={to}
      className={`relative
        ${`text-stone-${variant === 'light' ? 100 : 800}`}
        u-transition
        hover:u-text-gradient-primary-light

        after:content[' ']
        after:absolute
        after:left-0
        after:-bottom-1
        after:w-0
        after:h-0.5
        after:u-bg-gradient-primary-light
        after:u-transition
        hover:after:w-full
      `}
    >
      {label}
    </Link>
  )
}

export default LinkUnder
