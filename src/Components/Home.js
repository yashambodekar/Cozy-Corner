import React from 'react';
import '../styles/home.css';
import coffeeCup from '../assets/3_7.jpg'; // Make sure to add an image in assets

const Home = () => {
  return (
    <section className="home" id="home">
      <div className="logo-container">
        <div className="ripple">
          <img src={coffeeCup} alt="Coffee Cup" className="coffee-cup" />
        </div>
        <h1 className="shop-name">Welcome to Cozy Corner</h1>
      </div>
    </section>
  );
};

export default Home;
