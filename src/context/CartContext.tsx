import { createContext, ReactNode } from "react";
import CartApi from "../apis/CartApi";
import { Cart } from "../interface";

interface ICartContextType {
  myCart: Cart[];
  setMyCart: Function;
  isReload: boolean;
  setIsReload: Function;
}

export const CartContext = createContext<ICartContextType>({
  myCart: [],
  setMyCart: (cart: Cart[]) => {},
  isReload: false,
  setIsReload: (isReload: boolean) => {},
});

export const CartContextProvider = ({ children }: { children: ReactNode }) => {
  const { myCart, setMyCart, isReload, setIsReload } = CartApi();

  const cartState = { myCart, setMyCart, isReload, setIsReload };
  return (
    <CartContext.Provider value={cartState}>{children}</CartContext.Provider>
  );
};
