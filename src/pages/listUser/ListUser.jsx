import "./listUser.scss";
import Datatable from "../../components/datatable/Datatable";
import { Link } from "react-router-dom";

const ListUser = ({ target, rows, columns }) => {
    return (
        <div className="listUser">
            <div className="top">
                <div className="title">Add new {target}</div>
                <Link to={`/${target}s/new`} className="link">
                    Add new
                </Link>
            </div>
            <div className="bottom">
                <Datatable target={target} rows={rows} columns={columns} />
            </div>
        </div>
    );
};

export default ListUser;
