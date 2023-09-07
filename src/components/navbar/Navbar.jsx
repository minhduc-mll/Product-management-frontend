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
import { useMode, useModeDispatch } from "utils/darkModeContext";
import { useQuery } from "@tanstack/react-query";
import { apiRequest } from "utils/apiAxios";
import { getCurrentUser } from "utils/auth";
import defaultAvatar from "assets/images/no-avatar.jpg";
import logo from "assets/images/hgtp-logo.png";

const Navbar = () => {
    const darkMode = useMode();
    const dispatch = useModeDispatch();
    const [isMenuOpen, setIsMenuOpen] = useState(false);
    const menuRef = useRef(null);
    const navigate = useNavigate();

    const currentUser = getCurrentUser();
    const username = currentUser?.username;

    const {
        isLoading,
        error,
        data: user,
    } = useQuery({
        queryKey: [`profile`, username],
        queryFn: async () => {
            const res = await apiRequest.get(`/users/profile/${username}`);
            return res.data;
        },
        enabled: !!username,
    });

    const handleSwitchAppearance = () => {
        try {
            dispatch({ type: "TOGGLE" });
        } catch (err) {
            console.log(err.message);
        }
    };

    const handleLogin = async () => {
        try {
            localStorage.removeItem("currentUser");
            navigate(`/login`);
        } catch (err) {
            console.log(err.message);
        }
    };

    const handleLogout = async () => {
        try {
            await apiRequest.post(`/auth/logout`);
            localStorage.removeItem("currentUser");
            navigate(`/login`);
        } catch (err) {
            console.log(err.message);
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
        <div className="navbar" id="navbar">
            <div className="wrapper">
                <div className="left">
                    <Link to={`/`} className="link">
                        <div className="logo">
                            <img src={logo} alt="HGTP" className="logo" />
                            <span className="character">H</span>
                            <span className="character">G</span>
                            <span className="character">T</span>
                            <span className="character">P</span>
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
                    {isLoading || error ? (
                        <div className="link" onClick={handleLogin}>
                            <span>Login</span>
                        </div>
                    ) : (
                        <div className="user" ref={menuRef}>
                            <img
                                src={user?.image || defaultAvatar}
                                alt=""
                                className="avatar"
                                onClick={handleOpenMenu}
                            />
                            {isMenuOpen && (
                                <ul className="options">
                                    <li className="userTitle">
                                        {user?.username}
                                    </li>
                                    <Link
                                        to={`/${user?.username}`}
                                        className="link"
                                    >
                                        <li
                                            className="optionItem"
                                            onClick={() => {
                                                handleOpenMenu();
                                                navigate(`/${user?.username}`);
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
                    )}
                </div>
            </div>
        </div>
    );
};

export default Navbar;
