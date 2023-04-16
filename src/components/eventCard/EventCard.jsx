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
                    dateEnd && diffTime > 86400000 ? (
                        <div className="listItemEvent">
                            <div className="itemEventStart">
                                {dateFormat(event?.start, "mmm dd, yyyy")}
                            </div>
                            -
                            <div className="itemEventEnd">
                                {dateFormat(
                                    event?.end - 86400000,
                                    "mmm dd, yyyy"
                                )}
                            </div>
                        </div>
                    ) : (
                        <div className="listItemEvent">
                            <div className="itemEventStart">
                                {dateFormat(event?.start, "mmm dd, yyyy")}
                            </div>
                        </div>
                    )
                ) : dateEnd ? (
                    diffTime > 86400000 ? (
                        <div className="listItemEvent">
                            <div className="itemEventStart">
                                <div className="startHour">
                                    {dateFormat(event?.start, "HH:MM:ss")}
                                </div>
                                <div className="startDate">
                                    {dateFormat(event?.start, "mmm dd, yyyy")}
                                </div>
                            </div>
                            -
                            <div className="itemEventEnd">
                                <div className="startHour">
                                    {dateFormat(event?.end, "HH:MM:ss")}
                                </div>
                                <div className="startDate">
                                    {dateFormat(event?.end, "mmm dd, yyyy")}
                                </div>
                            </div>
                        </div>
                    ) : (
                        <>
                            <div className="listItemEvent">
                                <div className="itemEventStart">
                                    {dateFormat(event?.start, "HH:MM:ss")}
                                </div>
                                -
                                <div className="itemEventEnd">
                                    {dateFormat(event?.end, "HH:MM:ss")}
                                </div>
                            </div>
                            <div className="listItemEvent">
                                {dateFormat(event?.start, "mmm dd, yyyy")}
                            </div>
                        </>
                    )
                ) : (
                    <>
                        <div className="listItemEvent">
                            <div className="itemEventStart">
                                {dateFormat(event?.start, "HH:MM:ss")}
                            </div>
                        </div>
                        <div className="listItemEvent">
                            {dateFormat(event?.start, "mmm dd, yyyy")}
                        </div>
                    </>
                )}
            </div>
        </div>
    );
};

export default EventCard;
