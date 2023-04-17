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
            <div className="statTop">
                <h1 className="title">{stat?.title}</h1>
                <div className="percentage positive">
                    {stat?.diff ? (
                        <>
                            <KeyboardArrowUp className="icon" /> {stat?.diff}%
                        </>
                    ) : (
                        <KeyboardArrowUp className="icon" />
                    )}
                </div>
            </div>
            <div className="statMiddle">
                <div className="counter">
                    {isLoading ? (
                        "Loading..."
                    ) : error ? (
                        error.message
                    ) : (
                        <span>
                            {data}
                            {stat?.isMoney && "M"}
                        </span>
                    )}
                </div>
            </div>
            <div className="statBottom">
                <Link to={stat?.to} className="link">
                    {stat?.link}
                </Link>

                {stat?.icon}
            </div>
        </div>
    );
};

export default StatisticsCard;
