# 🎨 DHINKACHICKA - PREMIUM DESIGN SPECIFICATION
## Visual System & Component Guidelines

---

## 1. COLOR SYSTEM

### Primary Palette

#### Backgrounds
```
Primary BG:    #0F0F0F  (RGB: 15, 15, 15)     - Main background
Secondary BG:  #1A1A1A  (RGB: 26, 26, 26)    - Card backgrounds
Tertiary BG:   #252525  (RGB: 37, 37, 37)    - Hover states
Quaternary BG: #303030  (RGB: 48, 48, 48)    - Active states
Overlay:       rgba(0, 0, 0, 0.8)             - Modal overlay
Modal:         rgba(0, 0, 0, 0.95)            - Deep modal
```

#### Accents
```
Primary Orange:    #FF6B35  (RGB: 255, 107, 53)   - CTAs, highlights
Orange Hover:      #FF8A5B  (RGB: 255, 138, 91)   - Hover state
Cyber Blue:        #00D9FF  (RGB: 0, 217, 255)    - Secondary highlights
Premium Gold:      #FFD700  (RGB: 255, 215, 0)    - Luxury touches
Success Green:     #2ED573  (RGB: 46, 213, 115)   - Confirmations
Warning Orange:    #FFA500  (RGB: 255, 165, 0)    - Warnings
Error Red:         #FF4757  (RGB: 255, 71, 87)    - Errors
```

#### Text
```
Primary Text:      #FFFFFF          - Main text (100% opacity)
Secondary Text:    #B0B0B0          - Secondary info (70% opacity)
Tertiary Text:     #808080          - Placeholders (50% opacity)
Muted Text:        #606060          - Disabled text (37% opacity)
Inverse Text:      #0F0F0F          - Text on light backgrounds
```

#### Borders & Effects
```
Border Light:      rgba(255, 255, 255, 0.05)   - Subtle borders
Border Default:    rgba(255, 255, 255, 0.1)    - Standard borders
Border Heavy:      rgba(255, 255, 255, 0.2)    - Prominent borders
Border Accent:     rgba(255, 107, 53, 0.3)     - Orange accent borders

Shadow XS:         0 2px 8px rgba(0, 0, 0, 0.3)
Shadow Small:      0 4px 12px rgba(0, 0, 0, 0.4)
Shadow Medium:     0 8px 24px rgba(0, 0, 0, 0.5)
Shadow Large:      0 16px 40px rgba(0, 0, 0, 0.6)
Shadow XL:         0 24px 64px rgba(0, 0, 0, 0.7)

Glow Orange:       0 0 20px rgba(255, 107, 53, 0.3)
Glow Orange Int:   0 0 30px rgba(255, 107, 53, 0.5)
Glow Blue:         0 0 20px rgba(0, 217, 255, 0.3)
Glow Blue Int:     0 0 30px rgba(0, 217, 255, 0.5)
```

### Color Usage Guidelines

```
Primary CTAs:        Orange (#FF6B35)
Secondary CTAs:      Blue (#00D9FF)
Destructive Actions: Red (#FF4757)
Success States:      Green (#2ED573)
Hover Effects:       Lighter shade + glow
Focus States:        Accent color + ring
Disabled:            50% opacity
Loading:             Animated glow
```

---

## 2. TYPOGRAPHY SYSTEM

### Font Stack
```javascript
// Headlines (Bold, Geometric)
font-family: 'Syne', 'Space Mono', 
             -apple-system, BlinkMacSystemFont, 'Segoe UI', sans-serif;

// Body Text (Clean, Readable)
font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', 
             'Roboto', 'Oxygen', 'Ubuntu', 'Cantarell', 
             'Fira Sans', 'Droid Sans', 'Helvetica Neue', sans-serif;
```

### Type Scale

