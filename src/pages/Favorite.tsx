import { useCart } from "@/contexts/cart";
import QuantitySelector from "@/components/quantity-selector";
import { Loader2 } from "lucide-react";
import Swal from "sweetalert2";
import withReactContent from "sweetalert2-react-content";
import { Button } from "@/components/ui/button";
import axios from "axios";
import { useNavigate } from "react-router-dom";

const Favorite = () => {
  const { cart, removeFromCart, loading, clearCart } = useCart();
  const MySwal = withReactContent(Swal);
  const navigate = useNavigate();
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
  const handlePlaceOrder = async () => {
    const token = localStorage.getItem("token");
    const items = cart.map((item) => ({
      productId: item.id,
      quantity: item.quantity ?? 1,
    }));

    console.log(items);

    try {
      await axios.post(
        "http://localhost:3000/orders",
        { items },
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );
      alert("Order berhasil!");
      clearCart(); // kosongkan cart
      navigate("/my-orders"); // arahkan ke halaman My Orders
    } catch (err) {
      console.error("Gagal order:", err);
      alert("Gagal membuat order");
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
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
            {cart.map((item) => (
              <div
                key={item.id}
                className="items-center justify-center border rounded-lg shadow-md p-4 bg-white hover:shadow-lg transition duration-300"
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
                <QuantitySelector productId={item.id} />
                <button
                  onClick={() => handleRemoveCart(item.id)}
                  className="mt-5 w-full bg-red-500 text-white py-2 rounded hover:bg-red-600 transition"
                >
                  Remove
                </button>
              </div>
            ))}
          </div>
        )}
      </div>
      <div className="flex justify-end mt-4">
        <Button onClick={handlePlaceOrder} disabled={cart.length === 0}>
          Place Order
        </Button>
      </div>
    </>
  );
};

export default Favorite;
