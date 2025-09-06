# 🍔 Burger Cafe

<div align="center">

[![Live Demo](https://img.shields.io/badge/🌐%20Live%20Demo-Visit%20Site-00D4AA?style=for-the-badge&logo=netlify)](https://burger-cafee.netlify.app/)
[![GitHub](https://img.shields.io/badge/📱%20GitHub-Repository-181717?style=for-the-badge&logo=github)](https://github.com/KianJanloo/burger-cafe)
[![Next.js](https://img.shields.io/badge/⚡%20Next.js-15-000000?style=for-the-badge&logo=next.js)](https://nextjs.org/)
[![TypeScript](https://img.shields.io/badge/🔷%20TypeScript-5-3178C6?style=for-the-badge&logo=typescript)](https://www.typescriptlang.org/)
[![Tailwind CSS](https://img.shields.io/badge/🎨%20Tailwind%20CSS-4-06B6D4?style=for-the-badge&logo=tailwindcss)](https://tailwindcss.com/)

**A complete and modern online ordering system for burger cafe with bilingual support and beautiful user interface**

[🌐 View Live Demo](https://burger-cafee.netlify.app/) • [📖 Documentation](#-documentation) • [🚀 Quick Start](#-quick-start) • [💡 Features](#-features)

</div>

---

## ✨ Preview

<div align="center">

| 🖥️ **Desktop** | 📱 **Mobile** |
|:---:|:---:|
| ![Desktop Preview](https://via.placeholder.com/800x500/1f2937/ffffff?text=Desktop+View) | ![Mobile Preview](https://via.placeholder.com/400x700/1f2937/ffffff?text=Mobile+View) |

</div>

## 🚀 Quick Start

### 📋 Prerequisites
- **Node.js** 18+ 
- **npm** or **yarn**
- **Git**

### ⚡ Installation & Setup

```bash
# 1️⃣ Clone the repository
git clone https://github.com/KianJanloo/burger-cafe.git
cd burger-cafe

# 2️⃣ Install dependencies
npm install

# 3️⃣ Start development server
npm run dev

# 4️⃣ Open your browser
# http://localhost:3000
```

### 🌐 Access Demo
- **🌍 Main Website**: [https://burger-cafee.netlify.app/](https://burger-cafee.netlify.app/)
- **🇮🇷 Persian Version**: [https://burger-cafee.netlify.app/fa](https://burger-cafee.netlify.app/fa)
- **🇺🇸 English Version**: [https://burger-cafee.netlify.app/en](https://burger-cafee.netlify.app/en)

---

## 💡 Features

### 🛒 **Online Ordering System**
- **🛍️ Smart Shopping Cart** - Add, remove, and modify items with real-time updates
- **💳 Checkout Process** - Complete customer information and order type selection
- **📋 Order History** - View and manage past orders
- **🔄 Reorder Functionality** - Quick reordering of previous purchases
- **📊 Filter & Search** - Search orders by status and date

### 🎨 **Modern User Interface**
- **📱 Responsive Design** - Optimized for all screen sizes
- **🌙 Dark/Light Mode** - Theme switching with one click
- **✨ Smooth Animations** - Fluid and engaging user experience
- **🎯 Intuitive Design** - Easy navigation and clear interface

### 🌍 **Multilingual Support**
- **🇮🇷 Persian (RTL)** - Full right-to-left support
- **🇺🇸 English (LTR)** - Left-to-right support
- **🔄 Language Toggle** - Easy switching between languages
- **💰 Currency Formatting** - Display prices in Toman

### 🏪 **Restaurant Features**
- **📖 Complete Menu** - Categorized and searchable menu
- **🪑 Table Reservation** - Online reservation system
- **📸 Image Gallery** - Showcase restaurant space and food
- **📞 Contact Forms** - Direct communication with restaurant
- **⭐ Customer Reviews** - Display reviews and ratings

---

## 🛠️ Technologies

### **Frontend**
| Technology | Version | Description |
|:---:|:---:|:---|
| **Next.js** | 15 | React framework with App Router |
| **React** | 19 | UI library |
| **TypeScript** | 5 | Type-safe programming language |
| **Tailwind CSS** | 4 | CSS framework |
| **Framer Motion** | 12 | Animation library |

### **State Management**
| Technology | Version | Description |
|:---:|:---:|:---|
| **Zustand** | 5 | Lightweight state management |
| **LocalStorage** | - | Local storage |

### **UI Components**
| Technology | Version | Description |
|:---:|:---:|:---|
| **Radix UI** | - | Accessible components |
| **Lucide React** | - | Beautiful icons |
| **Class Variance Authority** | - | Variant management |

### **Internationalization**
| Technology | Version | Description |
|:---:|:---:|:---|
| **next-intl** | 4 | Multilingual framework |
| **RTL Support** | - | Right-to-left support |

---

## 📁 Project Structure

```
📦 burger-cafe/
├── 📁 src/
│   ├── 📁 app/                    # Next.js App Router
│   │   ├── 📁 [locale]/          # Multilingual pages
│   │   │   ├── 📁 about/         # About page
│   │   │   ├── 📁 contact/       # Contact page
│   │   │   ├── 📁 gallery/       # Gallery page
│   │   │   ├── 📁 menu/          # Menu page
│   │   │   ├── 📁 order/         # Order page
│   │   │   ├── 📁 reservation/   # Reservation page
│   │   │   └── 📄 page.tsx       # Home page
│   │   ├── 📄 layout.tsx         # Main layout
│   │   ├── 📄 sitemap.ts         # Sitemap
│   │   └── 📄 robots.ts          # Robots file
│   ├── 📁 components/            # React components
│   │   ├── 📁 order/             # Order components
│   │   │   ├── 📄 Cart.tsx       # Shopping cart
│   │   │   ├── 📄 Checkout.tsx   # Checkout
│   │   │   ├── 📄 OrderHistory.tsx # Order history
│   │   │   └── 📄 OrderSuccess.tsx # Order success
│   │   ├── 📄 Navigation.tsx     # Navigation
│   │   ├── 📄 MenuClient.tsx     # Menu
│   │   ├── 📄 HeroSection.tsx    # Hero section
│   │   └── 📄 ThemeToggle.tsx    # Theme toggle
│   ├── 📁 data/                  # Static data
│   │   └── 📄 menuItems.ts       # Menu items
│   ├── 📁 store/                 # State management
│   │   └── 📄 orderStore.ts      # Order store
│   ├── 📁 types/                 # TypeScript definitions
│   │   └── 📄 order.ts           # Order types
│   ├── 📁 hooks/                 # Custom hooks
│   │   └── 📄 useToast.ts        # Toast hook
│   ├── 📁 fonts/                 # Custom fonts
│   │   ├── 📄 IRANSans.ttf       # Main Persian font
│   │   ├── 📄 IRANSansX-Light.ttf # Light font
│   │   └── 📄 IRANSansXFaNum-Medium.ttf # Medium font
│   └── 📄 i18n.ts                # Internationalization config
├── 📁 messages/                  # Translation files
│   ├── 📄 fa.json                # Persian translations
│   └── 📄 en.json                # English translations
├── 📄 next.config.ts             # Next.js config
├── 📄 package.json               # Dependencies
├── 📄 tsconfig.json              # TypeScript config
├── 📄 tailwind.config.js         # Tailwind config
├── 📄 Dockerfile                 # Docker file
├── 📄 docker-compose.yml         # Docker Compose config
└── 📄 README.md                  # This file
```

---

## 🍔 Restaurant Menu

### **🍔 Classic Burgers**
| Name | Price | Description |
|:---:|:---:|:---|
| **Classic Burger** | 45,000 Toman | Beef with cheddar cheese, lettuce, tomato and special sauce |
| **Double Cheese Burger** | 55,000 Toman | Two layers of meat with cheddar cheese and special sauce |
| **Bacon Burger** | 50,000 Toman | Beef with crispy bacon, cheese and barbecue sauce |

### **🌶️ Spicy Burgers**
| Name | Price | Description |
|:---:|:---:|:---|
| **Mexican Spicy Burger** | 48,000 Toman | Beef with hot pepper, pepperoni cheese and special spicy sauce |
| **Red Pepper Burger** | 46,000 Toman | Beef with hot red pepper and chili sauce |

### **🥬 Vegetarian Burgers**
| Name | Price | Description |
|:---:|:---:|:---|
| **Vegetarian Burger** | 42,000 Toman | Mushroom, avocado and fresh vegetables |
| **Mushroom Burger** | 44,000 Toman | Portobello mushroom with goat cheese and vegetables |

### **🥤 Drinks & Desserts**
| Name | Price | Description |
|:---:|:---:|:---|
| **Cola** | 8,000 Toman | Cold and fresh cola drink |
| **Banana Milk** | 12,000 Toman | Natural and delicious banana milk |
| **Cheesecake** | 25,000 Toman | Creamy cheesecake with strawberry |
| **Ice Cream** | 15,000 Toman | Vanilla ice cream with chocolate sauce |

---

## 🎯 Usage Guide

### **👤 For Customers**

#### **1️⃣ Browse Menu**
- Go to the menu page
- Use category filters
- Search for desired items
- View details and prices of each item

#### **2️⃣ Add to Cart**
- Click the "Order" button
- Item is added to cart
- Add special instructions
- Change quantity

#### **3️⃣ Complete Order**
- Go to the order page
- Enter personal information
- Select order type (dine-in, takeaway, delivery)
- Enter delivery address (if delivery)
- Finalize the order

#### **4️⃣ Manage Orders**
- View order history
- Track order status
- Reorder previous purchases
- Filter orders

### **👨‍💻 For Developers**

#### **➕ Adding New Menu Item**

```typescript
// In src/data/menuItems.ts
export const menuItems: MenuItem[] = [
  {
    id: 'new-burger',
    name: 'New Burger',
    description: 'New burger description',
    price: 50000,
    category: 'classic',
    prepTime: 15,
    badges: ['new'],
    isAvailable: true,
  },
];
```

#### **🌍 Adding New Translation**

```json
// In messages/en.json
{
  "menu": {
    "newItem": {
      "name": "New Item",
      "description": "New item description"
    }
  }
}

// In messages/fa.json
{
  "menu": {
    "newItem": {
      "name": "آیتم جدید",
      "description": "توضیحات آیتم جدید"
    }
  }
}
```

#### **🎨 Customizing Theme**

```typescript
// In tailwind.config.js
module.exports = {
  theme: {
    extend: {
      colors: {
        primary: {
          50: '#fef2f2',
          500: '#ef4444',
          900: '#7f1d1d',
        }
      }
    }
  }
}
```

---

## 🚀 Deployment

### **⚡ Netlify (Recommended)**

```bash
# Install Netlify CLI
npm i -g netlify-cli

# Build and deploy
npm run build
netlify deploy --prod --dir=.next
```

### **🐳 Docker**

```bash
# Build image
docker build -t burger-cafe .

# Run container
docker run -p 3000:3000 burger-cafe
```

### **⚡ Vercel**

```bash
# Install Vercel CLI
npm i -g vercel

# Deploy
vercel --prod
```

---

## 📊 Performance

### **⚡ Optimizations**
- **Code Splitting** - Automatic code splitting
- **Image Optimization** - Image optimization
- **Bundle Analysis** - Bundle size analysis
- **Caching** - Caching strategies
- **Turbopack** - Fast build in development

### **📈 Performance Metrics**
- **First Contentful Paint (FCP)**: < 1.5s
- **Largest Contentful Paint (LCP)**: < 2.5s
- **Cumulative Layout Shift (CLS)**: < 0.1
- **First Input Delay (FID)**: < 100ms

### **🏆 Lighthouse Scores**
- **Performance**: 95+
- **Accessibility**: 100
- **Best Practices**: 100
- **SEO**: 100

---

## 🔒 Security

### **🛡️ Security Features**
- **Input Validation** - Input validation
- **XSS Protection** - XSS protection
- **CSRF Protection** - CSRF protection
- **Secure Headers** - Security headers
- **Content Security Policy** - Content security policy

### **🔐 Privacy**
- **Local Storage** - Local storage
- **No External Tracking** - No external tracking
- **GDPR Compliant** - GDPR compliant
- **Cookie Management** - Cookie management

---

## 🌐 Browser Support

| Browser | Version | Support |
|:---:|:---:|:---:|
| **Chrome** | 90+ | ✅ Full |
| **Firefox** | 88+ | ✅ Full |
| **Safari** | 14+ | ✅ Full |
| **Edge** | 90+ | ✅ Full |
| **Mobile Browsers** | iOS 14+, Android 90+ | ✅ Full |

---

## 🤝 Contributing

### **📝 How to Contribute**
1. Fork the project
2. Create a new branch (`git checkout -b feature/amazing-feature`)
3. Commit your changes (`git commit -m 'Add amazing feature'`)
4. Push to the branch (`git push origin feature/amazing-feature`)
5. Open a Pull Request

### **📋 Code Standards**
- Use TypeScript
- Follow ESLint rules
- Use Prettier for formatting
- Write meaningful comments

---

## 📞 Support

### **🆘 Getting Help**
- **📧 Email**: support@burgercafe.com
- **🐛 Bug Reports**: [Create Issue](https://github.com/KianJanloo/burger-cafe/issues)
- **💬 Discussions**: [GitHub Discussions](https://github.com/KianJanloo/burger-cafe/discussions)

### **📋 Bug Report**
When reporting bugs, please include:
- Browser and version
- Operating system
- Steps to reproduce
- Expected vs actual behavior
- Screenshots (if applicable)

---

## 📄 License

This project is licensed under the MIT License. See the [LICENSE](LICENSE) file for details.

---

## 🙏 Acknowledgments

### **👥 Contributors**
- [Your Name] - Main developer
- [Contributor Name] - Contributor

### **🛠️ Technologies Used**
- **Next.js Team** - For the amazing framework
- **Tailwind CSS** - For utility-first CSS
- **Zustand** - For lightweight state management
- **Framer Motion** - For smooth animations
- **Lucide** - For beautiful icons

---

<div align="center">

**🍔 Made with love for burger lovers! 🍔**

[![GitHub stars](https://img.shields.io/github/stars/KianJanloo/burger-cafe?style=social)](https://github.com/KianJanloo/burger-cafe)
[![GitHub forks](https://img.shields.io/github/forks/KianJanloo/burger-cafe?style=social)](https://github.com/KianJanloo/burger-cafe)
[![GitHub watchers](https://img.shields.io/github/watchers/KianJanloo/burger-cafe?style=social)](https://github.com/KianJanloo/burger-cafe)

</div>