| Level | Size | Weight | Line Height | Letter Spacing | Usage |
|-------|------|--------|------------|-----------------|-------|
| H1 | 48px | 700 | 1.2 | -0.5px | Page titles |
| H2 | 32px | 700 | 1.3 | -0.3px | Section titles |
| H3 | 24px | 600 | 1.3 | -0.1px | Subsections |
| H4 | 20px | 600 | 1.4 | 0px | Subheadings |
| H5 | 16px | 600 | 1.4 | 0px | Labels |
| Body | 16px | 400 | 1.6 | 0.3px | Main text |
| Body Small | 14px | 400 | 1.5 | 0.2px | Secondary text |
| Caption | 12px | 400 | 1.4 | 0.1px | Helper text |
| Mono | 14px | 500 | 1.6 | 0px | Code/timestamps |

### Responsive Typography

```css
/* Mobile (< 768px) */
body { font-size: 14px; }
h1 { font-size: 32px; }
h2 { font-size: 24px; }
h3 { font-size: 18px; }

/* Tablet (768px - 1024px) */
body { font-size: 15px; }
h1 { font-size: 40px; }
h2 { font-size: 28px; }
h3 { font-size: 20px; }

/* Desktop (> 1024px) */
body { font-size: 16px; }
h1 { font-size: 48px; }
h2 { font-size: 32px; }
h3 { font-size: 24px; }
```

---

## 3. COMPONENT LIBRARY

### Button Styles

#### Primary Button (CTA)
```
Background: Linear gradient (FF6B35 → FF8A5B)
Text Color: #FFFFFF
Padding: 12px 24px (sm), 14px 32px (lg)
Border Radius: 12px
Shadow: 0 0 20px rgba(255, 107, 53, 0.3)
Border: None

States:
- Default: Full shadow, normal scale
- Hover: Brighter glow (0 0 30px), -2px translate
- Active: Darker, 0px translate
- Focus: Focus ring (3px, accent color)
- Disabled: 50% opacity, no interaction
```

#### Secondary Button
```
Background: rgba(255, 255, 255, 0.05)
Text Color: #FFFFFF
Padding: 12px 24px
Border: 1.5px solid rgba(255, 255, 255, 0.2)
Border Radius: 12px
Shadow: None

States:
- Default: Light border
- Hover: Brighter background (0.1), brighter border (0.3)
- Active: Darker background (0.08)
- Focus: Focus ring
- Disabled: 50% opacity
```

#### Outline Button
```
Background: Transparent
Text Color: #FF6B35
Border: 2px solid #FF6B35
Border Radius: 12px
Padding: 10px 22px (adjusted for border)

States:
- Default: Clear outline
- Hover: Background fill (0.1 orange)
- Active: Darker text color
- Focus: Focus ring (accent)
```

#### Success Button
```
Background: Linear gradient (2ED573 → 1FB554)
Text Color: #FFFFFF
Same styling as primary but with green gradient
Shadow: 0 0 20px rgba(46, 213, 115, 0.3)
```

#### Danger Button
```
Background: Linear gradient (FF4757 → FF2D47)
Text Color: #FFFFFF
Same styling as primary but with red gradient
Shadow: 0 0 20px rgba(255, 71, 87, 0.3)
```

### Card Components

#### Glass Card
```
Background: rgba(255, 255, 255, 0.05)
Backdrop Filter: blur(10px)
Border: 1px solid rgba(255, 255, 255, 0.1)
Border Radius: 20px
Padding: 24px
Shadow: 0 8px 32px rgba(0, 0, 0, 0.3)

Hover State (optional):
- Background: rgba(255, 255, 255, 0.08)
- Border: rgba(255, 255, 255, 0.2)
- Shadow: 0 12px 48px rgba(0, 0, 0, 0.4)
- Transform: scale(1.02)
```

#### Solid Card
```
Background: #1A1A1A
Border: 1px solid rgba(255, 255, 255, 0.1)
Border Radius: 16px
Padding: 20px
Shadow: 0 4px 12px rgba(0, 0, 0, 0.4)
```

#### Minimal Card
```
Background: transparent
Border: 1.5px solid rgba(255, 255, 255, 0.1)
Border Radius: 12px
Padding: 16px
Shadow: None
```

### Input Components

