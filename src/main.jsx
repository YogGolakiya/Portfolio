import React from 'react'
import ReactDOM from 'react-dom/client'
import App from './App'
import './index.css'

// Apply saved theme before first render so CSS vars are correct for the Loader canvas
const _VALID_THEMES = ['earthy', 'sage', 'sky', 'dusk', 'crimson']
const _saved = localStorage.getItem('yog-portfolio-theme')
document.documentElement.setAttribute('data-theme',
  _saved && _VALID_THEMES.includes(_saved) ? _saved : 'earthy'
)

ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <App />
  </React.StrictMode>
)
