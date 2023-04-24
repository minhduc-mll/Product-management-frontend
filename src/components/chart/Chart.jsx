import "./chart.scss";
import { MoreVert } from "@mui/icons-material";
import {
    AreaChart,
    Area,
    LineChart,
    Line,
    XAxis,
    YAxis,
    CartesianGrid,
    Tooltip,
    Legend,
    ResponsiveContainer,
} from "recharts";
import { PureComponent, useState } from "react";

const color = [
    "#8884d8",
    "#82ca9d",
    "#57f851",
    "rgba(255, 206, 86, 0.2)",
    "rgba(75, 192, 192, 0.2)",
    "rgba(153, 102, 255, 0.2)",
    "rgba(255, 159, 64, 0.2)",
];

const getRandomColor = () => {
    return "#" + ((Math.random() * 0xffffff) << 0).toString(16);
};

class CustomizedAxisTick extends PureComponent {
    render() {
        const { x, y, payload } = this.props;

        return (
            <g transform={`translate(${x},${y})`}>
                <text dx={-10} dy={16} fill="gray" transform="rotate(-30)">
                    {payload.value}
                </text>
            </g>
        );
    }
}

const Chart = ({ title, aspect, data }) => {
    const [open, setOpen] = useState(false);
    const [chart, setChart] = useState("LineChart");

    const multipleLine = () => {
        const entries = data.map((option) => {
            const keys = Object.keys(option);
            return keys;
        });
        const flattened = entries.reduce((prev, current) => {
            prev = prev.concat(current);
            return prev;
        }, []);
        const filtered = flattened.filter((key) => key !== "month");
        const uniqueKeys = [...new Set(filtered)];
        return uniqueKeys.map((key, index) => {
            return (
                <Line
                    type="monotone"
                    dataKey={key}
                    stroke={getRandomColor()}
                    strokeWidth={2}
                    key={index}
                />
            );
        });
    };

    const multipleArea = (area) => {
        const entries = data.map((option) => {
            const keys = Object.keys(option);
            return keys;
        });
        const flattened = entries.reduce((prev, current) => {
            prev = prev.concat(current);
            return prev;
        }, []);
        const filtered = flattened.filter((key) => key !== "month");
        const uniqueKeys = [...new Set(filtered)];
        return uniqueKeys.map((key, index) => {
            if (area === "linearGradient") {
                return (
                    <linearGradient id={"linear"} x1="0" y1="0" x2="0" y2="1">
                        <stop
                            offset="5%"
                            stopColor={color[1]}
                            stopOpacity={0.6}
                        />
                        <stop
                            offset="95%"
                            stopColor={color[0]}
                            stopOpacity={0}
                        />
                    </linearGradient>
                );
            } else {
                return (
                    <Area
                        type="monotone"
                        dataKey={key}
                        stroke={getRandomColor()}
                        strokeWidth={2}
                        fillOpacity={1}
                        fill={`url(#linear)`}
                        key={index}
                    />
                );
            }
        });
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
                        {chart === "LineChart" ? (
                            <span onClick={() => setChart("AreaChart")}>
                                AreaChart
                            </span>
                        ) : (
                            <span onClick={() => setChart("LineChart")}>
                                LineChart
                            </span>
                        )}
                    </div>
                )}
            </div>
            <div className="chartBottom">
                <ResponsiveContainer width="100%" aspect={aspect}>
                    {chart === "LineChart" ? (
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
                                dataKey="month"
                                stroke="gray"
                                tick={<CustomizedAxisTick />}
                            />
                            <YAxis />
                            <Tooltip />
                            <Legend />
                            {multipleLine()}
                        </LineChart>
                    ) : (
                        <AreaChart
                            data={data}
                            margin={{
                                top: 20,
                                right: 20,
                                left: 0,
                                bottom: 0,
                            }}
                        >
                            <defs>{multipleArea("linearGradient")}</defs>
                            <CartesianGrid
                                strokeDasharray="6 3"
                                className="chartGrid"
                            />
                            <XAxis
                                dataKey="month"
                                stroke="gray"
                                tick={<CustomizedAxisTick />}
                            />
                            <YAxis />
                            <Tooltip />
                            <Legend />
                            {multipleArea("area")}
                        </AreaChart>
                    )}
                </ResponsiveContainer>
            </div>
        </div>
    );
};

export default Chart;
