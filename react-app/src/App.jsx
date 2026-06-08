import React from 'react'
import Header from './components/Header'
import Footer from './components/Footer'

export default function App() {
  return (
    <div className="app-root">
      <Header />
      <main className="container">
        <h1>NUNP — Connect · Share · Empower</h1>
        <p>This is a Vite + React scaffold. Port components from the static site into `src/components/`.</p>
      </main>
      <Footer />
    </div>
  )
}
