import { ApiResponse, Category } from "../interface";
import useApi from "./useApi";

const useCategoryApi = () => {
  const { GET } = useApi();

  const baseUrl = "/categories";

  function getAllCategory(): Promise<ApiResponse<Array<Category>>> {
    return GET<ApiResponse<Array<Category>>>(baseUrl);
  }

  return { getAllCategory };
};

export default useCategoryApi;
