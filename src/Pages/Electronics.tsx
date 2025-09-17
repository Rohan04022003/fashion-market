import { useEffect, useState } from "react";
import { useProductFilters } from "@/hooks/useProductFilters";
import useProductNavigation from "@/hooks/useProductNavigation";
import FilterSidebar from "@/components/FilterSidebar";
import ProductCard from "@/components/ProductCard";
import { FiltersType } from "@/types/types";
import BreadcrumbHeader from "@/components/BreadcrumbHeader";
import { Filter } from "lucide-react";
import ProductGridSkeleton from "@/components/Skeletons/ProductGridSkeleton";
import { useProductContext } from "@/context/ProductContext";

const Electronics = () => {
  const [priceValue, setPriceValue] = useState(500000);
  const { applyFilter, filteredProducts, searchTerm, setSearchTerm, categoryFilteredProducts } = useProductFilters("electronics");
  const [selectedFilters, setSelectedFilters] = useState({
    Categories: "",
    Ratings: "",
    Tags: "",
  });

  const { loading } = useProductContext();

  const [isFilterVisible, setIsFilterVisible] = useState(false);

  const { goToProduct } = useProductNavigation();

  const BreadcrumbNavigation: string[] = [
    "Electronics",
    selectedFilters.Categories,
    selectedFilters.Tags,
    selectedFilters.Ratings,
  ];

    useEffect(() => {
      window.scrollTo({ top: 0, behavior: "smooth" });
    }, []);

  const ElectronicsFilters: FiltersType = {
    Categories: [
      "Smartphones",
      "Laptops",
      "Tablets",
      "Smart Watches",
      "Earbuds",
      "Bluetooth Speakers",
      "Power Banks",
      "Chargers",
    ],
    Pricing: [],
    Ratings: [
      "5 Stars",
      "4 Stars & Up",
      "3 Stars & Up",
      "2 Stars & Up",
      "1 Star & Up",
    ],
    Tags: ["Best Seller", "New Arrival", "Discounted"],
  };

  return (
    <div className="w-full">
      {/* Breadcrumb for desktop */}
      <div className="page-navigation hidden md:block py-4 px-2 sm:px-6 md:px-12 lg:px-16">
        <BreadcrumbHeader items={BreadcrumbNavigation} basePath="/" />
      </div>

      <div className="flex flex-col md:flex-row gap-6 px-2 sm:px-6 md:px-12 lg:px-16">
        {/* Sidebar */}
        <div className={`w-full md:w-1/4 ${isFilterVisible ? "block" : "hidden"} md:block`}>
          <FilterSidebar
            filters={ElectronicsFilters}
            searchTerm={searchTerm}
            setSearchTerm={setSearchTerm}
            selectedFilters={selectedFilters}
            setSelectedFilters={setSelectedFilters}
            priceValue={priceValue}
            setPriceValue={setPriceValue}
            applyFilter={applyFilter}
            categoryFilteredProducts={categoryFilteredProducts}
            BreadcrumbNavigation={BreadcrumbNavigation}
          />
        </div>

        {/* Mobile breadcrumb + toggle */}
        <div className="md:hidden flex justify-between items-center w-full">
          <div className="flex-1">
            <BreadcrumbHeader items={BreadcrumbNavigation} basePath="/" />
          </div>
          <button
            onClick={() => setIsFilterVisible(!isFilterVisible)}
            className="bg-orange-500 text-white px-3 py-2 rounded-md shadow-sm hover:bg-orange-400"
          >
            <Filter size={18} />
          </button>
        </div>

        {/* Right Products Section */}
        {
          loading ?
            <div className="w-full"><ProductGridSkeleton /></div>
            :
            <div className="w-full">
              <div className="grid grid-cols-2 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4 sm:gap-5">
                {filteredProducts.map((product) => (
                  <ProductCard
                    key={product.id}
                    product={product}
                    onClick={() => goToProduct(product.subCategory, product.id, product)}
                  />
                ))}
              </div>
            </div>
        }
      </div>
    </div>
  );
};

export default Electronics;
