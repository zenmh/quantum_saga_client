import { Card, Spinner } from "../components/ui";
import { useGetBooksQuery } from "../redux/features/book/bookApi";
import { IBook } from "../types/book";
import format_date from "../utils/format_date";

const AllBooks = () => {
  const { data: books, isLoading } = useGetBooksQuery(undefined);

  if (isLoading) return <Spinner />;

  return (
    <div className="flex flex-row flex-wrap gap-6 items-start ml-4">
      {books.data.length ? (
        books.data.map((book: IBook, i: number) => (
          <Card
            key={i}
            title={book.title}
            genre={book.genre}
            author={book.author}
            publication_date={format_date(book.publication_date)}
            id={book.id}
          />
        ))
      ) : (
        <h2 className="text-3xl font-semibold text-center mt-4">
          No Books Are Available Now !
        </h2>
      )}
    </div>
  );
};

export default AllBooks;
