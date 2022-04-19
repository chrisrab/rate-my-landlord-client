import '../App.css';
import { Link } from 'react-router-dom';

const Navbar = () => {
  return (
    <div className="navbar-container">
      <div className="title-container">
        <Link to={'/'} style={{ textDecoration: 'none' }}>
          <h1 className="title link">Rate My Landlord</h1>
        </Link>
      </div>
      <div className="navbar">
        <ul className="nav-list">
          <Link to={'/'} style={{ textDecoration: 'none' }}>
            <li className="nav-btn">Home</li>
          </Link>
          <Link to={'/search'} style={{ textDecoration: 'none' }}>
            <li className="nav-btn">Search</li>
          </Link>
          <Link to={'/add'} style={{ textDecoration: 'none' }}>
            <li className="nav-btn">Add a Location</li>
          </Link>
        </ul>
      </div>
    </div>
  );
};

export default Navbar;
