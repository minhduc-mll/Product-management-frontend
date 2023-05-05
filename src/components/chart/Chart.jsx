import "./chart.scss";
import { MoreVert } from "@mui/icons-material";
import {
    AreaChart,
    Area,
    LineChart,
    Line,
    BarChart,
    Bar,
    XAxis,
    YAxis,
    CartesianGrid,
    Tooltip,
    Legend,
    ResponsiveContainer,
} from "recharts";
import { PureComponent, useState } from "react";

const color = {
    blue: "#1677ff",
    darkBlue: "#5a54f9",
    purple: "#9e339f",
    pink: "#ed4192",
    darkRed: "#e0282e",
    darkOrange: "#f4801a",
    gold: "#f2bd27",
    seaGreen: "#00b96b",
    limeGreen: "#52c41a",
};

const getRandomColor = () => {
    return "#" + ((Math.random() * 0xffffff) << 0).toString(16);
};

class CustomizedAxisTick extends PureComponent {
    render() {
        const { x, y, payload } = this.props;

        return (
            <g transform={`translate(${x},${y})`}>
                <text dx={-15} dy={16} fill="gray" transform="rotate(-30)">
                    {payload.value}
                </text>
            </g>
        );
    }
}

const Chart = ({ title, aspect, data, initChart = "LineChart", dataKey }) => {
    const [open, setOpen] = useState(false);
    const [chart, setChart] = useState(initChart);

    const multipleChart = (chartType) => {
        const entries = data?.map((option) => {
            const keys = Object.keys(option);
            return keys;
        });
        const flattened = entries?.reduce((prev, current) => {
            prev = prev.concat(current);
            return prev;
        }, []);
        const filtered = flattened?.filter((value) => value !== dataKey);
        const uniqueKeys = [...new Set(filtered)];
        return uniqueKeys?.map((value, index) => {
            switch (chartType) {
                case "LineChart":
                    return (
                        <Line
                            type="monotone"
                            dataKey={value}
                            stroke={getRandomColor()}
                            strokeWidth={2}
                            key={index}
                        />
                    );
                case "AreaChart":
                    return (
                        <Area
                            type="monotone"
                            dataKey={value}
                            stroke={getRandomColor()}
                            strokeWidth={2}
                            fillOpacity={1}
                            fill={`url(#linear)`}
                            key={index}
                        />
                    );
                case "BarChart":
                    return (
                        <Bar
                            dataKey={value}
                            fill={color.limeGreen}
                            key={index}
                        />
                    );
                default:
                    return (
                        <linearGradient
                            id={"linear"}
                            x1="0"
                            y1="0"
                            x2="0"
                            y2="1"
                            key={index}
                        >
                            <stop
                                offset="5%"
                                stopColor={color.limeGreen}
                                stopOpacity={0.6}
                            />
                            <stop
                                offset="95%"
                                stopColor={color.limeGreen}
                                stopOpacity={0}
                            />
                        </linearGradient>
                    );
            }
        });
    };

    const RenderChart = () => {
        if (chart === "LineChart") {
            return (
                <LineChart
                    data={data}
                    margin={{
                        top: 20,
                        right: 20,
                        left: 0,
                        bottom: 0,
                    }}
                >
                    <CartesianGrid
                        strokeDasharray="6 3"
                        className="chartGrid"
                    />
                    <XAxis
                        dataKey={dataKey}
                        stroke="gray"
                        tick={<CustomizedAxisTick />}
                    />
                    <YAxis />
                    <Tooltip />
                    <Legend />
                    {multipleChart("LineChart")}
                </LineChart>
            );
        }
        if (chart === "AreaChart") {
            return (
                <AreaChart
                    data={data}
                    margin={{
                        top: 20,
                        right: 20,
                        left: 0,
                        bottom: 0,
                    }}
                >
                    <defs>{multipleChart()}</defs>
                    <CartesianGrid
                        strokeDasharray="6 3"
                        className="chartGrid"
                    />
                    <XAxis
                        dataKey={dataKey}
                        stroke="gray"
                        tick={<CustomizedAxisTick />}
                    />
                    <YAxis />
                    <Tooltip />
                    <Legend />
                    {multipleChart("AreaChart")}
                </AreaChart>
            );
        }
        if (chart === "BarChart") {
            return (
                <BarChart
                    data={data}
                    margin={{
                        top: 20,
                        right: 20,
                        left: 0,
                        bottom: 0,
                    }}
                >
                    <CartesianGrid
                        strokeDasharray="6 3"
                        className="chartGrid"
                    />
                    <XAxis dataKey={dataKey} stroke="gray" dy={6} />
                    <YAxis />
                    <Tooltip />
                    <Legend />
                    {multipleChart("BarChart")}
                </BarChart>
            );
        }
        return <></>;
    };

    return (
        <div className="chart">
            <div className="chartTop">
                <h1 className="title">{title}</h1>
                <div className="iconClick" onClick={() => setOpen(!open)}>
                    <MoreVert className="icon" />
                </div>
                {open && (
                    <div className="openMenu">
                        <div
                            className={
                                "menuItem " +
                                (chart === "LineChart" && "active")
                            }
                            onClick={() => setChart("LineChart")}
                        >
                            <span className="item">LineChart</span>
                        </div>
                        <div
                            className={
                                "menuItem " +
                                (chart === "AreaChart" && "active")
                            }
                            onClick={() => setChart("AreaChart")}
                        >
                            <span className="item">AreaChart</span>
                        </div>
                        <div
                            className={
                                "menuItem " + (chart === "BarChart" && "active")
                            }
                            onClick={() => setChart("BarChart")}
                        >
                            <span className="item">BarChart</span>
                        </div>
                    </div>
                )}
            </div>
            <div className="chartBottom">
                <ResponsiveContainer width="100%" aspect={aspect}>
                    {RenderChart()}
                </ResponsiveContainer>
            </div>
        </div>
    );
};

export default Chart;
