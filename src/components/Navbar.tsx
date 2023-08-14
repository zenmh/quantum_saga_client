import { NavLink, Link } from "react-router-dom";

const Navbar = () => {
  const items = [
    {
      level: "All Books",
      path: "/all_books",
    },
    {
      level: "Sign In",
      path: "/sign_in",
    },
    {
      level: "Sign Up",
      path: "/sign_up",
    },
  ];

  return (
    <div className="flex flex-row items-center justify-between my-2 px-2 bg-gray-800">
      <Link
        to="/"
        className="cursor-pointer text-xl font-bold px-2 py-1 text-white"
      >
        Quantum Saga
      </Link>
      <ul className="flex flex-row gap-6">
        {items.map((item) => (
          <NavLink
            className="px-2 py-1 font-medium rounded-sm text-white cursor-pointer"
            to={item.path}
            key={item.path}
          >
            {item.level}
          </NavLink>
        ))}
      </ul>
    </div>
  );
};

export default Navbar;
