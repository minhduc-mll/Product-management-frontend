import "./analytics.scss";
import {
    PersonOutlined,
    AccountBalanceWalletOutlined,
    MonetizationOnOutlined,
} from "@mui/icons-material";
import StatisticsCard from "components/statisticsCard/StatisticsCard";
import CalendarCard from "components/calendarCard/CalendarCard";
import Chart from "components/chart/Chart";
import { useQuery } from "@tanstack/react-query";
import { apiRequest } from "utils/apiAxios";
import dateFormat from "dateformat";

const today = new Date();
const thisMonth = dateFormat(today, "mmmm yyyy").toUpperCase();
const thisMonthNum = today.getMonth() + 1;
const thisYearNum = 2022 || today.getFullYear();
console.log(thisMonthNum);

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
        title: `TOTAL REVENUE ( ${thisMonth} )`,
        menu: [],
        query: "totalDeposit",
        isMoney: true,
        diff: 168,
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
        title: `PROFITS ( ${thisMonth} )`,
        menu: [],
        query: "totalDeposit",
        isMoney: true,
        diff: 86,
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
        isLoading: isLoadingProductEvent,
        error: errorProductEvent,
        data: dataProductEvent,
    } = useQuery({
        queryKey: ["products", "events"],
        queryFn: async () => {
            const res = await apiRequest.get(
                `/productevent/productArrivalEvent`
            );
            return res.data;
        },
    });

    return (
        <div className="analytics">
            <div className="analyticsTop">
                <div className="analyticsStats">
                    {stats?.map((stat) => (
                        <StatisticsCard stat={stat} key={stat.id} />
                    ))}
                </div>
                <div className="analyticsCalendar">
                    {isLoadingProductEvent ? (
                        "Loading..."
                    ) : errorProductEvent ? (
                        <CalendarCard
                            title={errorProductEvent.message}
                            height="auto"
                            center="title"
                            initialView="listMonth"
                            editable={false}
                            initialEvents={null}
                        />
                    ) : (
                        <CalendarCard
                            title={`Calendar Arrival date`}
                            height="auto"
                            center="title"
                            right="today prev,next"
                            initialView="listMonth"
                            editable={false}
                            initialEvents={dataProductEvent}
                        />
                    )}
                </div>
            </div>
            <div className="analyticsBottom">
                <div className="analyticsChart">
                    {isLoadingProductChart ? (
                        "Loading..."
                    ) : errorProductChart ? (
                        <Chart
                            title={errorProductChart.message}
                            aspect={2 / 1}
                            data={null}
                        />
                    ) : (
                        <Chart
                            title={`Product analysis by month ${thisYearNum}`}
                            aspect={2 / 1}
                            data={dataProductChart}
                        />
                    )}
                </div>
                <div className="analyticsChart">
                    {isLoadingCategoryChart ? (
                        "Loading..."
                    ) : errorCategoryChart ? (
                        <Chart
                            title={errorCategoryChart.message}
                            aspect={2 / 1}
                            data={null}
                        />
                    ) : (
                        <Chart
                            title={`Category analysis by month ${thisYearNum}`}
                            aspect={2 / 1}
                            data={dataCategoryChart}
                        />
                    )}
                </div>
            </div>
        </div>
    );
};

export default Analytics;
