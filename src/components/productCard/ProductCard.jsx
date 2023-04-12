import "./productCard.scss";
import { DeleteOutlined } from "@mui/icons-material";
import { useNavigate } from "react-router-dom";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { apiRequest } from "utils/apiAxios";
import dateFormat from "dateformat";
import defaultImage from "assets/no-image.jpg";

const ProductCard = ({ product }) => {
    const navigate = useNavigate();

    const { isLoading, error, data } = useQuery({
        queryKey: [product?.sellerId],
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
        mutate();
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
                        src={product?.cover ? product.cover : defaultImage}
                        alt=""
                        className="image"
                    />
                </div>
                <div className="productItems">
                    <h1 className="title">{product?.productId}</h1>
                    {isLoading || error ? (
                        ""
                    ) : data.name ? (
                        <p className="itemDetail">{data.name}</p>
                    ) : (
                        <p className="itemDetail">{data.username}</p>
                    )}
                    {product?.arrivalDate ? (
                        <p className="itemDetail">
                            {"Arrival Date: "}
                            {dateFormat(product.arrivalDate, "dd-mm-yyyy")}
                        </p>
                    ) : (
                        ""
                    )}
                    {product?.deliveryDate ? (
                        <p className="itemDetail">
                            {"Delivery Date: "}
                            {dateFormat(product.deliveryDate, "dd-mm-yyyy")}
                        </p>
                    ) : (
                        ""
                    )}
                    {product?.port ? (
                        <p className="itemDetail">Port: {product.port}</p>
                    ) : (
                        ""
                    )}
                    {product?.status ? (
                        <p className="itemDetail">
                            <span className={`status ${product.status}`}>
                                {product.status}
                            </span>
                        </p>
                    ) : (
                        ""
                    )}
                </div>
            </div>
        </div>
    );
};

export default ProductCard;
