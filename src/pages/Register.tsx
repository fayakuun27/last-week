import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";

export default function RegisterPage() {
  const navigate = useNavigate();
  const [form, setForm] = useState<{
    email: string;
    password: string;
    image: File | null;
  }>({
    email: "",
    password: "",
    image: null,
  });

  async function handleRegister() {
    const formData = new FormData();
    formData.append("email", form.email);
    formData.append("password", form.password);
    if (form.image) formData.append("image", form.image);

    await fetch("http://localhost:3000/auth/register", {
      method: "POST",
      body: formData,
    });

    alert("Berhasil register!");
    navigate("/login");
  }

  return (
    <div className="max-w-sm mx-auto mt-20 space-y-4">
      <Input
        type="email"
        placeholder="Email"
        onChange={(e) => setForm({ ...form, email: e.target.value })}
      />
      <Input
        type="password"
        placeholder="Password"
        onChange={(e) => setForm({ ...form, password: e.target.value })}
      />
      <Input
        type="file"
        onChange={(e) => setForm({ ...form, image: e.target.files?.[0] || null })}
      />
        <p className="text-center text-sm text-gray-600">
        Have an account?{" "}
        <Link to="/login" className="text-blue-600 hover:underline">
          Login
        </Link>
        </p>

      <Button onClick={handleRegister}>Register</Button>
    </div>
  );
}