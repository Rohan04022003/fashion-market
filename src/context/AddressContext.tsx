// src/context/AddressContext.tsx
import { Address, AddressContextType } from "@/types/types";
import { createContext, useState, useEffect, useContext, ReactNode } from "react";
import { toast } from "sonner";

const AddressContext = createContext<AddressContextType | undefined>(undefined);

export const AddressProvider = ({ children }: { children: ReactNode }) => {
    const [addresses, setAddresses] = useState<Address[]>(() => {
        const stored = localStorage.getItem("addresses");
        return stored ? JSON.parse(stored) : [];
    });
    const [selectedId, setSelectedId] = useState<number | null>(() => {
        const stored = localStorage.getItem("selectedAddressId");
        return stored ? JSON.parse(stored) : null;
    });

    useEffect(() => {
        localStorage.setItem("addresses", JSON.stringify(addresses));
    }, [addresses]);

    useEffect(() => {
        localStorage.setItem("selectedAddressId", JSON.stringify(selectedId));
    }, [selectedId]);

    const addAddress = (address: Address) => {
        setAddresses((prev) => [...prev, { ...address, id: Date.now() }]);
        toast.success("Your Address is Added Successfully!")
    };

    const deleteAddress = (id: number) => {
        setAddresses((prev) => prev.filter((addr) => addr.id !== id));
        toast.success("Your Address is Deleted Successfully!")
        if (selectedId === id) setSelectedId(null);
    };

    const selectedAddress = addresses.find((addr) => addr.id === selectedId) || null;

    return (
        <AddressContext.Provider
            value={{ addresses, selectedId, setSelectedId, addAddress, deleteAddress, selectedAddress }}
        >
            {children}
        </AddressContext.Provider>
    );
};

export const useAddress = (): AddressContextType => {
    const context = useContext(AddressContext);
    if (!context) throw new Error("useAddress must be used within an AddressProvider");
    return context;
};
