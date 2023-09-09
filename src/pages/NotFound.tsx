import { Link } from "react-router-dom";

const NotFound = () => {
  return (
    <div className="flex flex-row items-center justify-center">
      <div className="flex flex-col items-center justify-center h-screen w-screen">
        <h2 className="text-3xl font-bold text-sky-400">
          Ooops, Page Not Found !!!
        </h2>
        <Link
          to="/"
          className="text-blue-500 font-bold underline mt-2 cursor-pointer"
        >
          Back To Home
        </Link>
      </div>
    </div>
  );
};

export default NotFound;
