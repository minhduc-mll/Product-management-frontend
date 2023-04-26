import "./sidebar.scss";
import {
    HomeOutlined,
    StoreOutlined,
    CategoryOutlined,
    AttachMoneyOutlined,
    CalendarMonthOutlined,
    GroupOutlined,
    ReportOutlined,
    PersonOutline,
    BarChartOutlined,
} from "@mui/icons-material";
import { useState, useEffect } from "react";
import { useNavigate, useLocation } from "react-router-dom";
import { checkRoleAdmin } from "utils/auth";

const userItems = [
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
        text: "Categories",
        icon: <CategoryOutlined className="icon" />,
    },
    {
        text: "Transactions",
        icon: <AttachMoneyOutlined className="icon" />,
    },
    {
        text: "Calendar",
        icon: <CalendarMonthOutlined className="icon" />,
    },
    {
        text: "Customers",
        icon: <GroupOutlined className="icon" />,
    },
    {
        text: "Feedback",
        icon: <ReportOutlined className="icon" />,
    },
];

const adminItems = [
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
    const isAdmin = checkRoleAdmin();

    const renderSidebar = ({ text, icon }) => {
        if (!icon) {
            return (
                <h1 className="title" key={text}>
                    {text}
                </h1>
            );
        }
        const lcText = text.toLowerCase();

        return (
            <div className="item" key={text}>
                <div
                    className={
                        active === lcText ? "itemButton active" : "itemButton"
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
    };

    useEffect(() => {
        setActive(pathname.substring(1));
    }, [pathname]);

    return (
        <div className="sidebar">
            <div className="wrapper">
                {userItems?.map(({ text, icon }) => {
                    return renderSidebar({ text, icon });
                })}
                {isAdmin &&
                    adminItems?.map(({ text, icon }) => {
                        return renderSidebar({ text, icon });
                    })}
            </div>
        </div>
    );
};

export default Sidebar;
