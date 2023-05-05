import "./statisticsCard.scss";
import { KeyboardArrowUp, MoreVert } from "@mui/icons-material";
import { Link } from "react-router-dom";
import { useState } from "react";
import { useQuery } from "@tanstack/react-query";
import { apiRequest } from "utils/apiAxios";

const StatisticsCard = ({ stat }) => {
    const [open, setOpen] = useState(false);
    const { title, menu, query, isMoney, diff, to, link, icon } = stat;

    const { isLoading, error, data } = useQuery({
        queryKey: ["analys", query],
        queryFn: async () => {
            const res = await apiRequest.get(`/analys/${query}`);
            return res.data;
        },
        enabled: !!query,
    });

    return (
        <div className="statisticsCard">
            <div className="statTop">
                <h1 className="title">{title}</h1>
                <div className="iconClick" onClick={() => setOpen(!open)}>
                    <MoreVert className="icon" />
                </div>
                {open && (
                    <div className="openMenu">
                        {menu?.map((value, index) => (
                            <div
                                className={"menuItem"}
                                onClick={() => {}}
                                key={index}
                            >
                                <span className="item">{value}</span>
                            </div>
                        ))}
                    </div>
                )}
            </div>
            <div className="statMiddle">
                <div className="counter">
                    {isLoading ? (
                        "Loading..."
                    ) : error ? (
                        error.response.data.message
                    ) : (
                        <span>
                            {data}
                            {isMoney && "M"}
                        </span>
                    )}
                </div>
                <div className="percentage positive">
                    {diff ? (
                        <>
                            <KeyboardArrowUp className="icon" /> {diff}%
                        </>
                    ) : (
                        <KeyboardArrowUp className="icon" />
                    )}
                </div>
            </div>
            <div className="statBottom">
                <Link to={to} className="link">
                    {link}
                </Link>

                {icon}
            </div>
        </div>
    );
};

export default StatisticsCard;
