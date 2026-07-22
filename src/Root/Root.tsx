import { Outlet } from "react-router";
import { Footer } from "../Components/Footer";
import Navbar from "../Components/Navbar";

export const Root = () => {
  return (
    <>
      <Navbar />
      <div className="min-h-screen">
        <Outlet />
      </div>
      <Footer />
    </>
  );
};
