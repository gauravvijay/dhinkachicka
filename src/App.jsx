import React, { useState } from 'react'

export default function App() {
  const [count, setCount] = useState(0)

  return (
    <div className="app">
      <header>
        <h1>dhinkachicka</h1>
        <p>A minimal Vite + React starter app.</p>
      </header>

      <main>
        <button onClick={() => setCount((c) => c + 1)}>
          Clicked {count} {count === 1 ? 'time' : 'times'}
        </button>
      </main>

      <footer>
        <small>Built with Vite + React</small>
      </footer>
    </div>
  )
}
