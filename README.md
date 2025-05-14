# 🛍️ Modern E-Commerce Platform

A modern, responsive e-commerce frontend built with React, TypeScript, and shadcn/ui, featuring a sleek design and robust functionality.

## 📝 Overview

This project is a frontend-only e-commerce platform that provides users with a seamless and visually appealing shopping experience. It showcases a modern UI, smooth interactions, and essential e-commerce features across various product categories.

> 🔒 Note: This is a **frontend-only** project. Features like authentication, address storage, and payment are **simulated** for demonstration purposes.

## 🚀 Live Demo

[Live Demo](https://your-vercel-deployment-link.com) _(Coming Soon)_

## ✨ Features

- 🎨 **Modern UI/UX**
  - Clean and intuitive interface using shadcn/ui components
  - Fully responsive across devices
  - Smooth animations and transitions
  - Skeleton loaders for better experience

- 🛒 **Shopping Experience**
  - Product categories:
    - Men's Fashion
    - Women's Fashion
    - Kids' Collection
    - Electronics
    - Cosmetics
    - Shoes
  - Advanced product filtering
  - Search drawer with product suggestions
  - Detailed product views
  - Add to and remove from cart functionality
  - Real-time cart updates

- 💳 **Simulated Checkout**
  - Address selection and management
  - Order summary view
  - Payment options:
    - 💳 Card (Simulated)
    - 🏦 UPI (Simulated)
    - 💵 Cash on Delivery (Simulated)
  - Final order confirmation UI

- 👤 **User Experience**
  - Simulated login/signup flow
  - Profile section (frontend only)
  - View past orders
  - Wishlist placeholder

- 📱 **Extra Features**
  - Contact page with FAQ sidebar
  - Social media integration
  - Breadcrumbs for navigation
  - Smooth page transitions

## 🛠️ Tech Stack

- **Frontend**
  - React 19
  - TypeScript
  - Vite

- **Styling & UI**
  - Tailwind CSS
  - shadcn/ui
  - Embla Carousel
  - Lucide Icons

- **State Management**
  - React Context API
  - Custom Hooks

- **Routing**
  - React Router DOM

- **Tooling**
  - ESLint
  - TypeScript
  - Prettier

## 📁 Project Structure

```
src/
├── assets/         # Static assets
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

## 🚀 Getting Started

1. **Clone the repository**
   ```bash
   git clone https://github.com/yourusername/e-commerce.git
   cd e-commerce
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

1. Push your code to a GitHub repository
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

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.

## 🙏 Acknowledgments

- [shadcn/ui](https://ui.shadcn.com/) for the beautiful UI components
- [Embla Carousel](https://www.embla-carousel.com/) for the carousel functionality
- [Tailwind CSS](https://tailwindcss.com/) for the utility-first CSS framework
