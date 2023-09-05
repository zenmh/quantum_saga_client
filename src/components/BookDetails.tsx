import { useNavigate, useParams } from "react-router-dom";
import {
  useDeleteBookMutation,
  useGetBookQuery,
} from "../redux/features/book/bookApi";
import format_date from "../utils/format_date";
import { Btn, Spinner } from "./ui";
import { useAppSelector } from "../redux/hook";
import { toast } from "react-toastify";

interface IReview {
  email: string;
  comment: string;
}

const BookDetails = () => {
  const { id } = useParams();
  const { data, isLoading: getBookIsLoading } = useGetBookQuery(id);
  const { user } = useAppSelector((state) => state.user);
  const navigate = useNavigate();
  const [deleteBook, { isLoading: deleteBookIsLoading, isSuccess }] =
    useDeleteBookMutation();

  const handleDelete = () => {
    const confirm = window.confirm("You are gonna delete this book !");

    if (confirm) {
      deleteBook({ id, data });

      if (isSuccess) {
        toast.error("Book Deleted Successfully !", {
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
    }
  };

  if (getBookIsLoading) return <Spinner />;

  if (deleteBookIsLoading) return <Spinner />;

  return (
    <div className="flex flex-row justify-center">
      <div className="">
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
        <div className="mt-3 rounded-md p-2 border-2 border-gray-300">
          <h3 className="text-xl font-bold">Reviews</h3>
          <div className="h-[1px] bg-white" />
          {data?.data?.reviews &&
            data?.data?.reviews.map(
              ({ email, comment }: IReview, i: number) => (
                <div key={i} className="my-2">
                  <small>@{email.split("@")[0]}</small>
                  <p>{comment}</p>
                  <div className="flex flex-row justify-end items-center gap-3">
                    <Btn lebel="Edit" primary xs />
                    <Btn lebel="Delete" denger xs />
                  </div>
                </div>
              )
            )}
        </div>
      </div>
    </div>
  );
};

export default BookDetails;
