import React, { useState } from 'react';
import '../styles/menu.css';

const menuItems = [
  { id: 1, name: 'Cappuccino', price: '$4', description: 'Espresso with steamed milk foam', image: 'https://i.imgur.com/1.jpg' },
  { id: 2, name: 'Latte', price: '$5', description: 'Smooth espresso with milk', image: 'https://i.imgur.com/2.jpg' },
  { id: 3, name: 'Mocha', price: '$5.5', description: 'Espresso, chocolate, and milk', image: 'https://i.imgur.com/3.jpg' },
  { id: 4, name: 'Espresso', price: '$3', description: 'Strong and rich coffee shot', image: 'https://i.imgur.com/4.jpg' },
  // Add more items as needed
];

const Menu = () => {
  const [selectedItem, setSelectedItem] = useState(null);

  const handleClosePopup = () => setSelectedItem(null);

  return (
    <section className="menu" id="menu">
      <h2 className="section-title">Our Menu</h2>
      <div className="menu-grid">
        {menuItems.map(item => (
          <div key={item.id} className="menu-card" onClick={() => setSelectedItem(item)}>
            <img src={item.image} alt={item.name} />
            <h3>{item.name}</h3>
          </div>
        ))}
      </div>

      {selectedItem && (
        <div className="popup-overlay" onClick={handleClosePopup}>
          <div className="popup-card flashing">
            <img src={selectedItem.image} alt={selectedItem.name} />
            <div className="popup-info">
              <h2>{selectedItem.name}</h2>
              <p>{selectedItem.description}</p>
              <strong>{selectedItem.price}</strong>
            </div>
          </div>
        </div>
      )}
    </section>
  );
};

export default Menu;
