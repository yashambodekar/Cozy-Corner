import React from 'react';
import '../styles/navbar.css';

const Navbar = () => {
  const scrollToSection = (id) => {
    const el = document.getElementById(id);
    if (el) {
      el.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <header className="navbar">
      <div className="navbar-logo">☕ Cozy Corner</div>
      <nav className="navbar-links">
        <button onClick={() => scrollToSection('home')}>Home</button>
        <button onClick={() => scrollToSection('menu')}>Menu</button>
        <button onClick={() => scrollToSection('gallery')}>Gallery</button>
        <button onClick={() => scrollToSection('team')}>Our Team</button>
        <button onClick={() => scrollToSection('contact')}>Contact</button>
      </nav>
    </header>
  );
};

export default Navbar;
