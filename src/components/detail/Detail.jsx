import "./detail.scss";
import PersonOutlineIcon from "@mui/icons-material/PersonOutline";
import CalendarTodayOutlinedIcon from "@mui/icons-material/CalendarTodayOutlined";
import PhoneIphoneOutlinedIcon from "@mui/icons-material/PhoneIphoneOutlined";
import EmailOutlinedIcon from "@mui/icons-material/EmailOutlined";
import PlaceOutlinedIcon from "@mui/icons-material/PlaceOutlined";
import LocationSearchingOutlinedIcon from "@mui/icons-material/LocationSearchingOutlined";

const Detail = () => {
    return (
        <div className="detail">
            <div className="left">
                <img
                    src="https://images.pexels.com/photos/1152994/pexels-photo-1152994.jpeg?auto=compress&cs=tinysrgb&dpr=2&w=500"
                    alt="avata"
                    className="itemImg"
                />
            </div>
            <div className="right">
                <div className="itemTitle">
                    <h1 className="title">Minh Duc</h1>
                    <span className="desc">Software Engineer</span>
                </div>
                <div className="itemDetail">
                    <PersonOutlineIcon className="icon" />
                    <span className="itemValue">minhduc.mll</span>
                </div>
                <div className="itemDetail">
                    <CalendarTodayOutlinedIcon className="icon" />
                    <span className="itemValue">18.10.1997</span>
                </div>
                <div className="itemDetail">
                    <PhoneIphoneOutlinedIcon className="icon" />
                    <span className="itemValue">0949487687</span>
                </div>
                <div className="itemDetail">
                    <EmailOutlinedIcon className="icon" />
                    <span className="itemValue">minhduc.mll@gmail.com</span>
                </div>
                <div className="itemDetail">
                    <PlaceOutlinedIcon className="icon" />
                    <span className="itemValue">
                        124 Xuân Thủy, Dịch Vọng Hậu, Cầu Giấy, Hà Nội
                    </span>
                </div>
                <div className="itemDetail">
                    <LocationSearchingOutlinedIcon className="icon" />
                    <span className="itemValue">Vietnam</span>
                </div>
            </div>
        </div>
    );
};

export default Detail;
