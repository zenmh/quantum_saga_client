import { useState } from "react";
import { Link } from "react-router-dom";
import { Card, Spinner } from "../components/ui";
import { useGetBooksQuery } from "../redux/features/book/bookApi";
import { useAppSelector } from "../redux/hook";
import { IBook } from "../types/book";
import format_date from "../utils/format_date";

const Wishlist = () => {
  const { user } = useAppSelector((state) => state.user);
  const { data, isLoading: getBooksIsLoading } = useGetBooksQuery("");
  const [headingText, setHeadingText] = useState<string>(
    "All Your Favorite Books"
  );
  const [messageText, setMessageText] = useState<string>(
    "No Books Are Added To Wishlist!"
  );

  const all_books = data?.data.filter(
    (book: IBook) => book.wishlist && book.wishlist.includes(user.email!)
  );

  const [books, setBooks] = useState<IBook[]>(all_books);

  const read_soon_books = data?.data.filter(
    (book: IBook) =>
      book.wishlist &&
      book.wishlist.includes(user.email!) &&
      book.read_soon?.includes(user.email!)
  );
  const currently_reading_books = data?.data.filter(
    (book: IBook) =>
      book.wishlist &&
      book.wishlist.includes(user.email!) &&
      book.currently_reading?.includes(user.email!)
  );
  const finished_books = data?.data.filter(
    (book: IBook) =>
      book.wishlist &&
      book.wishlist.includes(user.email!) &&
      book.finished?.includes(user.email!)
  );

  if (getBooksIsLoading) return <Spinner />;

  return (
    <section className=" ml-4">
      <div className="flex flex-row items-center justify-center mb-3 mt-2">
        <ul className="flex flex-row items-center justify-center gap-6 bg-neutral-800 w-fit px-4 py-1 rounded-full">
          <li
            onClick={() => {
              setBooks(all_books);
              setHeadingText("All Your Favorite Books");
              setMessageText("No Books Are Added To Wishlist!");
            }}
            className="cursor-pointer font-medium"
          >
            All
          </li>
          <li
            onClick={() => {
              setBooks(read_soon_books);
              setHeadingText("Marked As Read Soon");
              setMessageText("You Didn't Mark Any Book As Read Soon!");
            }}
            className="cursor-pointer font-medium"
          >
            Read Soon
          </li>
          <li
            onClick={() => {
              setBooks(currently_reading_books);
              setHeadingText("Marked As Still Reading");
              setMessageText("You Didn't Mark Any Book As Still Reading!");
            }}
            className="cursor-pointer font-medium"
          >
            Still Reading
          </li>
          <li
            onClick={() => {
              setBooks(finished_books);
              setHeadingText("Marked As Finished");
              setMessageText("You Didn't Finish Any Book Yet!");
            }}
            className="cursor-pointer font-medium"
          >
            Finished
          </li>
        </ul>
      </div>
      {books.length > 0 && (
        <h2 className="text-3xl font-bold text-sky-600 mb-2">{headingText}</h2>
      )}
      <div className="flex flex-row flex-wrap gap-6 items-start">
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
          <h2 className="text-2xl font-semibold text-center mt-4">
            {messageText}&nbsp;
            <Link
              to="/all_books"
              className="text-blue-600 underline font-semibold"
            >
              Add Now
            </Link>
          </h2>
        )}
      </div>
    </section>
  );
};

export default Wishlist;
