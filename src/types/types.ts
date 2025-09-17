export type NavLinkType = {
  path: string;
  name: string;
};

export type HeroSlide = {
  url: string;
  category: string;
  description: string;
};

export type ProductType = {
  id: number;
  name: string;
  description: string;
  images: string[];
  price: number;
  gender: string
  category: string;
  subCategory: string;
  brand: string;
  rating: number;
  inStock: boolean;
  tags: string;
  sizes: string[];
  discount: number;
  deliveryTime: number;
  numberOfItems?: number | undefined;
};

export type ProductContextType = {
  products: ProductType[];
  loading: boolean;
  getProductsByCategory: (category: string) => ProductType[] | undefined;
};

export type ProductCardProps = {
  product: ProductType;
  onClick?: () => void;
};


export type FiltersType = {
  Categories: string[];
  Pricing: string[];
  Ratings: string[];
  Tags: string[];
};

export type SelectedFiltersType = {
  Categories: string;
  Ratings: string;
  Tags: string;
};

export type FilterSidebarProps = {
  filters: Record<string, string[]>;
  searchTerm: string;
  setSearchTerm: (val: string) => void;
  selectedFilters: Record<string, string>;
  setSelectedFilters: React.Dispatch<React.SetStateAction<SelectedFiltersType>>;
  priceValue: number;
  setPriceValue: (val: number) => void;
  applyFilter: (val: string, price?: number, category?: string) => void;
  categoryFilteredProducts: unknown[];
  BreadcrumbNavigation: string[];
};

export interface BreadcrumbHeaderProps {
  items: string[]; // expects array of breadcrumb items, e.g., ['Men', 'Shirts']
  basePath?: string; // optional base path, defaults to '/'
}

export type CartContextType = {
  cartItems: ProductType[];
  setCartItems: React.Dispatch<React.SetStateAction<ProductType[]>>;
  addToCart: (product: ProductType, selectedSize: string, quantity: number) => void;
  removeFromCart: (productId: number, selectedSize: string) => void;
  numberOfItemsIncreaseByOne: (productId: number, selectedSize: string) => void
  numberOfItemsDecreaseByOne: (productId: number, selectedSize: string) => void
  subtotal: number;
  totalItems: number;
  isOutOfStockPresent: boolean
};


export type Address = {
    id: number;
    name: string;
    street: string;
    city: string;
    pincode: string;
};

export type OrderDetails = {
    orderId: string;
    orderDate: string;
    deliveryTime: number;
    status: string;
    paymentMethod: string | null;
    totalPayableAmount: number;
};

export type Order = {
    products: ProductType[];
    orderDetails: OrderDetails;
    orderAddress: Address;
};

export type OrdersContextType = {
    Orders: Order[];
    handleOrders: (paymentMethod: string) => void;
    CancelOrder: (orderId: string, orderAmount: number, paymentMode: string | null) => void
};

export type BuyNowContextType = {
  buyItems: ProductType[];
  setBuyItems: (items: ProductType[]) => void;
  buySubtotal: number;
  BuyTotalItems: number;
};

export type AddressContextType = {
    addresses: Address[];
    selectedId: number | null;
    setSelectedId: (id: number) => void;
    addAddress: (address: Address) => void;
    deleteAddress: (id: number) => void;
    selectedAddress: Address | null;
};