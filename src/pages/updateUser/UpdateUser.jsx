import "./updateUser.scss";
import UserDetail from "components/userDetail/UserDetail";
import FormUpdate from "components/formUpdate/FormUpdate";
import { useEffect } from "react";
import { useParams } from "react-router-dom";
import { useQuery } from "@tanstack/react-query";
import { apiRequest } from "utils/apiAxios";
import { userInputs } from "utils/inputForm";

const UpdateUser = () => {
    const { id } = useParams();

    const { isLoading, error, data, refetch } = useQuery({
        queryKey: [`user`, id],
        queryFn: async () => {
            const res = await apiRequest.get(`/users/${id}`);
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
                        inputs={userInputs}
                        obj={data}
                        image={true}
                        route="users"
                        id={data._id}
                    />
                </div>
            )}
        </div>
    );
};

export default UpdateUser;
