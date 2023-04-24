import "./users.scss";
import Datatable from "components/datatable/Datatable";
import { useNavigate } from "react-router-dom";
import { useQuery } from "@tanstack/react-query";
import { apiRequest } from "utils/apiAxios";
import dateFormat from "dateformat";

const userColumns = [
    {
        field: "username",
        headerName: "User",
        flex: 1,
        renderCell: (params) => {
            return <div className="cellUser">{params.row.username}</div>;
        },
    },
    {
        field: "name",
        headerName: "Name",
        flex: 1,
    },
    {
        field: "email",
        headerName: "Email",
        flex: 1,
    },
    {
        field: "phone",
        headerName: "Phone",
        flex: 1,
    },
    {
        field: "birthday",
        headerName: "Birthday",
        flex: 1,
        renderCell: (params) => {
            return params.row.birthday ? (
                <div className="cellUser">
                    {dateFormat(params.row.birthday, "dd-mm-yyyy")}
                </div>
            ) : (
                ""
            );
        },
    },
    {
        field: "role",
        headerName: "Role",
        flex: 0.5,
        renderCell: (params) => {
            return (
                <div className={`cellRole ${params.row.role}`}>
                    {params.row.role}
                </div>
            );
        },
    },
];

const Users = () => {
    const navigate = useNavigate();

    const { isLoading, error, data } = useQuery({
        queryKey: ["users"],
        queryFn: async () => {
            const res = await apiRequest.get(`/users`);
            return res.data;
        },
    });

    return (
        <div className="users">
            <div className="usersTop">
                <h1 className="title">All Users</h1>
                <button
                    onClick={() => {
                        navigate(`/users/new`);
                    }}
                    className="addButton"
                >
                    Add new
                </button>
            </div>
            <div className="usersBottom">
                {isLoading ? (
                    "Loading..."
                ) : error ? (
                    error.response.data.message
                ) : (
                    <Datatable
                        target="users"
                        rows={data}
                        columns={userColumns}
                    />
                )}
            </div>
        </div>
    );
};

export default Users;
