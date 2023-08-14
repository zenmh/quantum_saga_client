import { Footer, Navbar } from "../components";
import { Outlet } from "react-router-dom";

const Main = () => {
  return (
    <div className="max-w-[1444px] mx-auto">
      <Navbar />
      <div>
        <Outlet />
      </div>
      <Footer />
    </div>
  );
};

export default Main;
