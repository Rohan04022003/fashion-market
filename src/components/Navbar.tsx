import { useState, useEffect } from "react";
import { Link, useLocation } from "react-router-dom";
import { useTheme } from "@/context/theme-provider";
import { Moon, ShoppingCart, Sun, Menu, X } from "lucide-react";
import { Avatar, AvatarImage } from "@/components/ui/avatar";
import userIcon from '../assets/user-photo.png';
import {
    DropdownMenu,
    DropdownMenuContent,
    DropdownMenuItem,
    DropdownMenuLabel,
    DropdownMenuSeparator,
    DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Button } from "./ui/button";
import SearchDrawer from "./SearchDrawer";
import { NavLinkType } from "@/types/types";
import { useCart } from "@/context/CartContext";

const Navlinks: NavLinkType[] = [
    { path: '/men', name: 'Men' },
    { path: '/women', name: 'Women' },
    { path: '/kids', name: 'Kids' },
    { path: '/shoes', name: 'Shoes' },
    { path: '/cosmetics', name: 'Cosmetics' },
    { path: '/electronics', name: 'Electronics' },
];

const OtherMobileLinks: NavLinkType[] = [
    { path: '/orders', name: 'Orders' },
    { path: '/contact', name: 'Contact Us' },
    { path: '/cart', name: 'Saved Cart' },
    { path: '/addresspage', name: 'Saved Address' },
];

