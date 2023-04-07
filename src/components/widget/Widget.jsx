import "./widget.scss";
import {
    KeyboardArrowUp,
    PersonOutlined,
    ShoppingCartOutlined,
    MonetizationOnOutlined,
    AccountBalanceWalletOutlined,
} from "@mui/icons-material";
import { Link } from "react-router-dom";

const Widget = ({ type }) => {
    let data;

    // temporary data
    const amount = 100;
    const diff = 20;

    switch (type) {
        case "user":
            data = {
                title: "USERS",
                isMoney: false,
                to: "/users",
                link: "See all users",
                icon: (
                    <PersonOutlined
                        className="icon"
                        style={{
                            color: "crimson",
                            backgroundColor: "rgba(255, 0, 0, 0.2)",
                        }}
                    />
                ),
            };
            break;
        case "order":
            data = {
                title: "PRODUCTS",
                isMoney: false,
                to: "/products",
                link: "View all products",
                icon: (
                    <ShoppingCartOutlined
                        className="icon"
                        style={{
                            color: "goldenrod",
                            backgroundColor: "rgba(218, 165, 32, 0.2)",
                        }}
                    />
                ),
            };
            break;
        case "earning":
            data = {
                title: "EARNINGS",
                isMoney: true,
                to: "/comingsoon",
                link: "View net earnings",
                icon: (
                    <MonetizationOnOutlined
                        className="icon"
                        style={{
                            color: "green",
                            backgroundColor: "rgba(0, 128, 0, 0.2)",
                        }}
                    />
                ),
            };
            break;
        case "balance":
            data = {
                title: "BALANCE",
                isMoney: true,
                to: "/comingsoon",
                link: "See details",
                icon: (
                    <AccountBalanceWalletOutlined
                        className="icon"
                        style={{
                            color: "purple",
                            backgroundColor: "rgba(128, 0, 128, 0.2)",
                        }}
                    />
                ),
            };
            break;
        default:
            break;
    }

    return (
        <div className="widget">
            <div className="left">
                <span className="title">{data.title}</span>
                <span className="counter">
                    {data.isMoney && "$"} {amount}
                </span>
                <Link to={data.to} className="link">
                    {data.link}
                </Link>
            </div>
            <div className="right">
                <div className="percentage positive">
                    <KeyboardArrowUp className="icon" /> {diff}%
                </div>
                {data.icon}
            </div>
        </div>
    );
};

export default Widget;
