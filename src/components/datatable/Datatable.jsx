import "./datatable.scss";
import { DataGrid } from "@mui/x-data-grid";
import { Link } from "react-router-dom";

const Datatable = ({ title, rows, columns }) => {
    const actionColumn = [
        {
            field: "action",
            headername: "Action",
            width: 200,
            renderCell: () => {
                return (
                    <div className="cellAction">
                        <Link to="/users/1" style={{ textDecoration: "none" }}>
                            <div className="viewButton">View</div>
                        </Link>
                        <Link to="/users/1" style={{ textDecoration: "none" }}>
                            <div className="deleteButton">Delete</div>
                        </Link>
                    </div>
                );
            },
        },
    ];

    return (
        <div className="datatable">
            <div className="title">
                {title}
                <Link to="/users/new" className="link">
                    Add new
                </Link>
            </div>
            <DataGrid
                className="datagrid"
                rows={rows}
                columns={columns.concat(actionColumn)}
                pageSize={9}
                rowsPerPageOptions={[9]}
                checkboxSelection
            />
        </div>
    );
};

export default Datatable;