const Navbar = () => {
    const location = useLocation();
    const [active, setActive] = useState(location.pathname);
    const { theme, setTheme } = useTheme();
    const { totalItems } = useCart();
    const [menuOpen, setMenuOpen] = useState(false);
    const [isDropdownOpen, setIsDropdownOpen] = useState(false);

    useEffect(() => {
        setActive(location.pathname);
        setMenuOpen(false);
        setIsDropdownOpen(false);
    }, [location.pathname]);

    return (
        <header className="sticky top-0 z-50 backdrop-blur bg-background/95 supports-[backdrop-filter]:bg-background/80">
            <div className="flex justify-between items-center px-2 sm:px-6 md:px-12 lg:px-16 h-16">
                {/* Logo */}
                <Link aria-label="fashion market" to="/" className="font-bold text-lg flex flex-col items-start">
                    <h1 className="mb-[-.3rem] cedarville-cursive-regular">
                        Fashion <span className="dark:text-orange-400 text-orange-700">Market</span>
                    </h1>
                    <p className="text-[.7rem] dark:text-gray-300 text-gray-700 font-normal">Wear Your Vibe.</p>
                </Link>

                {/* Desktop Nav Links */}
                <nav className="hidden lg:flex items-center gap-2">
                    {Navlinks.map((link, index) => (
                        <Link
                            aria-label={link.name}
                            key={index}
                            to={link.path}
                            className={`px-2 py-2 cursor-pointer font-medium dark:text-gray-300 text-gray-700 ${active === link.path
                                ? 'text-orange-500'
                                : ""
                                }`}
                        >
                            {link.name}
                        </Link>
                    ))}
                </nav>

                {/* Right Side Controls */}
                <div className="flex items-center gap-4">
                    <div className="search cursor-pointer pt-1">
                        <SearchDrawer />
                    </div>

                    <Link aria-label="cart section" to="/cart" className="relative">
                        <ShoppingCart />
                        {totalItems > 0 && (
                            <span className="absolute -top-2 -right-2 w-5 h-5 text-xs bg-orange-500 text-white rounded-full flex justify-center items-center">
                                {totalItems}
                            </span>
                        )}
                    </Link>

                    <button
                        aria-label="theme"
                        className={`theme hidden lg:block cursor-pointer transition-all duration-500 ${theme === 'dark' ? 'rotate-180' : 'rotate-0'
                            }`}
                        onClick={() => setTheme(theme === 'dark' ? 'light' : 'dark')}
                    >
                        {theme === 'dark' ? <Sun color="orange" /> : <Moon color="#1f1f1f" />}
                    </button>

                    <DropdownMenu open={isDropdownOpen} onOpenChange={setIsDropdownOpen}>
                        <DropdownMenuTrigger className="hidden lg:block rounded-[5px]">
                            <Avatar>
                                <AvatarImage aria-label="avatar image" src={userIcon} />
                            </Avatar>
                        </DropdownMenuTrigger>
                        <DropdownMenuContent className="mx-5 p-3">
                            <DropdownMenuLabel className="text-lg">My Account</DropdownMenuLabel>
                            <DropdownMenuLabel className="text-[.8rem] text-gray-500 font-normal mt-[-.5rem] pb-2">
                                To access account and manage orders
                            </DropdownMenuLabel>
                            <Link to={"/loginsignup"}><Button variant="outline" size="sm" className="font-normal text-[.8rem] mb-2 rounded-[5px] border-orange-500 text-orange-500 hover:text-400 hover:bg-transparent">
                                Login / SignUp
                            </Button></Link>
                            <DropdownMenuSeparator />
                            <DropdownMenuItem className={`${location.pathname.includes("/orders") ? "text-orange-500" : ""} hover:bg-orange-100 hover:text-orange-500`} asChild><Link to={"/orders"}>Orders</Link></DropdownMenuItem>
                            <DropdownMenuItem className={`${location.pathname.includes("/contact") ? "text-orange-500" : ""} hover:bg-orange-100 hover:text-orange-500`} asChild>
                                <Link to="/contact">Contact</Link>
                            </DropdownMenuItem>
                            <DropdownMenuItem className={`${location.pathname.includes("/cart") ? "text-orange-500" : ""} hover:bg-orange-100 hover:text-orange-500`} asChild><Link to={"/cart"}>Saved Cart</Link></DropdownMenuItem>
                            <DropdownMenuItem className={`${location.pathname.includes("/address") ? "text-orange-500" : ""} hover:bg-orange-100 hover:text-orange-500`} asChild><Link to={"/addresspage"}>Saved Address</Link></DropdownMenuItem>
                        </DropdownMenuContent>
                    </DropdownMenu>

                    {/* Hamburger for Mobile */}
                    <button aria-label="hamburger" className={`lg:hidden transition-all duration-500 ${menuOpen ? "rotate-90" : "rotate-0"}`} onClick={() => setMenuOpen(!menuOpen)}>
                        {menuOpen ? (
                            <X color={theme === "dark" ? "white" : "#1f1f1f"} />
                        ) : (
                            <Menu color={theme === "dark" ? "white" : "#1f1f1f"} />
                        )}

                    </button>
                </div>
            </div>

            {/* Mobile Nav Drawer */}
            {menuOpen && (
                <div className="lg:hidden bg-background shadow-[0_4px_10px_rgba(0,0,0,0.1)] w-full px-4 pb-4 flex flex-col gap-2 border-t fixed">
                    {Navlinks.map((link, index) => (
                        <Link
                            key={index}
                            to={link.path}
                            onClick={() => setMenuOpen(false)}
                            className={`py-2 ${active === link.path
                                ? 'text-orange-500'
                                : theme === 'dark'
                                    ? 'text-gray-300'
                                    : 'text-gray-400'
                                }`}
                        >
                            {link.name}
                        </Link>
                    ))}
                    <hr />
                    {OtherMobileLinks.map((link, index) => (
                        <Link
                            key={index}
                            to={link.path}
                            onClick={() => setMenuOpen(false)}
                            className={`py-2 ${active === link.path
                                ? 'text-orange-500'
                                : theme === 'dark'
                                    ? 'text-gray-300'
                                    : 'text-gray-700'
                                }`}
                        >
                            {link.name}
                        </Link>
                    ))}

                    <div className="theme-user-profile-button mt-3 mb-3 flex items-center gap-5">
                        <Link to={'/loginsignup'}><Button className="py-6 bg-orange-500 text-white">Login / Logout</Button></Link>
                        <div
                            className="theme cursor-pointer"
                            onClick={() => setTheme(theme === 'dark' ? 'light' : 'dark')}
                        >
                            {theme === 'dark' ? <Button variant={"outline"} className="py-6 rounded-[5px]"><Sun color="orange" />Light</Button> : <Button variant={"outline"} className="py-6 rounded-[5px]"><Moon color="#1f1f1f" /> Dark</Button>}
                        </div>
                    </div>
                </div>
            )}
        </header>
    );
};

export default Navbar;
