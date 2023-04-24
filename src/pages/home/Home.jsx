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
const thisMonth = dateFormat(today, "mmmm yyyy").toUpperCase();
const thisMonthNum = today.getMonth() + 1;
const thisYearNum = today.getFullYear();

const stats = [
    {
        id: 1,
        title: "TOTAL PRODUCTS",
        menu: [],
        query: "products",
        isMoney: false,
        to: "/products",
        link: "View all products",
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
        title: `PRODUCTS ( ${thisMonth} )`,
        menu: [],
        query: `productsMonth/?month=${thisMonthNum}&year=${thisYearNum}`,
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
        title: "PRODUCTS IN STOCK",
        menu: [],
        query: "productsInStock",
        isMoney: false,
        to: "/products",
        link: "View all products",
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
    {
        id: 4,
        title: "CATEGORIES",
        menu: [],
        query: "categories",
        isMoney: false,
        to: "/categories",
        link: "View all categories",
        icon: (
            <StoreOutlined
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
            const res = await apiRequest.get(
                `/products?status=pending&sortName=arrivalDate`
            );
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
            const res = await apiRequest.get(
                `/analys/productsPerUserByMonth?year=${thisYearNum}`
            );
            return res.data;
        },
    });

    const {
        isLoading: isLoadingProductEvent,
        error: errorProductEvent,
        data: dataProductEvent,
    } = useQuery({
        queryKey: ["products", "events", "home"],
        queryFn: async () => {
            const res = await apiRequest.get(`/productevent/productEvent`);
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
                            height="auto"
                            center="title"
                            initialView="dayGridMonth"
                            editable={false}
                            initialEvents={null}
                        />
                    ) : (
                        <CalendarCard
                            title={`Calendar Arrival date and Delivery date`}
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
                            title={`Seller analysis by month ${thisYearNum}`}
                            aspect={2 / 1}
                            data={dataChart}
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
                            title="Unsold Product"
                            products={dataProducts}
                        />
                    )}
                </div>
            </div>
        </div>
    );
};

export default Home;
