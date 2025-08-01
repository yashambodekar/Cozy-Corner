import React, { useEffect, useState } from 'react';
import Loader from './Components/Loader';
import Navbar from './Components/Navbar';
import Home from './Components/Home';
import Menu from './Components/Menu';
import Gallery from './Components/Gallery';
import Team from './Components/Team';
// import Contact from './Components/Contact';
import Footer from './Components/Footer';

import './styles/App.css';

const App = () => {
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const timer = setTimeout(() => setIsLoading(false), 2000);
    return () => clearTimeout(timer);
  }, []);

  return (
    <div>
      {isLoading ? (
        <Loader />
      ) : (
        <>
          <Navbar />
          <section id="home">
            <Home />
          </section>
          <section id="menu">
            <Menu />
          </section>
          <section id="gallery">
            <Gallery />
          </section>
          <section id="team">
            <Team />
          </section>
          {/* <section id="contact">
            <Contact />
          </section> */}
          <Footer />
        </>
      )}
    </div>
  );
};

export default App;
