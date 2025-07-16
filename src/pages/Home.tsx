import { getProductList } from "@/hooks/useProduct";
import { useState, useEffect } from "react";
import type { Products } from "@/types/product";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogTrigger,
} from "@/components/ui/dialog";
import { useAuth } from "@/contexts/auth";
import { useCart } from "@/contexts/cart";
import Swal from "sweetalert2";
import withReactContent from "sweetalert2-react-content";

const Home = () => {
  const [productList, setProductList] = useState<Products[]>([]);
  const [loadingPage, setLoading] = useState(true);

  const MySwal = withReactContent(Swal);

  const { addToCart } = useCart();
  const { token, user } = useAuth();
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 8;
  const indexOfLastItem = currentPage * itemsPerPage;
  const indexOfFirstItem = indexOfLastItem - itemsPerPage;

  const totalPages = Math.ceil(productList.length / itemsPerPage);
  const goToNextPage = () => {
    if (currentPage < totalPages) setCurrentPage(currentPage + 1);
  };

  const goToPrevPage = () => {
    if (currentPage > 1) setCurrentPage(currentPage - 1);
  };
  useEffect(() => {
    getProductList()
      .then(setProductList)
      .catch(console.error)
      .finally(() => setLoading(false));
  }, []);

  const currentProducts = productList.slice(indexOfFirstItem, indexOfLastItem);

  return (
    <>
      <div className="p-20 text-center">
        <h1 className="text-2xl font-bold mb-6">Trend All Times Product</h1>

        {!loadingPage ? (
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
            {currentProducts.map((product) => (
              <div
                key={product.id}
                className="border rounded-lg p-3 hover:shadow-md transition"
              >
                <img
                  src={`http://localhost:3000/uploadProduct/${encodeURIComponent(
                    product.imageUrl
                  )}`}
                  alt={product.name}
                  className="w-full h-48 object-cover rounded"
                />
                <h2 className="mt-2 font-semibold text-center">
                  {product.name}
                </h2>
                <Dialog>
                  <DialogTrigger className="mt-2 w-full text-center">
                    <button className="mt-3 w-full cursor-pointer justify-center flex gap-2 px-4 py-2 bg-green-400 text-white font-medium rounded-md hover:bg-green-700 transition duration-200 shadow-md">
                      Open
                    </button>
                  </DialogTrigger>
                  <DialogContent>
                    <DialogDescription className="text-center">
                      <p className="text-semibold text-black p-6">
                        {product.description}
                      </p>
                      <p className="text-bold text-2xl text-black p-6">
                        ${product.price}
                      </p>
                    </DialogDescription>
                  </DialogContent>
                </Dialog>
                {token && user?.role == "USER" && (
                  <div>
                    <button
                      className="mt-3 cursor-pointer gap-2 py-3 w-full bg-red-500 text-white font-medium rounded-md hover:bg-pink-700 transition duration-200 shadow-md"
                      onClick={() => {
                        addToCart(product);
                        MySwal.fire({
                          icon: "success",
                          title: "Added To Cart!",
                          text: `${product.name} has been added.`,
                          timer: 1500,
                          showConfirmButton: false,
                          toast: true,
                          position: "top-end",
                        });
                      }}
                    >
                      Add to Cart
                    </button>
                  </div>
                )}
              </div>
            ))}
          </div>
        ) : (
          <p>Loading...</p>
        )}
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
    </>
  );
};

export default Home;
