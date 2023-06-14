import "./analytics.scss";
import {
    PersonOutlined,
    AccountBalanceWalletOutlined,
    MonetizationOnOutlined,
} from "@mui/icons-material";
import StatisticsCard from "components/statisticsCard/StatisticsCard";
import Chart from "components/chart/Chart";
import { useQuery } from "@tanstack/react-query";
import { apiRequest } from "utils/apiAxios";
import dateFormat from "dateformat";

const today = new Date();
const thisMonth = dateFormat(today, "mmmm").toUpperCase();
const thisMonthNum = today.getMonth() + 1;
const thisYearNum = today.getFullYear();

const stats = [
    {
        id: 1,
        title: "USERS",
        menu: [],
        query: "users",
        isMoney: false,
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
        id: 2,
        title: "CUSTOMERS",
        menu: [],
        query: "customers",
        isMoney: false,
        to: "/customers",
        link: "View all customers",
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
        title: "TOTAL DEPOSIT",
        menu: [],
        query: "totalDeposit",
        isMoney: true,
        diff: 68,
        to: "",
        link: "See details",
        icon: (
            <AccountBalanceWalletOutlined
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
        title: `REVENUE ( ${thisMonth} ${thisYearNum})`,
        menu: [],
        query: `totalRevenueByMonth?month=${thisMonthNum}&year=${thisYearNum}`,
        isMoney: true,
        to: "",
        link: "See details",
        icon: (
            <MonetizationOnOutlined
                className="icon"
                style={{
                    color: "purple",
                    backgroundColor: "rgba(128, 0, 128, 0.2)",
                }}
            />
        ),
    },
    {
        id: 5,
        title: `PROFITS ( ${thisMonth} ${thisYearNum})`,
        menu: [],
        query: `totalProfitsByMonth?month=${thisMonthNum}&year=${thisYearNum}`,
        isMoney: true,
        to: "",
        link: "See details",
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
];

const Analytics = () => {
    const {
        isLoading: isLoadingProductChart,
        error: errorProductChart,
        data: dataProductChart,
    } = useQuery({
        queryKey: ["analys", "chart", "productByMonth"],
        queryFn: async () => {
            const res = await apiRequest.get(
                `/analys/productsByMonth?year=${thisYearNum}`
            );
            return res.data;
        },
    });

    const {
        isLoading: isLoadingProfitChart,
        error: errorProfitChart,
        data: dataProfitChart,
    } = useQuery({
        queryKey: ["analys", "chart", "profitsByMonth"],
        queryFn: async () => {
            const res = await apiRequest.get(
                `/analys/profitsByMonth?year=${thisYearNum}`
            );
            return res.data;
        },
    });

    const {
        isLoading: isLoadingCategoryChart,
        error: errorCategoryChart,
        data: dataCategoryChart,
    } = useQuery({
        queryKey: ["analys", "chart", "categoryByMonth"],
        queryFn: async () => {
            const res = await apiRequest.get(
                `/analys/productsPerCategoryByMonth?year=${thisYearNum}`
            );
            return res.data;
        },
    });

    const {
        isLoading: isLoadingProfitCategoryChart,
        error: errorProfitCategoryChart,
        data: dataProfitCategoryChart,
    } = useQuery({
        queryKey: ["analys", "chart", "profitPerCategoryByMonth"],
        queryFn: async () => {
            const res = await apiRequest.get(
                `/analys/profitsPerCategoryByMonth?year=${thisYearNum}`
            );
            return res.data;
        },
    });

    return (
        <div className="analytics">
            <div className="analyticsTop">
                <div className="analyticsStats">
                    {stats?.map((value, index) => (
                        <StatisticsCard stat={value} key={index} />
                    ))}
                </div>
            </div>
            <div className="analyticsMiddle">
                <div className="analyticsChart">
                    {isLoadingProductChart ? (
                        "Loading..."
                    ) : errorProductChart ? (
                        <Chart
                            title={errorProductChart.message}
                            aspect={2 / 1}
                            data={null}
                            initChart="LineChart"
                            dataKey="month"
                        />
                    ) : (
                        <Chart
                            title={`Product analysis by month ${thisYearNum}`}
                            aspect={2 / 1}
                            data={dataProductChart}
                            initChart="LineChart"
                            dataKey="month"
                        />
                    )}
                </div>
                <div className="analyticsChart">
                    {isLoadingProfitChart ? (
                        "Loading..."
                    ) : errorProfitChart ? (
                        <Chart
                            title={errorProfitChart.message}
                            aspect={2 / 1}
                            data={null}
                            initChart="LineChart"
                            dataKey="month"
                        />
                    ) : (
                        <Chart
                            title={`Profits analysis by month ${thisYearNum}`}
                            aspect={2 / 1}
                            data={dataProfitChart}
                            initChart="BarChart"
                            dataKey="month"
                        />
                    )}
                </div>
            </div>
            <div className="analyticsBottom">
                <div className="analyticsChart">
                    {isLoadingCategoryChart ? (
                        "Loading..."
                    ) : errorCategoryChart ? (
                        <Chart
                            title={errorCategoryChart.message}
                            aspect={2 / 1}
                            data={null}
                            initChart="LineChart"
                            dataKey="month"
                        />
                    ) : (
                        <Chart
                            title={`Category analysis by month ${thisYearNum}`}
                            aspect={2 / 1}
                            data={dataCategoryChart}
                            initChart="LineChart"
                            dataKey="month"
                        />
                    )}
                </div>
                <div className="analyticsChart">
                    {isLoadingProfitCategoryChart ? (
                        "Loading..."
                    ) : errorProfitCategoryChart ? (
                        <Chart
                            title={errorProfitCategoryChart.message}
                            aspect={2 / 1}
                            data={null}
                            initChart="LineChart"
                            dataKey="month"
                        />
                    ) : (
                        <Chart
                            title={`Profits Per Category analysis by month ${thisYearNum}`}
                            aspect={2 / 1}
                            data={dataProfitCategoryChart}
                            initChart="LineChart"
                            dataKey="month"
                        />
                    )}
                </div>
            </div>
        </div>
    );
};

export default Analytics;
