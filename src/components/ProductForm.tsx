// components/ProductForm.tsx
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";

type ProductFormProps = {
  form: {
    name: string;
    description: string;
    price: string;
    image: File | null;
  };
  onChange: (field: string, value: string | File | null) => void;
  onSubmit: () => void;
  mode: "create" | "update";
};

export default function ProductForm({
  form,
  onChange,
  onSubmit,
  mode,
}: ProductFormProps) {
  return (
    <div className="max-w-lg mx-auto p-6 space-y-4">
      <h1 className="text-xl font-bold">
        {mode === "create" ? "Create" : "Update"} Product
      </h1>
      <Input
        placeholder="Name"
        value={form.name}
        onChange={(e) => onChange("name", e.target.value)}
      />
      <Input
        placeholder="Description"
        value={form.description}
        onChange={(e) => onChange("description", e.target.value)}
      />
      <Input
        type="number"
        placeholder="Price"
        value={form.price}
        onChange={(e) => onChange("price", e.target.value)}
      />
      <Input
        type="file"
        onChange={(e) => onChange("image", e.target.files?.[0] || null)}
      />
      <Button onClick={onSubmit}>
        {mode === "create" ? "Create" : "Update"}
      </Button>
    </div>
  );
}
