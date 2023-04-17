import "./home.scss";
import {
    PersonOutlined,
    ShoppingCartOutlined,
    MonetizationOnOutlined,
    AccountBalanceWalletOutlined,
} from "@mui/icons-material";

import StatisticsCard from "components/statisticsCard/StatisticsCard";
import CalendarCard from "components/calendarCard/CalendarCard";
import Chart from "components/chart/Chart";
import Regulartable from "components/regulartable/Regulartable";
import { useQuery } from "@tanstack/react-query";
import { apiRequest } from "utils/apiAxios";

const stats = [
    {
        id: 1,
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
    },
    {
        id: 2,
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
    },
    {
        id: 3,
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
    },
    {
        id: 4,
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
    },
];

const Home = () => {
    const {
        isLoading: isLoadingProducts,
        error: errorProducts,
        data: dataProducts,
    } = useQuery({
        queryKey: ["products", "home"],
        queryFn: async () => {
            const res = await apiRequest.get(`/products?status=pending`);
            return res.data;
        },
    });

    const {
        isLoading: isLoadingChart,
        error: errorChart,
        data: dataChart,
    } = useQuery({
        queryKey: ["analys", "chart", "home"],
        queryFn: async () => {
            const res = await apiRequest.get(`/analys/productsByMonth`);
            return res.data;
        },
    });

    const {
        isLoading: isLoadingEvent,
        error: errorEvent,
        data: dataEvent,
    } = useQuery({
        queryKey: ["events"],
        queryFn: async () => {
            const res = await apiRequest.get(`/events`);
            return res.data;
        },
    });

    return (
        <div className="home">
            <div className="statistics">
                {stats.map((stat) => (
                    <StatisticsCard stat={stat} key={stat.id} />
                ))}
            </div>
            <div className="charts">
                {isLoadingEvent ? (
                    "Loading..."
                ) : errorEvent ? (
                    <CalendarCard
                        title={errorEvent.message}
                        center="title"
                        initialView="listMonth"
                        editable={false}
                        initialEvents={null}
                    />
                ) : (
                    <CalendarCard
                        title="Calendar"
                        height="auto"
                        center="title"
                        initialView="dayGridMonth"
                        editable={false}
                        initialEvents={dataEvent}
                    />
                )}
                {isLoadingChart ? (
                    "Loading..."
                ) : errorChart ? (
                    <Chart
                        title={errorChart.message}
                        aspect={5 / 3}
                        data={null}
                    />
                ) : (
                    <Chart
                        title="Products count by month"
                        aspect={5 / 3}
                        data={dataChart}
                    />
                )}
            </div>
            <div className="lists">
                {isLoadingProducts ? (
                    "Loading..."
                ) : errorProducts ? (
                    <Regulartable
                        title={errorProducts.message}
                        products={null}
                    />
                ) : (
                    <Regulartable
                        title="Unsold Product"
                        products={dataProducts}
                    />
                )}
            </div>
        </div>
    );
};

export default Home;
