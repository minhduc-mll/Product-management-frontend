import "./product.scss";
import UserDetail from "components/userDetail/UserDetail";
import CalendarCard from "components/calendarCard/CalendarCard";
import { useNavigate, useParams } from "react-router-dom";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { apiRequest } from "utils/apiAxios";
import ProductDetail from "components/productDetail/ProductDetail";

const Product = () => {
    const navigate = useNavigate();

    const { id } = useParams();

    const {
        isLoading,
        error,
        data: product,
    } = useQuery({
        queryKey: ["product", id],
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
        queryKey: ["product", seller],
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
        queryKey: ["product", customer],
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
        queryKey: ["product", "events", id],
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
                {isLoading ? (
                    "Loading..."
                ) : error ? (
                    error.response.data.message
                ) : (
                    <ProductDetail product={product} />
                )}
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
