import "./updateProduct.scss";
import ProductDetail from "components/productDetail/ProductDetail";
import FormUpdate from "components/formUpdate/FormUpdate";
import { useEffect } from "react";
import { useParams } from "react-router-dom";
import { useQuery } from "@tanstack/react-query";
import { apiRequest } from "utils/apiAxios";

const productInputs = [
    {
        id: 1,
        name: "productId",
        label: "Product ID",
        type: "text",
        placeholder: "Product ID",
    },
    {
        id: 2,
        name: "categoryId",
        label: "Category",
        type: "text",
        placeholder: "Category",
    },
    {
        id: 3,
        name: "desc",
        label: "Description",
        type: "text",
        placeholder: "Description",
    },
    {
        id: 4,
        name: "port",
        label: "Port",
        type: "text",
        placeholder: "Port",
    },
    {
        id: 5,
        name: "arrivalDate",
        label: "Arival date",
        type: "date",
        placeholder: "Arival date",
    },
    {
        id: 6,
        name: "deliveryDate",
        label: "Delivery date",
        type: "date",
        placeholder: "Delivery date",
    },
    {
        id: 7,
        name: "price",
        label: "Price",
        type: "text",
        placeholder: "Price",
    },
    {
        id: 8,
        name: "deposit",
        label: "Deposit",
        type: "text",
        placeholder: "Deposit",
    },
    {
        id: 9,
        name: "customerId",
        label: "Customer",
        type: "text",
        placeholder: "Customer",
    },
    {
        id: 10,
        name: "sellerId",
        label: "Seller",
        type: "text",
        placeholder: "Seller",
    },
    {
        id: 11,
        name: "status",
        label: "Status",
        type: "text",
        placeholder: "Status",
    },
];

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
