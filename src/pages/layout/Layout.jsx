import "./layout.scss";
import "style/dark.scss";
import Navbar from "components/navbar/Navbar";
import Sidebar from "components/sidebar/Sidebar";
import { useMode } from "utils/darkModeContext";
import { RoleAccess } from "utils/auth";

const Layout = ({ roles }) => {
    const darkMode = useMode();

    return (
        <>
            <div className={darkMode ? "layout dark" : "layout"}>
                <Navbar />
                <div className="container">
                    <Sidebar />
                    <RoleAccess roles={roles} />
                </div>
            </div>
        </>
    );
};

export default Layout;
