import { ToastContainer } from "react-toastify";
import Main from "./layouts/Main";
import { useEffect } from "react";
import { useAppDispatch } from "./redux/hook";
import { setLoading, setUser } from "./redux/features/user/userSlice";
import { onAuthStateChanged } from "firebase/auth";
import auth from "./utils/firebase";

const App = () => {
  const dispatch = useAppDispatch();

  useEffect(() => {
    dispatch(setLoading(true));

    onAuthStateChanged(auth, (user) => {
      if (user) {
        dispatch(setUser(user.email));
        dispatch(setLoading(false));
      } else {
        dispatch(setLoading(false));
      }
    });
  }, [dispatch]);

  return (
    <>
      <Main />
      <ToastContainer
        position="bottom-left"
        autoClose={1000}
        hideProgressBar={false}
        newestOnTop={false}
        closeOnClick
        rtl={false}
        pauseOnFocusLoss
        draggable
        pauseOnHover
        theme="dark"
      />
    </>
  );
};

export default App;
