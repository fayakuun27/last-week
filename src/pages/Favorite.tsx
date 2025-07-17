import { useCart } from "@/contexts/cart";
import QuantitySelector from "@/components/quantity-selector";
import { Loader2 } from "lucide-react";
import Swal from "sweetalert2";
import withReactContent from "sweetalert2-react-content";
import { Button } from "@/components/ui/button";
import axios from "axios";

const Favorite = () => {
  const { cart, removeFromCart, loading, updateCartQuantity } = useCart();
  const MySwal = withReactContent(Swal);

  const handleRemoveCart = async (productId: number) => {
    const result = await MySwal.fire({
      title: "Are you sure?",
      text: "Do you want to remove this item from your cart?",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#d33",
      cancelButtonColor: "#3085d6",
      confirmButtonText: "Yes, remove it!",
      cancelButtonText: "Cancel",
    });

    if (result.isConfirmed) {
      removeFromCart(productId);
      MySwal.fire({
        icon: "success",
        title: "Removed!",
        text: "Item has been removed from your cart.",
        timer: 1500,
        showConfirmButton: false,
      });
    }
  };

  const handleOrderProduct = async (
    productId: number,
    quantity: number = 1
  ) => {
    const token = localStorage.getItem("token");

    try {
      await axios.post(
        "http://localhost:3000/orders",
        { productId, quantity },
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );

      MySwal.fire({
        icon: "success",
        title: "Success!",
        text: "Your order has been placed.",
        timer: 2000,
        showConfirmButton: false,
      });

      removeFromCart(productId); // Optional: Remove dari cart setelah order
    } catch (err) {
      console.error("Order failed:", err);
      MySwal.fire({
        icon: "error",
        title: "Failed!",
        text: "Failed to place order.",
      });
    }
  };

  return (
    <>
      <h1 className="text-3xl font-bold text-center text-pink-600 mb-6 mt-10">
        Your Cart
      </h1>
      <div className="container mx-auto px-4 py-8">
        {loading && (
          <div className="text-center mb-8 animate-pulse">
            <p className="text-red-600 font-bold text-2xl flex items-center justify-center gap-2">
              <Loader2 className="w-6 h-6 animate-spin text-red-500" />
              Removing Item...
            </p>
            <p className="text-sm text-gray-500">
              Please wait while we update your cart.
            </p>
          </div>
        )}

        {cart.length === 0 ? (
          <p className="text-center text-gray-500 text-lg">
            No items in your favorites list.
          </p>
        ) : (
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
            {cart.map((item) => (
              <div
                key={item.id}
                className="flex flex-col justify-between border rounded-lg shadow-md p-4 bg-white hover:shadow-lg transition duration-300"
              >
                <img
                  src={`http://localhost:3000/uploadProduct/${encodeURIComponent(
                    item.imageUrl
                  )}`}
                  alt={item.name}
                  className="w-full h-48 object-cover rounded mb-3"
                />
                <h2 className="font-bold text-lg text-center mb-1">
                  {item.name}
                </h2>
                <QuantitySelector
                  productId={item.id}
                  quantity={item.quantity}
                  onQuantityChange={(qty) => updateCartQuantity(item.id, qty)}
                />
                <div className="mt-4 flex flex-col gap-2">
                  <Button
                    variant="destructive"
                    onClick={() => handleRemoveCart(item.id)}
                  >
                    Remove
                  </Button>
                  <Button
                    variant="default"
                    onClick={() =>
                      handleOrderProduct(item.id, item.quantity ?? 1)
                    }
                  >
                    Order Now
                  </Button>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </>
  );
};

export default Favorite;
