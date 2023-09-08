import { Link } from "react-router-dom";
import { Card, Spinner } from "../components/ui";
import { useGetBooksQuery } from "../redux/features/book/bookApi";
import { useAppSelector } from "../redux/hook";
import { IBook } from "../types/book";
import format_date from "../utils/format_date";

const Wishlist = () => {
  const { user } = useAppSelector((state) => state.user);
  const { data, isLoading: getBooksIsLoading } = useGetBooksQuery("");
  const books = data?.data.filter(
    (book: IBook) => book.wishlist && book.wishlist.includes(user.email!)
  );

  if (getBooksIsLoading) return <Spinner />;

  return (
    <div className="flex flex-row flex-wrap gap-6 items-start ml-4">
      {books.length ? (
        books.map((book: IBook, i: number) => (
          <Card
            key={i}
            title={book.title}
            genre={book.genre}
            author={book.author}
            publication_date={format_date(book.publication_date)}
            id={book.id}
            in_wishlist
          />
        ))
      ) : (
        <h2 className="text-3xl font-semibold text-center mt-4">
          No Books Are Added To Wishlist !{" "}
          <Link
            to="/all_books"
            className="text-blue-600 underline font-semibold"
          >
            Add Now
          </Link>
        </h2>
      )}
    </div>
  );
};

export default Wishlist;
