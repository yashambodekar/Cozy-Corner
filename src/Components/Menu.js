"use client"

import { useState, useEffect } from "react"
import "../styles/menu.css"

import coffeeCup from "../assets/coffee-cup.jpg"
import croissant from "../assets/crossiant.jpg"
import signatureSandwich from "../assets/signature-sandwich.jpg"
import gallery1 from "../assets/capsupreme.png"
import gallery2 from "../assets/avacado.png"
import gallery3 from "../assets/chicken.png"
import gallery4 from "../assets/berry.png"
import gallery5 from "../assets/salad.png"

export default function MenuPage() {
  const [selectedDish, setSelectedDish] = useState(null)
  const [animatedItems, setAnimatedItems] = useState(new Set())

  const topSellers = [
    {
      id: 1,
      name: "Signature Espresso",
      description: "Our premium house blend with rich chocolate notes and smooth finish.",
      price: "$4.50",
      image: coffeeCup,
      category: "Coffee",
    },
    {
      id: 2,
      name: "Breakfast Special",
      description: "Fluffy pancakes with fresh berries and maple syrup.",
      price: "$12.99",
      image: croissant,
      category: "Breakfast",
    },
    {
      id: 3,
      name: "Artisan Sandwich",
      description: "Gourmet croissant with smoked salmon and cream cheese.",
      price: "$9.75",
      image: signatureSandwich,
      category: "Sandwich",
    },
  ]

  const menuItems = [
    {
      id: 4,
      name: "Cappuccino Supreme",
      description: "Rich espresso with steamed milk and perfect foam art",
      price: "$4.25",
      image: gallery1,
      category: "Coffee",
    },
    {
      id: 5,
      name: "Avocado Toast",
      description: "Sourdough bread with smashed avocado and cherry tomatoes",
      price: "$8.50",
      image: gallery2,
      category: "Breakfast",
    },
    {
      id: 6,
      name: "Chicken Wrap",
      description: "Grilled chicken with fresh vegetables and chipotle mayo",
      price: "$10.25",
      image: gallery3,
      category: "Lunch",
    },
    {
      id: 7,
      name: "Berry Smoothie",
      description: "Fresh berries blended with yogurt and honey",
      price: "$7.99",
      image: gallery4,
      category: "Drinks",
    },
    {
      id: 8,
      name: "Caesar Salad",
      description: "Crisp romaine with parmesan and homemade croutons",
      price: "$9.50",
      image: gallery5,
      category: "Salad",
    },
  ]

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            const index = Number.parseInt(entry.target.getAttribute("data-index") || "0")
            setAnimatedItems((prev) => new Set([...prev, index]))
          }
        })
      },
      { threshold: 0.2 }
    )

    const items = document.querySelectorAll(".menu-item")
    items.forEach((item) => observer.observe(item))

    return () => observer.disconnect()
  }, [])

  const handleTopSellerClick = (dish) => {
    setSelectedDish(dish)
    document.body.style.overflow = "hidden"
  }

  const closeModal = () => {
    setSelectedDish(null)
    document.body.style.overflow = "auto"
  }

  return (
    <div className="menu-page">
      {/* Top Sellers */}
      <section className="top-sellers-3d">
        <div className="container">
          <h2 className="section-title">Top Sellers</h2>
          <div className="sellers-3d-grid">
            {topSellers.map((dish, index) => (
              <div
                key={dish.id}
                className="seller-3d-card"
                onClick={() => handleTopSellerClick(dish)}
                style={{ animationDelay: `${index * 0.2}s` }}
              >
                <div className="card-3d-container">
                  <div className="card-3d">
                    <div className="card-front">
                      <img src={dish.image} alt={dish.name} className="top-seller-img" />
                      <div className="card-info">
                        <h3>{dish.name}</h3>
                        <p>{dish.price}</p>
                      </div>
                    </div>
                  </div>
                  <div className="card-glow"></div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Full Menu */}
      <section className="menu-items-section">
        <div className="container">
          <h2 className="section-title">Full Menu</h2>
          <div className="menu-items-list">
            {menuItems.map((item, index) => (
              <div
                key={item.id}
                className={`menu-item ${animatedItems.has(index) ? "animate-in" : ""}`}
                data-index={index}
              >
                <div className="menu-item-content">
                  <div className="item-image-wrapper">
                    <img src={item.image} alt={item.name} className="menu-item-image" />
                  </div>
                  <div className="item-info">
                    <h3 className="item-title">{item.name}</h3>
                    <p className="item-desc">{item.description}</p>
                    <div className="item-footer">
                      <span className="item-price">{item.price}</span>
                      <span className="item-category">{item.category}</span>
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Modal */}
      {selectedDish && (
        <div className="modal-3d-overlay" onClick={closeModal}>
          <div className="modal-3d-content" onClick={(e) => e.stopPropagation()}>
            <button className="modal-close" onClick={closeModal}>×</button>
            <div className="modal-3d-body">
              <div className="modal-3d-image">
                <img src={selectedDish.image} alt={selectedDish.name} />
                <div className="flash-effects-3d">
                  <div className="flash-3d flash-3d-1"></div>
                  <div className="flash-3d flash-3d-2"></div>
                  <div className="flash-3d flash-3d-3"></div>
                  <div className="flash-3d flash-3d-4"></div>
                </div>
              </div>
              <div className="modal-3d-info">
                <h2>{selectedDish.name}</h2>
                <p>{selectedDish.description}</p>
                <div className="modal-3d-price">{selectedDish.price}</div>
                <button className="order-btn-3d">
                  <span>Order Now</span>
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  )
}
