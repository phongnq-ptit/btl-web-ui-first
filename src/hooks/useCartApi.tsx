import { ApiResponse, Cart } from "../interface";
import useApi from "./useApi";

const useCartApi = () => {
  const { GET, POST, PATCH, DELETE } = useApi();

  const baseUrl = "/cart";

  async function addCartByUser(
    userId: number,
    bookId: number,
    quantity: number
  ): Promise<ApiResponse<Cart>> {
    return POST<ApiResponse<Cart>>(baseUrl, { userId, bookId, quantity });
  }

  async function getCartByUser(
    userId: number
  ): Promise<ApiResponse<Array<Cart>>> {
    return GET<ApiResponse<Array<Cart>>>(baseUrl, { userId: userId });
  }

  async function updateCart(
    id: number,
    quantity: number,
    status: number
  ): Promise<ApiResponse<Cart>> {
    return PATCH<ApiResponse<Cart>>(baseUrl + `/${id}`, {
      quantity: quantity,
      status: status,
    });
  }

  async function removeCart(id: number): Promise<ApiResponse<Cart>> {
    return DELETE<ApiResponse<Cart>>(baseUrl + `/${id}`);
  }

  return { addCartByUser, getCartByUser, updateCart, removeCart };
};

export default useCartApi;
