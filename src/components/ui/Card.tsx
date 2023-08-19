import { FC } from "react";
import { Link } from "react-router-dom";

interface CartProps {
  title: string;
  author: string;
  genre: string;
  publication_date: string;
  id?: string;
}

const Card: FC<CartProps> = ({
  title,
  author,
  genre,
  publication_date,
  id,
}) => {
  return (
    <Link to={`/books/${id}`}>
      <div className="border-gray-600 border-2 w-[230px] h-[200px] rounded-md p-2 hover:w-[231px] hover:h-[201px] cursor-pointer transition-all flex flex-col justify-between">
        <h2 className="text-2xl font-bold text-slate-200">{title}</h2>
        <h3 className="text-lg font-medium text-slate-300">{author}</h3>
        <p className="text-sm text-slate-400 px-3 text-center py-1 bg-gray-600 rounded-full w-fit ">
          {genre}
        </p>
        <p className="font-normal">
          Published :{" "}
          <span className="italic text-gray-400">{publication_date}</span>
        </p>
      </div>
    </Link>
  );
};

export default Card;
