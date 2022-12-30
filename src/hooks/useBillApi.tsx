import { ApiResponse, Bill } from "../interface";
import useApi from "./useApi";

const useBillApi = () => {
  const { GET, POST, PATCH } = useApi();

  const baseUrl = "/bill";

  async function createBill(body: {
    date: string;
    status: string;
    userId: number;
    listBooks: {
      carts: Array<number>;
    };
    userInfo: {
      name: string;
      tel: string;
      email: string;
      address: string;
    };
  }): Promise<ApiResponse<Bill>> {
    return POST<ApiResponse<Bill>>(baseUrl, body);
  }

  async function getAllBillUser(
    userId: number | null
  ): Promise<ApiResponse<Array<Bill>>> {
    return GET<ApiResponse<Array<Bill>>>(baseUrl, { userId: userId });
  }

  async function getBill(id: number): Promise<ApiResponse<Bill>> {
    return GET<ApiResponse<Bill>>(baseUrl + `/${id}`);
  }

  async function updateBillStatus(
    id: number,
    status: string
  ): Promise<ApiResponse<Bill>> {
    return PATCH<ApiResponse<Bill>>(baseUrl + `/${id}`, { status: status });
  }

  return { createBill, getAllBillUser, getBill, updateBillStatus };
};

export default useBillApi;
