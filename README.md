# Yog Golakiya — Portfolio

Production-ready React portfolio with 3D canvas background, 5-theme switcher, and full section architecture.

## Tech Stack
- **React 18** + **Vite 5**
- **Tailwind CSS 3** — utility styling + CSS variables for theming
- **Framer Motion** — loader animation, section transitions
- **Three.js (custom Canvas)** — 3D wireframe icosahedra / rings / tetrahedra background
- **react-icons** — SI + FA icon sets (no emojis)
- **lucide-react** — UI icons throughout
- **typewriter-effect** — hero role cycling
- **@emailjs/browser** — contact form

## Project Structure
```
src/
├── components/
│   ├── sections/
│   │   ├── Loader.jsx       ← YG letter animation loader
│   │   ├── Navbar.jsx       ← sticky nav + theme switcher
│   │   ├── Hero.jsx         ← hero with typewriter + stat cards
│   │   ├── About.jsx        ← story + education + journey cards
│   │   ├── Skills.jsx       ← filterable skill chips with react-icons
│   │   ├── Experience.jsx   ← timeline with bullet points
│   │   ├── Projects.jsx     ← filterable project cards + live links
│   │   ├── Contact.jsx      ← EmailJS form + social links
│   │   └── Footer.jsx
│   └── ui/
│       ├── SectionHeader.jsx
│       └── Tag.jsx
├── three/
│   └── Scene3D.jsx          ← canvas 3D wireframe scene
├── hooks/
│   ├── useTheme.js          ← localStorage theme persistence
│   └── useReveal.js         ← IntersectionObserver scroll reveal
├── data/
│   └── portfolio.js         ← ALL content data (single source of truth)
├── styles/
│   └── themes.css           ← 5 CSS custom property themes
├── App.jsx
├── main.jsx
└── index.css
```

## Getting Started

```bash
npm install
npm run dev
```

## Setup EmailJS (Contact Form)
1. Go to [emailjs.com](https://emailjs.com) → create account
2. Create a service (Gmail recommended)
3. Create a template with variables: `from_name`, `from_email`, `subject`, `message`
4. In `src/components/sections/Contact.jsx` replace:
   - `YOUR_SERVICE_ID`
   - `YOUR_TEMPLATE_ID`
   - `YOUR_PUBLIC_KEY`

## 5 Themes
Switch theme via the palette icon in the navbar:
- **Earthy** (default) — warm cream, terracotta, sage, sky
- **Sage Green** — fresh greens, mint tones
- **Sky Blue** — cool ocean blues
- **Dusk Purple** — dark midnight + violet
- **Forest Dark** — deep green + electric lime

Theme persists via `localStorage`.

## Deploy to Vercel
```bash
npm run build
# Deploy dist/ to Vercel, Netlify, or any static host
```
