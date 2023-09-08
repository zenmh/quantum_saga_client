import { createBrowserRouter } from "react-router-dom";
import App from "../App";
import {
  AddNewBook,
  AllBooks,
  EditBook,
  Home,
  NotFound,
  SignIn,
  SignUp,
  Wishlist,
} from "../pages";
import { BookDetails } from "../components";
import PrivateRoute from "./PrivateRoute";

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
        path: "add_new_book",
        element: (
          <PrivateRoute>
            <AddNewBook />
          </PrivateRoute>
        ),
      },
      {
        path: "wishlist",
        element: (
          <PrivateRoute>
            <Wishlist />
          </PrivateRoute>
        ),
      },
      {
        path: "books/:id",
        element: <BookDetails />,
      },
      {
        path: "edit_book/:id",
        element: <EditBook />,
      },
      {
        path: "*",
        element: <NotFound />,
      },
    ],
  },
]);

export default routes;
