import React from 'react';
import '../styles/gallery.css';

const images = [
  '/images/gallery1.jpg',
  '/images/gallery2.jpg',
  '/images/gallery3.jpg',
  '/images/gallery4.jpg',
  '/images/gallery5.jpg',
];

const Gallery = () => {
  return (
    <section id="gallery" className="gallery-section">
      <h2 className="gallery-title">Our Cozy Cafe</h2>
      <div className="marquee-container">
        <div className="marquee-content">
          {images.concat(images).map((src, index) => (
            <img key={index} src={src} alt={`gallery-${index}`} className="gallery-image" />
          ))}
        </div>
      </div>
    </section>
  );
};

export default Gallery;
