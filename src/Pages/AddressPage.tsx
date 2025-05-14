import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { Card, CardHeader, CardDescription } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { ArrowRight } from "lucide-react";
import { toast } from "sonner";
import { useAddress } from "@/context/AddressContext";
import { useBuyNow } from "@/context/BuyNowContext";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";

const AddressPage = () => {
  const navigate = useNavigate();
  const { BuyTotalItems, buySubtotal } = useBuyNow();
  const {
    addresses,
    selectedId,
    setSelectedId,
    addAddress,
    deleteAddress,
  } = useAddress();

  const [showForm, setShowForm] = useState(false);
  const [newAddress, setNewAddress] = useState({
    id: 0,
    name: "",
    street: "",
    city: "",
    pincode: "",
  });

  const handleAddAddress = () => {
    if (
      newAddress.name &&
      newAddress.street &&
      newAddress.city &&
      newAddress.pincode
    ) {
      addAddress(newAddress);
      setNewAddress({ id: 0, name: "", street: "", city: "", pincode: "" });
      setShowForm(false);
    } else {
      toast.warning("Please fill out all fields.");
    }
  };

  const handleProceed = () => {
    if (BuyTotalItems) {
      if (selectedId !== null) {
        navigate("/paymentpage");
      } else {
        toast.warning("Please select your address to proceed.");
      }
    } else {
      toast.warning("There is no item in your cart.");
    }
  };

  return (
    <>
      <div className="flex items-center gap-2 text-sm text-gray-600 px-2 sm:px-6 md:px-12 lg:px-16 pt-6">
        <span>CART</span>
        <ArrowRight size={16} />
        <span className="text-orange-500 font-semibold border-b-2 border-orange-600">ADDRESS</span>
        <ArrowRight size={16} />
        <span>PAYMENT</span>
      </div>

      <div className="mx-auto px-2 sm:px-6 md:px-12 lg:px-16 py-8 flex flex-col lg:flex-row gap-6">
        {/* Left Section */}
        <div className="w-full lg:w-[65%]">
          {/* Address List */}
          <RadioGroup
            value={selectedId?.toString() || ""}
            onValueChange={(value) => setSelectedId(Number(value))}
            className="grid lg:grid-cols-2 grid-cols-1 gap-4"
          >
            {addresses.map((addr) => (
              <Card key={addr.id} className={`p-4 border rounded-[5px] shadow-none`}>
                <label className="flex items-start gap-3 cursor-pointer" htmlFor={`address-${addr.id}`}>
                  <RadioGroupItem
                    value={addr.id.toString()}
                    id={`address-${addr.id}`}
                    className="mt-1"
                  />
                  <div className="flex-1">
                    <p className="font-semibold">{addr.name}</p>
                    <p>{addr.street}, {addr.city} - {addr.pincode}</p>
                  </div>
                  <Button
                    variant="destructive"
                    size="sm"
                    className="rounded-[5px]"
                    onClick={() => deleteAddress(addr.id)}
                  >
                    Delete
                  </Button>
                </label>
              </Card>
            ))}
          </RadioGroup>

          <div className="mt-6">
            <Button
              className={`bg-orange-500 hover:bg-orange-400 text-white rounded-[5px] shadow-none ${showForm ? 'hidden': ''}`}
              onClick={() => setShowForm(true)}
            >
              Add Address
            </Button>
          </div>

          {/* Add Address Form */}
          {showForm && (
            <div className="mt-6">
              <h3 className="text-xl font-medium mb-4">Add New Address</h3>
              <div className="grid gap-4 md:grid-cols-2">
                <Input
                  placeholder="Name"
                  value={newAddress.name}
                  onChange={(e) => setNewAddress({ ...newAddress, name: e.target.value })}
                  className="rounded-[5px]"
                />
                <Input
                  placeholder="Street"
                  value={newAddress.street}
                  onChange={(e) => setNewAddress({ ...newAddress, street: e.target.value })}
                  className="rounded-[5px]"
                />
                <Input
                  placeholder="City"
                  value={newAddress.city}
                  onChange={(e) => setNewAddress({ ...newAddress, city: e.target.value })}
                  className="rounded-[5px]"
                />
                <Input
                  placeholder="Pincode"
                  value={newAddress.pincode}
                  onChange={(e) => setNewAddress({ ...newAddress, pincode: e.target.value })}
                  className="rounded-[5px]"
                />
              </div>
              <Button
                className="mt-4 rounded-[5px] shadow-none text-white hover:bg-green-700 bg-green-800"
                onClick={handleAddAddress}
              >
                Save Address
              </Button>
              <Button
                onClick={() => setShowForm(false)}
                className="mt-4 rounded-[5px] shadow-none text-white bg-orange-500 hover:bg-orange-400 ml-3"
              >
                Cancel
              </Button>
            </div>
          )}
        </div>

        {/* Right Section - Order Summary */}
        <div className={`w-full lg:w-[35%] ${BuyTotalItems ? "": "hidden"}`}>
          <Card className="rounded-[5px] shadow-none">
            <CardHeader>
              <h2 className="text-xl font-semibold">Order Summary</h2>
              <CardDescription>Review your order before checkout.</CardDescription>
              <hr />
            </CardHeader>
            <div className="px-6 space-y-4 pt-3">
              <div className="flex justify-between text-sm">
                <p>Items</p>
                <span>{BuyTotalItems}</span>
              </div>
              <div className="flex justify-between text-sm">
                <p>Subtotal</p>
                <span>₹{buySubtotal}</span>
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
                <span>₹{buySubtotal}</span>
              </div>
              <div className="mt-8">
                <Button
                  className="w-full py-6 bg-orange-500 hover:bg-orange-400 text-white text-lg rounded-[5px] shadow-none"
                  onClick={handleProceed}
                >
                  Proceed to Payment
                </Button>
              </div>
            </div>
          </Card>
        </div>
      </div>
    </>
  );
};

export default AddressPage;
