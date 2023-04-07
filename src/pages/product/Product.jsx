import "./product.scss";
import UserDetail from "components/userDetail/UserDetail";
import { useNavigate, useParams } from "react-router-dom";
import { useQuery } from "@tanstack/react-query";
import { apiRequest } from "utils/apiAxios";
import dateFormat from "dateformat";

const Product = () => {
    const navigate = useNavigate();

    const { id } = useParams();

    const {
        isLoading,
        error,
        data: product,
    } = useQuery({
        queryKey: [id],
        queryFn: async () =>
            await apiRequest.get(`/products/${id}`).then((res) => {
                console.log(res.data);
                return res.data;
            }),
        enabled: !!id,
    });

    const seller = product?.sellerId;

    const {
        isLoading: isLoadingSeller,
        error: errorSeller,
        data: dataSeller,
    } = useQuery({
        queryKey: [seller],
        queryFn: async () =>
            await apiRequest.get(`/users/${seller}`).then((res) => {
                console.log(res.data);
                return res.data;
            }),
        enabled: !!seller,
    });

    const customer = product?.customerId;

    const {
        isLoading: isLoadingCustomer,
        error: errorCustomer,
        data: dataCustomer,
    } = useQuery({
        queryKey: [customer],
        queryFn: async () =>
            await apiRequest.get(`/customers/${customer}`).then((res) => {
                console.log(res.data);
                return res.data;
            }),
        enabled: !!customer,
    });

    return (
        <div className="product">
            <div className="top">
                <div className="title">Infomation</div>
                <button
                    className="editButton"
                    onClick={() => {
                        navigate(`/products/update/${id}`);
                    }}
                >
                    Edit
                </button>
            </div>
            <div className="bottom">
                {isLoading || error ? (
                    ""
                ) : (
                    <div className="productDetail">
                        <div className="productImage">
                            <img
                                src={
                                    product.cover
                                        ? product.cover
                                        : "https://res.cloudinary.com/dupx03lpv/image/upload/v1680785301/hgtp/no-image.jpg"
                                }
                                alt=""
                                className="image"
                            />
                        </div>
                        <div className="productItems">
                            <h1 className="title">{product.productId}</h1>
                            {product.desc ? (
                                <p className="itemDetail">{product.desc}</p>
                            ) : (
                                ""
                            )}
                            {product.price ? (
                                <p className="itemDetail">
                                    Price: {product.price}
                                </p>
                            ) : (
                                ""
                            )}
                            {product.deposit ? (
                                <p className="itemDetail">
                                    Deposit: {product.deposit}.000.000
                                </p>
                            ) : (
                                ""
                            )}
                            {product.arrivalDate ? (
                                <p className="itemDetail">
                                    {"Arrival date: "}
                                    {dateFormat(
                                        product.arrivalDate,
                                        "dd-mm-yyyy"
                                    )}
                                </p>
                            ) : (
                                ""
                            )}
                            {product.deliveryDate ? (
                                <p className="itemDetail">
                                    {"Delivery date: "}
                                    {dateFormat(
                                        product.deliveryDate,
                                        "dd-mm-yyyy"
                                    )}
                                </p>
                            ) : (
                                ""
                            )}
                            {product.port ? (
                                <p className="itemDetail">{product.port}</p>
                            ) : (
                                ""
                            )}
                            {product.status ? (
                                <p className="itemDetail">
                                    <span
                                        className={`status ${product.status}`}
                                    >
                                        {product.status}
                                    </span>
                                </p>
                            ) : (
                                ""
                            )}
                        </div>
                        <div className="productInfo">
                            {isLoadingSeller || errorSeller ? (
                                ""
                            ) : (
                                <UserDetail user={dataSeller} />
                            )}
                            {isLoadingCustomer || errorCustomer ? (
                                ""
                            ) : (
                                <UserDetail user={dataCustomer} />
                            )}
                        </div>
                    </div>
                )}
            </div>
        </div>
    );
};

export default Product;
