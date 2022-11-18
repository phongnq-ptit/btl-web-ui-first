import { createContext, ReactNode } from "react";
import BookApi from "./apis/BookApi";
import { Book } from "./interface";

interface IBookContextType {
  books: Book[];
  setBooks: Function;
  isReload: boolean;
  setIsReload: Function;
}

export const BookContext = createContext<IBookContextType>({
  books: [],
  setBooks: (books: Book[]) => {},
  isReload: false,
  setIsReload: (isReload: boolean) => {},
});

export const BookContextProvider = ({ children }: { children: ReactNode }) => {
  const { books, setBooks, isReload, setIsReload } = BookApi();

  const bookState = { books, setBooks, isReload, setIsReload };
  return (
    <BookContext.Provider value={bookState}>{children}</BookContext.Provider>
  );
};
