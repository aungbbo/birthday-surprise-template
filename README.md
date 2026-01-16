# Birthday Surprise Template

A beautiful, customizable birthday surprise website template. Create a personalized experience for your loved one with photos, music, and a heartfelt message.

## Features

- Name verification gate with typing animation
- Animated hero section with birthday cake
- Photo gallery with polaroid-style frames
- Optional "together" photo gallery section
- Typewriter-animated birthday letter
- Background music with toggle
- Confetti celebration effect
- Fully responsive design
- Easy customization via config file

## Quick Start

```bash
# Clone the repository
git clone https://github.com/aungbbo/birthday-surprise-template.git
cd birthday-surprise-template

# Install dependencies
npm install

# Start development server
npm run dev

# Build for production
npm run build
```

## Customization

Edit `src/config.ts` to personalize everything:

### Name Verification

```typescript
recipientName: "love",                    // Name to enter (case-insensitive)
nameHint: '4 letters, starts with "L"',   // Hint shown on wrong attempt
```

### Section Headings

```typescript
soloGalleryTitle: "✨ My Birthday Girl ✨",  // First gallery title
messageTitle: "To My Favorite Person",       // Letter section title
footerText: "Made with 💗 just for you",     // Footer text
```

### Button Labels

```typescript
buttons: {
  hero: "Ready for a little surprise?",   // Hero section button
  soloGallery: "Want to see more?",       // Solo gallery button
},
```

### Together Gallery (Optional)

```typescript
togetherGallery: {
  enabled: true,                          // Set false to disable
  title: "💕 Our Memories 💕",            // Together gallery title
  buttonText: "One last thing...",        // Together gallery button
},
```

When `enabled: false`, the together gallery is skipped and you don't need photos in `src/assets/together/`.

### Birthday Message

```typescript
message: [
  "Happy Birthday, my love!",
  "",                                     // Empty string = blank line
  "Your personalized message here...",
  "",
  "- With love,",
],
```

### Theme Colors

```typescript
colors: {
  primary: "#ec4899",   // Main color (buttons, accents)
  light: "#fdf2f8",     // Lightest shade (backgrounds)
  medium: "#f9a8d4",    // Medium shade (decorations)
  dark: "#db2777",      // Darkest shade (hover states)
},
```

**Example themes:**

| Theme          | primary   | light     | medium    | dark      |
| -------------- | --------- | --------- | --------- | --------- |
| Pink (default) | `#ec4899` | `#fdf2f8` | `#f9a8d4` | `#db2777` |
| Blue           | `#3b82f6` | `#eff6ff` | `#93c5fd` | `#1d4ed8` |
| Purple         | `#a855f7` | `#faf5ff` | `#d8b4fe` | `#7c3aed` |
| Green          | `#22c55e` | `#f0fdf4` | `#86efac` | `#16a34a` |

### Typing Animation

```typescript
typingText: {
  first: "Hey, wait a second!",
  second: "This website is only for someone special.",
},
```

## Adding Photos

Replace photos in these folders:

```
src/assets/
├── solo/              # 9 photos (required)
│   ├── s1.png
│   ├── s2.png
│   └── ... s9.png
│
├── together/          # 9 photos (only if togetherGallery.enabled is true)
│   ├── t1.png
│   ├── t2.png
│   └── ... t9.png
│
├── music.mp3          # Background music
├── banner.gif         # Hero banner animation
└── cake.gif           # Birthday cake animation
```

**Photo tips:**

- Use square or nearly square images
- Recommended: 500x500 to 1000x1000 pixels
- Formats: PNG, JPG
- Keep files under 500KB for fast loading

## Project Structure

```
birthday-surprise-website/
├── src/
│   ├── config.ts           # ← Edit this file to customize
│   ├── App.tsx             # Main app component
│   ├── App.css             # App styles
│   ├── index.css           # Global styles & theme
│   ├── assets/
│   │   ├── solo/           # Solo photos (s1-s9.png)
│   │   ├── together/       # Together photos (t1-t9.png)
│   │   ├── music.mp3       # Background music
│   │   ├── banner.gif      # Hero banner
│   │   └── cake.gif        # Birthday cake
│   └── components/
│       ├── NameGate.tsx       # Name verification
│       ├── HeroSection.tsx    # Welcome section
│       ├── PhotoGallery.tsx   # Photo grid
│       └── LetterSection.tsx  # Birthday wishes letter
├── public/
│   └── icon.png            # Browser tab icon
├── index.html
└── package.json
```

## Deployment

### Vercel (Recommended)

1. Push to GitHub
2. Go to [vercel.com](https://vercel.com)
3. Import repository
4. Deploy

### Netlify

1. Push to GitHub
2. Go to [netlify.com](https://netlify.com)
3. Connect repository
4. Deploy

## FAQ

**Q: Can I use fewer than 9 photos?**
<br>
A: The template uses a 3x3 grid (9 photos). For different layouts, modify `PhotoGallery.tsx`.

**Q: Music doesn't autoplay?**
<br>
A: Browsers block autoplay. Music starts after entering the correct name.

**Q: Can I disable the together gallery?**
<br>
A: Yes! Set `togetherGallery.enabled: false` in config.

**Q: How do I change the theme color?**
<br>
A: Edit the `colors` object in `src/config.ts`. Changes apply to the entire site.

## Tech Stack

- React + TypeScript
- Vite
- Framer Motion
- Canvas Confetti

## Support

If you found this template helpful, consider buying me a coffee so I can create more templates for special occasions!

<a href="https://www.buymeacoffee.com/aungbbo" target="_blank">
  <img src="https://cdn.buymeacoffee.com/buttons/v2/default-yellow.png" alt="Buy Me A Coffee" height="50">
</a>

## License

Personal Use Only — free to use for personal projects. Commercial use is not permitted.

---

Made with love for love 💕
