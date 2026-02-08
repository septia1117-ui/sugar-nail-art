# Sugar Nail Art PWA

> 💅 **Premium Nail Art Booking Application**

A mobile-first Progressive Web App for booking nail art packages with WhatsApp checkout integration.

## ✨ Features

### 📱 Mobile-Native Experience

- Clean, modern UI designed for mobile devices (max 430px)
- Fixed bottom navigation like native apps
- Smooth animations and transitions
- Installable as standalone app (PWA)

### 🛍️ Core Functionality

- **Package Selection**: Choose from Basic, Deluxe, or Premium packages
- **Add-ons**: Customize with Nail Extension, Decoration, or Glitter Polish
- **Smart Cart**: Auto-calculation of total with real-time updates
- **Custom Notes**: Add special requests for your nail art
- **WhatsApp Checkout**: Direct order to admin via WhatsApp
- **Order History**: View and reorder past purchases

### 💾 Data Persistence

- LocalStorage for offline data
- Orders saved even after page refresh
- Quick reorder from history
- Notes and preferences remembered

### 🎨 Premium Design

- Purple & Pink gradient theme
- Glassmorphism effects
- Smooth animations
- Professional typography (Poppins font)
- High contrast, accessible colors

## 🚀 Getting Started

### Prerequisites

- Modern web browser (Chrome, Safari, Firefox, Edge)
- Local web server for testing

### Installation

1. **Clone or download this repository**

2. **Install a local server** (if you don't have one):

   ```bash
   npm install -g http-server
   ```

3. **Run the application**:

   ```bash
   cd uas-mobile-app
   http-server -p 8080
   ```

4. **Open in browser**:
   ```
   http://localhost:8080
   ```

### For PWA Testing

1. Open Chrome DevTools (F12)
2. Go to Application tab
3. Check "Service Workers" and "Manifest"
4. Click "Add to Home Screen" in browser menu

## 📁 Project Structure

```
uas-mobile-app/
│
├── index.html          # Home page - package selection
├── cart.html           # Shopping cart with checkout
├── orders.html         # Order history
│
├── app.js              # Main application logic
├── manifest.json       # PWA manifest
├── service-worker.js   # Offline support
│
├── assets/
│   ├── README.md       # Assets guide
│   ├── icon-192.png    # PWA icon (192x192)
│   ├── icon-512.png    # PWA icon (512x512)
│   ├── logo.png        # App logo
│   ├── nail-*.png      # Package images
│   └── gallery*.png    # Gallery images
│
└── README.md           # This file
```

## 🛠️ Technology Stack

- **HTML5**: Semantic markup
- **TailwindCSS**: Utility-first styling via CDN
- **Vanilla JavaScript**: No frameworks, pure JS
- **Feather Icons**: Beautiful icon set
- **LocalStorage API**: Data persistence
- **Service Workers**: Offline support
- **PWA Manifest**: App installation

## 📱 PWA Features

### Installability

- Add to home screen on mobile devices
- Standalone app mode (no browser UI)
- Custom splash screen
- App shortcuts for quick access

### Offline Support

- Service worker caches essential files
- Basic functionality works offline
- Graceful degradation

### Performance

- Fast loading with caching
- Optimized asset delivery
- Smooth 60fps animations

## 🔧 Configuration

### WhatsApp Admin Number

Edit the admin WhatsApp number in `cart.html`:

```javascript
// Line ~290 in cart.html
const whatsappNumber = "6281234567890"; // Replace with actual number
```

Or in `app.js`:

```javascript
// Line ~200+ in app.js
function sendToWhatsApp(orderData, adminNumber = "6281234567890") {
  // Replace default number
}
```

### Package Prices

Edit package data in `index.html`:

```html
<div class="package-card" data-package="Basic Package" data-price="50000">
  <!-- Change price here -->
</div>
```

### Add-on Items

Edit add-ons in `cart.html`:

```html
<input
  type="checkbox"
  class="addon-checkbox"
  data-addon="Nail Extension"
  data-price="30000"
/>
```

## 📦 Building for Production

### For PWABuilder (APK Generation)

1. **Host your PWA** on a live server (GitHub Pages, Netlify, Vercel, etc.)
2. **Visit PWABuilder**: https://www.pwabuilder.com

3. **Enter your URL** and click "Start"

4. **Download APK** package for Android

5. **Follow instructions** to publish to Play Store (optional)

### Recommended Hosting

- **GitHub Pages**: Free, easy setup
- **Netlify**: Free tier, auto-deploy
- **Vercel**: Free for personal projects
- **Firebase Hosting**: Good for PWAs

## ✅ Testing Checklist

- [ ] All pages load correctly
- [ ] Package selection works
- [ ] Add-ons calculation is accurate
- [ ] WhatsApp message format is correct
- [ ] Orders save to history
- [ ] Reorder functionality works
- [ ] Bottom navigation active states
- [ ] Toast notifications appear
- [ ] Service worker registers
- [ ] Manifest validates
- [ ] App is installable
- [ ] Offline mode works (basic)

## 🎨 Customization

### Colors

Edit Tailwind config in each HTML file:

```javascript
tailwind.config = {
  theme: {
    extend: {
      colors: {
        "primary-purple": "#6D28D9",
        "vibrant-pink": "#EC4899",
        // Add your colors
      },
    },
  },
};
```

### Fonts

Change Google Fonts link in HTML `<head>`:

```html
<link
  href="https://fonts.googleapis.com/css2?family=YourFont&display=swap"
  rel="stylesheet"
/>
```

## 📸 Screenshots

Add actual screenshots to:

- Home page: `/assets/screenshot-home.png`
- Cart page: `/assets/screenshot-cart.png`

Reference in `manifest.json` for app stores.

## 🐛 Troubleshooting

### Service Worker not registering

- Check browser console for errors
- Ensure HTTPS or localhost
- Clear cache and hard reload

### Images not showing

- Check file paths are correct
- Ensure files exist in `/assets`
- Check file naming (case-sensitive)

### WhatsApp not opening

- Verify phone number format (628...)
- Check URL encoding
- Test on mobile device

## 📄 License

This project is for educational/portfolio purposes.

## 👨‍💻 Developer

Created for college assignment - Mobile Application Development

---

**Created by Dhian Aksara with 💜 for Sugar Nail Art**
UNIVERSITAS SUGENG HARTONO
