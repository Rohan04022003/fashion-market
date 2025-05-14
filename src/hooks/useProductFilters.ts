// useProductFilters.ts
import { useState, useEffect } from 'react';
import { useProductContext } from '@/context/ProductContext';
import { ProductType } from '@/types/types';

export const useProductFilters = (category: string) => {
    const [allProducts, setAllProducts] = useState<ProductType[]>([]);
    const [filteredProducts, setFilteredProducts] = useState<ProductType[]>([]);
    const [searchTerm, setSearchTerm] = useState<string>('');
    const { getProductsByCategory } = useProductContext();
    const [categoryFilteredProducts, setCategoryFilterProducts] = useState<ProductType[]>([])



    useEffect(() => {
        const fetchedProducts = getProductsByCategory(category);
        setAllProducts(fetchedProducts || []);
        setFilteredProducts(fetchedProducts || []);

    }, [category, getProductsByCategory]);

    useEffect(() => {
        if (searchTerm.trim() !== "") {
            const filtered = allProducts.filter((product) =>
                product.name.toLowerCase().includes(searchTerm.toLowerCase())
            );
            setFilteredProducts(filtered);
        } else {
            setFilteredProducts(allProducts);
        }
    }, [searchTerm, allProducts]);

    const applyFilter = (filter: string, value?: number, applyFilterCategory?: string) => {
        console.log(filter, value, applyFilterCategory)
        const baseData: ProductType[] = categoryFilteredProducts.length > 0 ? categoryFilteredProducts : allProducts;

        switch (applyFilterCategory) {
            case "Categories":
                // Always apply fresh on allProducts for new category filter
                {
                    const filteredByCategory = allProducts.filter(
                        (product) => product.subCategory.toLowerCase() === filter.toLowerCase()
                    );
                    setFilteredProducts(filteredByCategory);
                    setCategoryFilterProducts(filteredByCategory);
                }
                break;

            case "Pricing":
                if (value !== undefined) {
                    const filteredByPrice = baseData.filter(
                        (product) => Number(product.price) <= value
                    );
                    setFilteredProducts(filteredByPrice);
                }
                break;

            case "Ratings":
                {
                    const filteredByRating = baseData.filter(
                        (product) => product.rating >= parseInt(filter)
                    );
                    setFilteredProducts(filteredByRating);
                }
                break;

            case "Tags":
                {
                    const filteredByTags = baseData.filter(
                        (product) => product.tags.toLowerCase().includes(filter.toLowerCase())
                    );
                    setFilteredProducts(filteredByTags);
                }
                break;

            default:
                // Reset filters
                setFilteredProducts(allProducts);
                setCategoryFilterProducts([]);
                break;
        }
    };


    return { filteredProducts, searchTerm, setSearchTerm, applyFilter, categoryFilteredProducts };
};
