// context/ProductContext.tsx
import { ProductContextType, ProductType } from "@/types/types";
import { createContext, useContext, ReactNode, useState, useEffect } from "react";

const ProductContext = createContext<ProductContextType>({
  products: [],
  loading: true,
  getProductsByCategory: () => [],
});

// eslint-disable-next-line react-refresh/only-export-components
export const useProductContext = () => useContext(ProductContext);

export const ProductProvider = ({ children }: { children: ReactNode }) => {
  const [products, setProducts] = useState<ProductType[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    // Simulate loading

    async function fetchData() {

      try {
        const response  = await fetch('/data.json')
        const data  = await response.json();
        setProducts(data)
      } catch(error){
        console.error('Failed to fetch data:', error);
      } finally{
        setLoading(false)
      }
    }

    fetchData();

    // setTimeout(() => {
    //   setProducts(sampleProducts);
    //   setLoading(false);
    // }, 500);
  }, []);

  const getProductsByCategory = (category: string) => {
    if (category.toLowerCase() === 'boy' || category.toLowerCase() === 'girl') {
      return products.filter((product) =>
        product.gender.toLowerCase() === 'boy' || product.gender.toLowerCase() === 'girl'
      );
    } else if (category.toLowerCase() === 'shoes') {
      return products.filter((product) =>
        product.category.toLowerCase() === 'shoes'
      );
    } else if (category.toLowerCase() === 'cosmetics') {
      return products.filter((product) =>
        product.category.toLowerCase() === 'cosmetics'
      );
    } else if (category.toLowerCase() === 'electronics') {
      return products.filter((product) =>
        product.category.toLowerCase() === 'electronics'
      )
    } else if (category.toLowerCase() === 'male' || category.toLowerCase() === 'female') {
      return products.filter((product) =>
        product.gender.toLowerCase() === category.toLowerCase()
      )
    }
  };

  return (
    <ProductContext.Provider value={{ products, loading, getProductsByCategory }}>
      {children}
    </ProductContext.Provider>
  );
};
