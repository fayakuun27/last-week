import { useState } from "react";
import Swal from "sweetalert2";
import axios from "axios";

interface OrderButtonProps {
  productId: number;
}

export function OrderButton({ productId }: OrderButtonProps) {
  const [quantity, setQuantity] = useState(1);
  const [loading, setLoading] = useState(false);

  const handleOrder = async () => {
    setLoading(true);

    try {
      const token = localStorage.getItem("token");

      const res = await axios.post(
        "http://localhost:3000/orders",
        { productId, quantity },
        {
          headers: { Authorization: `Bearer ${token}` },
        }
      );

      Swal.fire({
        icon: "success",
        title: "Order berhasil!",
        text: `Order ID: ${res.data.orderId}`,
      });
      // eslint-disable-next-line @typescript-eslint/no-explicit-any
    } catch (err: any) {
      Swal.fire({
        icon: "error",
        title: "Gagal order",
        text: err.response?.data.error || err.message,
      });
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="flex items-center gap-2">
      <input
        type="number"
        min={1}
        value={quantity}
        disabled={loading}
        onChange={(e) => setQuantity(Math.max(1, +e.target.value))}
        className="w-16 border rounded px-2 py-1"
      />
      <button
        onClick={handleOrder}
        disabled={loading}
        className="bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded"
      >
        {loading ? "Ordering..." : "Order Now"}
      </button>
    </div>
  );
}
