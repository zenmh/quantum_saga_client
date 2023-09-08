import { useForm, SubmitHandler } from "react-hook-form";
import {
  useGetBookQuery,
  useUpdateBookMutation,
} from "../redux/features/book/bookApi";
import { Spinner } from "../components/ui";
import { toast } from "react-toastify";
import { useNavigate, useParams } from "react-router-dom";
import { useAppSelector } from "../redux/hook";
import { book_genres } from "../constants/book";
import { IBook } from "../types/book";

const EditBook = () => {
  const { id } = useParams();
  const [updateBook, { isLoading }] = useUpdateBookMutation();
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<IBook>();
  const navigate = useNavigate();
  const { data } = useGetBookQuery(id);
  const { user } = useAppSelector((state) => state.user);

  const onSubmit: SubmitHandler<IBook> = (form_data: IBook) => {
    const book = {
      title: form_data.title,
      author: form_data.author,
      genre: form_data.genre,
      email: user.email,
      publication_date: data?.data?.publication_date,
      reviews: data?.data?.reviews,
      updated_at: new Date().toISOString(),
    };
    updateBook({ id, data: book });

    toast.success("Book Updated Successfully !");

    navigate("/");
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
          defaultValue={data?.data?.title}
          className="w-full p-3 text-lg bg-gray-800 border-sky-800 rounded-md outline-none text-white focus:border-2 transition disabled:bg-neutral-900 disabled:opacity-70 disabled:cursor-not-allowed"
        />
        {errors.title && (
          <span className="text-rose-500">{errors.title.message}</span>
        )}
        <input
          {...register("author", { required: true })}
          placeholder="Author Name"
          type="text"
          defaultValue={data?.data?.author}
          className="w-full p-3 text-lg bg-gray-800 border-sky-800 rounded-md outline-none text-white focus:border-2 transition disabled:bg-neutral-900 disabled:opacity-70 disabled:cursor-not-allowed"
        />
        {errors.author && (
          <span className="text-rose-500">{errors.author.message}</span>
        )}
        <select
          {...register("genre", { required: true })}
          defaultValue={data?.data?.genre}
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
          type="submit"
          value="Update"
          className="w-full p-3 text-lg bg-sky-800 border-sky-800 rounded-md cursor-pointer outline-none text-white focus:border-2 transition disabled:bg-neutral-900 disabled:opacity-70 disabled:cursor-not-allowed"
        />
      </form>
    </div>
  );
};

export default EditBook;
