import { useEffect, useState } from "react";
import axios from "axios";

interface OrderItem {
  id: number;
  quantity: number;
  product: {
    id: number;
    name: string;
    price: number;
  };
}

interface Order {
  id: number;
  createdAt: string;
  orderItems: OrderItem[];
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

        if (res) {
          setOrders(res.data);
        }
      } catch (err) {
        console.error("Gagal mengambil data order:", err);
      } finally {
        setLoading(false);
      }
    };

    fetchOrders(); // ⬅️ INI YANG KURANG DIPANGGIL
  }, []);

  if (loading) return <div className="text-center mt-10">Loading...</div>;

  return (
    <div className="max-w-3xl mx-auto p-6 space-y-6">
      <h1 className="text-2xl font-bold mb-4">🧾 My Orders</h1>

      {orders.length === 0 ? (
        <p className="text-gray-500">Kamu belum memiliki order.</p>
      ) : (
        orders.map((order) => (
          <div key={order.id} className="border p-4 rounded-md shadow">
            <div className="font-semibold text-lg">Order #{order.id}</div>
            <div className="text-sm text-gray-500 mb-2">
              {new Date(order.createdAt).toLocaleString()}
            </div>
            <ul className="list-disc ml-6 space-y-1">
              {order.orderItems?.map((item) => (
                <li key={item.id}>
                  {item.product.name} × {item.quantity} (
                  {item.product.price.toLocaleString("id-ID")} IDR)
                </li>
              ))}
            </ul>
          </div>
        ))
      )}
    </div>
  );
}
