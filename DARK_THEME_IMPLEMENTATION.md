# 🎬 DARK THEME IMPLEMENTATION GUIDE
## Complete Code Examples for Premium Redesign

---

## 1. NEW COLOR SYSTEM (colors.js)

```javascript
/**
 * Premium Dark Theme Color Palette
 * YouTube-inspired, professional, high-contrast
 */

export const darkColors = {
  // Primary Backgrounds
  background: {
    primary: '#0F0F0F',        // Pure black - main background
    secondary: '#1A1A1A',      // Slightly lighter - cards
    tertiary: '#252525',       // Hover states
    quaternary: '#303030',     // Active states
    overlay: 'rgba(0, 0, 0, 0.8)',
    modal: 'rgba(0, 0, 0, 0.95)'
  },

  // Accent Colors
  accent: {
    primary: '#FF6B35',        // Warm orange - CTAs
    primaryHover: '#FF8A5B',   // Lighter on hover
    primaryGlow: 'rgba(255, 107, 53, 0.3)',
    
    secondary: '#00D9FF',      // Cyan - highlights
    secondaryHover: '#33E8FF',
    secondaryGlow: 'rgba(0, 217, 255, 0.2)',
    
    gold: '#FFD700',           // Premium accents
    goldMuted: 'rgba(255, 215, 0, 0.5)',
    
    success: '#2ED573',        // Green
    successGlow: 'rgba(46, 213, 115, 0.2)',
    
    warning: '#FFA500',        // Orange
    warningGlow: 'rgba(255, 165, 0, 0.2)',
    
    danger: '#FF4757',         // Red
    dangerGlow: 'rgba(255, 71, 87, 0.2)'
  },

  // Text Colors
  text: {
    primary: '#FFFFFF',        // Main text - pure white
    secondary: '#B0B0B0',      // Secondary info - light gray
    tertiary: '#808080',       // Placeholder, disabled
    muted: '#606060',          // Very muted
    inverse: '#0F0F0F'         // For text on light backgrounds
  },

  // Borders
  border: {
    default: 'rgba(255, 255, 255, 0.1)',
    light: 'rgba(255, 255, 255, 0.05)',
    heavy: 'rgba(255, 255, 255, 0.2)',
    accent: 'rgba(255, 107, 53, 0.3)'
  },

  // Shadows
  shadow: {
    xs: '0 2px 8px rgba(0, 0, 0, 0.3)',
    sm: '0 4px 12px rgba(0, 0, 0, 0.4)',
    md: '0 8px 24px rgba(0, 0, 0, 0.5)',
    lg: '0 16px 40px rgba(0, 0, 0, 0.6)',
    xl: '0 24px 64px rgba(0, 0, 0, 0.7)',
    
    // Glow Effects
    glow: '0 0 20px rgba(255, 107, 53, 0.3)',
    glowIntense: '0 0 30px rgba(255, 107, 53, 0.5)',
    glowBlue: '0 0 20px rgba(0, 217, 255, 0.3)',
    glowBlueIntense: '0 0 30px rgba(0, 217, 255, 0.5)'
  }
};
```

---

## 2. UPDATED GLOBAL STYLES (globalStyles.js)

