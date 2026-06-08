import React from 'react'

export default function Header() {
  return (
    <header className="site-header">
      <div className="container">
        <a className="brand" href="/">NUNP</a>
        <nav>
          <a href="/">Home</a>
          <a href="/about/">About</a>
          <a href="/programs/">Programs</a>
          <a href="/join/">Join</a>
        </nav>
      </div>
    </header>
  )
}
