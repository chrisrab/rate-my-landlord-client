import '../App.css'
import { Link } from 'react-router-dom'

const Navbar = () => {
  return (
    <div className="navbar-container">
      <div>
        <Link to={'/'} style={{ textDecoration: 'none' }}>
          <h1 className="title link">Rate My Landlord</h1>
        </Link>
      </div>
      <div className="navbar">
        <ul className="nav-list">
          <Link to={'/'} style={{ textDecoration: 'none' }}>
            <li className="link">Home</li>
          </Link>
          <Link to={'/search'} style={{ textDecoration: 'none' }}>
            <li className="link">Search</li>
          </Link>
          <Link to={'/add'} style={{ textDecoration: 'none' }}>
            <li className="link">Add a Location</li>
          </Link>
        </ul>
      </div>
    </div>
  )
}

export default Navbar
