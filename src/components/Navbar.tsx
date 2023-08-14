import { Link } from "react-router-dom";
import { NavItem } from "./ui";

const Navbar = () => {
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
        <NavItem lebel="Sign In" to="/sign_in" />
        <NavItem lebel="Sign Up" to="/sign_up" />
        <NavItem lebel="Logout" to="/" />
      </ul>
    </div>
  );
};

export default Navbar;
