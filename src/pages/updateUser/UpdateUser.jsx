import "./updateUser.scss";
import UserDetail from "components/userDetail/UserDetail";
import FormUpdate from "components/formUpdate/FormUpdate";
import { useEffect } from "react";
import { useParams } from "react-router-dom";
import { useQuery } from "@tanstack/react-query";
import { apiRequest } from "utils/apiAxios";

const userInputs = [
    {
        id: 1,
        name: "username",
        type: "text",
        label: "Username",
        placeholder: "Username",
    },
    {
        id: 2,
        name: "name",
        type: "text",
        label: "Name",
        placeholder: "Name",
    },
    {
        id: 3,
        name: "email",
        type: "email",
        label: "Email",
        placeholder: "Email",
    },
    {
        id: 4,
        name: "phone",
        type: "text",
        label: "Phone",
        placeholder: "Phone",
    },
    {
        id: 5,
        name: "birthday",
        type: "date",
        label: "Birthday",
    },
    {
        id: 6,
        name: "role",
        type: "text",
        label: "Role",
        placeholder: "Role",
    },
];

const UpdateUser = ({ route }) => {
    const { id } = useParams();

    const { isLoading, error, data, refetch } = useQuery({
        queryKey: [`${route}`, id],
        queryFn: async () => {
            const res = await apiRequest.get(`/${route}/${id}`);
            return res.data;
        },
        enabled: !!id,
    });

    useEffect(() => {
        refetch();
    }, [id, refetch]);

    return (
        <div className="updateUser">
            <div className="top">
                <h1 className="title">Edit User</h1>
            </div>
            {isLoading ? (
                "Loading..."
            ) : error ? (
                error.response.data.message
            ) : (
                <div className="bottom">
                    <UserDetail user={data} />
                    <FormUpdate
                        route="users"
                        inputs={userInputs}
                        obj={data}
                        id={data._id}
                    />
                </div>
            )}
        </div>
    );
};

export default UpdateUser;
