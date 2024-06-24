"use client";

import {
  createContext,
  useContext,
  useState,
  PropsWithChildren,
  Dispatch,
  SetStateAction,
  useEffect,
} from "react";
import { ProductProps } from "./api/products/route";
import { toast } from "sonner";

interface CartContextType {
  cartItems: ProductProps[];
  setCartItems: (items: ProductProps[]) => void;
  addProductToCart: (product: ProductProps) => void;
  isOpen: boolean;
  setIsOpen: Dispatch<SetStateAction<boolean>>;
}

export const CartContext = createContext<CartContextType>({
  cartItems: [],
  setCartItems: () => {},
  addProductToCart: () => {},
  isOpen: false,
  setIsOpen: () => {},
});

export const CartProvider = ({ children }: PropsWithChildren<{}>) => {
  const [cartItems, setCartItems] = useState<ProductProps[]>([]);
  const [isOpen, setIsOpen] = useState<boolean>(false);

  useEffect(() => {
    const localStorageData = localStorage.getItem("cartItems");

    if (localStorageData) {
      setCartItems(JSON.parse(localStorageData));
    }
  }, []);

  const addProductToCart = (product: ProductProps) => {
    const existingProduct = cartItems.find((item) => item.id === product.id);
    if (existingProduct) {
      const newCartItems = cartItems.map((item) =>
        item.id === product.id
          ? { ...item, amount: item.amount + product.amount }
          : { ...item }
      );
      setCartItems(newCartItems);
      toast.message('Product added to cart', {
        description: existingProduct.name,
      })
      localStorage.setItem("cartItems", JSON.stringify(newCartItems));
    } else {
      const newCartItems = [
        ...cartItems,
        {
          name: product.name,
          id: product.id,
          price: product.price,
          amount: product.amount,
        },
      ];

      setCartItems(newCartItems);
      toast.message('Product added to cart', {
        description: newCartItems[newCartItems.length - 1].name,
      })

      localStorage.setItem("cartItems", JSON.stringify(newCartItems));
    }
  };

  return (
    <CartContext.Provider
      value={{ cartItems, setCartItems, addProductToCart, isOpen, setIsOpen }}
    >
      {children}
    </CartContext.Provider>
  );
};

export const useCart = () => {
  return useContext(CartContext);
};
