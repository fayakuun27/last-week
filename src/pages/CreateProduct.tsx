// pages/CreateProductPage.tsx
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import ProductForm from "@/components/ProductForm";

export default function CreateProductPage() {
  const navigate = useNavigate();
  const [form, setForm] = useState({
    name: "",
    description: "",
    price: "",
    image: null as File | null,
  });

  const handleChange = (field: string, value: string | File | null) => {
    setForm((prev) => ({ ...prev, [field]: value }));
  };

  const handleSubmit = async () => {
    const formData = new FormData();
    formData.append("name", form.name);
    formData.append("description", form.description);
    formData.append("price", form.price);
    if (form.image) formData.append("image", form.image);
    console.log(formData);
    try {
      const response = await axios.post(
        "http://localhost:3000/products",
        formData,
        {
          headers: {
            Authorization: `Bearer ${localStorage.getItem("token")}`,
            "Content-Type": "multipart/form-data",
          },
        }
      );
      const data = await response.data;

      console.log(data);
      if (data) {
        navigate("/admin");
      }
    } catch (error) {
      console.error("Gagal membuat produk:", error);
    }
  };

  return (
    <ProductForm
      form={form}
      onChange={handleChange}
      onSubmit={handleSubmit}
      mode="create"
    />
  );
}
