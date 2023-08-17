import { useParams } from "react-router-dom";
import { useGetBookQuery } from "../redux/features/book/bookApi";
import format_date from "../utils/format_date";
import { Spinner } from "./ui";

interface IReview {
  email: string;
  comment: string;
}

const BookDetails = () => {
  const { _id } = useParams();

  const { data: book, isLoading } = useGetBookQuery(_id);

  if (isLoading) return <Spinner />;

  const { title, author, genre, reviews, createdAt } = book.data;

  return (
    <div className="flex flex-row justify-center">
      <div className="">
        <div className="border-2 border-dashed border-white p-3 rounded-md">
          <h2 className="text-2xl font-semibold">Title : {title}</h2>
          <h4 className="text-lg font-normal">Authore : {author}</h4>
          <h4 className="text-lg font-normal">Genre : {genre}</h4>
          <h4 className="text-lg font-normal">
            Published : {format_date(createdAt)}
          </h4>
        </div>
        <div className="mt-3 rounded-md p-2 border-2 border-gray-300">
          <h3 className="text-xl font-bold">Reviews</h3>
          <div className="h-[1px] bg-white" />
          {reviews.length &&
            reviews.map(({ email, comment }: IReview, i: number) => (
              <div key={i} className="my-2">
                <small>@{email.split("@")[0]}</small>
                <p>{comment}</p>
                <div className="flex flex-row justify-end">
                  <button className="bg-sky-500 font-semibold text-xs px-2 rounded-full cursor-pointer">
                    Edit
                  </button>
                  <button className="bg-rose-500 font-semibold text-xs px-2 rounded-full ml-3 cursor-pointer">
                    Delete
                  </button>
                </div>
              </div>
            ))}
        </div>
      </div>
    </div>
  );
};

export default BookDetails;
