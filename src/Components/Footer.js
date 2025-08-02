import "../styles/footer.css"

const Footer = () => {
  const socialLinks = [
    {
      icon: InstagramIcon,
      href: "#",
      label: "Instagram",
    },
    {
      icon: FacebookIcon,
      href: "#",
      label: "Facebook",
    },
    {
      icon: TwitterIcon,
      href: "#",
      label: "Twitter",
    },
  ]

  const quickLinks = ["Menu", "Our Story", "Gallery", "Contact", "Catering"]

  return (
    <footer className="footer">
      <div className="footer-container">
        <div className="footer-grid">
          {/* Brand */}
          <div className="brand-section">
            <div className="brand-logo">
              <CoffeeIcon />
              <span className="brand-text">The Cozy Corner</span>
            </div>
            <p className="brand-description">
              Creating moments of warmth, connection, and exceptional coffee in the heart of our community since 2018.
            </p>
            <div className="social-links">
              {socialLinks.map((social) => (
                <a key={social.label} href={social.href} className="social-link" aria-label={social.label}>
                  <social.icon />
                </a>
              ))}
            </div>
          </div>

          {/* Quick Links */}
          <div className="links-section">
            <h3 className="section-title">Quick Links</h3>
            <ul className="links-list">
              {quickLinks.map((link) => (
                <li key={link}>
                  <a href={`#${link.toLowerCase().replace(" ", "-")}`} className="footer-link">
                    {link}
                  </a>
                </li>
              ))}
            </ul>
          </div>

          {/* Contact Info */}
          <div className="contact-section">
            <h3 className="section-title">Visit Us</h3>
            <div className="contact-info">
              <p>
                123 Cozy Street
                <br />
                Downtown District
                <br />
                City, State 12345
              </p>
              <p>(555) 123-COZY</p>
              <p>hello@cozy-corner.com</p>
            </div>
          </div>
        </div>

        {/* Bottom Bar */}
        <div className="footer-bottom">
          <div className="bottom-content">
            <p className="copyright">© 2024 The Cozy Corner. All rights reserved.</p>
            <div className="made-with-love">
              <span>Made with</span>
              <HeartIcon />
              <span>for our community</span>
            </div>
          </div>
        </div>
      </div>
    </footer>
  )
}

// Icon Components
const CoffeeIcon = () => (
  <svg
    className="icon coffee-icon"
    viewBox="0 0 24 24"
    fill="none"
    stroke="currentColor"
    strokeWidth="2"
    strokeLinecap="round"
    strokeLinejoin="round"
  >
    <path d="M18 8h1a4 4 0 0 1 0 8h-1" />
    <path d="M2 8h16v9a4 4 0 0 1-4 4H6a4 4 0 0 1-4-4V8z" />
    <line x1="6" y1="1" x2="6" y2="4" />
    <line x1="10" y1="1" x2="10" y2="4" />
    <line x1="14" y1="1" x2="14" y2="4" />
  </svg>
)

const InstagramIcon = () => (
  <svg
    className="icon social-icon"
    viewBox="0 0 24 24"
    fill="none"
    stroke="currentColor"
    strokeWidth="2"
    strokeLinecap="round"
    strokeLinejoin="round"
  >
    <rect x="2" y="2" width="20" height="20" rx="5" ry="5" />
    <path d="M16 11.37A4 4 0 1 1 12.63 8 4 4 0 0 1 16 11.37z" />
    <line x1="17.5" y1="6.5" x2="17.51" y2="6.5" />
  </svg>
)

const FacebookIcon = () => (
  <svg
    className="icon social-icon"
    viewBox="0 0 24 24"
    fill="none"
    stroke="currentColor"
    strokeWidth="2"
    strokeLinecap="round"
    strokeLinejoin="round"
  >
    <path d="M18 2h-3a5 5 0 0 0-5 5v3H7v4h3v8h4v-8h3l1-4h-4V7a1 1 0 0 1 1-1h3z" />
  </svg>
)

const TwitterIcon = () => (
  <svg
    className="icon social-icon"
    viewBox="0 0 24 24"
    fill="none"
    stroke="currentColor"
    strokeWidth="2"
    strokeLinecap="round"
    strokeLinejoin="round"
  >
    <path d="M23 3a10.9 10.9 0 0 1-3.14 1.53 4.48 4.48 0 0 0-7.86 3v1A10.66 10.66 0 0 1 3 4s-4 9 5 13a11.64 11.64 0 0 1-7 2c9 5 20 0 20-11.5a4.5 4.5 0 0 0-.08-.83A7.72 7.72 0 0 0 23 3z" />
  </svg>
)

const HeartIcon = () => (
  <svg
    className="icon heart-icon"
    viewBox="0 0 24 24"
    fill="none"
    stroke="currentColor"
    strokeWidth="2"
    strokeLinecap="round"
    strokeLinejoin="round"
  >
    <path d="M20.84 4.61a5.5 5.5 0 0 0-7.78 0L12 5.67l-1.06-1.06a5.5 5.5 0 0 0-7.78 7.78l1.06 1.06L12 21.23l7.78-7.78 1.06-1.06a5.5 5.5 0 0 0 0-7.78z" />
  </svg>
)

export default Footer
