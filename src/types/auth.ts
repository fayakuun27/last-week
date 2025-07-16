export interface User {
  id: number;
  email: string;
  role: "USER" | "ADMIN";
  iat: number; // issued at (dari JWT)
  exp: number; // expired (dari JWT)
}
