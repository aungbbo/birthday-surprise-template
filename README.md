# Birthday Surprise Website - Customization Guide

Create a beautiful birthday surprise website for your loved one! This template makes it easy to personalize everything without touching the code.

## Quick Start

1. **Clone this repository**

   ```bash
   git clone https://github.com/yourusername/birthday-surprise-website.git
   cd birthday-surprise-website
   ```

2. **Install dependencies**

   ```bash
   npm install
   ```

3. **Customize the config** (see below)

4. **Add your photos and music**

5. **Preview locally**

   ```bash
   npm run dev
   ```

6. **Build and deploy**
   ```bash
   npm run build
   ```

---

## Customization

### Step 1: Edit the Config File

Open `src/config.ts` - this is the **only file you need to edit** to personalize the website.

#### Name Verification

```typescript
recipientName: "hsu",           // Name they must enter (case-insensitive)
nameHint: '3 letters, starts with "H"',  // Hint shown after wrong attempt
```

#### Section Headings

```typescript
soloGalleryTitle: "My Cutie BD Girl",    // First photo gallery title
coupleGalleryTitle: "Us Together",        // Second photo gallery title
messageTitle: "To My Favorite Person",    // Letter section title
footerText: "Made with love just for you", // Footer text
```

#### Button Labels

```typescript
buttons: {
  hero: "Ready for a little surprise?",
  firstGallery: "Want to see more?",
  secondGallery: "One last thing...",
},
```

#### Birthday Message

```typescript
message: [
  "Happy Birthday!",
  "",  // Empty string = blank line
  "Your personalized message goes here...",
  "",
  "- With love,",
],
```

#### Theme Colors

```typescript
colors: {
  primary: "#ec4899",    // Main pink
  secondary: "#f9a8d4",  // Light pink
  accent: "#fdf2f8",     // Background accent
  white: "#ffffff",
},
```

#### Typing Animation Text

```typescript
typingText: {
  first: "Hey, wait a second!",
  second: "This website is only for someone special.",
},
```

---

### Step 2: Add Your Photos

Replace the photos in these folders:

```
src/assets/
├── solo/           # 9 photos of your loved one
│   ├── s1.jpg
│   ├── s2.jpg
│   ├── s3.jpg
│   ├── s4.jpg
│   ├── s5.jpg
│   ├── s6.jpg
│   ├── s7.jpg
│   ├── s8.jpg
│   └── s9.jpg
│
└── couple/         # 9 photos of you together
    ├── c1.jpg
    ├── c2.jpg
    ├── c3.jpg
    ├── c4.jpg
    ├── c5.jpg
    ├── c6.jpg
    ├── c7.jpg
    ├── c8.jpg
    └── c9.jpg
```

**Photo Tips:**

- Use square or nearly square photos for best results
- Recommended size: 500x500 to 1000x1000 pixels
- Supported formats: JPG, PNG, WebP
- Keep file sizes reasonable (under 500KB each) for fast loading

---

### Step 3: Add Your Music

Replace the background music:

```
src/assets/music.mp3
```

**Music Tips:**

- Use MP3 format for best compatibility
- Keep file size under 5MB if possible
- Choose something meaningful to both of you!

---

### Step 4: Update the Banner and Cake GIFs (Optional)

Replace the animated images:

```
src/assets/banner.gif    # Animated banner on hero section
src/assets/cake.gif      # Birthday cake animation
```

---

## Deployment Options

### Option 1: Vercel (Recommended - Free)

1. Push your repo to GitHub
2. Go to [vercel.com](https://vercel.com)
3. Import your repository
4. Click Deploy

### Option 2: Netlify (Free)

1. Push your repo to GitHub
2. Go to [netlify.com](https://netlify.com)
3. Connect your repository
4. Deploy

### Option 3: GitHub Pages

1. Install gh-pages: `npm install -D gh-pages`
2. Add to package.json scripts: `"deploy": "npm run build && gh-pages -d dist"`
3. Run: `npm run deploy`

---

## Project Structure

```
birthday-surprise-website/
├── src/
│   ├── config.ts              # EDIT THIS FILE
│   ├── App.tsx                # Main app component
│   ├── App.css                # Global styles
│   ├── assets/
│   │   ├── solo/              # Solo photos (s1-s9.jpg)
│   │   ├── couple/            # Couple photos (c1-c9.jpg)
│   │   ├── music.mp3          # Background music
│   │   ├── banner.gif         # Hero banner
│   │   └── cake.gif           # Birthday cake
│   └── components/
│       ├── NameGate.tsx       # Entry verification screen
│       ├── HeroSection.tsx    # Welcome section with cake
│       ├── PhotoGallery.tsx   # Reusable photo grid
│       └── LetterSection.tsx  # Birthday message
├── CUSTOMIZE.md               # This file
└── README.md                  # Project readme
```

---

## FAQ

**Q: How do I change the number of photos?**
A: The template expects 9 photos per gallery (3x3 grid). If you want a different layout, you'll need to modify `PhotoGallery.tsx`.

**Q: Can I add more sections?**
A: Yes! Create a new component in `src/components/` and add it to `App.tsx`.

**Q: The music doesn't autoplay?**
A: Modern browsers block autoplay. The music starts after the visitor enters the correct name.

**Q: How do I change the pink color scheme?**
A: Edit the colors in `src/config.ts` and `src/App.css` (CSS variables at the top).

---

## Need Help?

If you run into issues:

1. Make sure all photo files exist and are named correctly
2. Check the browser console for errors
3. Ensure all dependencies are installed (`npm install`)

---

Made with love for love!
