import cors from "cors";

export const corsOptions = cors({
  origin: "http://localhost:5173", // Ganti dengan frontend origin kamu
  credentials: true,
});