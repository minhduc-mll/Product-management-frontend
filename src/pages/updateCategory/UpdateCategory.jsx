import "./updateCategory.scss";
import FormUpdate from "components/formUpdate/FormUpdate";
import { useEffect } from "react";
import { useParams } from "react-router-dom";
import { useQuery } from "@tanstack/react-query";
import { apiRequest } from "utils/apiAxios";
import { categoryInputs } from "utils/inputForm";

const UpdateCategory = () => {
    const { id } = useParams();

    const { isLoading, error, data, refetch } = useQuery({
        queryKey: [`category`, id],
        queryFn: async () => {
            const res = await apiRequest.get(`/categories/${id}`);
            return res.data;
        },
        enabled: !!id,
    });

    useEffect(() => {
        refetch();
    }, [id, refetch]);

    return (
        <div className="updateCategory">
            <div className="top">
                {isLoading ? (
                    "Update Category"
                ) : error ? (
                    error.response?.data.message
                ) : (
                    <h1 className="title">{`Update Category ${data.title}`}</h1>
                )}
            </div>
            {isLoading ? (
                "Loading..."
            ) : error ? (
                error.response?.data.message
            ) : (
                <div className="bottom">
                    <FormUpdate
                        inputs={categoryInputs}
                        obj={data}
                        image={true}
                        route="categories"
                        id={data._id}
                    />
                </div>
            )}
        </div>
    );
};

export default UpdateCategory;
