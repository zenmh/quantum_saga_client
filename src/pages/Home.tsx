import { Card } from "../components/ui";
import { useGetBooksQuery } from "../redux/features/book/bookApi";
import { IBook } from "../types/book";
import format_date from "../utils/format_date";

const Home = () => {
  const { data: books, isLoading } = useGetBooksQuery(undefined);

  if (isLoading) return <div>Loading</div>;

  return (
    <div className="flex flex-row flex-wrap gap-6 items-start ml-4">
      {books.data.map((book: IBook, i: number) => (
        <Card
          key={i}
          title={book.title}
          genre={book.genre}
          author={book.author}
          publication_date={format_date(book.publication_date)}
        />
      ))}
    </div>
  );
};

export default Home;
