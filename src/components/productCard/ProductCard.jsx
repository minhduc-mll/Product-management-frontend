import "./productCard.scss";
import { DeleteOutlined } from "@mui/icons-material";
import { useNavigate } from "react-router-dom";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { apiRequest } from "utils/apiAxios";
import dateFormat from "dateformat";
import defaultImage from "assets/images/no-image.jpg";

const ProductCard = ({ product }) => {
    const navigate = useNavigate();

    const {
        isLoading: isLoadingCategories,
        error: errorCategories,
        data: dataCategories,
    } = useQuery({
        queryKey: ["categories", product?.categoryId],
        queryFn: async () => {
            const res = await apiRequest.get(
                `/categories/${product?.categoryId}`
            );
            return res.data;
        },
        enabled: !!product?.categoryId,
    });

    const {
        isLoading: isLoadingProducts,
        error: errorProducts,
        data: dataProducts,
    } = useQuery({
        queryKey: ["products", product?.sellerId],
        queryFn: async () => {
            const res = await apiRequest.get(`/users/${product?.sellerId}`);
            return res.data;
        },
        enabled: !!product?.sellerId,
    });

    const queryClient = useQueryClient();

    const { mutate } = useMutation({
        mutationFn: async () => {
            await apiRequest.delete(`/products/${product.productId}`);
        },
        onSuccess: () => {
            queryClient.invalidateQueries(["products"]);
        },
    });

    const handleDelete = async () => {
        const deleteConfirm = window.confirm(
            `Bạn thực sụ muốn xóa ${product.productId}`
        );

        if (deleteConfirm) {
            mutate();
        }
    };

    return (
        <div className="productCard">
            <div className="deleteCard">
                <DeleteOutlined className="icon" onClick={handleDelete} />
            </div>
            <div
                className="wrapper"
                onClick={() => {
                    navigate(`/products/${product.productId}`);
                }}
            >
                <div className="productImage">
                    <img
                        src={product?.cover || defaultImage}
                        alt=""
                        className="image"
                    />
                </div>
                <div className="productItems">
                    <h1 className="title">{product?.productId}</h1>
                    {isLoadingCategories ? (
                        ""
                    ) : errorCategories ? (
                        errorCategories.response.data.message
                    ) : (
                        <div className="itemDetail">
                            {dataCategories?.title}
                        </div>
                    )}
                    {isLoadingProducts ? (
                        ""
                    ) : errorProducts ? (
                        errorProducts.response.data.message
                    ) : dataProducts?.name ? (
                        <div className="itemDetail">{dataProducts?.name}</div>
                    ) : (
                        <div className="itemDetail">
                            {dataProducts?.username}
                        </div>
                    )}
                    {product?.saleDate && (
                        <div className="itemDetail">
                            <span>
                                {"Sale Date: "}
                                {dateFormat(product?.saleDate, "dd-mm-yyyy")}
                            </span>
                        </div>
                    )}
                    {product?.arrivalDate && (
                        <div className="itemDetail">
                            <span>
                                {"Arrival Date: "}
                                {dateFormat(product?.arrivalDate, "dd-mm-yyyy")}
                            </span>
                        </div>
                    )}
                    {product?.deliveryDate && (
                        <div className="itemDetail">
                            <span>
                                {"Delivery Date: "}
                                {dateFormat(
                                    product?.deliveryDate,
                                    "dd-mm-yyyy"
                                )}
                            </span>
                        </div>
                    )}
                    {product?.port && (
                        <div className="itemDetail">
                            <span>Port: {product?.port}</span>
                        </div>
                    )}
                    {product?.document && (
                        <div className="itemDetail">
                            <span>Document: {product?.document}</span>
                        </div>
                    )}
                    {product?.status && (
                        <div className="itemDetail">
                            <span className={`status ${product?.status}`}>
                                {product.status}
                            </span>
                        </div>
                    )}
                </div>
            </div>
        </div>
    );
};

export default ProductCard;
