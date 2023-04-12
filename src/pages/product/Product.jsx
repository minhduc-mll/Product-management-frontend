import "./product.scss";
import UserDetail from "components/userDetail/UserDetail";
import { useNavigate, useParams } from "react-router-dom";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { apiRequest } from "utils/apiAxios";
import dateFormat from "dateformat";
import defaultImage from "assets/no-image.jpg";

const Product = () => {
    const navigate = useNavigate();

    const { id } = useParams();

    const {
        isLoading,
        error,
        data: product,
    } = useQuery({
        queryKey: [id],
        queryFn: async () => {
            const res = await apiRequest.get(`/products/${id}`);
            return res.data;
        },
        enabled: !!id,
    });

    const seller = product?.sellerId;

    const {
        isLoading: isLoadingSeller,
        error: errorSeller,
        data: dataSeller,
    } = useQuery({
        queryKey: [seller],
        queryFn: async () => {
            const res = await apiRequest.get(`/users/${seller}`);
            return res.data;
        },
        enabled: !!seller,
    });

    const customer = product?.customerId;

    const {
        isLoading: isLoadingCustomer,
        error: errorCustomer,
        data: dataCustomer,
    } = useQuery({
        queryKey: [customer],
        queryFn: async () => {
            const res = await apiRequest.get(`/customers/${customer}`);
            return res.data;
        },
        enabled: !!customer,
    });

    const queryClient = useQueryClient();

    const { mutate } = useMutation({
        mutationFn: async () => {
            await apiRequest.delete(`/products/${id}`);
        },
        onSuccess: () => {
            queryClient.invalidateQueries(["products"]);
            navigate(`/products`);
        },
    });

    const handleDelete = async () => {
        mutate();
    };

    return (
        <div className="product">
            <div className="top">
                <div className="title">Infomation</div>
                <div className="buttons">
                    <button
                        className="addButton"
                        onClick={() => {
                            navigate(`/products/new`);
                        }}
                    >
                        Add New
                    </button>
                    <button
                        className="updateButton"
                        onClick={() => {
                            navigate(`/products/update/${id}`);
                        }}
                    >
                        Update
                    </button>
                    <button className="deleteButton" onClick={handleDelete}>
                        Delete
                    </button>
                </div>
            </div>
            <div className="bottom">
                {isLoading || error ? (
                    ""
                ) : (
                    <div className="productDetail">
                        <div className="productImage">
                            <img
                                src={
                                    product.cover ? product.cover : defaultImage
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
