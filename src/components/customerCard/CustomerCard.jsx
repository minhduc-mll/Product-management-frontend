import "./customerCard.scss";
import {
    CalendarTodayOutlined,
    PhoneIphoneOutlined,
    EmailOutlined,
    PlaceOutlined,
} from "@mui/icons-material";
import dateFormat from "dateformat";

const CustomerCard = ({ customer }) => {
    return (
        <div className="customerCard">
            <div className="customerImage">
                <img
                    src={
                        customer?.image
                            ? customer.image
                            : "https://res.cloudinary.com/dupx03lpv/image/upload/v1680784810/hgtp/no-avata.jpg"
                    }
                    alt="avata"
                    className="image"
                />
            </div>
            <div className="customerItems">
                <div className="itemTitle">
                    {customer?.name ? (
                        <h1 className="title">{customer.name}</h1>
                    ) : (
                        ""
                    )}
                    {customer?.phone ? (
                        <div className="desc">
                            <PhoneIphoneOutlined className="icon" />
                            <span className="itemValue">{customer.phone}</span>
                        </div>
                    ) : (
                        ""
                    )}
                </div>
                <div className="items">
                    {customer?.email ? (
                        <div className="itemDetail">
                            <EmailOutlined className="icon" />
                            <span className="itemValue">{customer.email}</span>
                        </div>
                    ) : (
                        ""
                    )}
                    {customer?.birthday ? (
                        <div className="itemDetail">
                            <CalendarTodayOutlined className="icon" />
                            <span className="itemValue">
                                {dateFormat(customer.birthday, "dd-mm-yyyy")}
                            </span>
                        </div>
                    ) : (
                        ""
                    )}
                    {customer?.company ? (
                        <div className="itemDetail">
                            <span className="itemValue">
                                {customer.company}
                            </span>
                        </div>
                    ) : (
                        ""
                    )}
                    {customer?.bankAccount ? (
                        <div className="itemDetail">
                            <span className="itemValue">
                                {customer.bankAccount}
                            </span>
                        </div>
                    ) : (
                        ""
                    )}
                    {customer?.adress ? (
                        <div className="itemDetail">
                            <PlaceOutlined className="icon" />
                            <span className="itemValue">{customer.adress}</span>
                        </div>
                    ) : (
                        ""
                    )}
                </div>
            </div>
        </div>
    );
};

export default CustomerCard;
