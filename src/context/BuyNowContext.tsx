// src/context/BuyNowContext.tsx
import { BuyNowContextType, ProductType } from "@/types/types";
import {
  createContext,
  useContext,
  useState,
  ReactNode,
  useEffect,
  useRef,
} from "react";

const BuyNowContext = createContext<BuyNowContextType | undefined>(undefined);

export const BuyNowProvider = ({ children }: { children: ReactNode }) => {
  const [buyItems, setBuyItems] = useState<ProductType[]>([]);
  const [buySubtotal, setBuySubtotal] = useState<number>(0);
  const [BuyTotalItems, setBuyTotalItems] = useState<number>(0);
  const isFirstLoad = useRef(true);

  // Load items from localStorage on initial mount
  useEffect(() => {
    const storedItems = localStorage.getItem("buyItems");
    if (storedItems) {
      setBuyItems(JSON.parse(storedItems));
    }
  }, []);

  // Update subtotal, total items, and localStorage when buyItems change
  useEffect(() => {
    const newBuySubtotal = buyItems.reduce(
      (acc, item) =>
        acc + item.price * Number(item.numberOfItems ?? 1),
      0
    );
    setBuySubtotal(newBuySubtotal);

    const newTotalItems = buyItems.reduce(
      (acc, item) => acc + Number(item.numberOfItems ?? 1),
      0
    );
    setBuyTotalItems(newTotalItems);

    if (isFirstLoad.current) {
      isFirstLoad.current = false
      return
    }
      localStorage.setItem("buyItems", JSON.stringify(buyItems));

  }, [buyItems]);

  return (
    <BuyNowContext.Provider
      value={{
        buyItems,
        setBuyItems,
        buySubtotal,
        BuyTotalItems,
      }}
    >
      {children}
    </BuyNowContext.Provider>
  );
};

export const useBuyNow = () => {
  const context = useContext(BuyNowContext);
  if (!context)
    throw new Error("useBuyNow must be used within a BuyNowProvider");
  return context;
};
