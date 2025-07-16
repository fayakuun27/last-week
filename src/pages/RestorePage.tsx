import { useEffect, useState } from "react";
import { Button } from "@/components/ui/button";
import type { Products } from "@/types/product";

export default function RestorePage() {
  const [deletedProducts, setDeletedProducts] = useState<Products[]>([]);

  useEffect(() => {
    fetch("http://localhost:3000/products/deleted", {
      headers: {
        Authorization: `Bearer ${localStorage.getItem("token")}`,
      },
    })
      .then((res) => res.json())
      .then(setDeletedProducts)
      .catch(console.error);
  }, []);

  const restoreProduct = async (id: number) => {
    await fetch(`http://localhost:3000/products/${id}/restore`, {
      method: "PATCH",
      headers: {
        Authorization: `Bearer ${localStorage.getItem("token")}`,
      },
    });

    setDeletedProducts((prev) => prev.filter((p) => p.id !== id));
  };

  return (
    <div className="p-10 space-y-4">
      <h1 className="text-2xl font-bold">Deleted Products</h1>
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        {deletedProducts.map((product) => (
          <div key={product.id} className="border p-4 rounded shadow">
            <img
              src={`http://localhost:3000/uploadProduct/${product.imageUrl}`}
              className="h-32 object-cover w-full mb-2 rounded"
            />
            <h2 className="font-semibold">{product.name}</h2>
            <p>{product.description}</p>
            <p className="font-bold">${product.price}</p>
            <Button onClick={() => restoreProduct(product.id)}>Restore</Button>
          </div>
        ))}
      </div>
    </div>
  );
}
