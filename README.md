# blur_food Website

Professional website for anonymous food content creator `blur_food` to minimize leads and streamline endorsement inquiries.

## 🎯 Purpose

Filter endorsement leads efficiently by providing transparent pricing and requirements upfront. Brands/agencies check website first, then contact via WhatsApp only if requirements match.

## 🌐 Live Website

**Domain:** titikblur.com (to be configured)
**GitHub Pages:** https://[username].github.io/blur-food-website/

## 📁 Project Structure

```
blur-food-website/
├── index.html          # Homepage with portfolio & CTA
├── pricing.html        # Pricing, add-ons, order form
├── style.css          # All styling (responsive design)
├── script.js          # Cart management & WhatsApp automation
├── assets/            # Images, icons, logos
│   ├── portfolio/     # Content examples
│   └── logo/         # Brand assets
└── README.md          # This file
```

## ✨ Features

### 🏠 Homepage (`index.html`)
- Hero section with value proposition
- Platform showcase (TikTok, Instagram, YouTube)
- Portfolio examples
- Stats display
- CTA to pricing page

### 💰 Pricing Page (`pricing.html`)
- **3 Pricing Tiers:**
  1. Basic - IDR 1,500,000 (1 content)
  2. Plus - IDR 2,000,000 (2 contents) - Most Popular
  3. Custom - Contact for quote
- **Add-ons:**
  - Mirror all 3 platforms: IDR 15,000
  - Boost code TikTok 30 days: FREE
  - Boost code TikTok 365 days: IDR 15,000
  - Keranjang kuning: FREE
  - Owning: FREE
- **Shopping Cart System**
- **Customer Information Form**
- **WhatsApp Automation**
- **Terms & Conditions**

### 🛒 Cart & Order System
- Real-time cart calculation
- Local storage persistence
- Form validation
- WhatsApp message generation
- One-click WhatsApp opening with pre-filled message

## 📱 WhatsApp Automation

When user completes order form:
1. Generates structured WhatsApp message with all details
2. Opens WhatsApp to number: `0852 3260 2370`
3. Pre-fills message with:
   - Selected package
   - Add-ons
   - Agency/brand info
   - Contact details
   - Total price

**Message Format:**
```
Hi blur_food! Saya tertarik endorse:

Package: [Basic/Plus/Custom]
Add-ons: [Selected add-ons]
Agency/Company: [Required]
Brand: [Required]
Contact Person: [Required]
Email: [Required]
Notes: [Optional]

Total: IDR [Calculated]

Mohon info availability & next steps.
```

## 🎨 Design Features

- **Mobile-first responsive design**
- **Modern gradient backgrounds**
- **Smooth animations & transitions**
- **Platform-specific colors** (TikTok black, Instagram pink, YouTube red)
- **Clean, professional typography**
- **Accessibility considerations**

## 🚀 Deployment

### GitHub Pages (Recommended)
1. Push to GitHub repository
2. Go to Settings → Pages
3. Select `main` branch and `/root` folder
4. Website live at: `https://[username].github.io/blur-food-website/`

### Custom Domain (titikblur.com)
1. Configure DNS A records to GitHub Pages IPs
2. Add custom domain in GitHub Pages settings
3. Update CNAME file if needed

## 🔧 Customization

### Update WhatsApp Number
Edit in `script.js`:
```javascript
const WA_NUMBER = '085232602370';
```

### Update Pricing
Edit in `pricing.html`:
- Plan prices in data attributes
- Add-on prices in data attributes

### Update Content
- Replace placeholder images in `assets/portfolio/`
- Update portfolio examples in `index.html`
- Modify terms & conditions in `pricing.html`

## 📋 Terms & Conditions

### Production Timeline
- Standard: 6 days (2 scripting + 2 shoot + 2 editing)
- Minor revisions: 1-2 days
- Major revisions: Return to initial 6-day timeline

### Payment Terms
- 50% deposit to start production
- 50% balance before final delivery
- Deposit non-refundable after production starts

### Content Rights
- Brand receives usage rights
- blur_food retains creative copyright

## 🛠️ Development

### Local Development
```bash
# Clone repository
git clone https://github.com/[username]/blur-food-website.git

# Open in browser
open index.html
```

### Browser Support
- Chrome 60+
- Firefox 60+
- Safari 12+
- Edge 79+

### Dependencies
- Font Awesome 6.4.0 (CDN)
- Google Fonts (Poppins, Inter)
- No backend required (static site)

## 📞 Contact

**WhatsApp:** 0852 3260 2370 (endorsement inquiries only)
**Email:** [Your email]
**Social Media:** @blur_food (TikTok, Instagram, YouTube)

## 📄 License

© 2026 blur_food. All rights reserved.
Website designed to minimize leads & streamline collaboration.