import type { Products } from "@/types/product";
import type { Cart } from "@/types/cart";
import { createContext, useContext, useState } from "react";
import type { ReactNode } from "react";

const CartContext = createContext<Cart | null>(null);

export const CartProvider = ({ children }: { children: ReactNode }) => {
  const [cart, setCart] = useState<Products[]>([]);
  const [loading, setLoading] = useState(false);

  const addToCart = (products: Products) => {
    setCart((prev) => {
      const exist = prev.find((item) => item.id === products.id);
      if (exist) {
        return prev.map((item) =>
          item.id === products.id ? { ...item, inCart: item.inCart + 1 } : item
        );
      }
      return [...prev, { ...products, inCart: 1 }];
    });
  };

  const increaseQuantity = (productId: number) => {
    setCart((prev) =>
      prev.map((item) =>
        item.id === productId ? { ...item, inCart: item.inCart + 1 } : item
      )
    );
  };

  const decreaseQuantity = (productId: number) => {
    setCart((prev) =>
      prev.map((item) =>
        item.id === productId && item.inCart > 1
          ? { ...item, inCart: item.inCart - 1 }
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
