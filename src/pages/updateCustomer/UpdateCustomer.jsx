import "./updateCustomer.scss";
import UserDetail from "components/userDetail/UserDetail";
import FormUpdate from "components/formUpdate/FormUpdate";
import { useEffect } from "react";
import { useParams } from "react-router-dom";
import { useQuery } from "@tanstack/react-query";
import { apiRequest } from "utils/apiAxios";
import { customerInputs } from "utils/inputForm";

const UpdateCustomer = () => {
    const { id } = useParams();

    const { isLoading, error, data, refetch } = useQuery({
        queryKey: [`customer`, id],
        queryFn: async () => {
            const res = await apiRequest.get(`/customers/${id}`);
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
                error.response?.data.message
            ) : (
                <div className="bottom">
                    <UserDetail user={data} />
                    <FormUpdate
                        inputs={customerInputs}
                        obj={data}
                        image={true}
                        route="customers"
                        id={data._id}
                    />
                </div>
            )}
        </div>
    );
};

export default UpdateCustomer;
