import "./sidebar.scss";
import HomeOutlinedIcon from "@mui/icons-material/HomeOutlined";
import StoreOutlinedIcon from "@mui/icons-material/StoreOutlined";
import AttachMoneyOutlinedIcon from "@mui/icons-material/AttachMoneyOutlined";
import PersonOutlineIcon from "@mui/icons-material/PersonOutline";
import ReportOutlinedIcon from "@mui/icons-material/ReportOutlined";
import BarChartOutlinedIcon from "@mui/icons-material/BarChartOutlined";
import SettingsOutlinedIcon from "@mui/icons-material/SettingsOutlined";
import AccountCircleOutlinedIcon from "@mui/icons-material/AccountCircleOutlined";
import DarkModeOutlinedIcon from "@mui/icons-material/DarkModeOutlined";
import ExitToAppIcon from "@mui/icons-material/ExitToApp";
import { Link } from "react-router-dom";
import { useContext } from "react";
import { DarkModeContext } from "../../context/darkModeContext";

const Sidebar = () => {
    const { dispatch } = useContext(DarkModeContext);

    return (
        <div className="sidebar">
            <div className="wrapper">
                <div className="menu">
                    <p className="title">Dashboard</p>
                    <ul className="items">
                        <Link to="/" className="link">
                            <li className="item">
                                <HomeOutlinedIcon className="icon" />
                                <span>Home</span>
                            </li>
                        </Link>
                    </ul>
                </div>
                <div className="menu">
                    <p className="title">Quick Menu</p>
                    <ul className="items">
                        <Link to="/products" className="link">
                            <li className="item">
                                <StoreOutlinedIcon className="icon" />
                                <span>Products</span>
                            </li>
                        </Link>
                        <li className="item">
                            <AttachMoneyOutlinedIcon className="icon" />
                            <span>Transactions</span>
                        </li>
                        <Link to="/customers" className="link">
                            <li className="item">
                                <PersonOutlineIcon className="icon" />
                                <span>Customers</span>
                            </li>
                        </Link>
                        <li className="item">
                            <ReportOutlinedIcon className="icon" />
                            <span>Feedback</span>
                        </li>
                    </ul>
                </div>
                <div className="menu">
                    <p className="title">Manage</p>
                    <ul className="items">
                        <Link to="/users" className="link">
                            <li className="item">
                                <PersonOutlineIcon className="icon" />
                                <span>Users</span>
                            </li>
                        </Link>
                        <li className="item">
                            <BarChartOutlinedIcon className="icon" />
                            <span>Analytics</span>
                        </li>
                    </ul>
                </div>
                <div className="menu">
                    <p className="title">USER</p>
                    <ul className="items">
                        <Link to="/users/1" className="link">
                            <li className="item">
                                <AccountCircleOutlinedIcon className="icon" />
                                <span>Profile</span>
                            </li>
                        </Link>
                        <Link to="/settings" className="link">
                            <li className="item">
                                <SettingsOutlinedIcon className="icon" />
                                <span>Settings</span>
                            </li>
                        </Link>
                        <li
                            className="item"
                            onClick={() => dispatch({ type: "TOGGLE" })}
                        >
                            <DarkModeOutlinedIcon className="icon" />
                            <span>Switch Appearance</span>
                        </li>
                        <Link to="/logout" className="link">
                            <li className="item">
                                <ExitToAppIcon className="icon" />
                                <span>Logout</span>
                            </li>
                        </Link>
                    </ul>
                </div>
            </div>
        </div>
    );
};

export default Sidebar;
