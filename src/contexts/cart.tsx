import type { Products } from "@/types/product";
import type { Cart } from "@/types/cart";
import { createContext, useContext, useState } from "react";
import type { ReactNode } from "react";

const CartContext = createContext<Cart | null>(null);

export const CartProvider = ({ children }: { children: ReactNode }) => {
  const [cart, setCart] = useState<Products[]>([]);
  const [loading, setLoading] = useState(false);

  const addToCart = (product: Products) => {
    setCart((prev) => {
      const exist = prev.find((item) => item.id === product.id);
      if (exist) {
        return prev.map((item) =>
          item.id === product.id
            ? { ...item, quantity: (item.quantity ?? 1) + 1 }
            : item
        );
      }
      return [...prev, { ...product, quantity: 1 }];
    });
  };

  const increaseQuantity = (productId: number) => {
    setCart((prev) =>
      prev.map((item) =>
        item.id === productId
          ? { ...item, quantity: (item.quantity ?? 1) + 1 }
          : item
      )
    );
  };

  const decreaseQuantity = (productId: number) => {
    setCart((prev) =>
      prev.map((item) =>
        item.id === productId && (item.quantity ?? 1) > 1
          ? { ...item, quantity: (item.quantity ?? 1) - 1 }
          : item
      )
    );
  };

  const removeFromCart = (productId: number) => {
    setLoading(true);
    setCart((prev) => prev.filter((item) => item.id !== productId));
    setTimeout(() => {
      setLoading(false);
    }, 1000);
  };

  const clearCart = () => {
    setCart([]);
  };
  const updateCartQuantity = (productId: number, quantity: number) => {
    setCart((prevCart) =>
      prevCart.map((item) =>
        item.id === productId ? { ...item, quantity } : item
      )
    );
  };
  return (
    <CartContext.Provider
      value={{
        loading,
        cart,
        addToCart,
        removeFromCart,
        increaseQuantity,
        decreaseQuantity,
        clearCart,
        updateCartQuantity,
      }}
    >
      {children}
    </CartContext.Provider>
  );
};

// eslint-disable-next-line react-refresh/only-export-components
export const useCart = () => {
  const context = useContext(CartContext);
  if (!context) throw new Error("useCart must be used inside CartProvider");
  return context;
};
