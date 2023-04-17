import "./updateUser.scss";
import UserDetail from "components/userDetail/UserDetail";
import Form from "components/form/Form";
import { useEffect } from "react";
import { useParams } from "react-router-dom";
import { useQuery } from "@tanstack/react-query";
import { apiRequest } from "utils/apiAxios";

const UpdateUser = ({ text }) => {
    const lcText = text.toLowerCase();

    const { id } = useParams();

    const { isLoading, error, data, refetch } = useQuery({
        queryKey: [`${lcText}s`, id],
        queryFn: async () => {
            const res = await apiRequest.get(`/${lcText}s/${id}`);
            return res.data;
        },
        enabled: !!id,
    });

    useEffect(() => {
        refetch();
    }, [id, refetch]);

    const userInputs = [
        {
            id: 1,
            label: "Username",
            type: "text",
            placeholder: "Username",
        },
        {
            id: 2,
            label: "Password",
            type: "password",
            placeholder: "Password",
        },
        {
            id: 3,
            label: "Name",
            type: "text",
            placeholder: "Name",
        },
        {
            id: 4,
            label: "Phone",
            type: "text",
            placeholder: "Phone",
        },
        {
            id: 5,
            label: "Email",
            type: "mail",
            placeholder: "Email",
        },
        {
            id: 6,
            label: "Birthday",
            type: "date",
            placeholder: "Birthday",
        },
        {
            id: 7,
            label: "Role",
            type: "text",
            placeholder: "Role",
        },
    ];

    return (
        <div className="updateUser">
            <div className="top">
                <h1 className="title">Edit {text}</h1>
            </div>
            {isLoading ? (
                "Loading..."
            ) : error ? (
                error.message
            ) : (
                <div className="bottom">
                    <UserDetail user={data} />
                    <Form user={data} inputs={userInputs} />
                </div>
            )}
        </div>
    );
};

export default UpdateUser;
