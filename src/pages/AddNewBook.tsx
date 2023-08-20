import { useState } from "react";
import { Inp } from "../components/ui";
import { useForm, SubmitHandler } from "react-hook-form";

const genres: string[] = [
  "Select Genre",
  "Action",
  "Adventure",
  "Biography",
  "Children's",
  "Comics",
  "Cookbooks",
  "Crime",
  "Drama",
  "Fantasy",
  "Fiction",
  "History",
  "Horror",
  "Mystery",
  "Poetry",
  "Romance",
  "Science Fiction",
  "Self-help",
  "Thriller",
  "Travel",
];

type Inputs = {
  title: string;
  author: string;
  genre: string;
  publication_date?: string;
  email: string;
  reviews?: {
    email: string;
    comment: string;
  }[];
};

const AddNewBook = () => {
  const [isLoading, setIsLoading] = useState<boolean>(false);

  const {
    register,
    handleSubmit,

    formState: { errors },
  } = useForm<Inputs>();

  const formHandler: SubmitHandler<Inputs> = (data) => {
    setIsLoading(true);

    console.log(data);

    setIsLoading(false);
  };

  return (
    <div className="flex flex-row justify-center">
      <form
        onSubmit={handleSubmit(formHandler)}
        className="flex flex-col gap-4 w-[500px]"
      >
        <Inp
          {...register("title", { required: true })}
          disabled={isLoading}
          placeholder="Title"
          type="text"
        />
        {errors.title && (
          <span className="text-rose-500">{errors.title.message}</span>
        )}
        <Inp
          {...register("author", { required: true })}
          disabled={isLoading}
          placeholder="Author Name"
          type="text"
        />
        {errors.author && (
          <span className="text-rose-500">{errors.author.message}</span>
        )}
        <select
          {...register("genre", { required: true })}
          className="w-full p-3 text-lg bg-gray-800 border-sky-800 rounded-md outline-none text-white focus:border-2 transition disabled:bg-neutral-900 disabled:opacity-70 disabled:cursor-not-allowed"
        >
          {genres.map((genre) => (
            <option
              key={genre}
              className="w-full p-3 text-lg bg-gray-800 border-sky-800 rounded-md outline-none text-white focus:border-2 transition disabled:bg-neutral-900 disabled:opacity-70 disabled:cursor-not-allowed"
            >
              {genre}
            </option>
          ))}
        </select>
        {errors.genre && (
          <span className="text-rose-500">{errors.genre.message}</span>
        )}
        <Inp
          {...register("email", { required: true })}
          disabled={isLoading}
          placeholder="Email"
          type="email"
        />
        {errors.email && (
          <span className="text-rose-500">{errors.email.message}</span>
        )}
        <input
          type="submit"
          value="Create Book"
          disabled={isLoading}
          className="w-full p-3 text-lg bg-sky-800 border-sky-800 rounded-md cursor-pointer outline-none text-white focus:border-2 transition disabled:bg-neutral-900 disabled:opacity-70 disabled:cursor-not-allowed"
        />
      </form>
    </div>
  );
};

export default AddNewBook;
