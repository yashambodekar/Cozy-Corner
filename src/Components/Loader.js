import React from 'react';
import '../styles/loader.css';

const Loader = () => {
  return (
    <div className="loader-container">
      <div className="logo-animation">
        <img src="/logo.svg" alt="Cozy Corner Logo" className="logo-img" />
      </div>
      <h1 className="welcome-text">Welcome to Cozy Corner</h1>
    </div>
  );
};

export default Loader;
