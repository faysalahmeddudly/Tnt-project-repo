import { Outlet } from "react-router";
import { Footer } from "../Components/shared/PublicFooter";
import Navbar from "../Components/shared/PublicNavbar";

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
