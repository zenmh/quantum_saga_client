import { FC } from "react";
import { Link } from "react-router-dom";
import { AiFillHeart, AiOutlineHeart } from "react-icons/ai";
import { useAppSelector } from "../../redux/hook";
import {
  useAddToCurrentlyReadingMutation,
  useAddToFinishedMutation,
  useAddToReadSoonMutation,
  useAddToWishlistMutation,
  useGetBookQuery,
  useRemoveFromWishlistMutation,
} from "../../redux/features/book/bookApi";
import { Btn, Spinner } from ".";
import { toast } from "react-toastify";

interface CardProps {
  title: string;
  author: string;
  genre: string;
  publication_date: string;
  id?: string;
  in_wishlist?: boolean;
}

const Card: FC<CardProps> = ({
  title,
  author,
  genre,
  publication_date,
  id,
  in_wishlist,
}) => {
  const { user } = useAppSelector((state) => state.user);
  const [addToWishlist, { isLoading: addToWishlistIsLoading }] =
    useAddToWishlistMutation();
  const { data, isLoading: getBookIsLoading } = useGetBookQuery(id);
  const [removeFromWishlist, { isLoading: removeFromWishlistIsLoading }] =
    useRemoveFromWishlistMutation();
  const [addToReadSoon, { isLoading: addToReadSoonIsLoading }] =
    useAddToReadSoonMutation();
  const [addToCurrentlyReading, { isLoading: addToCurrentlyReadingIsLoading }] =
    useAddToCurrentlyReadingMutation();
  const [addToFinished, { isLoading: addToFinishedIsLoading }] =
    useAddToFinishedMutation();

  const handleWishlist = () => {
    const wishlist: string[] = [...data.data.wishlist, user.email];

    if (!data.data.wishlist.includes(user.email)) {
      addToWishlist({ id, data: wishlist });
      toast.success("Book Added To Wishlist !");
    } else {
      removeFromWishlist({ id, data: { email: user.email } });
      toast.info("Book Removed From Wishlist !");
    }
  };

  const handleReadSoon = () => {
    const read_soon: string[] = [...data.data.read_soon, user.email];

    if (!data.data.read_soon.includes(user.email)) {
      addToReadSoon({ id, data: read_soon });
      toast.info("Marked as read soon !");
    } else {
      toast.warning("Already marked as read soon !!");
    }
  };

  const handleCurrentlyReading = () => {
    const currently_reading: string[] = [
      ...data.data.currently_reading,
      user.email,
    ];

    if (!data.data.currently_reading.includes(user.email)) {
      addToCurrentlyReading({ id, data: currently_reading });
      toast.info("Marked as still reading !");
    } else {
      toast.warning("Already marked as still reading !!");
    }
  };

  const handleFinished = () => {
    const finished: string[] = [...data.data.finished, user.email];

    if (!data.data.finished.includes(user.email)) {
      addToFinished({ id, data: finished });
      toast.info("Marked as finished !");
    } else {
      toast.warning("Already marked as finished !!");
    }
  };

  if (
    addToWishlistIsLoading ||
    getBookIsLoading ||
    removeFromWishlistIsLoading ||
    addToReadSoonIsLoading ||
    addToCurrentlyReadingIsLoading ||
    addToFinishedIsLoading
  )
    return <Spinner />;

  return (
    <div
      className={`border-gray-600 border-2 w-[330px] h-[220px] rounded-md p-2 hover:w-[331px] hover:h-[222px] transition-all flex flex-col justify-between ${
        in_wishlist && "h-[240px] hover:h-[242px]"
      }`}
    >
      <h2 className="text-2xl font-bold text-slate-200">{title}</h2>
      <h3 className="text-lg font-medium text-slate-300">
        <span className="mr-2 font-normal text-sm">by</span>
        {author}
      </h3>
      <p className="text-sm text-slate-400 px-3 text-center py-1 bg-gray-600 rounded-full w-fit ">
        {genre}
      </p>
      <div className="flex flex-row justify-between items-center">
        <p className="font-normal">
          Published :&nbsp;
          <span className="italic text-gray-400">{publication_date}</span>
        </p>
        {user.email && (
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
        )}
      </div>
      {in_wishlist && (
        <div className="flex flex-row justify-around items-center">
          {!data.data.read_soon.includes(user.email) && (
            <Btn onClick={handleReadSoon} sm primary lebel="Read Soon" />
          )}
          {!data.data.currently_reading.includes(user.email) && (
            <Btn
              onClick={handleCurrentlyReading}
              sm
              primary
              lebel="Still Reading"
            />
          )}
          {!data.data.finished.includes(user.email) && (
            <Btn onClick={handleFinished} sm primary lebel="Finished" />
          )}
        </div>
      )}
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
