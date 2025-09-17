import { Button } from "@/components/ui/button";
import { Card, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { useBuyNow } from "@/context/BuyNowContext";
import { useCart } from "@/context/CartContext";
import { ArrowRight, Minus, Plus } from "lucide-react";
import { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { toast } from "sonner";

const Cart = () => {

  const { setBuyItems } = useBuyNow();
  const navigate = useNavigate();

  const {
    cartItems,
    removeFromCart,
    numberOfItemsIncreaseByOne,
    numberOfItemsDecreaseByOne,
    subtotal,
    totalItems,
    isOutOfStockPresent
  } = useCart();

  useEffect(() => {
    window.scrollTo({ top: 0, behavior: "smooth" });
  }, []);

  return (
    <div className=" px-2 sm:px-6 md:px-12 lg:px-16 py-6">
      <div className="flex items-center gap-2 text-sm text-gray-600">
        <span className="text-orange-500 font-semibold border-b-2 border-orange-600">CART</span>
        <ArrowRight size={16} />
        <span>ADDRESS</span>
        <ArrowRight size={16} />
        <span>PAYMENT</span>
      </div>

      {cartItems.length ? (
        <div className="flex flex-col lg:flex-row gap-8 mt-6">
          <div className="flex-1">
            {cartItems.map((item) => (
              <Card key={`${item.id}-${item.sizes[0]}`} className="p-4 mb-4 rounded-[5px] shadow-none">
                <div className="flex flex-col sm:flex-row gap-4">
                  <img
                    src={item.images[0]}
                    alt={item.name}
                    className="w-[100%] h-72 sm:h-36 sm:w-36 object-cover rounded-[5px] self-center"
                  />
                  <div className="flex-1 space-y-2">
                    <CardTitle className="text-white bg-orange-500 text-sm font-bold w-fit px-2 py-1 rounded-[5px]">
                      {item.brand}
                    </CardTitle>
                    <h3 className="text-lg font-medium line-clamp-2">{item.name}</h3>
                    <div className="text-sm text-gray-600 flex flex-wrap gap-2">
                      <span>Size: {item.sizes} | </span>
                      <span className={item.inStock ? "text-green-600" : "text-red-500"}>{item.inStock ? "In Stock" : "Out of Stock"}</span>
                    </div>
                    <div className="flex items-center gap-2 mt-2">
                      {(item.numberOfItems ?? 0) > 1 ? (
                        <Button
                          onClick={() => numberOfItemsDecreaseByOne(item.id, item.sizes[0])}
                          size="sm"
                          variant="outline"
                          className="rounded-[5px]"
                        >
                          <Minus size={16} />
                        </Button>
                      ) : (
                        <Button
                          onClick={() => removeFromCart(item.id, item.sizes[0])}
                          size="sm"
                          variant="outline"
                          className="text-red-500 hover:text-red-600 hover:bg-red-50 rounded-[5px]"
                        >
                          Remove
                        </Button>
                      )}
                      <span className="w-8 text-center">{item.numberOfItems}</span>
                      <Button
                        onClick={() => numberOfItemsIncreaseByOne(item.id, item.sizes[0])}
                        size="sm"
                        variant="outline"
                        className="rounded-[5px]"
                      >
                        <Plus size={16} />
                      </Button>
                    </div>
                  </div>
                  <div className="flex sm:flex-col items-center sm:items-end justify-between gap-3 text-right">
                    <span className="text-xs text-gray-500 bg-gray-100 rounded px-2 py-1">Free Delivery</span>
                    <div className="text-lg font-semibold">
                      ₹{item.price * (item.numberOfItems ?? 1)}
                    </div>
                    <Button
                      onClick={() => removeFromCart(item.id, item.sizes[0])}
                      variant="outline"
                      className="text-red-500 hover:text-red-600 hover:bg-red-50 text-sm rounded-[5px]"
                    >
                      Remove
                    </Button>
                  </div>
                </div>
              </Card>
            ))}
          </div>

          <div className="w-full lg:w-[35%]">
            <Card className="rounded-[5px] shadow-none">
              <CardHeader>
                <h2 className="text-xl font-semibold">Order Summary</h2>
                <CardDescription>Review your order before checkout.</CardDescription>
                <hr />
              </CardHeader>
              <div className="px-6 space-y-4 pt-3">
                <div className="flex justify-between text-sm">
                  <p>Items</p>
                  <span>{totalItems}</span>
                </div>
                <div className="flex justify-between text-sm">
                  <p>Subtotal</p>
                  <span>₹{subtotal}</span>
                </div>
                <div className="flex justify-between text-sm">
                  <p>Shipping</p>
                  <span className="text-green-600">Free</span>
                </div>
                <div className="flex justify-between text-sm">
                  <p>Tax</p>
                  <span>Included</span>
                </div>
                <hr />
                <div className="flex justify-between font-semibold text-lg">
                  <p>Total</p>
                  <span>₹{subtotal}</span>
                </div>
                <Button
                  onClick={() => {
                    if (isOutOfStockPresent) {
                      toast.warning("You can't order out-of-stock product.");
                    } else {
                      navigate("/addresspage");
                      setBuyItems(cartItems);
                    }
                  }}
                  className="w-full py-6 bg-orange-500 hover:bg-orange-400 text-white text-lg rounded-[5px]"
                >
                  Proceed to Checkout
                </Button>
              </div>
            </Card>
          </div>
        </div>
      ) : (
        <div className="flex flex-col items-center justify-center h-[60vh] text-center">
          <div className="text-[4rem]">🛍️</div>
          <h2 className="text-xl font-semibold mt-2">Your cart is empty!</h2>
          <p className="text-gray-500 text-sm mt-1">Add items to get started with your order.</p>
        </div>
      )}
    </div>
  );
};

export default Cart;
