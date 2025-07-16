// pages/UpdateProductPage.tsx
import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import axios from "axios";
import ProductForm from "@/components/ProductForm";

export default function UpdateProductPage() {
  const navigate = useNavigate();
  const { productId } = useParams();
  const [form, setForm] = useState({
    name: "",
    description: "",
    price: "",
    image: null as File | null,
  });

  useEffect(() => {
    if (productId) {
      axios
        .get(`http://localhost:3000/products/${productId}`, {
          headers: {
            Authorization: `Bearer ${localStorage.getItem("token")}`,
          },
        })
        .then((res) => {
          const { name, description, price } = res.data;
          setForm({ name, description, price: String(price), image: null });
        })
        .catch((err) => {
          console.error("Gagal ambil data produk:", err);
        });
    }
  }, [productId]);

  const handleChange = (field: string, value: string | File | null) => {
    setForm((prev) => ({ ...prev, [field]: value }));
  };

  const handleSubmit = async () => {
    const formData = new FormData();
    formData.append("name", form.name);
    formData.append("description", form.description);
    formData.append("price", form.price);
    if (form.image) formData.append("image", form.image);

    try {
      await axios.put(`http://localhost:3000/products/${productId}`, formData, {
        headers: {
          Authorization: `Bearer ${localStorage.getItem("token")}`,
          "Content-Type": "multipart/form-data",
        },
      });

      navigate("/admin");
    } catch (error) {
      console.error("Gagal update produk:", error);
    }
  };

  return (
    <ProductForm
      form={form}
      onChange={handleChange}
      onSubmit={handleSubmit}
      mode="update"
    />
  );
}
