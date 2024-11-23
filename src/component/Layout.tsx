import { Outlet } from "react-router-dom";
import Footer from "./Footer";
import Header from "./Header";

const Layout = () => {
  return (
    <div>
      <Header />
      <main className="myContainer min-h-[600px]">
        <Outlet />
      </main>
      <Footer />
    </div>
  );
};

export default Layout;
