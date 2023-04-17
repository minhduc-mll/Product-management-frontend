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
        queryKey: ["analys", "chart"],
        queryFn: async () => {
            const res = await apiRequest.get(`/analys/productsByMonth`);
            return res.data;
        },
    });

    const {
        isLoading: isLoadingProductEvent,
        error: errorProductEvent,
        data: dataProductEvent,
    } = useQuery({
        queryKey: ["analys", "events"],
        queryFn: async () => {
            const res = await apiRequest.get(`/analys/productArrivalEvent`);
            return res.data;
        },
    });

    return (
        <div className="home">
            <div className="homeTop">
                <div className="homeStats">
                    {stats.map((stat) => (
                        <StatisticsCard stat={stat} key={stat.id} />
                    ))}
                </div>
                <div className="homeCalendar">
                    {isLoadingProductEvent ? (
                        "Loading..."
                    ) : errorProductEvent ? (
                        <CalendarCard
                            title={errorProductEvent.message}
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
                            initialEvents={dataProductEvent}
                        />
                    )}
                </div>
            </div>
            <div className="homeMiddle">
                <div className="homeList">
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
            <div className="homeBottom">
                <div className="homeChart">
                    {isLoadingChart ? (
                        "Loading..."
                    ) : errorChart ? (
                        <Chart
                            title={errorChart.message}
                            aspect={3 / 1}
                            data={null}
                        />
                    ) : (
                        <Chart
                            title="Products count by month"
                            aspect={3 / 1}
                            data={dataChart}
                        />
                    )}
                </div>
            </div>
        </div>
    );
};

export default Home;
