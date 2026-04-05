# Deploy to GitHub Pages

## Step 1: Create GitHub Repository

1. Go to https://github.com/new
2. Repository name: `blur-food-website`
3. Description: "Professional website for blur_food content creator"
4. Public repository
5. **DO NOT** initialize with README (we already have one)
6. Click "Create repository"

## Step 2: Push Code to GitHub

```bash
# Navigate to project folder
cd blur-food-website

# Initialize git
git init

# Add all files
git add .

# Commit
git commit -m "Initial commit: blur_food website"

# Add remote repository
git remote add origin https://github.com/YOUR_USERNAME/blur-food-website.git

# Push to GitHub
git branch -M main
git push -u origin main
```

## Step 3: Enable GitHub Pages

1. Go to your repository on GitHub
2. Click **Settings** → **Pages**
3. Under **Source**, select:
   - Branch: `main`
   - Folder: `/` (root)
4. Click **Save**
5. Wait 1-2 minutes for deployment

## Step 4: Access Your Website

Your website will be available at:
```
https://YOUR_USERNAME.github.io/blur-food-website/
```

## Step 5: Custom Domain (Optional - titikblur.com)

### Option A: GitHub Pages Custom Domain
1. In GitHub Pages settings, add `titikblur.com` to Custom Domain
2. Configure DNS with your domain provider:
   ```
   A records:
   - 185.199.108.153
   - 185.199.109.153
   - 185.199.110.153
   - 185.199.111.153
   
   CNAME record:
   - www → YOUR_USERNAME.github.io
   ```

### Option B: Cloudflare (Recommended)
1. Add site to Cloudflare
2. Configure DNS as above
3. Enable SSL/TLS (Flexible or Full)
4. Enable caching for better performance

## Step 6: Test Everything

### Test Checklist:
- [ ] Homepage loads correctly
- [ ] Navigation works
- [ ] Pricing page displays properly
- [ ] Cart system works
- [ ] Form validation works
- [ ] WhatsApp generation works
- [ ] Mobile responsive design
- [ ] All links work

## Troubleshooting

### GitHub Pages Not Updating
```bash
# Force update
git add .
git commit -m "Update"
git push
```

### Custom Domain Not Working
1. Wait 24-48 hours for DNS propagation
2. Check DNS configuration
3. Verify GitHub Pages custom domain setting

### WhatsApp Not Opening
- Test on mobile device (WhatsApp is mobile-only)
- Ensure WhatsApp is installed
- Check phone number format

## Maintenance

### Update Content
1. Edit HTML/CSS/JS files
2. Commit and push changes
3. GitHub Pages auto-updates

### Update Pricing
Edit `pricing.html`:
- Plan prices in `data-price` attributes
- Add-on prices in `data-price` attributes
- Update terms if needed

### Add Portfolio Images
1. Add images to `assets/portfolio/`
2. Update `index.html` portfolio section
3. Optimize images for web (compress)

## Performance Optimization

### Before Deployment:
1. Compress images: `assets/portfolio/*`
2. Minify CSS/JS (optional for small site)
3. Test loading speed: https://pagespeed.web.dev/

### After Deployment:
1. Enable Cloudflare caching
2. Use GitHub Pages CDN
3. Monitor with Google Analytics

## Analytics Setup (Optional)

### Google Analytics
1. Create GA4 property
2. Add tracking code to `<head>` in both HTML files:
```html
<!-- Google tag (gtag.js) -->
<script async src="https://www.googletagmanager.com/gtag/js?id=G-XXXXXXXXXX"></script>
<script>
  window.dataLayer = window.dataLayer || [];
  function gtag(){dataLayer.push(arguments);}
  gtag('js', new Date());
  gtag('config', 'G-XXXXXXXXXX');
</script>
```

## Support

For issues:
1. Check browser console for errors
2. Test on different browsers
3. Check GitHub Pages status: https://www.githubstatus.com/
4. Contact for website updates