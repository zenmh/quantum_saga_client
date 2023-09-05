import { FC, ReactNode } from "react";
import { Navigate, useLocation } from "react-router-dom";
import { useAppSelector } from "../redux/hook";
import { Spinner } from "../components/ui";

interface PrivateRouteProps {
  children: ReactNode;
}

const PrivateRoute: FC<PrivateRouteProps> = ({ children }) => {
  const { pathname } = useLocation();
  const { user, isLoading } = useAppSelector((state) => state.user);

  if (isLoading) return <Spinner />;

  if (!user.email && !isLoading)
    return <Navigate to="/sign_in" state={{ path: pathname }} />;

  return children;
};

export default PrivateRoute;
