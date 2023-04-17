import "./calendar.scss";
import FullCalendar from "@fullcalendar/react";
import dayGridPlugin from "@fullcalendar/daygrid";
import timeGridPlugin from "@fullcalendar/timegrid";
import interactionPlugin from "@fullcalendar/interaction";
import listPlugin from "@fullcalendar/list";
import EventCard from "components/eventCard/EventCard";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { apiRequest } from "utils/apiAxios";

const Calendar = () => {
    const queryClient = useQueryClient();

    const { isLoading, error, data } = useQuery({
        queryKey: ["events"],
        queryFn: async () => {
            const res = await apiRequest.get(`/events`);
            return res.data;
        },
    });

    const mutatePost = useMutation({
        mutationFn: async ({ event }) => {
            const res = await apiRequest.post(`/events`, event);
            return res.data;
        },
        onSuccess: (data, { calendarSelected }) => {
            queryClient.invalidateQueries([`/events`]);
            calendarSelected.addEvent({
                _id: data?._id,
                title: data?.title,
                allDay: data?.allDay,
                start: data?.start,
                end: data?.end,
            });
        },
    });

    const mutateDelete = useMutation({
        mutationFn: async ({ id }) => {
            await apiRequest.delete(`/events/${id}`);
        },
        onSuccess: (data, { eventSelected }) => {
            queryClient.invalidateQueries(["events"]);
            eventSelected.remove();
        },
    });

    const handleAddEvent = (selected) => {
        const title = prompt("Please enter a new title for your event");
        const calendarSelected = selected.view.calendar;
        calendarSelected.unselect();

        if (title) {
            const event = {
                title: title,
                allDay: selected.allDay,
                start: selected.startStr,
                end: selected.endStr,
            };
            mutatePost.mutate({ event, calendarSelected });
        }
    };

    const handleDeleteEvent = (selected) => {
        const deleteConfirm = window.confirm(
            `Do you want to delete the event '${selected.event.title}'`
        );

        if (deleteConfirm) {
            const eventSelected = selected.event;
            const id = selected.event.extendedProps._id;
            mutateDelete.mutate({ id, eventSelected });
        }
    };

    return (
        <div className="calendar">
            <div className="top">
                <div className="title">Calendar</div>
            </div>
            <div className="bottom">
                <div className="left">
                    <h1 className="title">Events</h1>
                    <div className="event">
                        {data?.map((event) => (
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
                            select={handleAddEvent}
                            eventClick={handleDeleteEvent}
                            initialEvents={data}
                        />
                    )}
                </div>
            </div>
        </div>
    );
};

export default Calendar;
