import "./product.scss";
import UserDetail from "components/userDetail/UserDetail";
import CalendarCard from "components/calendarCard/CalendarCard";
import { useNavigate, useParams } from "react-router-dom";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { apiRequest } from "utils/apiAxios";
import ProductDetail from "components/productDetail/ProductDetail";
import dateFormat from "dateformat";
import axios from "axios";

const Product = () => {
    const navigate = useNavigate();

    const { id } = useParams();

    useQuery({
        queryKey: ["maersk"],
        queryFn: async () => {
            const cont = "MRSU0112500";
            const res = await axios.get(
                `
            https://api.maersk.com/synergy/tracking/${cont}?operator=MAEU`,
                {
                    headers: {
                        "Api-Version": "v2",
                        "Consumer-Key": "UtMm6JCDcGTnMGErNGvS2B98kt1Wl25H",
                    },
                }
            );
            const data = res.data;
            console.log(data?.containers[0]?.container_num);
            console.log(data?.containers[0]?.eta_final_delivery);
            console.log(data?.origin?.city);
            console.log(data?.destination?.city);
            return res.data;
        },
    });

    useQuery({
        queryKey: ["cosco"],
        queryFn: async () => {
            const cont = "TEMU2906617";
            const now = new Date().getTime();
            const res = await axios.get(
                `
            https://elines.coscoshipping.com/ebtracking/public/containers/${cont}?timestamp=${now}`,
                {
                    headers: {
                        "Access-Control-Allow-Origin": "*",
                    },
                }
            );
            const data = res.data;
            console.log(
                data?.content?.containers[0]?.container.containerNumber
            );
            console.log(
                data?.content?.containers[0]?.container.containerLocation
            );
            console.log(data?.content?.containers[0]?.container.podEta);
            console.log(data?.content?.containers[0]?.container.polEtd);
            return res.data;
        },
    });

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
            const res = await apiRequest.get(`/productevent/${id}`);
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
        const deleteConfirm = window.confirm(`Bạn thực sụ muốn xóa ${id}`);

        if (deleteConfirm) {
            mutate();
        }
    };

    return (
        <div className="product">
            <div className="productTop">
                <h1 className="title">Thông tin cont {id}</h1>
                <div className="buttons">
                    <button
                        className="addButton"
                        onClick={() => {
                            navigate(`/products/new`);
                        }}
                    >
                        Thêm mới
                    </button>
                    <button
                        className="updateButton"
                        onClick={() => {
                            navigate(`/products/update/${id}`);
                        }}
                    >
                        Cập nhật
                    </button>
                    <button className="deleteButton" onClick={handleDelete}>
                        Xóa
                    </button>
                </div>
            </div>
            <div className="productMiddle">
                {isLoading ? (
                    "Loading..."
                ) : error ? (
                    error.response?.data.message
                ) : (
                    <ProductDetail product={product} />
                )}
                <div className="productCalendar">
                    {isLoadingProductEvent ? (
                        "Loading..."
                    ) : errorProductEvent ? (
                        <CalendarCard
                            hasHeader={true}
                            title={errorProductEvent.response.data.message}
                            center="title"
                            initialView="listMonth"
                            editable={false}
                            initialEvents={null}
                        />
                    ) : (
                        <CalendarCard
                            hasHeader={true}
                            title="Lịch hàng về và lịch giao hàng"
                            height="auto"
                            center="title"
                            initialView="dayGridMonth"
                            initialDate={
                                dataProductEvent[0] &&
                                dateFormat(
                                    dataProductEvent[0].start,
                                    "yyyy-mm-dd"
                                )
                            }
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
