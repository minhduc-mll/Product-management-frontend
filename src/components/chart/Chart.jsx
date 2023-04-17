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
import { i18n } from "dateformat";

const color = [
    "#8884d8",
    "#82ca9d",
    "#57f851",
    "rgba(255, 206, 86, 0.2)",
    "rgba(75, 192, 192, 0.2)",
    "rgba(153, 102, 255, 0.2)",
    "rgba(255, 159, 64, 0.2)",
];

class CustomizedAxisTick extends PureComponent {
    render() {
        const { x, y, payload } = this.props;

        return (
            <g transform={`translate(${x},${y})`}>
                <text dx={-10} dy={16} fill="gray" transform="rotate(0)">
                    {i18n.monthNames[payload.value - 1]}
                </text>
            </g>
        );
    }
}

const Chart = ({ title, aspect, data }) => {
    const [open, setOpen] = useState(false);
    const [chart, setChart] = useState("LineChart");

    return (
        <div className="chart">
            <div className="chartTop">
                <h1 className="title">{title}</h1>
                <MoreVert className="icon" onClick={() => setOpen(!open)} />
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
                                dataKey="_id.month"
                                stroke="gray"
                                tick={<CustomizedAxisTick />}
                            />
                            <YAxis />
                            <Tooltip />
                            <Legend />
                            <Line
                                type="monotone"
                                dataKey="count"
                                stroke={color[0]}
                            />
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
                            <defs>
                                <linearGradient
                                    id="count"
                                    x1="0"
                                    y1="0"
                                    x2="0"
                                    y2="1"
                                >
                                    <stop
                                        offset="5%"
                                        stopColor={color[1]}
                                        stopOpacity={0.6}
                                    />
                                    <stop
                                        offset="95%"
                                        stopColor={color[1]}
                                        stopOpacity={0}
                                    />
                                </linearGradient>
                            </defs>
                            <CartesianGrid
                                strokeDasharray="6 3"
                                className="chartGrid"
                            />
                            <XAxis dataKey="_id.month" stroke="gray" />
                            <YAxis />
                            <Tooltip />
                            <Legend />
                            <Area
                                type="monotone"
                                dataKey="count"
                                stroke={color[1]}
                                fillOpacity={1}
                                fill="url(#count)"
                            />
                        </AreaChart>
                    )}
                </ResponsiveContainer>
            </div>
        </div>
    );
};

export default Chart;
