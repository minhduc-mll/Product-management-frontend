import "./navbar.scss";
import {
    ChatBubbleOutlineOutlined,
    NotificationsNoneOutlined,
    AccountCircleOutlined,
    LightModeOutlined,
    DarkModeOutlined,
    SettingsOutlined,
    ExitToApp,
} from "@mui/icons-material";
import { useState, useEffect, useRef } from "react";
import { Link, useNavigate } from "react-router-dom";
import { apiRequest, getCurrentUser } from "utils/apiAxios";
import { useMode, useModeDispatch } from "utils/darkModeContext";

const Navbar = () => {
    const darkMode = useMode();
    const dispatch = useModeDispatch();
    const [isMenuOpen, setIsMenuOpen] = useState(false);
    const menuRef = useRef(null);
    const navigate = useNavigate();

    const currentUser = getCurrentUser();

    const handleSwitchAppearance = () => {
        try {
            dispatch({ type: "TOGGLE" });
        } catch (err) {
            console.log(err);
        }
    };

    const handleLogout = async () => {
        try {
            await apiRequest.post("/auth/logout");
            localStorage.removeItem("currentUser");
            navigate("/login");
        } catch (err) {
            console.log(err);
        }
    };

    const handleOpenMenu = () => {
        setIsMenuOpen(!isMenuOpen);
    };

    useEffect(() => {
        // Click outside menu
        const handleClickOutside = (event) => {
            if (menuRef.current && !menuRef.current.contains(event.target)) {
                setIsMenuOpen(false);
            }
        };
        document.addEventListener("click", handleClickOutside);
        return () => {
            document.removeEventListener("click", handleClickOutside);
        };
    }, [menuRef]);

    return (
        <div className="navbar">
            <div className="wrapper">
                <div className="left">
                    <Link to={`/`} className="link">
                        <div className="logo">
                            <span className="character">h</span>
                            <span className="character">g</span>
                            <span className="character">t</span>
                            <span className="character">p</span>
                        </div>
                    </Link>
                </div>
                <div className="right">
                    <div className="item">
                        <ChatBubbleOutlineOutlined className="icon" />
                        <div className="counter">1</div>
                    </div>
                    <div className="item">
                        <NotificationsNoneOutlined className="icon" />
                        <div className="counter">10</div>
                    </div>
                    {currentUser ? (
                        <div className="user" ref={menuRef}>
                            <img
                                src={
                                    currentUser?.img ||
                                    "https://res.cloudinary.com/dupx03lpv/image/upload/v1680784810/hgtp/no-avata.jpg"
                                }
                                alt=""
                                className="avatar"
                                onClick={handleOpenMenu}
                            />
                            {isMenuOpen && (
                                <ul className="options">
                                    <li className="userTitle">
                                        {currentUser?.username}
                                    </li>
                                    <Link
                                        to={`/users/${currentUser?._id}`}
                                        className="link"
                                    >
                                        <li
                                            className="optionItem"
                                            onClick={() => {
                                                handleOpenMenu();
                                                navigate(
                                                    `/users/${currentUser?._id}`
                                                );
                                            }}
                                        >
                                            <span>Profile</span>
                                            <AccountCircleOutlined className="icon" />
                                        </li>
                                    </Link>
                                    <Link to={`/settings`} className="link">
                                        <li
                                            className="optionItem"
                                            onClick={handleOpenMenu}
                                        >
                                            <span>Settings</span>
                                            <SettingsOutlined className="icon" />
                                        </li>
                                    </Link>
                                    <li
                                        className="optionItem"
                                        onClick={handleSwitchAppearance}
                                    >
                                        <span>Switch Appearance</span>
                                        {darkMode ? (
                                            <LightModeOutlined className="icon" />
                                        ) : (
                                            <DarkModeOutlined className="icon" />
                                        )}
                                    </li>
                                    <li
                                        className="optionItem"
                                        onClick={handleLogout}
                                    >
                                        <span>Logout</span>
                                        <ExitToApp className="icon" />
                                    </li>
                                </ul>
                            )}
                        </div>
                    ) : (
                        <Link to={`/login`} className="link">
                            <div className="item">Sign in</div>
                        </Link>
                    )}
                </div>
            </div>
        </div>
    );
};

export default Navbar;
