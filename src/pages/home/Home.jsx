import "./home.scss";
import {
    PersonOutlined,
    ShoppingCartOutlined,
    MonetizationOnOutlined,
    AccountBalanceWalletOutlined,
} from "@mui/icons-material";

import WidgetCard from "components/statisticsCard/StatisticsCard";
import Featured from "components/featured/Featured";
import Chart from "components/chart/Chart";
import Table from "components/table/Table";

const widgets = [
    {
        id: 1,
        title: "USERS",
        isMoney: false,
        amount: 100,
        diff: 20,
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
    },
    {
        id: 2,
        title: "PRODUCTS",
        isMoney: false,
        amount: 100,
        diff: 20,
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
    },
    {
        id: 3,
        title: "EARNINGS",
        isMoney: true,
        amount: 100,
        diff: 20,
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
    },
    {
        id: 4,
        title: "BALANCE",
        isMoney: true,
        amount: 100,
        diff: 20,
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
    },
];

const Home = () => {
    return (
        <div className="home">
            <div className="widgets">
                {widgets.map((widget) => (
                    <WidgetCard data={widget} key={widget.id} />
                ))}
            </div>
            <div className="charts">
                <Featured />
                <Chart title="Last 6 Months (Revenue)" aspect={2 / 1} />
            </div>
            <div className="lists">
                <Table title="Latest Transactions" />
            </div>
        </div>
    );
};

export default Home;
