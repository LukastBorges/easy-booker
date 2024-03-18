import { faUserSecret } from '@fortawesome/free-solid-svg-icons'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { Link } from '@tanstack/react-router'
import { Avatar } from 'antd'

import logo from 'assets/logo.png'

export default function Navbar() {
  return (
    <div className="mx-2 flex items-center md:mx-4" data-cy="navbar">
      <img alt="easy booker logo" src={logo} height={48} width={48} />
      <h2 className="font-display text-lg">easy booker</h2>
      <div className="flex-1" />
      <Link className="mr-4 font-sans" to="/">
        Hotels
      </Link>
      <Link className="mr-4 font-sans" to="/bookings">
        Bookings
      </Link>
      <Avatar
        icon={<FontAwesomeIcon icon={faUserSecret} />}
        className="bg-blue-500"
      />
    </div>
  )
}
