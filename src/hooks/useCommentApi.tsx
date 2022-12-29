import { ApiResponse, Comment } from "../interface";
import useApi from "./useApi";

const useCommentApi = () => {
  const { GET, POST } = useApi();

  const baseUrl = "/comments";

  async function getAllCommentOfBook(
    bookId: number
  ): Promise<ApiResponse<Array<Comment>>> {
    return GET<ApiResponse<Array<Comment>>>(baseUrl, { bookId: bookId });
  }

  async function createComment(body: {
    userId: number;
    bookId: number;
    rate: number;
    date: string;
    comment: string;
  }): Promise<ApiResponse<Array<Comment>>> {
    return POST<ApiResponse<Array<Comment>>>(baseUrl, { ...body });
  }

  return { getAllCommentOfBook, createComment };
};

export default useCommentApi;
