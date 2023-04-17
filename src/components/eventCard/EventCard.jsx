import "./eventCard.scss";
import { DeleteOutlined } from "@mui/icons-material";
import dateFormat from "dateformat";

const EventCard = ({ event }) => {
    const handleDelete = () => {};

    const dateStart = new Date(event?.start);
    const dateEnd = new Date(event?.end);
    const diffTime = dateEnd - dateStart;

    return (
        <div className="eventCard">
            <div className="deleteCard">
                <DeleteOutlined className="icon" onClick={handleDelete} />
            </div>
            <div className="listItem">
                <div className="listItemTitle">{event?.title}</div>
                {event?.allDay ? (
                    event?.end && diffTime > 86400000 ? (
                        <div className="listItemEvent">
                            <div className="itemEventStart">
                                {dateFormat(dateStart, "mmm dd, yyyy")}
                            </div>
                            -
                            <div className="itemEventEnd">
                                {dateFormat(dateEnd - 86400000, "mmm dd, yyyy")}
                            </div>
                        </div>
                    ) : (
                        <div className="listItemEvent">
                            <div className="itemEventStart">
                                {dateFormat(dateStart, "mmm dd, yyyy")}
                            </div>
                        </div>
                    )
                ) : event?.end ? (
                    diffTime > 86400000 ? (
                        <div className="listItemEvent">
                            <div className="itemEventStart">
                                <div className="startHour">
                                    {dateFormat(dateStart, "HH:MM:ss")}
                                </div>
                                <div className="startDate">
                                    {dateFormat(dateStart, "mmm dd, yyyy")}
                                </div>
                            </div>
                            -
                            <div className="itemEventEnd">
                                <div className="startHour">
                                    {dateFormat(dateEnd, "HH:MM:ss")}
                                </div>
                                <div className="startDate">
                                    {dateFormat(dateEnd, "mmm dd, yyyy")}
                                </div>
                            </div>
                        </div>
                    ) : (
                        <>
                            <div className="listItemEvent">
                                <div className="itemEventStart">
                                    {dateFormat(dateStart, "HH:MM:ss")}
                                </div>
                                -
                                <div className="itemEventEnd">
                                    {dateFormat(dateEnd, "HH:MM:ss")}
                                </div>
                            </div>
                            <div className="listItemEvent">
                                {dateFormat(dateStart, "mmm dd, yyyy")}
                            </div>
                        </>
                    )
                ) : (
                    <>
                        <div className="listItemEvent">
                            <div className="itemEventStart">
                                {dateFormat(dateStart, "HH:MM:ss")}
                            </div>
                        </div>
                        <div className="listItemEvent">
                            {dateFormat(dateStart, "mmm dd, yyyy")}
                        </div>
                    </>
                )}
            </div>
        </div>
    );
};

export default EventCard;
