import "./featured.scss";
import {
    MoreVert,
    KeyboardArrowDownOutlined,
    KeyboardArrowUpOutlined,
} from "@mui/icons-material";
import { CircularProgressbar } from "react-circular-progressbar";
import "react-circular-progressbar/dist/styles.css";

const Featured = () => {
    return (
        <div className="featured">
            <div className="featuredTop">
                <h1 className="title">Total Revenue</h1>
                <div className="iconClick" onClick={() => setOpen(!open)}>
                    <MoreVert className="icon" />
                </div>
                {open && <div className="openMenu"></div>}
            </div>
            <div className="featuredBottom">
                <div className="featuredChart">
                    <CircularProgressbar
                        value={70}
                        text={"70%"}
                        strokeWidth={6}
                    />
                </div>
                <p className="title">Total sales made today</p>
                <p className="amount">$420</p>
                <p className="desc">
                    Previous transactions progressing. Last payments may not be
                    included.
                </p>
                <div className="summary">
                    <div className="item">
                        <div className="itemTitle">Target</div>
                        <div className="itemResult negative">
                            <KeyboardArrowDownOutlined className="icon" />
                            <div className="resultAmount">$12.4k</div>
                        </div>
                    </div>
                    <div className="item">
                        <div className="itemTitle">Last Week</div>
                        <div className="itemResult positive">
                            <KeyboardArrowUpOutlined className="icon" />
                            <div className="resultAmount">$12.4k</div>
                        </div>
                    </div>
                    <div className="item">
                        <div className="itemTitle">Last Month</div>
                        <div className="itemResult positive">
                            <KeyboardArrowUpOutlined className="icon" />
                            <div className="resultAmount">$12.4k</div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default Featured;
