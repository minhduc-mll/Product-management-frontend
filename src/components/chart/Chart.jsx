import "./chart.scss";
import { MoreVert } from "@mui/icons-material";
import { useState } from "react";
import {
    AreaChart,
    Area,
    LineChart,
    Line,
    XAxis,
    YAxis,
    CartesianGrid,
    Tooltip,
    ResponsiveContainer,
} from "recharts";

const data = [
    { name: "January", Total: 2000, Revenue: 1000 },
    { name: "February", Total: 1500, Revenue: 3000 },
    { name: "March", Total: 3000, Revenue: 2000 },
    { name: "April", Total: 500, Revenue: 1500 },
    { name: "May", Total: 1500, Revenue: 1500 },
    { name: "June", Total: 2000, Revenue: 500 },
];

const Chart = ({ title, aspect }) => {
    const [open, setOpen] = useState(false);
    const [chart, setChart] = useState("LineChart");

    return (
        <div className="chart">
            <div className="top">
                <h1 className="title">{title}</h1>
                <MoreVert className="icon" onClick={() => setOpen(!open)} />
                {open && (
                    <div className="rightMenu">
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
            <div className="bottom">
                <ResponsiveContainer width="100%" aspect={aspect}>
                    {chart === "LineChart" ? (
                        <LineChart data={data}>
                            <XAxis dataKey="name" stroke="gray" />
                            <YAxis />
                            <CartesianGrid
                                strokeDasharray="6 3"
                                className="chartGrid"
                            />
                            <Tooltip />
                            <Line
                                type="monotone"
                                dataKey="Total"
                                stroke="#8884d8"
                                fillOpacity={1}
                                fill="url(#total)"
                            />
                            <Line
                                type="monotone"
                                dataKey="Revenue"
                                stroke="#57f851"
                                fillOpacity={1}
                                fill="url(#revenue)"
                            />
                        </LineChart>
                    ) : (
                        <AreaChart data={data}>
                            <defs>
                                <linearGradient
                                    id="total"
                                    x1="0"
                                    y1="0"
                                    x2="0"
                                    y2="1"
                                >
                                    <stop
                                        offset="5%"
                                        stopColor="#8884d8"
                                        stopOpacity={0.8}
                                    />
                                    <stop
                                        offset="95%"
                                        stopColor="#8884d8"
                                        stopOpacity={0}
                                    />
                                </linearGradient>
                                <linearGradient
                                    id="revenue"
                                    x1="0"
                                    y1="0"
                                    x2="0"
                                    y2="1"
                                >
                                    <stop
                                        offset="5%"
                                        stopColor="#57f851"
                                        stopOpacity={0.8}
                                    />
                                    <stop
                                        offset="95%"
                                        stopColor="#57f851"
                                        stopOpacity={0}
                                    />
                                </linearGradient>
                            </defs>
                            <XAxis dataKey="name" stroke="gray" />
                            <YAxis />
                            <CartesianGrid
                                strokeDasharray="6 3"
                                className="chartGrid"
                            />
                            <Tooltip />
                            <Area
                                type="monotone"
                                dataKey="Total"
                                stroke="#8884d8"
                                fillOpacity={1}
                                fill="url(#total)"
                            />
                            <Area
                                type="monotone"
                                dataKey="Revenue"
                                stroke="#57f851"
                                fillOpacity={1}
                                fill="url(#revenue)"
                            />
                        </AreaChart>
                    )}
                </ResponsiveContainer>
            </div>
        </div>
    );
};

export default Chart;
