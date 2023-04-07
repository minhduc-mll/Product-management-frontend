import "./userDetail.scss";
import {
    PersonOutline,
    CalendarTodayOutlined,
    PhoneIphoneOutlined,
    EmailOutlined,
    PlaceOutlined,
} from "@mui/icons-material";
import dateFormat from "dateformat";

const UserDetail = ({ user }) => {
    return (
        <div className="userDetail">
            <div className="userImage">
                <img
                    src={
                        user?.image
                            ? user.image
                            : "https://res.cloudinary.com/dupx03lpv/image/upload/v1680784810/hgtp/no-avata.jpg"
                    }
                    alt="avata"
                    className="image"
                />
            </div>
            <div className="userItem">
                <div className="itemTitle">
                    {user?.name ? (
                        <h1 className="title">{user.name}</h1>
                    ) : user?.username ? (
                        <h1 className="title">{user.username}</h1>
                    ) : (
                        ""
                    )}
                    {user?.role ? <span className="desc">{user.role}</span> : ""}
                </div>
                {user?.username ? (
                    <div className="itemDetail">
                        <PersonOutline className="icon" />
                        <span className="itemValue">{user.username}</span>
                    </div>
                ) : (
                    ""
                )}
                {user?.birthday ? (
                    <div className="itemDetail">
                        <CalendarTodayOutlined className="icon" />
                        <span className="itemValue">
                            {dateFormat(user.birthday, "dd-mm-yyyy")}
                        </span>
                    </div>
                ) : (
                    ""
                )}
                {user?.phone ? (
                    <div className="itemDetail">
                        <PhoneIphoneOutlined className="icon" />
                        <span className="itemValue">{user.phone}</span>
                    </div>
                ) : (
                    ""
                )}
                {user?.email ? (
                    <div className="itemDetail">
                        <EmailOutlined className="icon" />
                        <span className="itemValue">{user.email}</span>
                    </div>
                ) : (
                    ""
                )}
                {user?.adress ? (
                    <div className="itemDetail">
                        <PlaceOutlined className="icon" />
                        <span className="itemValue">{user.adress}</span>
                    </div>
                ) : (
                    <div className="itemDetail">
                        <PlaceOutlined className="icon" />
                        <span className="itemValue">Vietnam</span>
                    </div>
                )}
            </div>
        </div>
    );
};

export default UserDetail;
