import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import axios from "axios";
import { useState } from "react";

export default function TransferPointsPage() {
  const [recipient, setRecipient] = useState("");
  const [amount, setAmount] = useState("");
  const [errorMsg, setErrorMsg] = useState("");
  const [successMsg, setSuccessMsg] = useState("");

  async function handleTransfer(e: React.FormEvent) {
    e.preventDefault();

    try {
      const response = await axios.post(
        "http://localhost:3000/points/transfer",
        {
          recipient: recipient,
          amount: Number(amount),
        },
        {
          headers: {
            Authorization: `Bearer ${localStorage.getItem("token")}`,
            "Content-Type": "application/json",
          },
        }
      );

      // Jika berhasil, kamu bisa akses response.data
      const data = await response.data;

      console.log(data);

      if (data) {
        setSuccessMsg("Transfer berhasil!");
      }
      // lakukan sesuatu dengan `data` jika diperlukan

      // eslint-disable-next-line @typescript-eslint/no-explicit-any
    } catch (error: any) {
      // Tangani error dari axios (baik network error maupun response error)
      const message =
        error.response?.data?.error || error.message || "Terjadi kesalahan";
      setErrorMsg(message);
    }
  }

  return (
    <div className="max-w-sm mx-auto mt-20 space-y-4">
      <form
        onSubmit={handleTransfer}
        className="bg-white p-8 rounded shadow-md w-full max-w-md space-y-4 flex flex-col gap-4"
      >
        <Input
          placeholder="Recipient Email"
          onChange={(e) => setRecipient(e.target.value)}
        />
        <Input
          type="number"
          placeholder="Amount"
          onChange={(e) => setAmount(e.target.value)}
        />
        {errorMsg && (
          <p className="text-red-500 text-BOLD text-center">{errorMsg}</p>
        )}
        {successMsg && <p style={{ color: "green" }}>{successMsg}</p>}
        <Button type="submit">Transfer</Button>
      </form>
    </div>
  );
}
