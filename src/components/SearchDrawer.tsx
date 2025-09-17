import { useState, useEffect, useRef } from "react";
import { Drawer, DrawerClose, DrawerContent, DrawerTrigger } from "@/components/ui/drawer";
import { Button } from "./ui/button";
import { Search, X } from "lucide-react";
import { useProductContext } from "@/context/ProductContext";
import useProductNavigation from "@/hooks/useProductNavigation";
import { Card, CardDescription, CardHeader, CardTitle } from "./ui/card";
import { ProductType } from "@/types/types";

const SearchDrawer = () => {
    const { products } = useProductContext();
    const [searchValue, setSearchValue] = useState("");
    const [searchedProducts, setSearchProducts] = useState<ProductType[]>([]);
    const { goToProduct } = useProductNavigation();
    const inputRef = useRef<HTMLInputElement>(null);

    const popularSearches: string[] = [
        "Symbol",
        "Wild Stone",
        "mamaearth",
        "Samsung",
        "Apple",
    ];

    useEffect(() => {
        if (searchValue) {
            setSearchProducts(
                products.filter(
                    (product) =>
                        product.name.toLowerCase().includes(searchValue.toLowerCase()) ||
                        product.brand.toLowerCase().includes(searchValue.toLowerCase())
                )
            );
        } else {
            setSearchProducts([]);
        }
    }, [searchValue, products]);

    return (
        <Drawer> {/* Drawer component */}
            <DrawerTrigger className="cursor-pointer">
                <Search aria-label="for search bar"/>
            </DrawerTrigger>

            <DrawerContent className="md:h-[100vh] h-[94vh] px-4 md:px-6 mt-5 bg-background">
                {/* Search bar */}
                <div className="flex justify-between items-center w-full sm:gap-4 gap-2 mb-6">
                    <div className="flex items-center w-full px-5 py-3 border rounded-[5px]">
                        <input
                        aria-label="search value"
                            ref={inputRef}
                            value={searchValue}
                            onChange={(e) => setSearchValue(e.target.value)}
                            placeholder="Search products by name..."
                            className="text-sm text-black dark:text-gray-200 placeholder:text-gray-400 bg-transparent outline-none w-full"
                        />
                        <Search className="w-5 h-5 text-gray-500" />
                    </div>

                    <DrawerClose asChild>
                        <Button
                        aria-label="close search drawer"
                            variant="ghost"
                            size="icon"
                            className="rounded-[5px] border"
                            onClick={() => {
                                setSearchProducts([]);
                                setSearchValue("");
                            }}
                        >
                            <X className="w-5 h-5 text-destructive" />
                        </Button>
                    </DrawerClose>
                </div>

                {/* Popular Searches */}
                <div className="mb-6">
                    <h3 className="text-lg font-semibold mb-2">Popular Brands</h3>
                    <div className="flex flex-wrap gap-2">
                        {popularSearches.map((item, i) => (
                            <Button
                            aria-label={item}
                                onClick={() => setSearchValue(item)}
                                key={i}
                                size="sm"
                                className={`text-xs px-3 rounded-[5px] hover:bg-orange-500 bg-transparent text-black dark:text-white border ${searchValue.toLowerCase() === item.toLowerCase()
                                        ? "bg-orange-500 text-white"
                                        : ""
                                    }`}
                            >
                                {item}
                            </Button>
                        ))}
                    </div>
                </div>

                {/* Searched Products */}
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4 overflow-y-auto scroll-smooth pb-20">
                    {searchedProducts.map((product) => (
                        <DrawerClose asChild key={product.id}>
                            <Card
                                onClick={() => {
                                    goToProduct(product.subCategory, product.id, product);
                                    setSearchProducts([]);
                                    setSearchValue("");
                                }}
                                className="h-auto rounded-[5px] p-0 shadow-none cursor-pointer"
                            >
                                <CardHeader className="p-1 flex gap-4">
                                    <div className="h-[5.4rem]">
                                        <img
                                            src={product.images[0]}
                                            alt="Product"
                                            className="h-full w-[6rem] object-cover rounded-sm border"
                                        />
                                    </div>
                                    <div className="product-details text-left w-full">
                                        <CardDescription className="text-[.7rem] text-muted-foreground pb-1 flex justify-between items-center gap-4">
                                            {product.brand}
                                            <p
                                                className={`py-[.1rem] px-1 fit rounded-[5px] text-[.6rem] ${product.inStock
                                                        ? "bg-green-50 text-green-800"
                                                        : "bg-red-50 text-red-800"
                                                    }`}
                                            >
                                                {product.inStock ? "In Stock" : "Out of Stock"}
                                            </p>
                                        </CardDescription>
                                        <CardTitle className="text-[.8rem] font-normal">
                                            {product.name.slice(0, 30) + "..."}
                                        </CardTitle>
                                        <div className="pricing pt-1 flex items-center gap-3 text-[.8rem] font-semibold">
                                            <p>₹{product.price}</p>
                                            <p className="bg-gray-100 dark:text-black text-[.6rem] px-1 py-[.1rem] rounded-sm font-normal">
                                                Free Delivery
                                            </p>
                                        </div>
                                    </div>
                                </CardHeader>
                            </Card>
                        </DrawerClose>
                    ))}
                </div>
            </DrawerContent>
        </Drawer>
    );
};

export default SearchDrawer;
