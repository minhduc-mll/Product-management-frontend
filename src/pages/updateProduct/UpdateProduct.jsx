import "./updateProduct.scss";
import ProductDetail from "components/productDetail/ProductDetail";
import FormUpdate from "components/formUpdate/FormUpdate";
import { useEffect } from "react";
import { useParams } from "react-router-dom";
import { useQuery } from "@tanstack/react-query";
import { apiRequest } from "utils/apiAxios";
import { productInputs } from "utils/inputForm";

const UpdateProduct = ({ route }) => {
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
        <div className="updateProduct">
            <div className="top">
                <h1 className="title">Edit Product</h1>
            </div>
            {isLoading ? (
                "Loading..."
            ) : error ? (
                error.response.data.message
            ) : (
                <div className="bottom">
                    <ProductDetail product={data} />
                    <FormUpdate
                        route="products"
                        inputs={productInputs}
                        obj={data}
                        id={data.productId}
                    />
                </div>
            )}
        </div>
    );
};

export default UpdateProduct;
