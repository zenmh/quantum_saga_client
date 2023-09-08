import { Link, useNavigate } from "react-router-dom";
import { NavItem } from "./ui";
import { useAppDispatch, useAppSelector } from "../redux/hook";
import { signOut } from "firebase/auth";
import auth from "../utils/firebase";
import { setUser } from "../redux/features/user/userSlice";
import { toast } from "react-toastify";

const Navbar = () => {
  const dispatch = useAppDispatch();
  const navigate = useNavigate();
  const { user } = useAppSelector((state) => state.user);

  const handleLogout = () => {
    signOut(auth).then(() => {
      dispatch(setUser(null));

      toast.info("Log out successfully !", {
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
    });
  };

  return (
    <div className="flex flex-row items-center justify-between my-2 px-2 bg-gray-800">
      <Link
        to="/"
        className="cursor-pointer text-xl font-bold px-2 py-1 text-white"
      >
        Quantum Saga
      </Link>
      <ul className="flex flex-row gap-6">
        <NavItem lebel="All Books" to="/all_books" />
        <NavItem lebel="Add New Book" to="/add_new_book" />
        <NavItem lebel="Wishlist" to="/wishlist" />
        {!user.email && (
          <>
            <NavItem lebel="Sign In" to="/sign_in" />
            <NavItem lebel="Sign Up" to="/sign_up" />
          </>
        )}
        {user.email && <NavItem onClick={handleLogout} lebel="Logout" />}
      </ul>
    </div>
  );
};

export default Navbar;
