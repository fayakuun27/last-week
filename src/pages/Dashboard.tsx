import { useEffect, useState } from "react";
import { Button } from "@/components/ui/button";
import { Link } from "react-router-dom";
import type { Products } from "@/types/product";

export default function AdminDashboard() {
  const [products, setProducts] = useState<Products[]>([]);

  useEffect(() => {
    fetch("http://localhost:3000/products", {
      headers: {
        Authorization: `Bearer ${localStorage.getItem("token")}`,
      },
    })
      .then((res) => res.json())
      .then(setProducts)
      .catch(console.error);
  }, []);

  const softDelete = async (id: number) => {
    await fetch(`http://localhost:3000/products/${id}/delete`, {
      method: "PATCH",
      headers: { Authorization: `Bearer ${localStorage.getItem("token")}` },
    });

    setProducts((prev) =>
      prev.map((p) =>
        p.id === id ? { ...p, deletedAt: new Date().toISOString() } : p
      )
    );
  };

  const restore = async (id: number) => {
    await fetch(`http://localhost:3000/products/${id}/restore`, {
      method: "PATCH",
      headers: { Authorization: `Bearer ${localStorage.getItem("token")}` },
    });
    location.reload();
  };
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 6;
  const indexOfLastItem = currentPage * itemsPerPage;
  const indexOfFirstItem = indexOfLastItem - itemsPerPage;

  const totalPages = Math.ceil(products.length / itemsPerPage);
  const goToNextPage = () => {
    if (currentPage < totalPages) setCurrentPage(currentPage + 1);
  };

  const goToPrevPage = () => {
    if (currentPage > 1) setCurrentPage(currentPage - 1);
  };
  const currentProducts = products.slice(indexOfFirstItem, indexOfLastItem);

  return (
    <div className="p-10 space-y-4">
      <div className="flex justify-between">
        <h1 className="text-2xl font-bold">Admin Dashboard</h1>
        <Link to="/admin/create">
          <Button>Create Product</Button>
        </Link>
        <Link to="/admin/restore">
          <Button variant="outline">Restore Deleted</Button>
        </Link>
      </div>
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        {currentProducts.map((product) => (
          <div key={product.id} className="border p-4 rounded shadow">
            <img
              src={`http://localhost:3000/uploadProduct/${product.imageUrl}`}
              className="h-32 object-cover w-full mb-2 rounded"
            />
            <h2 className="font-semibold">{product.name}</h2>
            <p>{product.description}</p>
            <p className="font-bold">${product.price}</p>
            <div className="mt-2 flex gap-2 flex-wrap">
              <Link to={`/admin/update/${product.id}`}>
                <Button>Edit</Button>
              </Link>
              {!product.deletedAt ? (
                <Button
                  variant="destructive"
                  onClick={() => softDelete(product.id)}
                >
                  Delete
                </Button>
              ) : (
                <Button onClick={() => restore(product.id)}>Restore</Button>
              )}
            </div>
          </div>
        ))}
      </div>
      <div className="flex justify-center items-center gap-4 mt-6">
        <button
          onClick={goToPrevPage}
          disabled={currentPage === 1}
          className="px-4 py-2 bg-gray-200 rounded disabled:opacity-50"
        >
          Prev
        </button>

        <span className="text-lg font-medium">
          Page {currentPage} of {totalPages}
        </span>

        <button
          onClick={goToNextPage}
          disabled={currentPage === totalPages}
          className="px-4 py-2 bg-gray-200 rounded disabled:opacity-50"
        >
          Next
        </button>
      </div>
    </div>
  );
}
