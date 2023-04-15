import "./statisticsCard.scss";
import { KeyboardArrowUp } from "@mui/icons-material";
import { Link } from "react-router-dom";
import { useQuery } from "@tanstack/react-query";
import { apiRequest } from "utils/apiAxios";

const StatisticsCard = ({ stat }) => {
    const { isLoading, error, data } = useQuery({
        queryKey: ["analys", stat?.query],
        queryFn: async () => {
            const res = await apiRequest.get(`/analys/${stat?.query}`);
            return res.data;
        },
        enabled: !!stat?.query,
    });

    return (
        <div className="statisticsCard">
            <div className="left">
                <span className="title">{stat?.title}</span>
                {isLoading ? (
                    "Loading..."
                ) : error ? (
                    error.message
                ) : (
                    <span className="counter">
                        {data}
                        {stat?.isMoney && "M"}
                    </span>
                )}
                <Link to={stat?.to} className="link">
                    {stat?.link}
                </Link>
            </div>
            <div className="right">
                {stat?.diff ? (
                    <div className="percentage positive">
                        <KeyboardArrowUp className="icon" /> {stat?.diff}%
                    </div>
                ) : (
                    <KeyboardArrowUp className="icon" />
                )}
                {stat?.icon}
            </div>
        </div>
    );
};

export default StatisticsCard;
