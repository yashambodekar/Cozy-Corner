import { useState, useEffect, useRef } from "react"
import "../styles/gallery.css"

import gallery1 from "../assets/gallery-1.jpg"
import gallery2 from "../assets/gallery-2.jpg"
import gallery3 from "../assets/gallery-3.jpg"
import gallery4 from "../assets/gallery-4.jpg"
import gallery5 from "../assets/gallery-5.jpg"
import gallery6 from "../assets/gallery-6.jpg"
import gallery7 from "../assets/gallery-7.jpg"
import gallery8 from "../assets/gallery-8.jpg"
import gallery9 from "../assets/gallery-9.jpg"
import gallery10 from "../assets/gallery-10.jpg"
import gallery11 from "../assets/gallery-11.jpg"
import gallery12 from "../assets/gallery-12.jpg"

const galleryImages = [
  { src: gallery1, alt: "Cozy cafe interior" },
  { src: gallery2, alt: "Friends enjoying coffee" },
  { src: gallery3, alt: "Comfortable armchair" },
  { src: gallery4, alt: "Latte art in a coffee cup" },
  { src: gallery5, alt: "Cafe kitchen and barista station" },
  { src: gallery6, alt: "Outdoor patio seating with plants" },
  { src: gallery7, alt: "Cozy nook with books" },
  { src: gallery8, alt: "Coffee and croissants" },
  { src: gallery9, alt: "Warm evening vibes" },
  { src: gallery10, alt: "Wooden table with decor" },
  { src: gallery11, alt: "Barista at work" },
  { src: gallery12, alt: "Rainy window with coffee" },
]

export default function Gallery() {
  const [visibleCount, setVisibleCount] = useState(6)
  const [visibleImages, setVisibleImages] = useState(new Set())
  const imageRefs = useRef([])
  const loaderRef = useRef(null)

  // Trigger animation when images appear
  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            const index = parseInt(entry.target.dataset.index)
            setVisibleImages((prev) => new Set([...prev, index]))
          }
        })
      },
      { threshold: 0.3 }
    )

    imageRefs.current.forEach((ref) => ref && observer.observe(ref))

    return () => {
      imageRefs.current.forEach((ref) => ref && observer.unobserve(ref))
    }
  }, [visibleCount])

  // Infinite scroll
  useEffect(() => {
    if (!loaderRef.current) return

    const infiniteObserver = new IntersectionObserver((entries) => {
      if (entries[0].isIntersecting) {
        setTimeout(() => {
          setVisibleCount((prev) => Math.min(prev + 3, galleryImages.length))
        }, 250)
      }
    })

    infiniteObserver.observe(loaderRef.current)
    return () => infiniteObserver.disconnect()
  }, [visibleCount])

  return (
    <div className="gallery-page">
      {/* Header */}
      <header className="gallery-header">
        <div className="header-container">
          <h1 className="gallery-title">Moments of Warmth</h1>
          <p className="gallery-subtitle">
            Step into our world of comfort and coffee. Each image tells a story of cozy connections at The Cozy Corner.
          </p>
        </div>
      </header>

      {/* Gallery */}
      <section className="gallery-section">
        <div className="gallery-container">
          <div className="gallery-grid">
            {galleryImages.slice(0, visibleCount).map((image, index) => (
              <div
                key={index}
                ref={(el) => (imageRefs.current[index] = el)}
                data-index={index}
                className={`gallery-item ${visibleImages.has(index) ? "visible" : ""}`}
                style={{ animationDelay: `${(index % 6) * 0.15}s` }}
              >
                <div className="image-wrapper">
                  <img src={image.src} alt={image.alt} className="gallery-image" loading="lazy" />
                  <div className="image-overlay">
                    <span className="image-caption">{image.alt}</span>
                  </div>
                </div>
              </div>
            ))}
          </div>

          {/* Infinite Scroll Trigger */}
          {visibleCount < galleryImages.length && (
            <div ref={loaderRef} style={{ height: "50px" }}></div>
          )}
        </div>
      </section>
    </div>
  )
}
