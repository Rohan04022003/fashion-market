import ProductCard from "@/components/ProductCard";
import { Button } from "@/components/ui/button";
import { useProductContext } from "@/context/ProductContext";
import { useCart } from "@/context/CartContext";
import useProductNavigation from "@/hooks/useProductNavigation";
import { ProductType } from "@/types/types";
import { getRatingStyles } from "@/utils/getRatingStyles";
import { tagStyles } from "@/utils/tagStyles";
import { BadgeDollarSign, ShoppingCart } from "lucide-react";
import { Key, useEffect, useState } from "react";
import { FaStar } from "react-icons/fa";
import { useLocation, useNavigate } from "react-router-dom";
import { Carousel, CarouselContent, CarouselItem, CarouselApi } from "@/components/ui/carousel";
import { useBuyNow } from "@/context/BuyNowContext";
import { toast } from "sonner";

const Product = () => {
  const location = useLocation();
  const { product } = location.state || { product: {} };
  const { setBuyItems } = useBuyNow();

  const [mainImage, setMainImage] = useState(product.images[0]);
  const [productSize, setProductSize] = useState(product.sizes[0]);
  const [productQuantity] = useState(1); // You can later make this dynamic if needed

  const { products } = useProductContext();
  const { goToProduct } = useProductNavigation();
  const { addToCart } = useCart(); // Using Cart Context

  const tagCSS = tagStyles;
  const [api, setApi] = useState<CarouselApi>()
  const { backgroundColor, textColor } = getRatingStyles(product.rating);
  const [current, setCurrent] = useState(0)
  const [count, setCount] = useState(0)
  const navigate = useNavigate();

  useEffect(() => {
    setMainImage(product.images[0]);
    setProductSize(product.sizes[0])
    setCurrent(0)
    if (api) {
      api.scrollTo(0);
    }
    window.scrollTo({ top: 0, behavior: "smooth" });
  }, [product, api,]);

  useEffect(() => {
    if (!api) {
      return
    }

    setCount(product.images.length)
    setCurrent(api.selectedScrollSnap() + 1)

    api.on("select", () => {
      setCurrent(api.selectedScrollSnap() + 1)
    })
  }, [api, product.images.length])

  const relatedProducts: ProductType[] = products.filter(
    (data) => data.subCategory === product.subCategory && data.id !== product.id
  );

  if (!product) {
    return (
      <div className="w-screen h-screen flex justify-center items-center">
        Product not found
      </div>
    );
  }

  return (
    <div>
      <div className="flex flex-col md:flex-row md:gap-8 my-4 md:my-10 px-2 sm:px-6 md:px-12 lg:px-16">
        {/* Left Section */}
        <div className="left-section hidden sm:flex gap-4 h-[18rem] sm:h-[25rem] md:h-[30rem] overflow-hidden w-full md:w-fit mb-8 md:mb-0">
          <div className="grid grid-rows-4 gap-2">
            {product.images.map((img: string | undefined, index: Key) => (
              <img
                src={img}
                key={index}
                onClick={() => setMainImage(img)}
                className={`md:h-[7rem] h-[4rem] w-[6rem] object-cover rounded-[5px] cursor-pointer border ${mainImage === img ? "border border-blue-500" : ""}`}
              />
            ))}
          </div>
          <div>
            <img
              src={mainImage}
              alt="Product"
              className="rounded-[5px] h-[18rem] sm:h-[25rem] md:h-[30rem] w-[30rem] border object-cover"
            />
          </div>
        </div>

        {/* {product image for mobile} */}

        <div className="product-images-mobile w-full h-[40vh] mb-4 sm:hidden block relative">
          <Carousel setApi={setApi}>
            <CarouselContent>
              {
                product.images.map((image: string | undefined, index: Key) => {
                  return (
                    <CarouselItem key={image}><img src={image} alt={"product-" + index} className="h-[40vh] w-full rounded-[5px]" /></CarouselItem>
                  )
                })
              }
            </CarouselContent>
          </Carousel>
          <div className="indicator absolute -bottom-1 -right-3 -translate-1/2 bg-orange-500 text-white px-2 py-[.1rem] text-[.7rem] rounded-[5px]"> <span>{current}</span> of <span>{count}</span></div>
        </div>

        {/* Right Section */}
        <div className="right-section w-full md:w-[50%]">
          <p className="px-2 py-1 bg-orange-500 text-white rounded-[5px] text-sm w-fit mb-3">
            {product.brand}
          </p>
          <h2 className="text-lg md:text-2xl font-semibold">{product.name}</h2>

          <div className="rating pt-2">
            <p
              className={`font-semibold ${textColor} flex items-center gap-[.3rem] ${backgroundColor} w-fit px-2 py-[.1rem] rounded-[5px]`}
            >
              {product.rating} <FaStar size={12} />
            </p>
          </div>

          <div className="flex items-center gap-3">
            <p className="text-2xl font-semibold">₹{product.price}</p>
            <p className="text-red-500 font-semibold text-[.7rem]">
              ( {product.discount}% off )
            </p>
            <p
              className={`mt-3 px-2 py-1 rounded-[5px] text-[.6rem] font-semibold w-fit mb-3 ${tagCSS[product.tags.toLowerCase()]}`}
            >
              {product.tags}
            </p>
          </div>

          <div className="description mt-2">
            <p className="  text-[.8rem] text-gray-500">
              Lorem ipsum dolor sit amet consectetur, adipisicing elit.
              Architecto animi repellat vero distinctio delectus debitis esse
              fugiat voluptas aspernatur corporis, quam beatae ducimus soluta
              similique quasi exercitationem dolorum nam? Iusto!
            </p>
          </div>

          <div className="size-selection pt-3">
            <div className="flex items-center">
              Select Size
              <p
                className={`text-[.8rem] pl-4 font-semibold ${product.inStock ? "text-green-700" : "text-red-700"
                  }`}
              >
                {product.inStock ? "In Stock" : "Out of Stock"}
              </p>
            </div>
            <div className="pt-2 flex items-center gap-2">
              {product.sizes.map((size: string, index: number) => (
                <Button
                  onClick={() => setProductSize(size)}
                  variant={"outline"}
                  key={index}
                  className={`rounded-[5px] ${productSize === size ? "border border-orange-500 dark:border-orange-500" : ""
                    }`}
                >
                  {size}
                </Button>
              ))}
            </div>
          </div>

          <div className="add-to-cart buy-btn pt-4 flex items-center gap-4">
            <Button
              onClick={() => addToCart(product, productSize, productQuantity)}
              size={"lg"}
              className="rounded-[5px] flex items-center"
            >
              <ShoppingCart color="orange" />
              ADD TO CART
            </Button>
            <Button
              size={"lg"}
              onClick={() => {
                if (!product.inStock) {
                  toast.warning("You can't order out-of-stock product.");
                } else {
                  navigate("/addresspage");
                  setBuyItems([{ ...product, numberOfItems: 1 }]);
                }
              }}
              className="rounded-[5px] bg-orange-500 hover:bg-orange-400 text-white"
            >
              <BadgeDollarSign />
              BUY NOW
            </Button>
          </div>

          <div className="dilevery-date pt-3">
            <p className="flex items-center gap-1 text-sm text-gray-700 dark:text-gray-300">
              <span className="text-2xl">📦</span>
              Get it in just {product.deliveryTime} days!
            </p>
          </div>

          <div className="mt-5 pt-3 text-sm leading-6 text-gray-500 border-t">
            <p>100% Original Product.</p>
            <p>Cash on Delivery is available on this product.</p>
            <p>Easy return and exchange policy within 7 days.</p>
          </div>
        </div>
      </div>

      <div className="description-review px-2 sm:px-6 md:px-12 lg:px-16">
        <Button variant={"default"} className="rounded-none">
          Description
        </Button>
        <Button variant={"outline"} className="rounded-none">
          Reviews ( 550 )
        </Button>
        <div className="border p-5 text-[.8rem] text-gray-700 dark:text-gray-300">
          <p>{product.description}</p>
        </div>
      </div>

      <div className="related-products px-2 sm:px-6 md:px-12 lg:px-16">
        <div className="products-for-you py-10">
          <h2 className="text-2xl sm:text-4xl pb-10">Related Products</h2>
          <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-4">
            {relatedProducts.length > 0 ? (
              relatedProducts.slice(0, 15).map((product) => (
                <ProductCard
                  key={product.id}
                  product={product}
                  onClick={() =>
                    goToProduct(product.subCategory, product.id, product)
                  }
                />
              ))
            ) : (
              <p className="text-sm text-nowrap text-gray-500">No Related products Available.</p>
            )}
          </div>
        </div>
      </div>
    </div >
  );
};

export default Product;
