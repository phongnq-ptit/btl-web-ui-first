import { ApiResponse, User } from "../interface";
import useApi from "./useApi";

const useAuthApi = () => {
  const { POST } = useApi();

  const baseUrl = "/users";

  async function login(user: User): Promise<ApiResponse<User>> {
    return POST<ApiResponse<User>>(baseUrl + "/login", user);
  }

  async function register(user: User): Promise<ApiResponse<User>> {
    return POST<ApiResponse<User>>(baseUrl + "/register", user);
  }
  return { login, register };
};

export default useAuthApi;