#### Text Input
```
Background: rgba(255, 255, 255, 0.05)
Border: 1.5px solid rgba(255, 255, 255, 0.1)
Border Radius: 12px
Padding: 12px 16px
Font Size: 14px
Color: #FFFFFF
Placeholder: #808080

States:
- Default: Light border
- Hover: Border rgba(255, 255, 255, 0.2), background 0.08
- Focus: Border #FF6B35, background 0.08, shadow 0 0 0 3px rgba(255, 107, 53, 0.2)
- Error: Border #FF4757, shadow red glow
- Disabled: 50% opacity, cursor not-allowed
```

#### Select Dropdown
```
Same styling as text input
Arrow icon: Styled with CSS, color #B0B0B0
```

#### Textarea
```
Same as text input
Min height: 100px
Resize: Vertical only
```

### Navigation

#### Sidebar Navigation
```
Background: #1A1A1A
Width: 280px (desktop), 0 (hidden on mobile)
Padding: 24px
Border Right: 1px solid rgba(255, 255, 255, 0.1)
Position: Fixed, left side

Nav Items:
- Padding: 12px 16px
- Border Radius: 8px
- Margin Bottom: 8px
- Color: #B0B0B0
- Hover: Background rgba(255, 255, 255, 0.05), color #FFFFFF
- Active: Background #FF6B35, color #FFFFFF
```

#### Header Navigation
```
Background: #0F0F0F
Border Bottom: 1px solid rgba(255, 255, 255, 0.1)
Height: 64px
Padding: 0 24px
Display: Flex, align items center, justify between
Position: Sticky, top 0, z-index 1000
```

---

## 4. SPACING SYSTEM

### Spacing Scale
```
xs:  4px    (0.25rem)
sm:  8px    (0.5rem)
md:  12px   (0.75rem)
lg:  16px   (1rem)
xl:  24px   (1.5rem)
2xl: 32px   (2rem)
3xl: 48px   (3rem)
4xl: 64px   (4rem)
```

### Padding Guidelines
```
Cards:        24px (desktop), 16px (mobile)
Sections:     32px (vertical), 24px (horizontal)
Components:   12px-16px (internal)
Forms:        16px between fields
Buttons:      12px 24px (standard)
```

### Margin Guidelines
```
Between cards: 24px
Between sections: 32px
Between form fields: 16px
Between buttons: 12px
Section headings: 16px below
```

---

## 5. BORDER RADIUS SYSTEM

```
Small:     8px   (buttons, small inputs)
Medium:    12px  (inputs, small cards)
Large:     16px  (cards, modals)
X-Large:   20px  (large cards, glass effect)
Full:      9999px (circles, avatars)
```

---

## 6. ANIMATION & MOTION

### Timing Functions
```
Ease Out:        cubic-bezier(0.34, 1.56, 0.64, 1)  - UI elements appear
Ease In Out:     cubic-bezier(0.4, 0, 0.2, 1)       - Standard transitions
Ease In:         cubic-bezier(0.42, 0, 1, 1)        - Elements leave
Linear:          linear                              - Loading, rotations
```

### Animation Duration
```
xs:  150ms  (hover states)
sm:  300ms  (short transitions)
md:  500ms  (standard transitions)
lg:  700ms  (large animations)
xl:  1000ms (complex animations)
```

### Preset Animations

#### Fade In
```css
@keyframes fadeIn {
  from { opacity: 0; }
  to { opacity: 1; }
}
animation: fadeIn 0.4s cubic-bezier(0.34, 1.56, 0.64, 1);
```

#### Slide Up
```css
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
animation: slideUp 0.5s cubic-bezier(0.34, 1.56, 0.64, 1);
```

#### Scale In
```css
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
animation: scaleIn 0.3s cubic-bezier(0.34, 1.56, 0.64, 1);
```

#### Glow
```css
@keyframes glow {
  0%, 100% {
    box-shadow: 0 0 20px rgba(255, 107, 53, 0.3);
  }
  50% {
    box-shadow: 0 0 30px rgba(255, 107, 53, 0.5);
  }
}
animation: glow 2s ease-in-out infinite;
```

---

## 7. RESPONSIVE DESIGN

