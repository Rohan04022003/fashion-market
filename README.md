# 🛍️ Fashion Market

A modern, responsive e-commerce frontend built with React, TypeScript, Tailwind CSS, and shadcn/ui. Includes product filtering, cart, simulated checkout (Card, UPI, COD), and a sleek UI for a seamless shopping experience.

## 📝 Overview

Fashion Market is a full-featured online shopping solution that provides users with a seamless shopping experience. Built with modern web technologies, it offers a responsive design, intuitive navigation, and comprehensive shopping features across multiple product categories.

## 🚀 Live Demo

[Live Demo](https://your-vercel-deployment-link.com) <!-- Update this link after deployment -->

## ✨ Features

- 🎨 **Modern UI/UX**
  - Clean and intuitive interface using shadcn/ui components
  - Responsive design for all devices
  - Smooth animations and transitions
  - Skeleton loading states for better UX

- 🛒 **Shopping Experience**
  - Multiple product categories:
    - Men's Fashion
    - Women's Fashion
    - Kids' Collection
    - Electronics
    - Cosmetics
    - Shoes
  - Advanced product filtering
  - Search functionality with drawer interface
  - Detailed product views
  - Add to cart and remove functionality
  - Real-time cart updates

- 💳 **Checkout Process**
  - Streamlined checkout flow (Address ➝ Payment ➝ Order Summary)
  - Address management
  - Simulated payment options (Card, UPI, COD)
  - Order summary and confirmation

- 👤 **User Features**
  - Modern Login and Signup pages

- 📱 **Additional Features**
  - Contact page with FAQ toggle
  - Social media integration
  - Responsive navigation with breadcrumbs
  - Advanced search functionality

## 🔍 Product Search Functionality

The project includes a powerful product search feature that allows users to quickly find products by name, category, or keywords. This search functionality is optimized for performance, achieving **O(1) time complexity** through efficient data structures and algorithms. The search drawer interface provides a seamless user experience, displaying real-time results as users type.

## 🛠️ Tech Stack

- **Frontend Framework**
  - React 19
  - TypeScript
  - Vite

- **Styling & UI**
  - Tailwind CSS
  - shadcn/ui
  - Embla Carousel
  - Lucide React Icons

- **State Management**
  - React Context API
  - Custom Hooks

- **Routing**
  - React Router DOM

- **Development Tools**
  - ESLint
  - TypeScript
  - Vite

## 📁 Project Structure

```
src/
├── assets/         # Static assets
├── components/     # Reusable UI components
│   ├── ui/        # shadcn/ui components
│   ├── Skeletons/ # Loading state components
│   └── ...        # Other components
├── context/        # React Context providers
├── hooks/          # Custom React hooks
├── lib/           # Utility libraries
├── Pages/         # Page components
│   ├── Home.tsx
│   ├── Men.tsx
│   ├── Women.tsx
│   ├── Kids.tsx
│   ├── Electronics.tsx
│   ├── Cosmetics.tsx
│   ├── Shoes.tsx
│   ├── Cart.tsx
│   ├── Orders.tsx
│   ├── Contact.tsx
│   └── ...        # Other pages
├── types/         # TypeScript type definitions
└── utils/         # Helper functions
```

## 🏁 Getting Started

1. **Clone the repository**
   ```bash
   git clone https://github.com/Rohan04022003/fashion-market.git
   cd fashion-market
   ```

2. **Install dependencies**
   ```bash
   npm install
   ```

3. **Start the development server**
   ```bash
   npm run dev
   ```

4. **Build for production**
   ```bash
   npm run build
   ```

## 🚀 Deployment

This project is configured for easy deployment on Vercel:

1. Push your code to the GitHub repository
2. Import the project in Vercel
3. Vercel will automatically detect the Vite configuration and deploy accordingly

## 🤝 Contributing

Contributions are welcome! Please feel free to submit a Pull Request. For major changes, please open an issue first to discuss what you would like to change.

1. Fork the repository
2. Create your feature branch (`git checkout -b feature/AmazingFeature`)
3. Commit your changes (`git commit -m 'Add some AmazingFeature'`)
4. Push to the branch (`git push origin feature/AmazingFeature`)
5. Open a Pull Request

## 📄 License
This project is licensed under the MIT License - see the [LICENSE](./LICENSE) file for details.


## 🙏 Acknowledgments

- [shadcn/ui](https://ui.shadcn.com/) for the beautiful UI components
- [Embla Carousel](https://www.embla-carousel.com/) for the carousel functionality
- [Tailwind CSS](https://tailwindcss.com/) for the utility-first CSS framework

---

> **GitHub:** [https://github.com/Rohan04022003/fashion-market](https://github.com/Rohan04022003/fashion-market)
