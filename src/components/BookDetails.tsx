import { useNavigate, useParams } from "react-router-dom";
import {
  useAddReviewMutation,
  useDeleteBookMutation,
  useGetBookQuery,
} from "../redux/features/book/bookApi";
import format_date from "../utils/format_date";
import { Btn, Spinner } from "./ui";
import { useAppSelector } from "../redux/hook";
import { toast } from "react-toastify";
import { SubmitHandler, useForm } from "react-hook-form";
import { AiOutlineSend } from "react-icons/ai";

interface IReview {
  email: string;
  comment: string;
}

const BookDetails = () => {
  const { id } = useParams();
  const { user } = useAppSelector((state) => state.user);
  const navigate = useNavigate();
  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm<IReview>();
  const { data, isLoading: getBookIsLoading } = useGetBookQuery(id);
  const [deleteBook, { isLoading: deleteBookIsLoading }] =
    useDeleteBookMutation();
  const [addReview, { isLoading: addReviewIsLoading }] = useAddReviewMutation();

  const onSubmit: SubmitHandler<IReview> = (data) => {
    const review: IReview = {
      email: user.email!,
      comment: data.comment,
    };

    addReview({ id, data: review });

    reset();
  };

  const handleDelete = () => {
    const confirm = window.confirm("You are gonna delete this book !");

    if (confirm) {
      deleteBook({ id, data });
      toast.error("Book Deleted Successfully !");
      navigate("/");
    }
  };

  if (getBookIsLoading || deleteBookIsLoading || addReviewIsLoading)
    return <Spinner />;

  return (
    <div className="flex flex-row justify-center">
      <div className="w-[500px]">
        <div className="border-2 border-dashed border-white p-3 rounded-md">
          <h2 className="text-2xl font-semibold">
            Title : {data?.data?.title}
          </h2>
          <h4 className="text-lg font-normal">
            Authore : {data?.data?.author}
          </h4>
          <h4 className="text-lg font-normal">Genre : {data?.data?.genre}</h4>
          <h4 className="text-lg font-normal">
            Published : {format_date(data?.data?.createdAt)}
          </h4>
          <div className="flex flex-row items-center justify-end gap-4 mt-3">
            {user?.email &&
              data?.data?.email &&
              user?.email === data?.data?.email && (
                <>
                  <Btn
                    onClick={() => navigate(`/edit_book/${id}`)}
                    lebel="Edit Book"
                    primary
                    md
                  />
                  <Btn onClick={handleDelete} lebel="Delete Book" denger md />
                </>
              )}
          </div>
        </div>
        <form
          onSubmit={handleSubmit(onSubmit)}
          className="mt-3 flex flex-row justify-between gap-3"
        >
          <input
            {...register("comment", { required: true })}
            placeholder="Leave your comment"
            type="text"
            className="w-full p-2 text-lg bg-gray-800 border-sky-800 rounded-md outline-none text-white focus:border-2 transition disabled:bg-neutral-900 disabled:opacity-70 disabled:cursor-not-allowed"
          />
          {errors.comment && (
            <span className="text-rose-500">{errors.comment.message}</span>
          )}
          <button type="submit" className="text-2xl cursor-pointer">
            <AiOutlineSend />
          </button>
        </form>
        {data.data.reviews.length > 0 && (
          <div className="mt-3 rounded-md p-2 border-2 border-gray-300">
            <h3 className="text-xl font-bold">Reviews</h3>
            <div className="h-[1px] bg-white" />
            {data.data.reviews.map(({ email, comment }: IReview, i: number) => (
              <div key={i} className="my-2">
                <small>@{email.split("@")[0]}</small>
                <p>{comment}</p>
                <div className="flex flex-row justify-end items-center gap-3">
                  <Btn lebel="Edit" primary xs />
                  <Btn lebel="Delete" denger xs />
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
};

export default BookDetails;
