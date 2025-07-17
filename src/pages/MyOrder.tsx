import { useEffect, useState } from "react";
import axios from "axios";

interface Product {
  id: number;
  name: string;
  price: number;
}

interface Order {
  id: number;
  createdAt: string;
  quantity: number;
  product: Product;
}

export default function MyOrdersPage() {
  const [orders, setOrders] = useState<Order[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchOrders = async () => {
      try {
        const token = localStorage.getItem("token");
        const res = await axios.get("http://localhost:3000/orders/my", {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });

        console.log("Fetched orders:", res.data);
        setOrders(Array.isArray(res.data) ? res.data : []);
      } catch (err) {
        console.error("Gagal mengambil data order:", err);
        setOrders([]);
      } finally {
        setLoading(false);
      }
    };

    fetchOrders();
  }, []);

  if (loading) return <div className="text-center mt-10">Loading...</div>;

  return (
    <div className="max-w-4xl mx-auto px-4 py-6 space-y-6">
      <h1 className="text-3xl font-bold text-center text-blue-600 mb-6">
        🧾 My Orders
      </h1>

      {orders.length === 0 ? (
        <p className="text-center text-gray-500">Kamu belum memiliki order.</p>
      ) : (
        orders.map((order) => {
          const total = order.product.price * order.quantity;

          return (
            <div
              key={order.id}
              className="border border-gray-300 p-6 rounded-lg shadow-md bg-white"
            >
              <div className="flex justify-between items-center mb-2">
                <h2 className="font-semibold text-lg text-gray-800">
                  Order #{order.id}
                </h2>
                <span className="text-sm text-gray-500">
                  {new Date(order.createdAt).toLocaleString("id-ID")}
                </span>
              </div>

              <div className="text-gray-800">
                {order.product.name} × {order.quantity}
              </div>
              <div className="text-sm text-gray-500 mb-1">
                Harga satuan: {order.product.price.toLocaleString("id-ID")} IDR
              </div>

              <div className="mt-2 font-bold text-right text-blue-700">
                Total: {total.toLocaleString("id-ID")} IDR
              </div>
            </div>
          );
        })
      )}
    </div>
  );
}