```javascript
export const globalStyles = `
  * {
    margin: 0;
    padding: 0;
    box-sizing: border-box;
  }

  html {
    scroll-behavior: smooth;
    scrollbar-width: thin;
    scrollbar-color: #FF6B35 #1A1A1A;
  }

  body {
    background: linear-gradient(135deg, #0F0F0F 0%, #1A1A1A 100%);
    color: #FFFFFF;
    font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', 
                 'Roboto', 'Oxygen', 'Ubuntu', 'Cantarell', 
                 'Fira Sans', 'Droid Sans', 'Helvetica Neue', sans-serif;
    font-weight: 400;
    font-size: 16px;
    line-height: 1.6;
    -webkit-font-smoothing: antialiased;
    -moz-osx-font-smoothing: grayscale;
    min-height: 100vh;
  }

  /* Typography */
  h1, h2, h3, h4, h5, h6 {
    font-weight: 700;
    letter-spacing: -0.5px;
    margin-bottom: 0.5em;
  }

  h1 { font-size: 48px; }
  h2 { font-size: 32px; }
  h3 { font-size: 24px; }
  h4 { font-size: 20px; }
  h5 { font-size: 16px; }
  h6 { font-size: 14px; }

  p {
    margin-bottom: 1em;
    color: #B0B0B0;
  }

  /* Buttons */
  button {
    font-family: inherit;
    cursor: pointer;
    border: none;
    border-radius: 12px;
    padding: 12px 24px;
    font-size: 14px;
    font-weight: 600;
    letter-spacing: 0.3px;
    transition: all 0.3s cubic-bezier(0.34, 1.56, 0.64, 1);
    position: relative;
    overflow: hidden;
  }

  button:hover:not(:disabled) {
    transform: translateY(-2px);
  }

  button:active:not(:disabled) {
    transform: translateY(0);
  }

  button:disabled {
    opacity: 0.5;
    cursor: not-allowed;
  }

  /* Primary Button */
  .btn-primary {
    background: linear-gradient(135deg, #FF6B35 0%, #FF8A5B 100%);
    color: #FFFFFF;
    box-shadow: 0 0 20px rgba(255, 107, 53, 0.3);
  }

  .btn-primary:hover:not(:disabled) {
    box-shadow: 0 0 30px rgba(255, 107, 53, 0.5);
  }

  /* Secondary Button */
  .btn-secondary {
    background: rgba(255, 255, 255, 0.05);
    color: #FFFFFF;
    border: 1.5px solid rgba(255, 255, 255, 0.2);
  }

  .btn-secondary:hover:not(:disabled) {
    background: rgba(255, 255, 255, 0.1);
    border-color: rgba(255, 255, 255, 0.3);
  }

  /* Outline Button */
  .btn-outline {
    background: transparent;
    color: #FF6B35;
    border: 2px solid #FF6B35;
  }

  .btn-outline:hover:not(:disabled) {
    background: rgba(255, 107, 53, 0.1);
  }

  /* Success Button */
  .btn-success {
    background: linear-gradient(135deg, #2ED573 0%, #1FB554 100%);
    color: #FFFFFF;
    box-shadow: 0 0 20px rgba(46, 213, 115, 0.3);
  }

  /* Danger Button */
  .btn-danger {
    background: linear-gradient(135deg, #FF4757 0%, #FF2D47 100%);
    color: #FFFFFF;
    box-shadow: 0 0 20px rgba(255, 71, 87, 0.3);
  }

  /* Inputs & Form Elements */
  input, select, textarea {
    font-family: inherit;
    padding: 12px 16px;
    border: 1.5px solid rgba(255, 255, 255, 0.1);
    border-radius: 12px;
    font-size: 14px;
    background: rgba(255, 255, 255, 0.05);
    color: #FFFFFF;
    transition: all 0.3s ease;
  }

  input::placeholder, textarea::placeholder {
    color: #808080;
  }

  input:focus, select:focus, textarea:focus {
    outline: none;
    border-color: #FF6B35;
    background: rgba(255, 255, 255, 0.08);
    box-shadow: 0 0 0 3px rgba(255, 107, 53, 0.2);
  }

  input:hover:not(:focus) {
    border-color: rgba(255, 255, 255, 0.2);
    background: rgba(255, 255, 255, 0.08);
  }

  /* Labels */
  label {
    font-size: 13px;
    font-weight: 600;
    color: #FFFFFF;
    letter-spacing: 0.2px;
    display: block;
    margin-bottom: 8px;
  }

  /* Small Text */
  small {
    font-size: 12px;
    color: #808080;
  }

  /* Scrollbar Styling */
  ::-webkit-scrollbar {
    width: 8px;
    height: 8px;
  }

  ::-webkit-scrollbar-track {
    background: transparent;
  }

  ::-webkit-scrollbar-thumb {
    background: #FF6B35;
    border-radius: 4px;
  }

  ::-webkit-scrollbar-thumb:hover {
    background: #FF8A5B;
  }

  /* Hide internal scrollbars */
  .no-scroll {
    scrollbar-width: none !important;
    -ms-overflow-style: none !important;
  }

  .no-scroll::-webkit-scrollbar {
    display: none;
  }

  /* Links */
  a {
    color: #FF6B35;
    text-decoration: none;
    transition: color 0.3s ease;
  }

  a:hover {
    color: #FF8A5B;
  }

  /* Selection Color */
  ::selection {
    background: #FF6B35;
    color: #FFFFFF;
  }

  /* Animations */
  @keyframes fadeIn {
    from {
      opacity: 0;
    }
    to {
      opacity: 1;
    }
  }

  @keyframes slideUp {
    from {
      opacity: 0;
      transform: translateY(20px);
    }
    to {
      opacity: 1;
      transform: translateY(0);
    }
  }

  @keyframes scaleIn {
    from {
      opacity: 0;
      transform: scale(0.95);
    }
    to {
      opacity: 1;
      transform: scale(1);
    }
  }

  @keyframes glow {
    0%, 100% {
      box-shadow: 0 0 20px rgba(255, 107, 53, 0.3);
    }
    50% {
      box-shadow: 0 0 30px rgba(255, 107, 53, 0.5);
    }
  }

  @keyframes spin {
    from {
      transform: rotate(0deg);
    }
    to {
      transform: rotate(360deg);
    }
  }

  @keyframes pulse {
    0%, 100% {
      opacity: 1;
    }
    50% {
      opacity: 0.5;
    }
  }

  /* Responsive */
  @media (max-width: 768px) {
    body {
      font-size: 14px;
    }

    h1 { font-size: 32px; }
    h2 { font-size: 24px; }
    h3 { font-size: 18px; }

    button {
      padding: 10px 18px;
      font-size: 13px;
    }

    input, select, textarea {
      padding: 10px 12px;
      font-size: 13px;
    }
  }
`;
```

---

## 3. COMPONENT EXAMPLES

### Glass Card Component

```jsx
// components/GlassCard.jsx
export function GlassCard({ children, className = "", hover = true }) {
  return (
    <div
      className={`glass-card ${hover ? 'glass-card--hover' : ''} ${className}`}
      style={{
        background: 'rgba(255, 255, 255, 0.05)',
        backdropFilter: 'blur(10px)',
        border: '1px solid rgba(255, 255, 255, 0.1)',
        borderRadius: '20px',
        padding: '24px',
        boxShadow: '0 8px 32px rgba(0, 0, 0, 0.3)',
        transition: 'all 0.3s cubic-bezier(0.34, 1.56, 0.64, 1)',
        ...(hover && {
          ':hover': {
            background: 'rgba(255, 255, 255, 0.08)',
            borderColor: 'rgba(255, 255, 255, 0.2)',
            boxShadow: '0 12px 48px rgba(0, 0, 0, 0.4)'
          }
        })
      }}
    >
      {children}
    </div>
  );
}
```

### Premium Button Component

```jsx
// components/Button.jsx
export function Button({
  variant = 'primary',
  size = 'md',
  children,
  loading = false,
  disabled = false,
  glow = true,
  ...props
}) {
  const sizeStyles = {
    sm: { padding: '8px 16px', fontSize: '12px' },
    md: { padding: '12px 24px', fontSize: '14px' },
    lg: { padding: '14px 32px', fontSize: '16px' }
  };

  const variantStyles = {
    primary: {
      background: 'linear-gradient(135deg, #FF6B35 0%, #FF8A5B 100%)',
      color: '#FFFFFF',
      boxShadow: glow ? '0 0 20px rgba(255, 107, 53, 0.3)' : 'none'
    },
    secondary: {
      background: 'rgba(255, 255, 255, 0.05)',
      color: '#FFFFFF',
      border: '1.5px solid rgba(255, 255, 255, 0.2)'
    },
    outline: {
      background: 'transparent',
      color: '#FF6B35',
      border: '2px solid #FF6B35'
    },
    success: {
      background: 'linear-gradient(135deg, #2ED573 0%, #1FB554 100%)',
      color: '#FFFFFF',
      boxShadow: glow ? '0 0 20px rgba(46, 213, 115, 0.3)' : 'none'
    }
  };

  return (
    <button
      style={{
        ...sizeStyles[size],
        ...variantStyles[variant],
        border: 'none',
        borderRadius: '12px',
        fontWeight: '600',
        letterSpacing: '0.3px',
        cursor: loading || disabled ? 'not-allowed' : 'pointer',
        opacity: disabled ? 0.5 : 1,
        transition: 'all 0.3s cubic-bezier(0.34, 1.56, 0.64, 1)',
        position: 'relative',
        overflow: 'hidden'
      }}
      disabled={loading || disabled}
      {...props}
    >
      {loading ? (
        <span style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
          <Spinner size="sm" /> Loading...
        </span>
      ) : (
        children
      )}
    </button>
  );
}
```

### Loading Spinner Component

```jsx
// components/LoadingSpinner.jsx
export function LoadingSpinner({ size = 'md', color = 'primary' }) {
  const sizes = { sm: 24, md: 40, lg: 60 };
  const colors = {
    primary: '#FF6B35',
    secondary: '#00D9FF',
    white: '#FFFFFF'
  };

  return (
    <div
      style={{
        width: sizes[size],
        height: sizes[size],
        border: `3px solid rgba(255, 255, 255, 0.1)`,
        borderTop: `3px solid ${colors[color]}`,
        borderRadius: '50%',
        animation: 'spin 0.8s linear infinite'
      }}
    />
  );
}
```

---

## 4. DARK THEME TOGGLE HOOK

```javascript
// hooks/useTheme.js
import { createContext, useContext, useState, useEffect } from 'react';

const ThemeContext = createContext();

export function ThemeProvider({ children }) {
  const [isDark, setIsDark] = useState(() => {
    if (typeof window !== 'undefined') {
      const saved = localStorage.getItem('theme');
      if (saved) return saved === 'dark';
      return window.matchMedia('(prefers-color-scheme: dark)').matches;
    }
    return true;
  });

  useEffect(() => {
    localStorage.setItem('theme', isDark ? 'dark' : 'light');
    document.documentElement.setAttribute('data-theme', isDark ? 'dark' : 'light');
  }, [isDark]);

  const toggleTheme = () => setIsDark(!isDark);

  return (
    <ThemeContext.Provider value={{ isDark, toggleTheme }}>
      {children}
    </ThemeContext.Provider>
  );
}

export function useTheme() {
  const context = useContext(ThemeContext);
  if (!context) {
    throw new Error('useTheme must be used within ThemeProvider');
  }
  return context;
}
```

---

## 5. ANIMATION LIBRARY

```javascript
// utils/animations.js
export const animations = {
  // Entrance animations
  fadeIn: {
    initial: { opacity: 0 },
    animate: { opacity: 1 },
    transition: { duration: 0.4 }
  },

  slideUp: {
    initial: { opacity: 0, y: 20 },
    animate: { opacity: 1, y: 0 },
    transition: { duration: 0.5, ease: 'easeOut' }
  },

  slideDown: {
    initial: { opacity: 0, y: -20 },
    animate: { opacity: 1, y: 0 },
    transition: { duration: 0.5, ease: 'easeOut' }
  },

  slideLeft: {
    initial: { opacity: 0, x: -20 },
    animate: { opacity: 1, x: 0 },
    transition: { duration: 0.5, ease: 'easeOut' }
  },

  slideRight: {
    initial: { opacity: 0, x: 20 },
    animate: { opacity: 1, x: 0 },
    transition: { duration: 0.5, ease: 'easeOut' }
  },

  scaleIn: {
    initial: { opacity: 0, scale: 0.95 },
    animate: { opacity: 1, scale: 1 },
    transition: { duration: 0.3, ease: 'easeOut' }
  },

  // Container animations
  containerStagger: {
    animate: {
      transition: {
        staggerChildren: 0.1,
        delayChildren: 0.2
      }
    }
  }
};
```

---

## 6. IMPLEMENTATION CHECKLIST

- [ ] Create `colors.js` with dark palette
- [ ] Update `globalStyles.js` with dark theme CSS
- [ ] Create `GlassCard.jsx` component
- [ ] Create `Button.jsx` component
- [ ] Create `LoadingSpinner.jsx` component
- [ ] Create `useTheme.js` hook
- [ ] Create `animations.js` utility
- [ ] Update all component backgrounds
- [ ] Update all text colors
- [ ] Update all button styles
- [ ] Test on all pages
- [ ] Test responsive design
- [ ] Performance testing

---

This implementation provides the foundation for a world-class, premium dark-themed application that rivals YouTube in visual appeal while maintaining deep functionality for dance learning.
