import "./home.scss";
import { StoreOutlined, ShoppingCartOutlined } from "@mui/icons-material";
import StatisticsCard from "components/statisticsCard/StatisticsCard";
import CalendarCard from "components/calendarCard/CalendarCard";
import Chart from "components/chart/Chart";
import Regulartable from "components/regulartable/Regulartable";
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
        title: "TỔNG CONT",
        menu: [],
        query: `products`,
        isMoney: false,
        to: `/products`,
        link: "Xem tất cả",
        icon: (
            <StoreOutlined
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
        title: "TỔNG CONT ĐÃ BÁN",
        menu: ["pending", "sold", "done"],
        query: `productsWithStatus?status=done`,
        isMoney: false,
        to: `/products?status=done`,
        link: "Xem tất cả",
        icon: (
            <StoreOutlined
                className="icon"
                style={{
                    color: "green",
                    backgroundColor: "rgba(0, 128, 0, 0.2)",
                }}
            />
        ),
    },
    {
        id: 3,
        title: `CONT THÁNG ${thisMonth} ${thisYearNum}`,
        menu: [thisMonth],
        query: `productsMonth?month=${thisMonthNum}&year=${thisYearNum}`,
        isMoney: false,
        to: `/products?startArrivalDate=${thisYearNum}-${thisMonthNum}-01&endArrivalDate=${thisYearNum}-${thisMonthNum}-31`,
        link: "Xem tất cả",
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
        id: 4,
        title: "CONT CHƯA BÁN",
        menu: [],
        query: `productsInStock`,
        isMoney: false,
        to: `/products?status=pending`,
        link: "Xem tất cả",
        icon: (
            <ShoppingCartOutlined
                className="icon"
                style={{
                    color: "crimson",
                    backgroundColor: "rgba(255, 0, 0, 0.2)",
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
        queryKey: ["pending", "product"],
        queryFn: async () => {
            const res = await apiRequest.get(
                `/products?status=pending&sortName=arrivalDate`
            );
            return res.data;
        },
    });

    const {
        isLoading: isLoadingSellerChart,
        error: errorSellerChart,
        data: dataSellerChart,
    } = useQuery({
        queryKey: ["home", "seller"],
        queryFn: async () => {
            const res = await apiRequest.get(
                `/analys/productsPerUserByMonth?year=${thisYearNum}`
            );
            return res.data;
        },
    });

    const {
        isLoading: isLoadingKpiChart,
        error: errorKpiChart,
        data: dataKpiChart,
    } = useQuery({
        queryKey: ["home", "kpi"],
        queryFn: async () => {
            const res = await apiRequest.get(
                `/analys/productsPerUserOneMonth?year=${thisYearNum}&month=${thisMonthNum}`
            );
            return res.data;
        },
    });

    const {
        isLoading: isLoadingProductEvent,
        error: errorProductEvent,
        data: dataProductEvent,
    } = useQuery({
        queryKey: ["home", "events"],
        queryFn: async () => {
            const res = await apiRequest.get(`/productevent/productEvent`);
            return res.data;
        },
    });

    return (
        <div className="home">
            <div className="homeTop">
                <div className="homeStats">
                    {stats?.map((stat) => (
                        <StatisticsCard stat={stat} key={stat.id} />
                    ))}
                </div>
                <div className="homeCalendar">
                    {isLoadingProductEvent ? (
                        "Loading..."
                    ) : errorProductEvent ? (
                        <CalendarCard
                            title={errorProductEvent.message}
                            height="auto"
                            center="title"
                            initialView="dayGridMonth"
                            editable={false}
                            initialEvents={null}
                        />
                    ) : (
                        <CalendarCard
                            title={`Lịch hàng về và lịch giao hàng`}
                            height="auto"
                            left="prev,next today"
                            center="title"
                            right="dayGridMonth dayGridWeek"
                            initialView="dayGridMonth"
                            editable={false}
                            initialEvents={dataProductEvent}
                        />
                    )}
                </div>
            </div>
            <div className="homeMiddle">
                <div className="homeChart">
                    {isLoadingSellerChart ? (
                        "Loading..."
                    ) : errorSellerChart ? (
                        <Chart
                            title={errorSellerChart.message}
                            aspect={2 / 1}
                            data={null}
                            initChart="LineChart"
                            dataKey="month"
                        />
                    ) : (
                        <Chart
                            title={`Thống kê KPI theo tháng ${thisYearNum}`}
                            aspect={2 / 1}
                            data={dataSellerChart}
                            initChart="LineChart"
                            dataKey="month"
                        />
                    )}
                </div>
                <div className="homeChart">
                    {isLoadingKpiChart ? (
                        "Loading..."
                    ) : errorKpiChart ? (
                        <Chart
                            title={errorKpiChart.message}
                            aspect={2 / 1}
                            data={null}
                            initChart="LineChart"
                            dataKey="month"
                        />
                    ) : (
                        <Chart
                            title={`KPI ${thisMonth} ${thisYearNum}`}
                            aspect={2 / 1}
                            data={dataKpiChart}
                            initChart="BarChart"
                            dataKey="name"
                        />
                    )}
                </div>
            </div>
            <div className="homeBottom">
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
                            title="Cont chưa bán"
                            products={dataProducts}
                        />
                    )}
                </div>
            </div>
        </div>
    );
};

export default Home;
