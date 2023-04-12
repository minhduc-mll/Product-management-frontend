import "./datatable.scss";
import { DataGrid, GridToolbar } from "@mui/x-data-grid";
import { useNavigate } from "react-router-dom";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { apiRequest } from "utils/apiAxios";

const Datatable = ({ target, rows, columns }) => {
    const navigate = useNavigate();
    const queryClient = useQueryClient();

    const { mutate } = useMutation({
        mutationFn: async (id) => {
            await apiRequest.delete(`/${target}s/${id}`);
        },
        onSuccess: () => {
            queryClient.invalidateQueries([`${target}s`]);
            navigate(`/${target}s`);
        },
    });

    const handleDelete = async (id) => {
        mutate(id);
    };

    const handleView = async (id) => {
        navigate(`/${target}s/${id}`);
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
                            onClick={() => handleView(params.row._id)}
                        >
                            View
                        </button>

                        <button
                            className="deleteButton"
                            onClick={() => handleDelete(params.row._id)}
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
            <DataGrid
                className="datagrid"
                rows={rows}
                columns={columns.concat(actionColumn)}
                slots={{ toolbar: GridToolbar }}
                autoPageSize
                disableRowSelectionOnClick
            />
        </div>
    );
};

export default Datatable;
