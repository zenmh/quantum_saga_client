import { Link } from "react-router-dom";

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
    <div>
      <div>Quantum Saga</div>
      <ul>
        {items.map((item) => (
          <Link to={item.path}>{item.level}</Link>
        ))}
      </ul>
    </div>
  );
};

export default Navbar;
