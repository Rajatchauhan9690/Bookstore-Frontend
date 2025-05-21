// components/Layout.jsx
import Navbar from "./Navbar";
import Footer from "./Footer";
import { Outlet } from "react-router-dom";

const Layout = ({ searchTerm, setSearchTerm }) => {
  return (
    <>
      <Navbar searchTerm={searchTerm} setSearchTerm={setSearchTerm} />
      <main>
        <Outlet />
      </main>
      <Footer />
    </>
  );
};

export default Layout;
