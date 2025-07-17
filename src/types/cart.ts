import type { Products } from "./product";

export type Cart = {
  cart: Products[];
  addToCart: (products: Products) => void;
  removeFromCart: (productId: number) => void;
  increaseQuantity: (productId: number) => void;
  decreaseQuantity: (productId: number) => void;
  loading: boolean;
  clearCart: () => void;
  updateCartQuantity: (productId: number, quantity: number) => void;
};
