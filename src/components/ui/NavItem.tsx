import { FC } from "react";
import { NavLink } from "react-router-dom";

interface NavItemProps {
  lebel: string;
  to?: string;
  onClick?: () => void;
}

const NavItem: FC<NavItemProps> = ({ lebel, to, onClick }) => {
  return (
    <NavLink
      onClick={onClick}
      className="text-sm px-2 py-1 font-medium rounded-sm cursor-pointer"
      to={to}
    >
      {lebel}
    </NavLink>
  );
};

export default NavItem;
