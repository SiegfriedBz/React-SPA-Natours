import { Link } from 'react-router-dom'
import logoGreen from '../../../assets/logo-green.png'

const Logo = () => {
  return (
    <Link to="/">
      <img className="w-40 min-w-40" src={logoGreen} alt="logo" />
    </Link>
  )
}

export default Logo
