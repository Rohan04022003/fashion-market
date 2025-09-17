import { Route, Routes } from "react-router-dom";
import { ThemeProvider } from "./context/theme-provider";
import { HeroSliderProvider } from "./context/HeroSliderContext";
import { ProductProvider } from "./context/ProductContext";
import Navbar from "./components/Navbar";
import { Suspense, lazy } from "react";
import HomeSkeleton from "./components/Skeletons/HomeSkeleton";
import { Toaster } from "sonner";
import { CartProvider } from "./context/CartContext";
import Footer from "./components/Footer";
import { useLocation } from "react-router-dom";
import AddressPage from "./Pages/AddressPage";
import { AddressProvider } from "./context/AddressContext";
import { BuyNowProvider } from "./context/BuyNowContext";
import PaymentPage from "./Pages/PaymentPage";
import { OrderProvider } from "./context/OrdersContext";

// Lazy load pages
const Home = lazy(() => import("./Pages/Home"));
const Men = lazy(() => import("./Pages/Men"));
const Women = lazy(() => import("./Pages/Women"));
const Kids = lazy(() => import("./Pages/Kids"));
const Shoes = lazy(() => import("./Pages/Shoes"));
const Cosmetics = lazy(() => import("./Pages/Cosmetics"));
const Electronics = lazy(() => import("./Pages/Electronics"));
const Contact = lazy(() => import("./Pages/Contact"));
const Product = lazy(() => import("./Pages/Product"));
const Cart = lazy(() => import("./Pages/Cart"));
const LoginSignUp = lazy(() => import("./Pages/LoginSignUp"));
const Orders = lazy(() => import("./Pages/Orders"));

const App = () => {

  const location = useLocation();
  const hideFooterRoutes: string[] = ['/checkout', '/payment', '/cart', '/loginsignup', '/addresspage', '/orders', '/paymentpage'];

  return (
    <ProductProvider>
      <CartProvider>
        <BuyNowProvider>
          <AddressProvider>
            <OrderProvider>
              <ThemeProvider defaultTheme="dark" storageKey="vite-ui-theme">
                <HeroSliderProvider>
                  <Toaster richColors position="bottom-right" />
                  {!("/loginsignup" === location.pathname || "/paymentpage" === location.pathname) && <Navbar />}
                  <Routes>
                    <Route path="/" element={
                      <Suspense fallback={<HomeSkeleton />}>
                        <Home />
                      </Suspense>
                    }
                    />
                    <Route path="/men" element={<Men />} />
                    <Route path="/women" element={<Women />} />
                    <Route path="/kids" element={<Kids />} />
                    <Route path="/shoes" element={<Shoes />} />
                    <Route path="/cosmetics" element={<Cosmetics />} />
                    <Route path="/electronics" element={<Electronics />} />
                    <Route path="/contact" element={<Contact />} />
                    <Route path="/:category/:productId" element={<Product />} />
                    <Route path="/cart" element={<Cart />} />
                    <Route path="/loginsignup" element={<LoginSignUp />} />
                    <Route path="/addresspage" element={<AddressPage />} />
                    <Route path="/orders" element={<Orders />} />
                    <Route path="/paymentpage" element={<PaymentPage />} />
                  </Routes>
                  {!hideFooterRoutes.includes(location.pathname) && <Footer />}
                </HeroSliderProvider>
              </ThemeProvider>
            </OrderProvider>
          </AddressProvider>
        </BuyNowProvider>
      </CartProvider>
    </ProductProvider>
  );
};

export default App;
