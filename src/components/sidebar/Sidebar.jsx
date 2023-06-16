import "./sidebar.scss";
import {
    HomeOutlined,
    StoreOutlined,
    CategoryOutlined,
    AttachMoneyOutlined,
    FormatListNumberedOutlined,
    CalendarMonthOutlined,
    GroupOutlined,
    Diversity1Outlined,
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
        link: "/dashboard",
        icon: <HomeOutlined className="icon" />,
    },
    {
        text: "Quick Menu",
        title: true,
    },
    {
        text: "Products",
        link: "/products",
        icon: <StoreOutlined className="icon" />,
    },
    {
        text: "Categories",
        link: "/categories",
        icon: <CategoryOutlined className="icon" />,
    },
    {
        text: "Transactions",
        link: "/transactions",
        icon: <AttachMoneyOutlined className="icon" />,
        show: "none",
    },
    {
        text: "Tasks",
        link: "/tasks",
        icon: <FormatListNumberedOutlined className="icon" />,
    },
    {
        text: "Calendar",
        link: "/calendar",
        icon: <CalendarMonthOutlined className="icon" />,
    },
    {
        text: "Customers",
        link: "/customers",
        icon: <GroupOutlined className="icon" />,
    },
    {
        text: "Employees",
        link: "/employees",
        icon: <Diversity1Outlined className="icon" />,
    },
    {
        text: "Feedback",
        link: "/feedback",
        icon: <ReportOutlined className="icon" />,
    },
];

const adminItems = [
    {
        text: "Manage",
        title: true,
    },
    {
        text: "Users",
        link: "/users",
        icon: <PersonOutline className="icon" />,
    },
    {
        text: "Analytics",
        link: "/admin/analytics",
        icon: <BarChartOutlined className="icon" />,
    },
];

const Sidebar = () => {
    const [active, setActive] = useState(false);
    const navigate = useNavigate();
    const { pathname } = useLocation();
    const isAdmin = checkRoleAdmin();

    const renderSidebar = ({ text, link, icon, title, show }) => {
        if (show === "none") {
            return;
        }

        if (title) {
            return (
                <h1 className="title" key={text}>
                    {text}
                </h1>
            );
        }

        return (
            <div className="item" key={text}>
                <div
                    className={`itemButton ${active === link && "active"}`}
                    onClick={() => {
                        navigate(`${link}`);
                        setActive(link);
                    }}
                >
                    {icon}
                    <span>{text}</span>
                </div>
            </div>
        );
    };

    useEffect(() => {
        setActive(pathname);
    }, [pathname]);

    return (
        <div className="sidebar">
            <div className="wrapper">
                {userItems?.map(({ text, link, icon, title, show }) => {
                    return renderSidebar({ text, link, icon, title, show });
                })}
                {isAdmin &&
                    adminItems?.map(({ text, link, icon, title, show }) => {
                        return renderSidebar({ text, link, icon, title, show });
                    })}
            </div>
        </div>
    );
};

export default Sidebar;
