import { Link } from "react-router-dom";
import { Briefcase, Facebook, Github, Instagram, Linkedin, Moon, Sun } from "lucide-react";
import { Button } from "@/components/ui/button";
import { useTheme } from "@/context/theme-provider";

const Footer = () => {
  const { theme, setTheme } = useTheme();

  return (
    <footer className="bg-background border-t pt-6 px-2 sm:px-6 md:px-12 lg:px-16 mt-5">
      <div className="grid grid-cols-1 md:grid-cols-4 gap-8 pb-10">
        {/* Logo & Tagline */}
        <div>
          <Link to="/" className="font-bold text-lg flex flex-col items-start">
            <h1 className="mb-[-.3rem] cedarville-cursive-regular">
              Fashion <span className="dark:text-orange-400 text-orange-700">Market</span>
            </h1>
            <p className="text-[.7rem] text-gray-500 font-normal">
              Wear Your Vibe.
            </p>
          </Link>
          <p className="mt-4 text-sm text-muted-foreground">
            Your go-to destination for stylish clothing, trendy accessories,
            and quality electronics.
          </p>
        </div>

        {/* Navigation Links */}
        <div>
          <h2 className="text-base font-semibold mb-3">Shop</h2>
          <nav className="flex flex-col gap-2 text-sm text-muted-foreground">
            <Link to="/men">Men</Link>
            <Link to="/women">Women</Link>
            <Link to="/kids">Kids</Link>
            <Link to="/shoes">Shoes</Link>
            <Link to="/cosmetics">Cosmetics</Link>
            <Link to="/electronics">Electronics</Link>
          </nav>
        </div>

        {/* Useful Links */}
        <div>
          <h2 className="text-base font-semibold mb-3">Useful</h2>
          <nav className="flex flex-col gap-2 text-sm text-muted-foreground">
            <Link to="/orders">Orders</Link>
            <Link to="/contact">Contact Us</Link>
            <Link to="/cart">Saved Cart</Link>
            <Link to="/address">Saved Address</Link>
          </nav>
        </div>

        {/* Social Icons + Theme Toggle */}
        <div>
          <h2 className="text-base font-semibold mb-3">Follow Us</h2>
          <div className="flex gap-3 mb-4">
            <SocialIcon href="https://rohan-portfolio-eta.vercel.app/" label="Portfolio">
              <Briefcase />
            </SocialIcon>
            <SocialIcon href="https://www.linkedin.com/in/rohan-mahto-5521aa253/" label="LinkedIn">
              <Linkedin />
            </SocialIcon>
            <SocialIcon href="https://github.com/Rohan04022003" label="GitHub">
              <Github />
            </SocialIcon>
            <SocialIcon
              href="https://instagram.com/rohankumarmahto01?utm_source=qr&igshid=MzNlNGNkZWQ4Mg=="
              label="Instagram"
            >
              <Instagram />
            </SocialIcon>
            <SocialIcon href="https://www.facebook.com/profile.php?id=100015224166657" label="Facebook">
              <Facebook />
            </SocialIcon>
          </div>

          <Button
            variant="outline"
            className="rounded-[5px] text-sm flex items-center gap-2 shadow-none"
            onClick={() => setTheme(theme === "dark" ? "light" : "dark")}
          >
            {theme === "dark" ? <Sun className="h-4 w-4" /> : <Moon className="h-4 w-4" />}
            {theme === "dark" ? "Switch to Light" : "Switch to Dark"} Mode
          </Button>
        </div>
      </div>

      <div className="text-center py-4 border-t text-xs text-muted-foreground">
        © {new Date().getFullYear()} Fashion Market. All rights reserved.
      </div>
    </footer>
  );
};

// Reusable Social Icon Component
const SocialIcon = ({ href, label, children }: SocialIconProps) => (
  <a
    href={href}
    target="_blank"
    rel="noopener noreferrer"
    aria-label={label}
    title={label}
    className="hover:text-orange-500 text-gray-500"
  >
    {children}
  </a>
);

type SocialIconProps = {
  href: string;
  label: string;
  children: React.ReactNode;
};

export default Footer;
