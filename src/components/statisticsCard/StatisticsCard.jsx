import "./statisticsCard.scss";
import { KeyboardArrowUp } from "@mui/icons-material";
import { Link } from "react-router-dom";

const StatisticsCard = ({ data }) => {
    return (
        <div className="statisticsCard">
            <div className="left">
                <span className="title">{data?.title}</span>
                <span className="counter">
                    {data?.isMoney && "$"} {data?.amount}
                </span>
                <Link to={data?.to} className="link">
                    {data?.link}
                </Link>
            </div>
            <div className="right">
                <div className="percentage positive">
                    <KeyboardArrowUp className="icon" /> {data?.diff}%
                </div>
                {data?.icon}
            </div>
        </div>
    );
};

export default StatisticsCard;
