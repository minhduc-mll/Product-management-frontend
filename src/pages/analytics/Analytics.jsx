import "./analytics.scss";
import {
    PersonOutlined,
    StoreOutlined,
    AccountBalanceWalletOutlined,
} from "@mui/icons-material";

import StatisticsCard from "components/statisticsCard/StatisticsCard";
import Featured from "components/featured/Featured";
import Chart from "components/chart/Chart";
import { useQuery } from "@tanstack/react-query";
import { apiRequest } from "utils/apiAxios";

const stats = [
    {
        id: 1,
        query: "users",
        title: "USERS",
        isMoney: false,
        amount: 100,
        to: "/users",
        link: "View all users",
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
        id: 3,
        query: "customers",
        title: "CUSTOMERS",
        isMoney: false,
        amount: 100,
        to: "/customers",
        link: "View all customers",
        icon: (
            <PersonOutlined
                className="icon"
                style={{
                    color: "green",
                    backgroundColor: "rgba(0, 128, 0, 0.2)",
                }}
            />
        ),
    },
    {
        id: 2,
        query: "products",
        title: "PRODUCTS",
        isMoney: false,
        amount: 100,
        to: "/products",
        link: "View all products",
        icon: (
            <StoreOutlined
                className="icon"
                style={{
                    color: "goldenrod",
                    backgroundColor: "rgba(218, 165, 32, 0.2)",
                }}
            />
        ),
    },
    {
        id: 4,
        query: "totalDeposit",
        title: "TOTAL DEPOSIT",
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

const Analytics = () => {
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

    return (
        <div className="analytics">
            <div className="widgets">
                {stats.map((stat) => (
                    <StatisticsCard stat={stat} key={stat.id} />
                ))}
            </div>
            <div className="charts">
                <Featured />
                {isLoadingChart ? (
                    "Loading..."
                ) : errorChart ? (
                    <Chart
                        title={errorChart.message}
                        aspect={2 / 1}
                        data={null}
                    />
                ) : (
                    <Chart
                        title="Products Per Month"
                        aspect={2 / 1}
                        data={dataChart}
                    />
                )}
            </div>
        </div>
    );
};

export default Analytics;
