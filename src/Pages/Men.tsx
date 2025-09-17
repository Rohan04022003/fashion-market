import { useProductFilters } from "@/hooks/useProductFilters";
import { useEffect, useState } from "react";
import useProductNavigation from "@/hooks/useProductNavigation";
import ProductCard from "@/components/ProductCard";
import { FiltersType, SelectedFiltersType } from "@/types/types";
import FilterSidebar from "@/components/FilterSidebar";
import BreadcrumbHeader from "@/components/BreadcrumbHeader";
import { Filter } from "lucide-react";
import ProductGridSkeleton from "@/components/Skeletons/ProductGridSkeleton";
import { useProductContext } from "@/context/ProductContext";

const Men = () => {
  const [priceValue, setPriceValue] = useState(10000);
  const [selectedFilters, setSelectedFilters] = useState<SelectedFiltersType>({
    Categories: '',
    Ratings: '',
    Tags: ''
  });

  const { loading } = useProductContext();

  const [isFilterVisible, setIsFilterVisible] = useState(false); // State to control filter visibility

  const BreadcrumbNavigation: string[] = ['Men', selectedFilters.Categories, selectedFilters.Tags, selectedFilters.Ratings];

  const { goToProduct } = useProductNavigation();

  const {
    filteredProducts,
    applyFilter,
    searchTerm,
    setSearchTerm,
    categoryFilteredProducts
  } = useProductFilters('male');

  useEffect(() => {
    window.scrollTo({ top: 0, behavior: "smooth" });
  }, []);

  const MensFilters: FiltersType = {
    Categories: [
      'Men Jeans',
      'Men Shirts',
      'Men T-Shirts',
      'Men Kurta',
      'Coats & Pants',
      'Men Sneakers',
      'Men Perfumes',
      'Men Face Wash',
    ],
    Pricing: [],
    Ratings: [
      '5 Stars',
      '4 Stars & Up',
      '3 Stars & Up',
      '2 Stars & Up',
      '1 Star & Up',
    ],
    Tags: [
      'Best Seller',
      'New Arrival',
      'Discounted',
    ]
  };

  return (
    <div className="w-full">
      {/* Breadcrumb */}
      <div className="page-navigation hidden md:block py-4 px-2 sm:px-6 md:px-12 lg:px-16">
        <BreadcrumbHeader items={BreadcrumbNavigation} basePath="/" />
      </div>

      {/* Content */}
      <div className="flex flex-col md:flex-row gap-6 px-2 sm:px-6 md:px-12 lg:px-16">
        {/* Left Filter Sidebar */}
        <div className={`w-full md:w-1/4 ${isFilterVisible ? 'block' : 'hidden'} md:block`}>
          <FilterSidebar
            filters={MensFilters}
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

        {/* Filter Toggle Button for Mobile */}
        <div className="md:hidden flex justify-between w-full items-center">
          {/* Page Navigation */}
          <div className="flex-1">
            <BreadcrumbHeader items={BreadcrumbNavigation} basePath="/" />
          </div>

          {/* Filter Toggle Button */}
          <div className="flex justify-end">
            <button
              onClick={() => setIsFilterVisible(!isFilterVisible)}
              className="text-sm md:text-base bg-orange-500 text-white px-3 py-2 rounded-md shadow-sm hover:bg-orange-400"
            >
              <Filter size={18} />
            </button>
          </div>
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

export default Men;
