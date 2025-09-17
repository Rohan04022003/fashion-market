import { Card, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { FaStar } from "react-icons/fa";
import { Button } from "@/components/ui/button";
import { ShoppingCart } from "lucide-react";
import { getRatingStyles } from "@/utils/getRatingStyles";
import { tagStyles } from "@/utils/tagStyles";
import { ProductCardProps } from "@/types/types";
import {
  Dialog,
  DialogTrigger,
  DialogContent,
  DialogTitle,
  DialogDescription,
  DialogHeader,
} from "@/components/ui/dialog";
import { useState } from "react";
import { useCart } from "@/context/CartContext";

const ProductCard = ({ product, onClick }: ProductCardProps) => {
  const { backgroundColor, textColor } = getRatingStyles(product.rating);
  const tagCSS = tagStyles;

  const { addToCart } = useCart(); 
  const [productSize, setProductSize] = useState(product.sizes[0]);
  const [productQuantity, setProductQuantity] = useState(1);
  const [dialogOpen, setDialogOpen] = useState(false)

  const handleAddToCart = () => {
    addToCart(product, productSize, productQuantity);
  };

  return (
    <Card
      onClick={onClick}
      className="p-0 overflow-hidden rounded-[5px] shadow-none cursor-pointer"
    >
      <div className="product-image h-60 w-full relative">
        <img
          src={product.images[0]}
          alt={product.name}
          className="h-full w-full object-contain bg-[#fff]"
        />
        <div className="brand-name absolute right-0 top-0 px-2 py-[.1rem] bg-orange-700">
          <p className="text-[.6rem] text-white">{product.brand}</p>
        </div>
        <div
          className={`ratings absolute bottom-0 right-0 w-12 h-6 ${backgroundColor} z-10 flex justify-center items-center`}
        >
          <p
            className={`text-[.8rem] font-semibold ${textColor} flex items-center gap-[.2rem]`}
          >
            {product.rating} <FaStar size={8} />
          </p>
        </div>
      </div>

      <CardHeader className="p-2 py-2 border-t">
        <div className="w-full flex items-center justify-between pb-1">
          <p
            className={`text-[.6rem] px-2 py-[.2rem] font-semibold rounded-[4px] ${
              product.inStock ? "bg-green-50 text-green-800" : "bg-red-50 text-red-800"
            }`}
          >
            {product.inStock ? "In Stock" : "Out Of Stock"}
          </p>
          <p
            className={`text-[.6rem] px-2 py-[.2rem] font-semibold rounded-[4px] ${tagCSS[product.tags.toLowerCase()]}`}
          >
            {product.tags}
          </p>
        </div>

        <CardDescription className="font-normal dark:text-white text-black">
          {product.name.slice(0, 15) + (product.name.length >= 15 ? "..." : "")}
        </CardDescription>

        <div className="flex items-center justify-between gap-3">
          <div className="price-div flex items-center gap-3">
            <CardTitle className="font-semibold text-md relative">
              ₹{product.price}
            </CardTitle>
            <p className="lg:block hidden text-[.7rem] px-2 py-[.1rem] rounded-full bg-gray-50 font-normal text-gray-800">
              Free Delivery
            </p>
          </div>

          {/* Dialog for selecting size/quantity */}
          <Dialog open={dialogOpen} onOpenChange={setDialogOpen}>
            <DialogTrigger asChild>
              <Button
                onClick={(e) => e.stopPropagation()}
                variant={"outline"}
                size={"sm"}
                title={`Add ${product.name} in Your Cart`}
                className="rounded-[5px]"
              >
                <ShoppingCart color="orange" />
              </Button>
            </DialogTrigger>

            <DialogContent onClick={(e) => e.stopPropagation()}>
              <DialogHeader>
                <DialogTitle>Select Size and Quantity</DialogTitle>
                <DialogDescription>
                  Choose size and quantity before adding the product to your cart.
                </DialogDescription>
              </DialogHeader>
              <hr />
              <div>
                {/* Size Options */}
                <div>
                  <h2 className="block text-md font-medium pb-3 text-wrap">Size</h2>
                  {product.sizes.map((size) => (
                    <Button
                      onClick={() => setProductSize(size)}
                      key={size}
                      variant={"secondary"}
                      size={"sm"}
                      className={`rounded-[5px] mr-3 ${
                        productSize === size ? "border border-orange-500" : ""
                      }`}
                    >
                      {size}
                    </Button>
                  ))}
                </div>

                {/* Quantity Options */}
                <div className="mt-4">
                  <h2 className="block text-md font-medium pb-3">Quantity</h2>
                  <div className="flex items-center gap-3 flex-wrap">
                    {Array.from({ length: 9 }, (_, i) => (
                      <Button
                        onClick={() => setProductQuantity(i + 1)}
                        key={i + 1}
                        variant={"secondary"}
                        className={`rounded-[5px] ${
                          productQuantity === i + 1 ? "border-orange-500 border" : ""
                        }`}
                      >
                        {i + 1}
                      </Button>
                    ))}
                  </div>
                </div>

                {/* Add To Cart Button */}
                <div className="mt-6 flex items-center justify-center">
                  <Button
                    onClick={() => {handleAddToCart(); setDialogOpen(!dialogOpen);}}
                    className="w-[50%] rounded-[5px] bg-orange-500 text-white hover:text-white hover:bg-orange-400"
                  >
                    Add To Cart
                  </Button>
                </div>
              </div>
            </DialogContent>
          </Dialog>
        </div>
      </CardHeader>
    </Card>
  );
};

export default ProductCard;
