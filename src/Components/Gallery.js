import React from 'react';
import '../styles/gallery.css';

// Import your images from the assets folder
import gallery1 from '../assets/gallery-1.jpg';
import gallery2 from '../assets/gallery-2.jpg';
import gallery3 from '../assets/gallery-3.jpg';
import gallery4 from '../assets/gallery-4.jpg';
import gallery5 from '../assets/gallery-5.jpg';
import gallery6 from '../assets/gallery-6.jpg';

const galleryImages = [
  { id: 1, src: gallery1, alt: 'Cozy cafe interior with bookshelves' },
  { id: 2, src: gallery2, alt: 'Friends enjoying coffee', featured: true },
  { id: 3, src: gallery3, alt: 'Comfortable armchair by a window' },
  { id: 4, src: gallery4, alt: 'Latte art in a coffee cup' },
  { id: 5, src: gallery5, alt: 'Cafe kitchen and barista station' },
  { id: 6, src: gallery6, alt: 'Outdoor patio seating with plants' },
];

const Gallery = () => {
  return (
    <section className="gallery-container">
      <h2 className="gallery-title">Moments of Warmth</h2>
      <div className="gallery-grid">
        {galleryImages.map((image) => (
          <div
            key={image.id}
            className={`gallery-item ${image.featured ? 'featured' : ''}`}
          >
            <img src={image.src} alt={image.alt} />
          </div>
        ))}
      </div>
    </section>
  );
};

export default Gallery;