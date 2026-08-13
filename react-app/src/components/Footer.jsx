import React from 'react'

export default function Footer() {
  return (
    <footer className="site-footer">
      <div className="container" style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', flexWrap: 'wrap', gap: '12px' }}>
        <span>© {new Date().getFullYear()} NUNP. All Rights Reserved.</span>
        <div style={{ display: 'flex', gap: '16px' }}>
          <a href="https://www.facebook.com/NUNPIndia" target="_blank" rel="noopener noreferrer">Facebook</a>
          <a href="https://www.instagram.com/nunp.india/" target="_blank" rel="noopener noreferrer">Instagram</a>
        </div>
      </div>
    </footer>
  )
}
