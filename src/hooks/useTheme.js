import { useState, useEffect, useCallback } from 'react'
import { THEME_PALETTES } from '../data/portfolio'

const STORAGE_KEY = 'yog-portfolio-theme'

export function useTheme() {
  const VALID = ['earthy', 'sage', 'sky', 'dusk', 'crimson']
  const [theme, setThemeState] = useState(() => {
    const saved = localStorage.getItem(STORAGE_KEY)
    return saved && VALID.includes(saved) ? saved : 'earthy'
  })

  useEffect(() => {
    document.documentElement.setAttribute('data-theme', theme)
    localStorage.setItem(STORAGE_KEY, theme)
  }, [theme])

  const setTheme = useCallback((name) => setThemeState(name), [])

  const palette = THEME_PALETTES[theme] || THEME_PALETTES.earthy

  return { theme, setTheme, palette }
}
