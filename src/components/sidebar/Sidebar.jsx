import "./sidebar.scss";
import {
    HomeOutlined,
    StoreOutlined,
    AttachMoneyOutlined,
    PersonOutline,
    ReportOutlined,
    BarChartOutlined,
} from "@mui/icons-material";
import { useState, useEffect } from "react";
import { useNavigate, useLocation } from "react-router-dom";

const navItems = [
    {
        text: "Dashboard",
        icon: <HomeOutlined className="icon" />,
    },
    {
        text: "Quick Menu",
        icon: null,
    },
    {
        text: "Products",
        icon: <StoreOutlined className="icon" />,
    },
    {
        text: "Transactions",
        icon: <AttachMoneyOutlined className="icon" />,
    },
    {
        text: "Customers",
        icon: <PersonOutline className="icon" />,
    },
    {
        text: "Feedback",
        icon: <ReportOutlined className="icon" />,
    },
    {
        text: "Manage",
        icon: null,
    },
    {
        text: "Users",
        icon: <PersonOutline className="icon" />,
    },
    {
        text: "Analytics",
        icon: <BarChartOutlined className="icon" />,
    },
];

const Sidebar = () => {
    const [active, setActive] = useState(false);
    const navigate = useNavigate();
    const { pathname } = useLocation();

    useEffect(() => {
        setActive(pathname.substring(1));
    }, [pathname]);

    return (
        <div className="sidebar">
            <div className="wrapper">
                {navItems.map(({ text, icon }) => {
                    if (!icon) {
                        return (
                            <p className="title" key={text}>
                                {text}
                            </p>
                        );
                    }
                    const lcText = text.toLowerCase();

                    return (
                        <div className="item" key={text}>
                            <div
                                className={
                                    active === lcText
                                        ? "itemButton active"
                                        : "itemButton"
                                }
                                onClick={() => {
                                    navigate(`/${lcText}`);
                                    setActive(lcText);
                                }}
                            >
                                {icon}
                                <span>{text}</span>
                            </div>
                        </div>
                    );
                })}
            </div>
        </div>
    );
};

export default Sidebar;
