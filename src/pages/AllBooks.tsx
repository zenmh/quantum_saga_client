import { useState, ChangeEvent, FormEvent } from "react";
import { Card, Spinner } from "../components/ui";
import {
  useGetBooksQuery,
  useGetBooksWithSelectedGenreQuery,
} from "../redux/features/book/bookApi";
import { IBook } from "../types/book";
import format_date from "../utils/format_date";
import { AiOutlineSearch } from "react-icons/ai";
import { book_genres } from "../constants/book";

const AllBooks = () => {
  const [searchTerm, setSearchTerm] = useState<string>("");
  const [genre, setGenre] = useState<string>("*");
  const [filterOn, setFilterOn] = useState<boolean>(false);
  const { data: allBooks, isLoading: allBooksIsLaoding } =
    useGetBooksQuery(searchTerm);
  const { data: booksFilterdByGenre, isLoading: booksFilterdByGenreIsLoading } =
    useGetBooksWithSelectedGenreQuery(genre);
  const books = filterOn ? booksFilterdByGenre : allBooks;

  const handleSearch = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    const form_element = e.target as HTMLFormElement;
    setSearchTerm(form_element.search.value as string);
  };

  const handleFilter = (e: ChangeEvent<HTMLSelectElement>) => {
    setFilterOn(true);
    setGenre(e.target.value);
  };

  if (allBooksIsLaoding || booksFilterdByGenreIsLoading) return <Spinner />;

  return (
    <div>
      <div className="flex flex-row justify-between">
        <form
          onSubmit={handleSearch}
          className="w-1/2 flex felx-row items-center"
        >
          <input
            name="search"
            placeholder="Search"
            type="text"
            className="w-full p-3 text-lg bg-gray-800 border-sky-800 rounded-sm outline-none text-white transition disabled:bg-neutral-900 disabled:opacity-70 disabled:cursor-not-allowed"
          />
          <button
            type="submit"
            className="text-2xl cursor-pointer bg-sky-800 p-3 rounded-sm"
          >
            <AiOutlineSearch />
          </button>
        </form>
        <div>
          <select
            onChange={handleFilter}
            value={genre}
            className="w-full p-3 text-lg bg-gray-800 border-sky-800 rounded-md outline-none text-white transition disabled:bg-neutral-900 disabled:opacity-70 disabled:cursor-not-allowed"
          >
            {book_genres.map((genre) => (
              <option
                key={genre}
                className="w-full p-3 text-lg bg-gray-800 border-sky-800 rounded-md outline-none text-white focus:border-2 transition disabled:bg-neutral-900 disabled:opacity-70 disabled:cursor-not-allowed"
              >
                {genre}
              </option>
            ))}
          </select>
        </div>
      </div>
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
    </div>
  );
};

export default AllBooks;
