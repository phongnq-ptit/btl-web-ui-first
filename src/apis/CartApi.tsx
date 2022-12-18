import { useEffect, useState } from "react";
import useCartApi from "../hooks/useCartApi";
import { Cart, User } from "../interface";

const CartApi = () => {
  const user: User = JSON.parse(localStorage.getItem("login")!);

  const { getCartByUser } = useCartApi();

  const [myCart, setMyCart] = useState<Cart[]>([]);
  const [isReload, setIsReload] = useState<boolean>(false);

  useEffect(() => {
    if (user === null || user.role === "ADMIN") {
      setMyCart([]);
    } else {
      const getCart = () => {
        getCartByUser(user.id)
          .then((response) => {
            setMyCart(response.data);
          })
          .catch((err) => {});
      };

      getCart();
    }
    // eslint-disable-next-line
  }, [isReload]);

  return { myCart, setMyCart, isReload, setIsReload };
};

export default CartApi;
