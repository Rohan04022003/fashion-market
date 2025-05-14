import { createContext, useContext, useEffect, useRef, useState, ReactNode } from "react";
import { CartContextType, ProductType } from "@/types/types";
import { toast } from "sonner";

const CartContext = createContext<CartContextType | undefined>(undefined);

export const CartProvider = ({ children }: { children: ReactNode }) => {
    const [cartItems, setCartItems] = useState<ProductType[]>([]);
    const [subtotal, setSubtotal] = useState(0);
    const [totalItems, setTotalItems] = useState(0);
    const [isOutOfStockPresent, setIsOutOfStockPresent] = useState(false);
    const isFirstLoad = useRef(true); // Flag to skip first run

    // Load cart from localStorage
    useEffect(() => {
        const storedItems = localStorage.getItem("cart-items");
        if (storedItems) {
            try {
                setCartItems(JSON.parse(storedItems));
            } catch (err) {
                console.error("Error parsing cart-items:", err);
            }
        }
    }, []);

    // Save cart to localStorage (after first render only)
    useEffect(() => {
        if (isFirstLoad.current) {
            isFirstLoad.current = false; // After first run, turn off the flag
            return; // Don't save to localStorage on first render
        }

        localStorage.setItem("cart-items", JSON.stringify(cartItems));

        const newSubtotal = cartItems.reduce(
            (acc, item) => acc + item.price * (item.numberOfItems ?? 1),
            0
        );
        setSubtotal(newSubtotal);

        const newTotalItems = cartItems.reduce(
            (acc, item) => acc + (item.numberOfItems ?? 1),
            0
        );
        setTotalItems(newTotalItems);
    }, [cartItems]);

    useEffect(() => {
        const hasInStock = cartItems.some((item) => item.inStock === false);
        setIsOutOfStockPresent(hasInStock);
    }, [cartItems]);

    const addToCart = (product: ProductType, selectedSize: string, quantity: number) => {
        const isDuplicate = cartItems.some(
            (item) => item.id === product.id && item.sizes.includes(selectedSize)
        );

        if (isDuplicate) {
            toast.warning("Item already in cart with this size.");
            return;
        }

        const newProduct: ProductType = {
            ...product,
            sizes: [selectedSize],
            numberOfItems: quantity,
        };

        setCartItems((prev) => [...prev, newProduct]);
        toast.success("Item added to cart!");
    };

    const removeFromCart = (productId: number, selectedSize: string) => {
        const updated = cartItems.filter(
            (item) => !(item.id === productId && item.sizes.includes(selectedSize))
        );
        setCartItems(updated);
        toast.success("Item removed from cart.");
    };

    const numberOfItemsIncreaseByOne = (productId: number, selectedSize: string) => {
        setCartItems(prev =>
            prev.map((item) =>
                item.id === productId && item.sizes.includes(selectedSize)
                    ? { ...item, numberOfItems: (item.numberOfItems ?? 1) + 1 }
                    : item
            )
        );
    };

    const numberOfItemsDecreaseByOne = (productId: number, selectedSize: string) => {
        setCartItems(prev =>
            prev.map((item) =>
                item.id === productId && item.sizes.includes(selectedSize)
                    ? { ...item, numberOfItems: (item.numberOfItems ?? 1) - 1 }
                    : item
            )
        );
    };


    return (
        <CartContext.Provider
            value={{
                cartItems,
                setCartItems,
                addToCart,
                removeFromCart,
                numberOfItemsIncreaseByOne,
                numberOfItemsDecreaseByOne,
                subtotal,
                totalItems,
                isOutOfStockPresent,
            }}
        >
            {children}
        </CartContext.Provider>
    );
};

export const useCart = () => {
    const context = useContext(CartContext);
    if (!context) {
        throw new Error("useCart must be used within a CartProvider");
    }
    return context;
};
