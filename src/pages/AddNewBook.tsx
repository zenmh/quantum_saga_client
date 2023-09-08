import { useForm, SubmitHandler } from "react-hook-form";
import { useAppSelector } from "../redux/hook";
import { useCreateBookMutation } from "../redux/features/book/bookApi";
import { Spinner } from "../components/ui";
import { toast } from "react-toastify";
import { useNavigate } from "react-router-dom";
import { book_genres } from "../constants/book";

interface BookProps {
  title: string;
  author: string;
  genre: string;
  email: string;
  publication_date?: string;
  reviews?: {
    email: string;
    comment: string;
  }[];
}

const AddNewBook = () => {
  const [createBook, { isLoading, isSuccess }] = useCreateBookMutation();
  const { user } = useAppSelector((state) => state.user);
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<BookProps>();
  const navigate = useNavigate();

  const onSubmit: SubmitHandler<BookProps> = (data: BookProps) => {
    const book = {
      title: data.title,
      author: data.author,
      genre: data.genre,
      email: data.email,
      publication_date: new Date().toISOString(),
      reviews: [],
    };

    createBook(book);

    if (isLoading) return <Spinner />;

    if (isSuccess) {
      toast.success("Book Created Successfully !", {
        position: "bottom-left",
        autoClose: 1000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
        theme: "dark",
      });

      navigate("/");
    }
  };

  if (isLoading) return <Spinner />;

  return (
    <div className="flex flex-row justify-center">
      <form
        onSubmit={handleSubmit(onSubmit)}
        className="flex flex-col gap-2 w-[500px]"
      >
        <input
          {...register("title", { required: true })}
          placeholder="Title"
          type="text"
          className="w-full p-3 text-lg bg-gray-800 border-sky-800 rounded-md outline-none text-white focus:border-2 transition disabled:bg-neutral-900 disabled:opacity-70 disabled:cursor-not-allowed"
        />
        {errors.title && (
          <span className="text-rose-500">{errors.title.message}</span>
        )}
        <input
          {...register("author", { required: true })}
          placeholder="Author Name"
          type="text"
          className="w-full p-3 text-lg bg-gray-800 border-sky-800 rounded-md outline-none text-white focus:border-2 transition disabled:bg-neutral-900 disabled:opacity-70 disabled:cursor-not-allowed"
        />
        {errors.author && (
          <span className="text-rose-500">{errors.author.message}</span>
        )}
        <select
          {...register("genre", { required: true })}
          className="w-full p-3 text-lg bg-gray-800 border-sky-800 rounded-md outline-none text-white focus:border-2 transition disabled:bg-neutral-900 disabled:opacity-70 disabled:cursor-not-allowed"
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
        {errors.genre && (
          <span className="text-rose-500">{errors.genre.message}</span>
        )}
        <input
          {...register("email", { required: true })}
          readOnly
          placeholder="Email"
          type="email"
          defaultValue={user.email as string}
          className="w-full p-3 text-lg bg-gray-800 border-sky-800 rounded-md outline-none text-slate-500 transition "
        />
        {errors.email && (
          <span className="text-rose-500">{errors.email.message}</span>
        )}

        <input
          type="submit"
          value="Create Book"
          className="w-full p-3 text-lg bg-sky-800 border-sky-800 rounded-md cursor-pointer outline-none text-white focus:border-2 transition disabled:bg-neutral-900 disabled:opacity-70 disabled:cursor-not-allowed"
        />
      </form>
    </div>
  );
};

export default AddNewBook;
