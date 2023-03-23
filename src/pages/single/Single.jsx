import "./single.scss";
import Chart from "../../components/chart/Chart";
import Table from "../../components/table/Table";
import { Link } from "react-router-dom";
import Detail from "../../components/detail/Detail";

const Single = ({ target }) => {
    return (
        <div className="single">
            <div className="top">
                <div className="title">Infomation</div>
                <Link to={`/${target}s/update`} className="link">
                    Edit
                </Link>
            </div>
            <div className="mid">
                <Detail />
                <Chart title="User Spending ( Last 6 Months )" aspect={3 / 1} />
            </div>
            <div className="bottom">
                <Table title="Last Transactions" />
            </div>
        </div>
    );
};

export default Single;
