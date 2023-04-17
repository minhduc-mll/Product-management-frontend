import "./calendarCard.scss";
import { MoreVert } from "@mui/icons-material";
import FullCalendar from "@fullcalendar/react";
import dayGridPlugin from "@fullcalendar/daygrid";
import timeGridPlugin from "@fullcalendar/timegrid";
import interactionPlugin from "@fullcalendar/interaction";
import listPlugin from "@fullcalendar/list";
import { useEffect, useRef, useState } from "react";

const CalendarCard = ({
    title,
    height,
    left,
    center,
    right,
    initialView,
    editable,
    handleSelect,
    handleEventClick,
    initialEvents,
}) => {
    const [open, setOpen] = useState(false);
    const [activeView, setActiveView] = useState(initialView);
    const calendarRef = useRef(null);

    useEffect(() => {
        const { current: calendarDom } = calendarRef;
        const API = calendarDom ? calendarDom.getApi() : null;
        API && API.changeView(activeView);
    }, [activeView]);

    return (
        <div className="calendarCard">
            {editable ? (
                <div className="calendarCenter">
                    <FullCalendar
                        ref={calendarRef}
                        height={height}
                        plugins={[
                            dayGridPlugin,
                            timeGridPlugin,
                            interactionPlugin,
                            listPlugin,
                        ]}
                        headerToolbar={{
                            left: left,
                            center: center,
                            right: right,
                        }}
                        initialView={activeView}
                        editable={true}
                        selectable={true}
                        selectMirror={true}
                        dayMaxEvents={true}
                        select={handleSelect}
                        eventClick={handleEventClick}
                        initialEvents={initialEvents}
                    />
                </div>
            ) : (
                <>
                    <div className="calendarTop">
                        <h1 className="title">{title}</h1>
                        <MoreVert
                            className="icon"
                            onClick={() => setOpen(!open)}
                        />
                        {open && (
                            <div className="openMenu">
                                {activeView === "dayGridMonth" ? (
                                    <span
                                        onClick={() => {
                                            setActiveView("listMonth");
                                        }}
                                    >
                                        List
                                    </span>
                                ) : (
                                    <span
                                        onClick={() =>
                                            setActiveView("dayGridMonth")
                                        }
                                    >
                                        Month
                                    </span>
                                )}
                            </div>
                        )}
                    </div>
                    <div className="calendarBottom">
                        <FullCalendar
                            ref={calendarRef}
                            height={height}
                            plugins={[
                                dayGridPlugin,
                                timeGridPlugin,
                                interactionPlugin,
                                listPlugin,
                            ]}
                            headerToolbar={{
                                left: left,
                                center: center,
                                right: right,
                            }}
                            initialView={activeView}
                            selectable={true}
                            initialEvents={initialEvents}
                        />
                    </div>
                </>
            )}
        </div>
    );
};

export default CalendarCard;
