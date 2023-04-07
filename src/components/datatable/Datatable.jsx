import "./datatable.scss";
import { SearchOutlined } from "@mui/icons-material";
import { DataGrid } from "@mui/x-data-grid";
import { useNavigate } from "react-router-dom";

const Datatable = ({ target, rows, columns }) => {
    const navigate = useNavigate();

    const handleDelete = (id) => {
        return true;
    };

    const actionColumn = [
        {
            field: "action",
            headername: "Action",
            width: 155,
            renderCell: (params) => {
                return (
                    <div className="cellAction">
                        <button
                            className="viewButton"
                            onClick={() => {
                                navigate(`/${target}s/${params.row._id}`);
                            }}
                        >
                            View
                        </button>

                        <button
                            className="deleteButton"
                            onClick={() => handleDelete(params.row.id)}
                        >
                            Delete
                        </button>
                    </div>
                );
            },
        },
    ];

    return (
        <div className="datatable">
            <div className="search">
                <input type="text" placeholder="Search..." />
                <SearchOutlined className="icon" />
            </div>
            <DataGrid
                className="datagrid"
                rows={rows}
                columns={columns.concat(actionColumn)}
                disableSelectionOnClick
                pageSize={8}
                rowsPerPageOptions={[8]}
            />
        </div>
    );
};

export default Datatable;
