import "./userDetail.scss";
import {
    PersonOutline,
    PhoneIphoneOutlined,
    EmailOutlined,
    EmojiTransportationOutlined,
    AccountBalanceOutlined,
    CalendarTodayOutlined,
    PlaceOutlined,
} from "@mui/icons-material";
import dateFormat from "dateformat";
import defaultAvatar from "assets/no-avatar.jpg";

const UserDetail = ({ user }) => {
    return (
        <div className="userDetail">
            <div className="userImage">
                <img
                    src={user?.image || defaultAvatar}
                    alt="avata"
                    className="image"
                />
            </div>
            <div className="userInfo">
                <div className="userInfoTitle">
                    {user?.name ? (
                        <h1 className="infoTitle">{user.name}</h1>
                    ) : (
                        user?.username && (
                            <h1 className="infoTitle">{user.username}</h1>
                        )
                    )}
                    {user?.role && (
                        <span className="infoDesc">{user.role}</span>
                    )}
                </div>
                {user?.username && (
                    <div className="userInfoItem">
                        <PersonOutline className="icon" />
                        <span className="infoValue">{user.username}</span>
                    </div>
                )}
                {user?.phone && (
                    <div className="userInfoItem">
                        <PhoneIphoneOutlined className="icon" />
                        <span className="infoValue">{user.phone}</span>
                    </div>
                )}
                {user?.email && (
                    <div className="userInfoItem">
                        <EmailOutlined className="icon" />
                        <span className="infoValue">{user.email}</span>
                    </div>
                )}
                {user?.company && (
                    <div className="userInfoItem">
                        <EmojiTransportationOutlined className="icon" />
                        <span className="infoValue">{user.company}</span>
                    </div>
                )}
                {user?.bankAccount && (
                    <div className="userInfoItem">
                        <AccountBalanceOutlined className="icon" />
                        <span className="infoValue">{user.bankAccount}</span>
                    </div>
                )}
                {user?.birthday && (
                    <div className="userInfoItem">
                        <CalendarTodayOutlined className="icon" />
                        <span className="infoValue">
                            {dateFormat(user.birthday, "dd-mm-yyyy")}
                        </span>
                    </div>
                )}
                {user?.adress ? (
                    <div className="userInfoItem">
                        <PlaceOutlined className="icon" />
                        <span className="infoValue">{user.adress}</span>
                    </div>
                ) : (
                    <div className="userInfoItem">
                        <PlaceOutlined className="icon" />
                        <span className="infoValue">Vietnam</span>
                    </div>
                )}
            </div>
        </div>
    );
};

export default UserDetail;
