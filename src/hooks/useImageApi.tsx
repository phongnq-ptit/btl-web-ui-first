import { ApiResponse, Img } from "../interface";
import useApi from "./useApi";

const useImageApi = () => {
  const { POST, PATCH, DELETE } = useApi();

  const baseUrl = "/image";

  async function upload(
    formData: FormData,
    bookId?: number
  ): Promise<ApiResponse<Img>> {
    return POST<ApiResponse<Img>>(baseUrl + `/upload`, formData, {
      bookId: bookId,
    });
  }

  async function updateBookId(
    bookId: number,
    id: number
  ): Promise<ApiResponse<Img>> {
    return PATCH<ApiResponse<Img>>(baseUrl + `/update/${id}`, {
      bookId: bookId,
    });
  }

  async function destroy(publicId: string): Promise<ApiResponse<Object>> {
    return DELETE<ApiResponse<Object>>(baseUrl + `/destroy/${publicId}`);
  }

  async function destroyBookZero(): Promise<ApiResponse<Object>> {
    return DELETE<ApiResponse<Object>>(baseUrl + "/destroy");
  }

  return { upload, updateBookId, destroy, destroyBookZero };
};

export default useImageApi;
