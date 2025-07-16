import type { User } from "./auth";

export interface AuthLogin {
  token: string | null;
  user: User | null;
  login: (token: string) => void;
  logout: () => void;
}
