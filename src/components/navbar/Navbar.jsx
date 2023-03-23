import "./navbar.scss";
import avata from "../../assets/ava.jpg";
import LanguageOutlinedIcon from "@mui/icons-material/LanguageOutlined";
import DarkModeOutlinedIcon from "@mui/icons-material/DarkModeOutlined";
import LightModeOutlinedIcon from "@mui/icons-material/LightModeOutlined";
import NotificationsNoneOutlinedIcon from "@mui/icons-material/NotificationsNoneOutlined";
import ChatBubbleOutlineOutlinedIcon from "@mui/icons-material/ChatBubbleOutlineOutlined";
import SettingsOutlinedIcon from "@mui/icons-material/SettingsOutlined";
import { Link } from "react-router-dom";
import { useContext } from "react";
import { DarkModeContext } from "../../context/darkModeContext";

const Navbar = () => {
    const { dispatch } = useContext(DarkModeContext);

    return (
        <div className="navbar">
            <div className="wrapper">
                <div className="left">
                    <Link to="/" className="link">
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
                        <LanguageOutlinedIcon className="icon" />
                        English
                    </div>
                    <div className="item">
                        <DarkModeOutlinedIcon
                            className="icon"
                            onClick={() => dispatch({ type: "DARK" })}
                        />
                    </div>
                    <div className="item">
                        <LightModeOutlinedIcon
                            className="icon"
                            onClick={() => dispatch({ type: "LIGHT" })}
                        />
                    </div>
                    <div className="item">
                        <NotificationsNoneOutlinedIcon className="icon" />
                        <div className="counter">1</div>
                    </div>
                    <div className="item">
                        <ChatBubbleOutlineOutlinedIcon className="icon" />
                        <div className="counter">2</div>
                    </div>
                    <div className="item">
                        <SettingsOutlinedIcon className="icon" />
                    </div>
                    <div className="item">
                        <img src={avata} alt="" className="avatar" />
                    </div>
                </div>
            </div>
        </div>
    );
};

export default Navbar;
