import { useEffect, useState } from "react";
import useBookApi from "../hooks/useBookApi";
import { Book } from "../interface";

const BookApi = () => {
  const { getAllBook } = useBookApi();
  const [books, setBooks] = useState<Array<Book>>([]);
  const [isReload, setIsReload] = useState<boolean>(false);

  useEffect(() => {
    const getBooks = () => {
      getAllBook()
        .then((response) => {
          setBooks(response.data);
        })
        .catch((err) => {});
    };

    getBooks();
    // eslint-disable-next-line
  }, [isReload]);

  return { books, setBooks, isReload, setIsReload };
};

export default BookApi;
