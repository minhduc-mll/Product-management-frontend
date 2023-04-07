import "./layout.scss";
import "style/dark.scss";
import Navbar from "components/navbar/Navbar";
import Sidebar from "components/sidebar/Sidebar";
import { Outlet } from "react-router-dom";
import { useMode } from "utils/darkModeContext";

const Layout = () => {
    const darkMode = useMode();

    return (
        <div className={darkMode ? "layout dark" : "layout"}>
            <Navbar />
            <div className="container">
                <Sidebar />
                <Outlet />
            </div>
        </div>
    );
};

export default Layout;
