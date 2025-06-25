# 🌐 Mansoor Mamnoon – Personal Website

This is my fully custom-built personal website, designed to showcase my projects, technical skills, and interests as a Computer Science student at UC Berkeley and Software Engineer Intern at Amazon.

Built without any UI frameworks to demonstrate raw frontend engineering skill, it features responsive design, smooth animations, SEO optimizations, a multi-theme system, and interactive UI components.

> 🔗 Live site: [mansoor-mamnoon.github.io/personal-website](https://mansoor-mamnoon.github.io/personal-website)

---

## 📚 Table of Contents

- [🚀 Features](#-features)
- [🛠️ Tech Stack](#️-tech-stack)
- [🎨 Themes and Modes](#-themes-and-modes)
- [🔍 Interactive Features](#-interactive-features)
- [🧠 Skills Visualization](#-skills-visualization)
- [💻 Projects Page](#-projects-page)
- [⚙️ Local Setup](#️-local-setup)
- [📦 Folder Structure](#-folder-structure)
- [📬 Contact](#-contact)

---

## 🚀 Features

- ✅ **Dark Mode Toggle** (top right)
- ✅ **Command Palette** (`Cmd+K` / `/` shortcut): jump between pages, copy email, toggle dark mode
- ✅ **Animated Skills Chart** using `Chart.js` with color-coded categories
- ✅ **Dynamic Project Filtering** by tech stack and keyword
- ✅ **Interactive Trail Cursor**
- ✅ **Smooth Page Transitions**
- ✅ **AOS-based scroll animations**
- ✅ **SEO metadata** with OG and Twitter preview
- ✅ **Responsive Mobile Nav Drawer**
- ✅ **Live Visitor Count**
- ✅ **Lighthouse scores ≥95**

---

## 🛠️ Tech Stack

| Type            | Technology                              |
|-----------------|------------------------------------------|
| **Frontend**    | HTML5, CSS3, JavaScript (Vanilla)        |
| **Charts**      | Chart.js                                 |
| **Animations**  | AOS.js, CSS transitions                  |
| **Hosting**     | GitHub Pages                             |
| **Performance** | Manual Lighthouse tuning, lazy loading   |
| **Tracking**    | Google Analytics, OG/Twitter metadata    |

---

## 🎨 Themes and Modes

### Dark Mode Toggle
Top-right button. State persists via `localStorage`.

### Bonus Themes (Extendable)
- Game of Thrones theme (`theme-got`)
- Tennis theme (`theme-tennis`)

Can be extended via custom CSS or toggled using JavaScript:
```js
document.body.classList.add('theme-got');
```

---

## 🔍 Interactive Features

### ⌨️ Command Palette
- Trigger with `Cmd+K` or `/`
- Navigate pages, toggle themes, copy email
- Fully keyboard accessible with arrow keys + Enter

### 🎯 Project Filter Bar
- Filter by tech tags (e.g., `Python`, `C`, `Java`)
- Search dynamically via keyword
- Uses `.data-tags` attributes and simple fuzzy match

---

## 🧠 Skills Visualization

Skills are displayed in a horizontal bar chart using `Chart.js`, with each category color-coded:

- 🟦 Frontend
- 🟩 Backend
- 🟧 Systems
- 🟪 Infra/Tooling

### 📊 Legend HTML (under chart):

```html
<p style="text-align: center; font-size: 0.85rem; margin-top: 1rem;">
  <span style="color:#007bff;">🟦 Frontend</span> &nbsp; 
  <span style="color:#28a745;">🟩 Backend</span> &nbsp; 
  <span style="color:#fd7e14;">🟧 Systems</span> &nbsp; 
  <span style="color:#6f42c1;">🟪 Infra / Tools</span>
</p>
```

---

## 💻 Projects Page

Projects are rendered as semantic HTML cards and tagged using `data-tags`. Each card includes:

- ✅ Title with emoji icon
- ✅ Type (e.g., Course Project, Independent)
- ✅ Stack and tech keywords
- ✅ Description of functionality

Projects come from:
- 📘 CS 61A, 61B, 61C coursework
- 🧪 Independent projects and personal tools

### 🧪 Examples:
- ⚡ **Edge Deployer** – Drag-and-drop IDE to deploy serverless APIs across AWS, Cloudflare, and Vercel
- 🐍 **Snek Game** – C-based terminal Snake game with pointer arithmetic
- 🧠 **RISC-V OCR Neural Net** – Optimized matrix multiplication OCR pipeline on RISC-V + OpenMP

---

## ⚙️ Local Setup

This is a static site — no Node or bundlers needed.

```bash
git clone https://github.com/mansoor-mamnoon/personal-website.git
cd personal-website
open index.html  # Or drag into your browser
```

To deploy:
- Push to `main` branch on GitHub
- Enable GitHub Pages in the repo settings
- You're live 🚀

---

## 📦 Folder Structure

```plaintext
personal-website/
├── index.html          # Home
├── about.html          # Experience & story
├── projects.html       # Project cards + filters
├── skills.html         # Chart.js-based skills display
├── style.css           # All styles and themes
├── assets/             # Images, icons, favicons
├── preview.png         # OG and Twitter preview image
├── README.md           # (You're here!)
```

---

## 📬 Contact

If you’re a recruiter, engineer, or just curious about my work:

- 📧 Email: [mansoormmamnoon@berkeley.edu](mailto:mansoormmamnoon@berkeley.edu)
- 🔗 LinkedIn: [linkedin.com/in/mansoormmamnoon](https://linkedin.com/in/mansoormmamnoon)
- 🌐 Website: [mansoor-mamnoon.github.io/personal-website](https://mansoor-mamnoon.github.io/personal-website)

---

Thanks for visiting! 😄
