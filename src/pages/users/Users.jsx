import "./users.scss";
import Datatable from "components/datatable/Datatable";
import { useNavigate } from "react-router-dom";
import { useQuery } from "@tanstack/react-query";
import { apiRequest } from "utils/apiAxios";

const userColumns = [
    {
        field: "username",
        headerName: "User",
        width: 160,
        renderCell: (params) => {
            return <div className="cellUser">{params.row.username}</div>;
        },
    },
    {
        field: "name",
        headerName: "Name",
        width: 160,
    },
    {
        field: "email",
        headerName: "Email",
        width: 160,
    },
    {
        field: "phone",
        headerName: "Phone",
        width: 150,
    },
    {
        field: "birthday",
        headerName: "Birthday",
        width: 100,
    },
    {
        field: "role",
        headerName: "Role",
        width: 100,
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
        queryFn: () =>
            apiRequest.get(`/users`).then((res) => {
                return res.data;
            }),
    });

    return (
        <div className="users">
            <div className="top">
                <div className="title">All User</div>
                <button
                    onClick={() => {
                        navigate(`/users/new`);
                    }}
                    className="addButton"
                >
                    Add new
                </button>
            </div>
            <div className="bottom">
                {isLoading || error ? (
                    ""
                ) : (
                    <Datatable
                        target="user"
                        rows={data}
                        columns={userColumns}
                    />
                )}
            </div>
        </div>
    );
};

export default Users;
