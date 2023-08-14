import { FC } from "react";
import { NavLink } from "react-router-dom";

interface NavItemProps {
  lebel: string;
  to: string;
}

const NavItem: FC<NavItemProps> = ({ lebel, to }) => {
  return (
    <NavLink
      className="text-sm px-2 py-1 font-medium rounded-sm cursor-pointer"
      to={to}
    >
      {lebel}
    </NavLink>
  );
};

export default NavItem;
