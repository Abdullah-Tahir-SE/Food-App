<div align="center">

  # 🍔 FOOD CART — Ultra-Modern Fast-Food Web Application

  **A high-conversion, mobile-first fast-food application inspired by KFC & Domino's architecture.**  
  *Built with React, Tailwind CSS, Framer Motion, and WhatsApp Customer Notification Sync.*

  [![React](https://img.shields.io/badge/React-19.0-61DAFB?style=for-the-badge&logo=react&logoColor=black)](https://react.dev/)
  [![Vite](https://img.shields.io/badge/Vite-6.1-646CFF?style=for-the-badge&logo=vite&logoColor=white)](https://vitejs.dev/)
  [![TailwindCSS](https://img.shields.io/badge/Tailwind_CSS-v4.0-06B6D4?style=for-the-badge&logo=tailwindcss&logoColor=white)](https://tailwindcss.com/)
  [![Framer_Motion](https://img.shields.io/badge/Framer_Motion-12.0-E535AB?style=for-the-badge&logo=framer&logoColor=white)](https://www.framer.com/motion/)
  [![License](https://img.shields.io/badge/License-MIT-green.style=for-the-badge)](#license)

</div>

---

## 🌟 Key Features

### 🍕 1. Pizza Hut / Domino's Style 2-Tier Sticky Navigation
- **Tier 1 (Main Categories)**: Horizontal swipeable category pills (*Pizzas, Deals, Burgers, Crispy Chicken, Loaded Fries & Sides, Meltz & Platters, Drinks & Shakes*).
- **Tier 2 (Sub-Categories)**: Dynamically updates sub-categories (*Classic Flavors, Favorite Flavors, Premium Flavors, Super Loaded, Half 'N Half, Smash Beef, Hot Wings, etc.*) with smooth Framer Motion active pill transitions.

### 📱 2. Automated WhatsApp Order Status Sync
- Customers enter their **WhatsApp Phone Number** during express checkout.
- When the kitchen admin updates an order status (*Pending ➔ Kitchen Preparing ➔ Out for Delivery ➔ Delivered*), the portal automatically generates a personalized WhatsApp message targeting the customer's phone number!
- 1-Click **`📲 Send WhatsApp Update`** trigger on every kitchen order card.

### 🍗 3. KFC-Style Animated 3D Floating Hero Showcase
- Dynamic 3D floating showcase dish with rising steam animation particles and ambient radial glows.
- Top infinite scrolling marquee deal ticker (*"🔥 CRUNCHY SPECIALS • 30-MIN HOT & FRESH EXPRESS DELIVERY..."*).
- Delivery assurance badges (*30 Mins Express, 100% Fresh Fermented Dough, Piping Hot Guarantee*).

### 🏷️ 4. Mega Flash Deals & Interactive Customizer Modal
- Real-time animated countdown clock (*"Midnight Rush Ends In: 02h : 45m : 12s"*).
- Interactive 3D deal cards with floating discount ribbons (Save up to 45%).
- **Deal Customizer Modal**: Customization for drinks, dip sauces, and pizza crust types before adding combos to the cart.

### 🛒 5. Slide-Over Cart & Express Checkout
- Interactive slide-over drawer (desktop) and expandable bottom sheet (mobile).
- **Promo Code System**: Supports promo code **`FOODCART20`** for an instant 20% discount.
- Real-time tax (8% GST), subtotal, and delivery fee calculation.
- **Confetti Explosion**: Triggers confetti blast on order confirmation and saves state directly to LocalStorage & Kitchen Admin stream.

### 👨‍🍳 6. Simple Kitchen Admin Dashboard
- Real-time order stream displaying placed orders without page refresh.
- Web Audio API chime sound alert toggle.
- Simple color-coded order status switcher.
- KPI summary cards (*Total Revenue, Total Orders, Active Kitchen Orders, Avg Speed*).
- Subtly embedded in the footer copyright bar: **`🔐 Staff / Kitchen Portal`**.

---

## 🛠️ Tech Stack & Tools

- **Framework**: React 19 (Pure JavaScript / JSX — *Zero TypeScript*)
- **Build Tool**: Vite v6
- **Styling**: Tailwind CSS v4 + Custom Neon Ambient Glow Utilities
- **Animations**: Framer Motion & CSS Keyframe Steam/Marquee Animations
- **Icons**: Lucide React Icons
- **Effects**: Canvas Confetti
- **State Management**: React Context API synced with LocalStorage

---

## 📂 Project Architecture

```
food-web/
├── public/
│   └── favicon.svg
├── src/
│   ├── components/
│   │   ├── Navbar.jsx              # Top header with logo, location picker, and cart trigger
│   │   ├── MarqueeBanner.jsx       # Scrolling ticker banner with pause-on-hover
│   │   ├── TwoTierCategoryNav.jsx  # Sticky 2-level category navigation bar
│   │   ├── HeroSection.jsx         # 3D floating hero showcase with steam animation
│   │   ├── FoodCard.jsx            # Dish card with crust selector & (+ / -) controller
│   │   ├── DealCard.jsx            # 3D deal card with ribbons & customizer triggers
│   │   ├── DealCustomizerModal.jsx # Deal option customizer modal (beverages, dips, crusts)
│   │   ├── CartDrawer.jsx          # Slide-over cart & order checkout form
│   │   ├── MobileBottomNav.jsx     # Mobile bottom app navigation dock
│   │   └── Footer.jsx              # Store timings, hotline, and Staff Portal link
│   ├── pages/
│   │   ├── HomePage.jsx            # Landing page with marquee, hero, menu preview & story
│   │   ├── MenuPage.jsx            # Full catalog, 2-tier nav, spice meter & price slider
│   │   ├── TopDealsPage.jsx        # Flash countdown deals & combo cards
│   │   ├── AboutUsPage.jsx         # Industrial mesh facade & warm fluted wood showcase
│   │   └── AdminDashboardPage.jsx  # Kitchen live order stream & WhatsApp notification sync
│   ├── data/
│   │   ├── menuData.js             # Categorized dish catalog & sub-categories
│   │   ├── dealsData.js            # Combo deal offers
│   │   └── ambienceData.js         # Architectural highlights & live stats
│   ├── context/
│   │   └── CartContext.jsx         # Global state provider with LocalStorage persistence
│   ├── App.jsx                     # Route manager & global layout wrapper
│   ├── main.jsx                    # React DOM root entry
│   └── index.css                   # Design tokens, gradients & custom animations
├── package.json
└── vite.config.js
```

---

## 🚀 Quick Start Guide

### 1. Prerequisites
Make sure you have **Node.js (v18+)** and **npm** installed on your system.

### 2. Clone the Repository
```bash
git clone https://github.com/Abdullah-Tahir-SE/Food-App.git
cd Food-App
```

### 3. Install Dependencies
```bash
npm install
```

### 4. Run Development Server
```bash
npm run dev
```
Open your browser and navigate to `http://localhost:5173/`.

### 5. Build for Production
```bash
npm run build
```

---

## 🔐 Staff & Kitchen Portal Access

To access the Kitchen Admin Dashboard:
1. Scroll down to the bottom footer of any page.
2. Click the **`🔐 Staff / Kitchen Portal`** button in the bottom copyright bar.
3. Manage active kitchen orders, update order status, and trigger WhatsApp notifications to customers!

---

## 📄 License

Distributed under the MIT License. See `LICENSE` for more information.

---

<div align="center">
  <sub>Crafted with ❤️ for Fast Food Enthusiasts. Built by <strong>Abdullah Tahir</strong>.</sub>
</div>
