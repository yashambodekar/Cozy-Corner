import React from 'react';
import '../styles/footer.css';

const Footer = () => {
  return (
    <footer className="footer">
      <p>© {new Date().getFullYear()} Cozy Corner. All Rights Reserved.</p>
      <p>
        Made with ☕ and ❤️ by the Cozy Corner Team.
      </p>
    </footer>
  );
};

export default Footer;
