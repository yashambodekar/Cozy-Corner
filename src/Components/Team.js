import React from 'react';
import '../styles/team.css';

const teamMembers = [
  {
    name: 'Aarav Singh',
    role: 'Founder & Head Barista',
    image: '/images/team1.jpg',
  },
  {
    name: 'Meera Kapoor',
    role: 'Pastry Chef',
    image: '/images/team2.jpg',
  },
  {
    name: 'Rohan Das',
    role: 'Cafe Manager',
    image: '/images/team3.jpg',
  },
];

const Team = () => {
  return (
    <section id="team" className="team-section">
      <h2 className="team-title">Meet Our Team</h2>
      <div className="team-grid">
        {teamMembers.map((member, index) => (
          <div className="team-card" key={index}>
            <img src={member.image} alt={member.name} className="team-img" />
            <h3>{member.name}</h3>
            <p>{member.role}</p>
          </div>
        ))}
      </div>
    </section>
  );
};

export default Team;
