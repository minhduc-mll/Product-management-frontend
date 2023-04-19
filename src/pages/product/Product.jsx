import "./product.scss";
import UserDetail from "components/userDetail/UserDetail";
import CalendarCard from "components/calendarCard/CalendarCard";
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
        queryKey: ["products", id],
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
        queryKey: ["products", seller],
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
        queryKey: ["products", customer],
        queryFn: async () => {
            const res = await apiRequest.get(`/customers/${customer}`);
            return res.data;
        },
        enabled: !!customer,
    });

    const {
        isLoading: isLoadingProductEvent,
        error: errorProductEvent,
        data: dataProductEvent,
    } = useQuery({
        queryKey: ["products", "events", id],
        queryFn: async () => {
            const res = await apiRequest.get(
                `/productevent/productEvent/${id}`
            );
            return res.data;
        },
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
            <div className="productTop">
                <h1 className="title">Infomation</h1>
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
            <div className="productMiddle">
                <div className="productDetail">
                    {isLoading ? (
                        "Loading..."
                    ) : error ? (
                        error.response.data.message
                    ) : (
                        <div className="productItems">
                            <div className="itemImage">
                                <img
                                    src={
                                        product.cover
                                            ? product.cover
                                            : defaultImage
                                    }
                                    alt=""
                                    className="image"
                                />
                            </div>
                            <h1 className="itemTitle">{product.productId}</h1>
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
                    )}
                </div>
                <div className="productCalendar">
                    {isLoadingProductEvent ? (
                        "Loading..."
                    ) : errorProductEvent ? (
                        <CalendarCard
                            title={errorProductEvent.response.data.message}
                            center="title"
                            initialView="listMonth"
                            editable={false}
                            initialEvents={null}
                        />
                    ) : (
                        <CalendarCard
                            title="Calendar"
                            height="auto"
                            center="title"
                            initialView="dayGridMonth"
                            editable={false}
                            initialEvents={dataProductEvent}
                        />
                    )}
                </div>
            </div>
            <div className="productBottom">
                {isLoadingSeller ? (
                    ""
                ) : errorSeller ? (
                    errorSeller.response.data.message
                ) : (
                    <UserDetail user={dataSeller} />
                )}
                {isLoadingCustomer ? (
                    ""
                ) : errorCustomer ? (
                    errorCustomer.response.data.message
                ) : (
                    <UserDetail user={dataCustomer} />
                )}
            </div>
        </div>
    );
};

export default Product;
