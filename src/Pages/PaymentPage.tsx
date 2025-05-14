import { Card, CardContent } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { Button } from "@/components/ui/button";
import { useNavigate } from "react-router-dom";
import { useOrders } from "@/context/OrdersContext";
import { useState } from "react";
import { toast } from "sonner";
import { ArrowRight } from "lucide-react";

export default function PaymentPage() {
    const [paymentMode, setPaymentMode] = useState('card')
    const navigate = useNavigate();
    const { handleOrders } = useOrders();
    const [cartForm, setCartForm] = useState({
        name: "",
        cardNumber: 0,
        cardDate: "",
        cardCVV: 0
    })

    return (

        <>
            <div className="flex items-center gap-2 text-sm text-gray-600 px-2 sm:px-6 md:px-12 lg:px-16 pt-6">
                <span>CART</span>
                <ArrowRight size={16} />
                <span>ADDRESS</span>
                <ArrowRight size={16} />
                <span className="text-orange-500 font-semibold border-b-2 border-orange-600">PAYMENT</span>
            </div>

            <div className="max-w-3xl mx-auto md:mt-6 mt-14 px-4">

                <Card className="mb-6 border rounded-[5px] bg-white dark:bg-[#1c1917] shadow-sm">
                    <h2 className="text-2xl font-semibold mb-6 text-center">Payment Details</h2>
                    <CardContent className="space-y-4 p-6">
                        <div>
                            <Label className="pb-3" htmlFor="cardName">Cardholder Name</Label>
                            <Input
                                id="cardName"
                                type="text"
                                placeholder="Enter full name on card"
                                className="rounded-[5px] placeholder:text-gray-500"
                                onChange={(e) => setCartForm({ ...cartForm, name: e.target.value })}
                            />
                        </div>

                        <div>
                            <Label className="pb-3" htmlFor="cardNumber">Card Number</Label>
                            <Input
                                id="cardNumber"
                                type="number"
                                placeholder="1234 5678 9012 3456"
                                className="rounded-[5px] placeholder:text-gray-500"
                                onChange={(e) => setCartForm({ ...cartForm, cardNumber: Number(e.target.value) })}
                            />
                        </div>

                        <div className="grid grid-cols-2 gap-4">
                            <div>
                                <Label className="pb-3" htmlFor="expiry">Expiry Date</Label>
                                <Input
                                    id="expiry"
                                    type="text"
                                    placeholder="MM/YY"
                                    className="rounded-[5px] placeholder:text-gray-500"
                                    onChange={(e) => setCartForm({ ...cartForm, cardDate: e.target.value })}
                                />
                            </div>
                            <div>
                                <Label className="pb-3" htmlFor="cvv">CVV</Label>
                                <Input
                                    id="cvv"
                                    type="number"
                                    placeholder="***"
                                    className="rounded-[5px] placeholder:text-gray-500"
                                    onChange={(e) => setCartForm({ ...cartForm, cardCVV: Number(e.target.value) })}
                                />
                            </div>
                        </div>

                        <h3 className="font-semibold text-lg pt-2">Select Payment Method</h3>
                        <RadioGroup defaultValue="card"
                            onValueChange={(value) => setPaymentMode(value)}
                            className="space-y-2">
                            <div className="flex items-center space-x-2">
                                <RadioGroupItem value="card" id="card" />
                                <Label className="" htmlFor="card">Credit/Debit Card</Label>
                            </div>
                            <div className="flex items-center space-x-2">
                                <RadioGroupItem value="upi" id="upi" />
                                <Label className="" htmlFor="upi">UPI</Label>
                            </div>
                            <div className="flex items-center space-x-2">
                                <RadioGroupItem value="Cash on Delivery" id="cod" />
                                <Label className="" htmlFor="cod">Cash on Delivery</Label>
                            </div>
                        </RadioGroup>

                        <div className="flex justify-center w-full gap-3">
                            <Button
                                onClick={() => {
                                    if ((cartForm.name && cartForm.cardDate && cartForm.cardNumber) || !(paymentMode === 'card')) {
                                        handleOrders(paymentMode);
                                        navigate("/orders");
                                    } else {
                                        toast.warning("Please Fill the Payment Form");
                                    }
                                }}
                                className="w-fit mt-4 bg-orange-500 hover:bg-orange-400 text-white rounded-[5px]"
                            >
                                Place Order
                            </Button>
                            <Button onClick={() => navigate(-1)} className="w-fit mt-4 bg-red-500 hover:bg-red-400 text-white rounded-[5px]">
                                Go to Address Page
                            </Button>
                        </div>

                    </CardContent>
                </Card>
            </div>
        </>
    );
}
