# Manuel Pozo - Resume Website

A modern, responsive resume website built with vanilla HTML, CSS, and JavaScript. Designed to be deployed on GitHub Pages.

## 🚀 Features

- **Modern Design**: Clean, professional layout with CSS Grid and Flexbox
- **Responsive**: Works perfectly on desktop, tablet, and mobile devices
- **Dark Mode**: Toggle between light and dark themes
- **Data-Driven**: Resume content loaded from JSON file
- **Accessible**: Built with accessibility best practices
- **Fast Loading**: Optimized for performance
- **GitHub Pages Ready**: No build process required

## 📁 Project Structure

```
manypozo.github.com/
├── index.html          # Main HTML file
├── styles.css          # CSS styles
├── script.js           # JavaScript functionality
├── data/
│   └── resume.json     # Resume data
├── assets/
│   └── images/         # Images and SVGs
└── README.md           # This file
```

## 🛠️ Setup

1. **Clone the repository**:
   ```bash
   git clone https://github.com/manypozo/manypozo.github.com.git
   cd manypozo.github.com
   ```

2. **Edit resume data**:
   - Open `data/resume.json`
   - Update your personal information, experience, education, etc.

3. **Customize styling** (optional):
   - Open `styles.css`
   - Modify colors, fonts, or layout as needed

4. **Test locally**:
   ```bash
   python3 -m http.server 8000
   # or
   npx serve .
   ```
   Then visit `http://localhost:8000`

## 🌐 GitHub Pages Deployment

1. **Push to GitHub**:
   ```bash
   git add .
   git commit -m "Initial resume website"
   git push origin main
   ```

2. **Enable GitHub Pages**:
   - Go to your repository settings
   - Scroll to "Pages" section
   - Select "Deploy from a branch"
   - Choose "main" branch and "/ (root)" folder
   - Click "Save"

3. **Your resume will be live at**:
   `https://manypozo.github.io/`

## 📝 Customization

### Updating Resume Data

Edit `data/resume.json` to update:
- Personal information
- Contact details
- Work experience
- Education
- Projects
- Publications
- Skills

### Styling

The CSS uses CSS Custom Properties (variables) for easy theming:
- Colors are defined in `:root` selector
- Dark mode colors are in `[data-theme="dark"]`
- Modify these variables to change the color scheme

### Adding New Sections

1. Add the section to `data/resume.json`
2. Add HTML structure in `index.html`
3. Add CSS styles in `styles.css`
4. Add rendering function in `script.js`

## 🎨 Design Features

- **CSS Grid Layout**: Modern, flexible layout system
- **CSS Custom Properties**: Easy theming and customization
- **Smooth Animations**: Subtle animations and transitions
- **Mobile-First**: Responsive design starting from mobile
- **Print Styles**: Optimized for printing
- **Accessibility**: ARIA labels, semantic HTML, keyboard navigation

## 🔧 Technical Details

- **No Build Process**: Pure HTML, CSS, and JavaScript
- **Vanilla JavaScript**: No frameworks or dependencies
- **Modern CSS**: CSS Grid, Flexbox, Custom Properties
- **ES6+ JavaScript**: Modern JavaScript features
- **Intersection Observer**: Smooth scroll animations
- **Local Storage**: Theme preference persistence

## 📱 Browser Support

- Chrome 60+
- Firefox 55+
- Safari 12+
- Edge 79+

## 🤝 Contributing

Feel free to fork this project and customize it for your own resume!

## 📄 License

This project is open source and available under the [MIT License](LICENSE).

---

**Live Demo**: [https://manypozo.github.io/](https://manypozo.github.io/)
