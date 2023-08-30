import "./customerCard.scss";
import {
    DeleteOutlined,
    PhoneIphoneOutlined,
    EmailOutlined,
    CalendarTodayOutlined,
    EmojiTransportationOutlined,
    AccountBalanceOutlined,
    PlaceOutlined,
} from "@mui/icons-material";
import { useNavigate } from "react-router-dom";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { apiRequest } from "utils/apiAxios";
import dateFormat from "dateformat";
import defaultAvatar from "assets/images/no-avatar.jpg";

const CustomerCard = ({ customer }) => {
    const navigate = useNavigate();

    const { isLoading, error, data } = useQuery({
        queryKey: ["customers", customer?.userId],
        queryFn: async () => {
            const res = await apiRequest.get(`/users/${customer?.userId}`);
            return res.data;
        },
        enabled: !!customer?.userId,
    });

    const queryClient = useQueryClient();

    const { mutate } = useMutation({
        mutationFn: async () => {
            await apiRequest.delete(`/customers/${customer._id}`);
        },
        onSuccess: () => {
            queryClient.invalidateQueries(["customers"]);
        },
    });

    const handleDelete = async () => {
        const deleteConfirm = window.confirm(
            `Bạn thực sụ muốn xóa ${customer.name}`
        );

        if (deleteConfirm) {
            mutate();
        }
    };

    return (
        <div className="customerCard">
            <div className="deleteCard">
                <DeleteOutlined className="icon" onClick={handleDelete} />
            </div>
            <div
                className="wrapper"
                onClick={() => {
                    navigate(`/customers/${customer._id}`);
                }}
            >
                <div className="customerImage">
                    <img
                        src={customer?.image ? customer.image : defaultAvatar}
                        alt="avata"
                        className="image"
                    />
                </div>
                <div className="customerItems">
                    <div className="itemTitle">
                        {customer?.name && (
                            <h1 className="title">{customer.name}</h1>
                        )}
                        {customer?.phone && (
                            <div className="phone">
                                <PhoneIphoneOutlined className="icon" />
                                <span className="itemValue">
                                    {customer.phone}
                                </span>
                            </div>
                        )}
                    </div>
                    <div className="items">
                        {customer?.email && (
                            <div className="itemDetail">
                                <EmailOutlined className="icon" />
                                <span className="itemValue">
                                    {customer.email}
                                </span>
                            </div>
                        )}
                        {customer?.birthday && (
                            <div className="itemDetail">
                                <CalendarTodayOutlined className="icon" />
                                <span className="itemValue">
                                    {dateFormat(
                                        customer.birthday,
                                        "dd-mm-yyyy"
                                    )}
                                </span>
                            </div>
                        )}
                        {customer?.company && (
                            <div className="itemDetail">
                                <EmojiTransportationOutlined className="icon" />
                                <span className="itemValue">
                                    {customer.company}
                                </span>
                            </div>
                        )}
                        {customer?.bankAccount && (
                            <div className="itemDetail">
                                <AccountBalanceOutlined className="icon" />
                                <span className="itemValue">
                                    {customer.bankAccount}
                                </span>
                            </div>
                        )}
                        {customer?.adress && (
                            <div className="itemDetail">
                                <PlaceOutlined className="icon" />
                                <span className="itemValue">
                                    {customer.adress}
                                </span>
                            </div>
                        )}
                    </div>
                    <div className="itemSeller">
                        {isLoading ? (
                            "Loading..."
                        ) : error ? (
                            error.response?.data.message
                        ) : (
                            <p className="itemDetail">{data.name}</p>
                        )}
                    </div>
                </div>
            </div>
        </div>
    );
};

export default CustomerCard;
