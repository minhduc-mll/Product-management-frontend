import "./updateProduct.scss";
import ProductDetail from "components/productDetail/ProductDetail";
import FormUpdate from "components/formUpdate/FormUpdate";
import { useEffect } from "react";
import { useParams } from "react-router-dom";
import { useQuery } from "@tanstack/react-query";
import { apiRequest } from "utils/apiAxios";
import { productInputs, productInputsAdmin } from "utils/inputForm";
import { checkRoleAdmin } from "utils/auth";

const UpdateProduct = () => {
    const { id } = useParams();
    const isAdmin = checkRoleAdmin();

    const { isLoading, error, data, refetch } = useQuery({
        queryKey: [`product`, id],
        queryFn: async () => {
            const res = await apiRequest.get(`/products/${id}`);
            return res.data;
        },
        enabled: !!id,
    });

    useQuery({
        queryKey: ["categories"],
        queryFn: async () => {
            const res = await apiRequest.get(`/categories`);
            const category = productInputs?.find((input) => {
                return input.name === "categoryId";
            });
            if (category) {
                category.options = res.data?.map((data) => {
                    return {
                        value: data._id,
                        title: data.title,
                    };
                });
                category.options?.unshift({
                    value: null,
                    title: null,
                });
            }
            return res.data;
        },
    });

    useQuery({
        queryKey: ["customers"],
        queryFn: async () => {
            const res = await apiRequest.get(`/customers`);
            const customer = productInputs?.find((input) => {
                return input.name === "customerId";
            });
            if (customer) {
                customer.options = res.data?.map((data) => {
                    return {
                        value: data._id,
                        title: data.name,
                    };
                });
                customer.options?.unshift({
                    value: "",
                    title: "--- Please select ---",
                });
            }
            return res.data;
        },
    });

    useQuery({
        queryKey: ["sellers"],
        queryFn: async () => {
            const res = await apiRequest.get(`/users`);
            const seller = productInputs?.find((input) => {
                return input.name === "sellerId";
            });
            if (seller) {
                seller.options = res.data?.map((data) => {
                    return {
                        value: data._id,
                        title: data.name,
                    };
                });
                seller.options?.unshift({
                    value: "",
                    title: "--- Please select ---",
                });
            }
            return res.data;
        },
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
                error.response?.data.message
            ) : (
                <div className="bottom">
                    <div className="left">
                        <ProductDetail product={data} />
                    </div>
                    <div className="right">
                        <FormUpdate
                            inputs={productInputs}
                            obj={data}
                            image={true}
                            route="products"
                            id={data.productId}
                        />
                        {isAdmin && (
                            <FormUpdate
                                inputs={productInputsAdmin}
                                obj={data}
                                route="products"
                                id={data.productId}
                            />
                        )}
                    </div>
                </div>
            )}
        </div>
    );
};

export default UpdateProduct;
