import { createContext, useEffect, useState } from "react";

export const CartContext = createContext<any>({});

export function CartContextProvider({ children }: { children: any }) {
  const [cartProducts, setCartProducts] = useState<any>([]);

  // Load cart data from localStorage after component mounts
  useEffect(() => {
    const ls = typeof window !== "undefined" ? window.localStorage : null;
    if (ls && ls.getItem("cart")) {
      setCartProducts(JSON.parse(ls.getItem("cart") || "[]"));
    }
  }, []);

  // Save cart data to localStorage whenever cartProducts changes
  useEffect(() => {
    if (cartProducts.length > 0) {
      localStorage.setItem("cart", JSON.stringify(cartProducts));
    }
  }, [cartProducts]);

  function addProduct(productId: any) {
    setCartProducts((prev: any) => [...prev, productId]);
  }

  function clearCart() {
    setCartProducts([]);
  }

  function removeProduct(productId: any) {
    setCartProducts((prev: any) => {
      const pos = prev.indexOf(productId);
      if (pos !== -1) {
        return prev.filter((value: any, index: number) => index !== pos);
      }

      return prev;
    })
  }

  return (
    <CartContext.Provider 
      value={{ 
        cartProducts, 
        setCartProducts, 
        addProduct, 
        removeProduct, 
        clearCart 
      }}>
      {children}
    </CartContext.Provider>
  );
}
