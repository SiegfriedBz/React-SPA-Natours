import logoGreen from '../../assets/logo-green.png'
import LinkUnder from './LinkUnder'

const ADMIN_LINK_TO = import.meta.env.VITE_ADMIN_LINK_TO

const Footer = () => {
  const year = new Date().getFullYear()

  return (
    <footer>
      <div className="flex max-md:flex-col justify-between items-center">
        <img src={logoGreen} alt="Natours logo" width={125} />

        <div className="flex flex-col">
          <ul
            className="flex justify-between space-x-4
              max-md:my-4
              max-md:w-full
              md:ml-auto 
            "
          >
            <li>
              <LinkUnder to="/about" label="About us" />
            </li>
            <li>
              <LinkUnder to="#" label="Become a guide" />
            </li>
            <li>
              <LinkUnder to="#" label="Careers" />
            </li>
            <li>
              <LinkUnder to="#" label="Contact" />
            </li>
          </ul>
          <p className="w-full text-right text-sm mt-2 max-md:hidden">
            &copy; {year} by{' '}
            <LinkUnder to={ADMIN_LINK_TO} label="SiegfriedBz" />. All rights
            reserved
          </p>
        </div>

        <p className="text-center text-sm md:hidden">
          &copy; {year} by <LinkUnder to={ADMIN_LINK_TO} label="SiegfriedBz" />.
          All rights reserved
        </p>
      </div>
    </footer>
  )
}

export default Footer