### Breakpoints
```
Mobile:     0px - 639px
Tablet:     640px - 1023px
Desktop:    1024px - 1279px
Large:      1280px - 1535px
XL:         1536px+
```

### Responsive Patterns

#### Container
```css
/* Mobile */
width: 100%;
max-width: 100%;
padding: 16px;

/* Tablet and up */
@media (min-width: 768px) {
  max-width: 1280px;
  margin: 0 auto;
  padding: 24px;
}
```

#### Grid
```css
/* Mobile */
display: grid;
grid-template-columns: 1fr;
gap: 16px;

/* Tablet */
@media (min-width: 768px) {
  grid-template-columns: repeat(2, 1fr);
  gap: 20px;
}

/* Desktop */
@media (min-width: 1024px) {
  grid-template-columns: repeat(3, 1fr);
  gap: 24px;
}
```

---

## 8. COMPONENT EXAMPLES

### Video Card
```
┌─────────────────────────┐
│                         │
│   [Video Thumbnail]     │
│                         │
├─────────────────────────┤
│ Choreography Name       │
│ Creator Name            │
│ 125K views • 2k likes   │
│ ⭐ 4.8 rating          │
│ [▶︎ Play] [❤︎ Save]    │
└─────────────────────────┘

Design:
- Background: Glass card
- Border Radius: 16px
- Thumbnail: 16px top corners
- Text: 14px body, 12px secondary
- Actions: Button group, 8px gap
```

### Creator Card
```
┌─────────────────────────┐
│ [Avatar]  Creator Name  │ → [Follow]
│           Verified ✓    │
│ 125K Followers         │
│ "Professional dancer"   │
└─────────────────────────┘

Design:
- Horizontal layout
- Avatar: 48px circle
- Blue verification badge
- Follow button: Primary
```

### Progress Indicator
```
[████████░░] 80%

Design:
- Background: rgba(255, 255, 255, 0.1)
- Fill: Gradient (FF6B35 → FF8A5B)
- Height: 4px or 6px
- Border Radius: full
```

---

## 9. ACCESSIBILITY

### Color Contrast
```
Minimum: 4.5:1 for normal text (WCAG AA)
Enhanced: 7:1 for normal text (WCAG AAA)
Large text: 3:1 (WCAG AA)

Test: #FFFFFF on #0F0F0F = 21:1 ✓ Excellent
```

### Focus States
```
All interactive elements must have visible focus rings:
- Outline: 2-3px solid #FF6B35
- Offset: 2px from element
- Rounded to match element border-radius
```

### Motion
```
Respect prefers-reduced-motion:
@media (prefers-reduced-motion: reduce) {
  * {
    animation-duration: 0.01ms !important;
    animation-iteration-count: 1 !important;
    transition-duration: 0.01ms !important;
  }
}
```

---

## 10. DARK MODE IMPLEMENTATION

### CSS Variables Approach
```javascript
:root[data-theme="dark"] {
  --bg-primary: #0F0F0F;
  --bg-secondary: #1A1A1A;
  --accent-primary: #FF6B35;
  --text-primary: #FFFFFF;
  /* ... more variables ... */
}

/* Usage */
background: var(--bg-primary);
color: var(--text-primary);
```

### Media Query
```css
@media (prefers-color-scheme: dark) {
  /* Dark theme styles */
}
```

---

## 11. IMPLEMENTATION CHECKLIST

- [ ] All backgrounds updated to dark (#0F0F0F, #1A1A1A)
- [ ] All text colors changed to light (#FFFFFF, #B0B0B0)
- [ ] Buttons updated with new colors and shadows
- [ ] Cards implement glassmorphism effect
- [ ] Inputs styled with new borders and backgrounds
- [ ] Typography system implemented
- [ ] Spacing system applied consistently
- [ ] Animations added with Framer Motion
- [ ] Responsive design tested on all breakpoints
- [ ] Accessibility checks passed (WCAG 2.1 AA)
- [ ] Dark mode toggle implemented
- [ ] Cross-browser testing completed

---

This design system ensures consistent, professional, premium presentation across all of dhinkachicka. Implement these specifications exactly for best results.
