import { Link } from "react-router-dom";
import "../styles/navbar.css";

const Navbar = () => {
  return (
    <nav className="navbar">
      <div style={{ padding: "20px" }}>
        <CozyCornerLogo />
      </div>
      <ul className="nav-links">
        <li><Link to="/">Home</Link></li>
        <li><Link to="/menu">Menu</Link></li>
        <li><Link to="/gallery">Gallery</Link></li>
        <li><Link to="/team">Our Team</Link></li>
        <li><Link to="/contact">Contact</Link></li>
      </ul>
    </nav>
    
  );
};

const CozyCornerLogo = () => {
  return (
    <div className="logo-container">
      <svg
        className="coffee-icon"
        viewBox="0 0 24 24"
        fill="none"
        stroke="currentColor"
        strokeWidth="2"
        strokeLinecap="round"
        strokeLinejoin="round"
      >
        <path d="M18 8h1a4 4 0 0 1 0 8h-1" />
        <path d="M2 8h16v9a4 4 0 0 1-4 4H6a4 4 0 0 1-4-4V8z" />
        <line x1="6" y1="1" x2="6" y2="4" />
        <line x1="10" y1="1" x2="10" y2="4" />
        <line x1="14" y1="1" x2="14" y2="4" />
      </svg>
      <span className="logo-text">The Cozy Corner</span>
    </div>
  )
}

export {CozyCornerLogo};


export default Navbar;
