import { createBrowserRouter } from "react-router-dom";
import App from "../App";
import { AllBooks, Home, NotFound, SignIn, SignUp } from "../pages";

const routes = createBrowserRouter([
  {
    path: "/",
    element: <App />,
    children: [
      {
        index: true,
        element: <Home />,
      },
      {
        path: "all_books",
        element: <AllBooks />,
      },
      {
        path: "sign_in",
        element: <SignIn />,
      },
      {
        path: "sign_up",
        element: <SignUp />,
      },
      {
        path: "*",
        element: <NotFound />,
      },
    ],
  },
]);

export default routes;
