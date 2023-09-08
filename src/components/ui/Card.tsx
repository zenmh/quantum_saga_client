import { FC } from "react";
import { Link } from "react-router-dom";
import { AiFillHeart, AiOutlineHeart } from "react-icons/ai";
import { useAppSelector } from "../../redux/hook";
import {
  useAddToWishlistMutation,
  useGetBookQuery,
} from "../../redux/features/book/bookApi";
import { Spinner } from ".";
import { toast } from "react-toastify";

interface CardProps {
  title: string;
  author: string;
  genre: string;
  publication_date: string;
  id?: string;
}

const Card: FC<CardProps> = ({
  title,
  author,
  genre,
  publication_date,
  id,
}) => {
  const { user } = useAppSelector((state) => state.user);
  const [addToWishlist, { isLoading: addToWishlistIsLoading }] =
    useAddToWishlistMutation();
  const { data, isLoading: getBookIsLoading } = useGetBookQuery(id);

  const handleWishlist = () => {
    const wishlist: string[] = [...data.data.wishlist, user.email];

    addToWishlist({ id, data: wishlist });

    toast.success("Bood Added To Wishlist !");
  };

  if (addToWishlistIsLoading || getBookIsLoading) return <Spinner />;

  return (
    <div className="border-gray-600 border-2 w-[230px] h-[200px] rounded-md p-2 hover:w-[231px] hover:h-[201px] transition-all flex flex-col justify-between">
      <h2 className="text-2xl font-bold text-slate-200">{title}</h2>
      <h3 className="text-lg font-medium text-slate-300">{author}</h3>
      <p className="text-sm text-slate-400 px-3 text-center py-1 bg-gray-600 rounded-full w-fit ">
        {genre}
      </p>
      <div className="flex flex-row justify-between items-center">
        <p className="font-normal">
          Published :{" "}
          <span className="italic text-gray-400">{publication_date}</span>
        </p>
        <button
          onClick={handleWishlist}
          className="cursor-pointer text-2xl p-1"
        >
          {data?.data?.wishlist.includes(user.email) ? (
            <AiFillHeart />
          ) : (
            <AiOutlineHeart />
          )}
        </button>
      </div>
      <Link
        to={`/books/${id}`}
        className="bg-gray-500 font-semibold text-center py-1 rounded-full"
      >
        View Details
      </Link>
    </div>
  );
};

export default Card;
