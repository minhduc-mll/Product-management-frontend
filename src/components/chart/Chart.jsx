import "./chart.scss";
import {
    AreaChart,
    Area,
    XAxis,
    CartesianGrid,
    Tooltip,
    ResponsiveContainer,
} from "recharts";

const data = [
    { name: "January", Total: 2000 },
    { name: "February", Total: 1500 },
    { name: "March", Total: 3000 },
    { name: "April", Total: 500 },
    { name: "May", Total: 1500 },
    { name: "June", Total: 2000 },
];

const Chart = ({ title, aspect }) => {
    return (
        <div className="chart">
            <div className="title">{title}</div>
            <ResponsiveContainer width="100%" aspect={aspect}>
                <AreaChart
                width={730}
                height={250}
                data={data}
                margin={{ top: 10, right: 20, left: 20, bottom: 0 }}
                >
                <defs>
                    <linearGradient id="total" x1="0" y1="0" x2="0" y2="1">
                    <stop offset="5%" stopColor="#57f851" stopOpacity={0.8} />
                    <stop offset="95%" stopColor="#57f851" stopOpacity={0} />
                    </linearGradient>
                </defs>
                <XAxis dataKey="name" stroke="gray" />
                <CartesianGrid strokeDasharray="6 3" className="chartGrid" />
                <Tooltip />
                <Area
                    type="monotone"
                    dataKey="Total"
                    stroke="#57f851"
                    fillOpacity={1}
                    fill="url(#total)"
                />
                </AreaChart>
            </ResponsiveContainer>
        </div>
    );
};

export default Chart;