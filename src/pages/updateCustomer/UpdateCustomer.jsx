import "./updateCustomer.scss";
import UserDetail from "components/userDetail/UserDetail";
import FormUpdate from "components/formUpdate/FormUpdate";
import { useEffect } from "react";
import { useParams } from "react-router-dom";
import { useQuery } from "@tanstack/react-query";
import { apiRequest } from "utils/apiAxios";

const customerInputs = [
    {
        id: 1,
        name: "name",
        label: "Name",
        type: "text",
        placeholder: "Name",
    },
    {
        id: 2,
        name: "phone",
        label: "Phone",
        type: "text",
        placeholder: "Phone",
    },
    {
        id: 3,
        name: "email",
        label: "Email",
        type: "email",
        placeholder: "Email",
    },
    {
        id: 4,
        name: "birthday",
        label: "Birthday",
        type: "date",
        placeholder: "Birthday",
    },
    {
        id: 5,
        name: "company",
        label: "Company",
        type: "text",
        placeholder: "Company",
    },
    {
        id: 6,
        name: "bankAccount",
        label: "Bank Account",
        type: "text",
        placeholder: "Bank Account",
    },
    {
        id: 7,
        name: "address",
        label: "Address",
        type: "text",
        placeholder: "Address",
    },
];

const UpdateCustomer = ({ route }) => {
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
        <div className="updateCustomer">
            <div className="top">
                <h1 className="title">Edit Customer</h1>
            </div>
            {isLoading ? (
                "Loading..."
            ) : error ? (
                error.response.data.message
            ) : (
                <div className="bottom">
                    <UserDetail user={data} />
                    <FormUpdate
                        route="customers"
                        inputs={customerInputs}
                        obj={data}
                        id={data._id}
                    />
                </div>
            )}
        </div>
    );
};

export default UpdateCustomer;
