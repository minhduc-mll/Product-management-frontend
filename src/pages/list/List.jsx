import "./list.scss";
import Datatable from "../../components/datatable/Datatable";
import { Link } from "react-router-dom";

const List = ({ target, rows, columns }) => {
    return (
        <div className="list">
            <div className="top">
                <div className="title">Add new {target}</div>
                <Link to={`/${target}s/new`} className="link">
                    Add new
                </Link>
            </div>
            <div className="bottom">
                <Datatable rows={rows} columns={columns} />
            </div>
        </div>
    );
};

export default List;
