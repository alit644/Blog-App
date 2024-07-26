import { Outlet } from "react-router-dom";
import Navbarr from "../components/Nav/Navbarr";
import Footer from "../components/Footer/Footer";

const MainLayout = () => {
  return (
    <>
        <Navbarr />
      <Outlet />
      <Footer />
    </>
  );
}

export default MainLayout;
