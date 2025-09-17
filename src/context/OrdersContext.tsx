import { ReactNode, useContext, useState, createContext, useEffect, useRef } from "react";
import { useBuyNow } from "./BuyNowContext";
import { useAddress } from "./AddressContext";
import { useCart } from "./CartContext";
import { toast } from "sonner";
import { Order, OrdersContextType } from "@/types/types";

const OrdersContext = createContext<OrdersContextType | undefined>(undefined);

export const OrderProvider = ({ children }: { children: ReactNode }) => {
    const [Orders, setOrders] = useState<Order[]>([]);
    const { buyItems, setBuyItems } = useBuyNow();
    const { selectedAddress } = useAddress();
    const { setCartItems } = useCart();
    const isFirstLoad = useRef(true);

    // Load from localStorage on mount
    useEffect(() => {
        const stored = localStorage.getItem("order-items");
        if (stored) {
            try {
                setOrders(JSON.parse(stored));
            } catch (err) {
                console.error("Failed to parse order-items:", err);
            }
        }
    }, []);

    // Save to localStorage on change
    useEffect(() => {
        if (isFirstLoad.current) {
            isFirstLoad.current = false;
            return;
        }
        localStorage.setItem("order-items", JSON.stringify(Orders));
    }, [Orders]);

    function handleOrders(paymentMethod: string) {
        const date = new Date();

        if (!selectedAddress) {
            toast.warning("No address selected");
            return;
        }

        const newOrder: Order = {
            products: buyItems,
            orderDetails: {
                orderId: date.getTime().toString(),
                orderDate: date.toLocaleString(),
                deliveryTime: Math.round(
                    buyItems.reduce((acc, item) => acc + Number(item.deliveryTime), 0) / buyItems.length
                ),
                status: "Shipped",
                paymentMethod,
                totalPayableAmount: buyItems.reduce((acc, item) => acc + (item.price * (item.numberOfItems ?? 1)), 0),
            },
            orderAddress: selectedAddress,
        };

        setOrders((prev) => [ newOrder, ...prev]);
        toast.success("Order placed successfully!");
        setCartItems([])
        localStorage.removeItem("buyItems");
        setBuyItems([]);
    }

    function CancelOrder(orderId: string, orderAmount: number, paymentMode: string | null) {
        setOrders((prev) => prev.filter((item) => item.orderDetails.orderId !== orderId));
        toast.success(`Your order was canceled successfully. ${paymentMode?.toLowerCase() !== 'cash on delivery' ? `Your total payment of ₹"${orderAmount} "will be refunded to your account within 24 hours.` : ""}`);

    }

    return (
        <OrdersContext.Provider value={{ Orders, handleOrders, CancelOrder }}>
            {children}
        </OrdersContext.Provider>
    );
};

export const useOrders = () => {
    const context = useContext(OrdersContext);
    if (!context) throw new Error("useOrders must be used within an OrderProvider");
    return context;
};
