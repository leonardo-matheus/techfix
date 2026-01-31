import React from 'react'
import ReactDOM from 'react-dom/client'
import App from './App'
import '@/styles/globals.css'

// Initialize theme
const initializeTheme = () => {
  const stored = localStorage.getItem('techfix-ui')
  let theme = 'light'

  if (stored) {
    try {
      const parsed = JSON.parse(stored)
      theme = parsed.state?.theme || 'system'
    } catch {
      theme = 'system'
    }
  }

  const root = document.documentElement

  if (theme === 'system') {
    const systemTheme = window.matchMedia('(prefers-color-scheme: dark)').matches
      ? 'dark'
      : 'light'
    root.classList.add(systemTheme)
  } else {
    root.classList.add(theme)
  }
}

initializeTheme()

ReactDOM.createRoot(document.getElementById('root')!).render(
  <React.StrictMode>
    <App />
  </React.StrictMode>
)
