import { FC, ReactNode } from "react";

interface PrivateRouteProps {
  children: ReactNode;
}

const PrivateRoute: FC<PrivateRouteProps> = ({ children }) => {
  return children;
};

export default PrivateRoute;
