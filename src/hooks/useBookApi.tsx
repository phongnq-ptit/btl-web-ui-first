import { ApiResponse, Book } from "../interface";
import useApi from "./useApi";

const useBookApi = () => {
  const { GET, POST, PUT, DELETE } = useApi();

  const baseUrl = "/books";

  async function getAllBook(): Promise<ApiResponse<Array<Book>>> {
    return GET<ApiResponse<Array<Book>>>(baseUrl);
  }

  async function getBook(id: number): Promise<ApiResponse<Book>> {
    return GET<ApiResponse<Book>>(baseUrl + `/${id}`);
  }

  async function addBook(book: Book): Promise<ApiResponse<Book>> {
    return POST<ApiResponse<Book>>(baseUrl, book);
  }

  async function editBook(id: number, book: Book): Promise<ApiResponse<Book>> {
    return PUT<ApiResponse<Book>>(baseUrl + `/${id}`, book);
  }

  async function deleteBook(id: number): Promise<ApiResponse<Object>> {
    return DELETE<ApiResponse<Object>>(baseUrl + `/${id}`);
  }

  return { getAllBook, getBook, addBook, editBook, deleteBook };
};

export default useBookApi;
