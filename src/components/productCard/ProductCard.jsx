import "./productCard.scss";
import { useQuery } from "@tanstack/react-query";
import { apiRequest } from "utils/apiAxios";
import dateFormat from "dateformat";

const ProductCard = ({ product }) => {
    const { isLoading, error, data } = useQuery({
        queryKey: [product?.sellerId],
        queryFn: () =>
            apiRequest.get(`/users/${product?.sellerId}`).then((res) => {
                return res.data;
            }),
        enabled: !!product?.sellerId,
    });

    return (
        <div className="productCard">
            <div className="productImage">
                <img
                    src={
                        product?.cover
                            ? product.cover
                            : "https://res.cloudinary.com/dupx03lpv/image/upload/v1680785301/hgtp/no-image.jpg"
                    }
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
    );
};

export default ProductCard;
