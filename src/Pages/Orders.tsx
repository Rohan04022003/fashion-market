import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { useOrders } from "@/context/OrdersContext";
import {
    AlertDialog,
    AlertDialogAction,
    AlertDialogCancel,
    AlertDialogContent,
    AlertDialogDescription,
    AlertDialogFooter,
    AlertDialogHeader,
    AlertDialogTitle,
    AlertDialogTrigger,
} from "@/components/ui/alert-dialog"


export default function OrderPage() {
    const { Orders, CancelOrder } = useOrders();

    if (!Orders.length) {
        return <div className="h-[75vh] flex justify-center items-center flex-col gap-3"><span className="text-6xl">📦</span><span className="text-lg text-gray-500">No orders found.</span></div>;
    }

    return (
        <div className="px-2 sm:px-6 md:px-12 lg:px-16 mt-5">
            <h2 className="text-2xl font-bold mb-6">Your Orders</h2>

            {Orders.map((order) => (
                <Card key={order.orderDetails.orderId} className="border-[1px] rounded-[5px] mb-5 shadow-none">
                    <div className="space-y-4 lg:px-6 px-2">
                        {/* Order Summary */}
                        <div className="flex lg:flex-row flex-col justify-between lg:items-center flex-wrap gap-2">
                            <div className="space-y-2">
                                <p className="font-medium">Order ID: <span className="text-muted-foreground">{order.orderDetails.orderId}</span></p>
                                <p className="text-sm text-muted-foreground">Date: {order.orderDetails.orderDate}</p>
                                <p className="text-sm text-muted-foreground">Status: <span className="text-orange-500">{order.orderDetails.status}</span></p>
                                <p className="text-sm text-muted-foreground">Total Payable Amount: <span className="text-primary font-semibold">₹{order.orderDetails.totalPayableAmount}</span></p>
                            </div>
                            <div className="lg:text-right text-left space-y-2">
                                <p className="text-sm font-medium flex items-center lg:justify-end justify-start text-green-600"><span className="text-2xl">📦</span> Delivery in {order.orderDetails.deliveryTime} Days</p>
                                <p className="text-sm">Payment: <span className="text-primary font-semibold">{order.orderDetails.paymentMethod}</span></p>
                                <div className="flex items-center gap-2">
                                    <Button className="bg-blue-500 text-white hover:bg-blue-400 text-[.7rem] rounded-[5px]" size={"sm"}>Order Track</Button>
                                    <Button className="bg-orange-500 text-white hover:bg-orange-400 text-[.7rem] rounded-[5px]" size={"sm"}>Invoice</Button>
                                    <AlertDialog>
                                        <AlertDialogTrigger asChild><Button className="bg-red-500 text-white hover:bg-red-400 text-[.7rem] rounded-[5px]" size={"sm"}>Cancel Order</Button></AlertDialogTrigger>
                                        <AlertDialogContent>
                                            <AlertDialogHeader>
                                                <AlertDialogTitle>Cancel Order?</AlertDialogTitle>
                                                <AlertDialogDescription>
                                                    Are you sure you want to cancel this order? This action is permanent and cannot be undone.
                                                </AlertDialogDescription>
                                            </AlertDialogHeader>
                                            <AlertDialogFooter>
                                                <AlertDialogCancel className="rounded-[5px] text-orange-500 hover:text-orange-600">Cancel</AlertDialogCancel>
                                                <AlertDialogAction onClick={() => CancelOrder(order.orderDetails.orderId, order.orderDetails.totalPayableAmount, order.orderDetails.paymentMethod)} className="bg-red-500 text-white hover:bg-red-400 rounded-[5px]">Continue</AlertDialogAction>
                                            </AlertDialogFooter>
                                        </AlertDialogContent>
                                    </AlertDialog>

                                </div>
                            </div>
                        </div>

                        {/* Shipping Address */}
                        <div className="border rounded-[5px] p-4 text-sm">
                            <p className="font-semibold mb-1">Shipping Address</p>
                            <p>{order.orderAddress.name}, {order.orderAddress.street}</p>
                            <p>{order.orderAddress.city}, {order.orderAddress.pincode}</p>
                        </div>

                        {/* Products */}
                        <div className="grid lg:grid-cols-2 grid-cols-1 gap-4">
                            {order.products.map((product) => (
                                <div key={product.id} className="flex gap-4 border md:p-4 p-2 rounded-[5px]">
                                    <img src={product.images[0]} alt={product.name} className="w-20 h-20 object-cover rounded-[5px]" />
                                    <div className="flex-1">
                                        <p className="font-medium">{product.name.slice(0, 40)}...</p>
                                        <p className="text-sm text-muted-foreground">{product.brand} • {product.category}</p>
                                        <p className="text-sm">Quantity: {product.numberOfItems}</p>
                                    </div>
                                    <div className="text-right">
                                        <p className="font-medium">₹{product.price}</p>
                                        {product.discount > 0 && (
                                            <p className="text-sm text-green-600">-{product.discount}% off</p>
                                        )}
                                    </div>
                                </div>
                            ))}
                        </div>
                    </div>
                </Card>
            ))}
        </div>
    );
}
