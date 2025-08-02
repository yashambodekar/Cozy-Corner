import { useEffect, useRef, useState } from "react"
import "../styles/home.css"

import Expresso from "../assets/Expresso.jpeg"
import Breakfast from "../assets/Breakfast.jpeg"
import Sandwich from "../assets/sandwich.jpg"
import Cafe from "../assets/cafe.jpg"

import Gallery1 from "../assets/gallery-1.jpg"
import Gallery2 from "../assets/gallery-2.jpg"
import Gallery3 from "../assets/gallery-3.jpg"
import Gallery4 from "../assets/gallery-4.jpg"
import Gallery5 from "../assets/gallery-5.jpg"
import Gallery6 from "../assets/gallery-6.jpg"
import Gallery7 from "../assets/gallery-7.jpg"
import Gallery8 from "../assets/gallery-8.jpg"

export default function HomePage({ navigateTo }) {
  const [scrollY, setScrollY] = useState(0)
  const bestSellersRef = useRef(null)
  const [animatedItems, setAnimatedItems] = useState(new Set())
  const heroBgRef = useRef(null)
  const cupRef = useRef(null)

  useEffect(() => {
    const handleScroll = () => {
      const newScrollY = window.scrollY
      setScrollY(newScrollY)

      // Parallax effect on hero background
      if (heroBgRef.current) {
        heroBgRef.current.style.transform = `scale(${1.1 + newScrollY * 0.0005}) translateY(${newScrollY * 0.1}px)`
      }

      // Slight parallax for the cup
      if (cupRef.current) {
        cupRef.current.style.transform = `translateY(${newScrollY * -0.05}px)`
      }
    }

    // Debounce scroll listener for performance
    let ticking = false
    const onScroll = () => {
      if (!ticking) {
        window.requestAnimationFrame(() => {
          handleScroll()
          ticking = false
        })
        ticking = true
      }
    }

    window.addEventListener("scroll", onScroll)

    // Animate sections on scroll
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            const index = Number.parseInt(entry.target.getAttribute("data-index") || "0")
            setAnimatedItems((prev) => new Set([...prev, index]))
            observer.unobserve(entry.target)
          }
        })
      },
      { threshold: 0.3 }
    )

    const bestSellerItems = document.querySelectorAll(".best-seller-item")
    bestSellerItems.forEach((item) => observer.observe(item))

    return () => {
      window.removeEventListener("scroll", onScroll)
      observer.disconnect()
    }
  }, [])

  const bestSellers = [
    {
      id: 1,
      name: "Signature Espresso Blend",
      description: "Our house special blend with rich chocolate notes and a smooth finish.",
      price: "$4.50",
      image: Expresso,
    },
    {
      id: 2,
      name: "Cozy Corner Breakfast",
      description: "Fluffy pancakes with fresh berries, maple syrup, and crispy bacon.",
      price: "$12.99",
      image: Breakfast,
    },
    {
      id: 3,
      name: "Artisan Croissant Sandwich",
      description: "Buttery croissant filled with smoked salmon and cream cheese.",
      price: "$9.75",
      image: Sandwich,
    },
  ]

  const memoryImages = [Gallery1, Gallery2, Gallery3, Gallery4, Gallery5, Gallery6, Gallery7, Gallery8]

  return (
    <div className="home-page">
      {/* Hero Section */}
      <section className="hero-section">
        <div className="hero-background" ref={heroBgRef}>
          <img src={Cafe} alt="Coffee Shop" className="hero-bg-image" />
          <div className="hero-overlay"></div>
        </div>

        <div className="revolving-cup-container" ref={cupRef}>
          <div className="revolving-cup">
            <div className="cup-3d">
              <div className="cup-front"></div>
              <div className="cup-back"></div>
              <div className="cup-left"></div>
              <div className="cup-right"></div>
              <div className="cup-top"></div>
              <div className="cup-bottom"></div>
              <div className="handle-3d"></div>
            </div>
            <div className="steam-particles">
              <div className="particle particle-1"></div>
              <div className="particle particle-2"></div>
              <div className="particle particle-3"></div>
              <div className="particle particle-4"></div>
              <div className="particle particle-5"></div>
            </div>
          </div>
        </div>

        <div className="hero-content">
          <h1
            className="hero-title"
            style={{ fontSize: `${Math.min(5, 3 + scrollY * 0.01)}rem` }}
          >
            Welcome to Cozy Corner
          </h1>
          <p className="hero-subtitle">Where every cup tells a story</p>
        </div>
      </section>

      {/* Best Sellers Section */}
      <section className="best-sellers-home" ref={bestSellersRef}>
        <div className="container">
          <h2 className="section-title">Our Best Sellers</h2>
          <div className="best-sellers-list">
            {bestSellers.map((item, index) => (
              <div
                key={item.id}
                className={`best-seller-item ${animatedItems.has(index) ? "animate-in" : ""}`}
                data-index={index}
              >
                <div className="item-image-container">
                  <img src={item.image} alt={item.name} className="item-image" />
                  <div className="ripple-effect"></div>
                </div>
                <div className="item-details">
                  <h3 className="item-name">{item.name}</h3>
                  <p className="item-description">{item.description}</p>
                  <span className="item-price">{item.price}</span>
                </div>
              </div>
            ))}
          </div>
          <button className="explore-button" onClick={() => navigateTo("menu")}>
            <span>Explore More Items</span>
            <div className="button-ripple"></div>
          </button>
        </div>
      </section>

      {/* Memories Section */}
      <section className="memories-section">
        <div className="container">
          <h2 className="section-title">Some Memories</h2>
          <div className="marquee-container">
            <div className="marquee-track">
              {[...memoryImages, ...memoryImages].map((image, index) => (
                <div key={index} className="marquee-item">
                  <img src={image} alt={`Memory ${index + 1}`} />
                </div>
              ))}
            </div>
          </div>
          <button className="explore-button" onClick={() => navigateTo("gallery")}>
            <span>Explore More</span>
            <div className="button-ripple"></div>
          </button>
        </div>
      </section>
    </div>
  )
}
