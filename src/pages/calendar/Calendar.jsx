import "./calendar.scss";
import { useEffect, useState } from "react";
import FullCalendar from "@fullcalendar/react";
import dayGridPlugin from "@fullcalendar/daygrid";
import timeGridPlugin from "@fullcalendar/timegrid";
import interactionPlugin from "@fullcalendar/interaction";
import listPlugin from "@fullcalendar/list";
import EventCard from "components/eventCard/EventCard";
import { useQuery } from "@tanstack/react-query";
import { apiRequest } from "utils/apiAxios";

const Calendar = () => {
    const [currentEvents, setCurrentEvents] = useState([]);

    const { isLoading, error, data } = useQuery({
        queryKey: ["events"],
        queryFn: async () => {
            const res = await apiRequest.get(`/events`);
            return res.data;
        },
    });

    const handleDateSelect = (selected) => {
        handleAddEvent(selected);
    };

    const handleAddEvent = (selected) => {
        const title = prompt("Please enter a new title for your event");
        const calendarApi = selected.view.calendar;
        calendarApi.unselect();

        if (title) {
            calendarApi.addEvent({
                id: `${selected.start.getTime()}-${selected.end.getTime()}`,
                title: title,
                start: selected.startStr,
                end: selected.endStr,
                allDay: selected.allDay,
            });
        }
    };

    const handleEventClick = (selected) => {
        console.log(JSON.stringify(selected.event));
        handleDeleteEvent(selected);
    };

    const handleDeleteEvent = (selected) => {
        if (
            window.confirm(
                `Do you want to delete the event '${selected.event.title}'`
            )
        ) {
            selected.event.remove();
        }
    };

    useEffect(() => {
        if (data) {
            setCurrentEvents(data);
        }
    }, [data, currentEvents]);

    return (
        <div className="calendar">
            <div className="top">
                <div className="title">Calendar</div>
            </div>
            <div className="bottom">
                <div className="left">
                    <h1 className="title">Events</h1>
                    <div className="event">
                        {currentEvents?.map((event) => (
                            <EventCard event={event} key={event._id} />
                        ))}
                    </div>
                </div>
                <div className="right">
                    {isLoading || error ? (
                        ""
                    ) : (
                        <FullCalendar
                            height="75vh"
                            plugins={[
                                dayGridPlugin,
                                timeGridPlugin,
                                interactionPlugin,
                                listPlugin,
                            ]}
                            headerToolbar={{
                                left: "prev,next today",
                                center: "title",
                                right: "dayGridMonth,timeGridWeek,timeGridDay,listMonth",
                            }}
                            initialView="dayGridMonth"
                            editable={true}
                            selectable={true}
                            selectMirror={true}
                            dayMaxEvents={true}
                            select={handleDateSelect}
                            eventClick={handleEventClick}
                            eventsSet={(events) => setCurrentEvents(events)}
                            initialEvents={data}
                        />
                    )}
                </div>
            </div>
        </div>
    );
};

export default Calendar;
