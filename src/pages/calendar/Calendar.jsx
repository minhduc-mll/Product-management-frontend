import "./calendar.scss";
import EventCard from "components/eventCard/EventCard";
import CalendarCard from "components/calendarCard/CalendarCard";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { apiRequest } from "utils/apiAxios";

const Calendar = () => {
    const queryClient = useQueryClient();

    const { isLoading, error, data } = useQuery({
        queryKey: ["events"],
        queryFn: async () => {
            const res = await apiRequest.get(
                `/events?sortName=start&sortOrder=dsc`
            );
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
            <div className="calendarTop">
                <h1 className="title">Calendar</h1>
            </div>
            <div className="calendarBottom">
                <div className="calendarEvents">
                    <h1 className="title">Events</h1>
                    <div className="event">
                        {isLoading || error
                            ? ""
                            : data?.map((event) => (
                                  <EventCard event={event} key={event._id} />
                              ))}
                    </div>
                </div>
                <div className="calendarRight">
                    {isLoading || error ? (
                        ""
                    ) : (
                        <CalendarCard
                            height="75vh"
                            left="prev,next today"
                            center="title"
                            right="dayGridMonth,timeGridWeek,timeGridDay,listMonth"
                            initialView="dayGridMonth"
                            editable={true}
                            handleSelect={handleAddEvent}
                            handleEventClick={handleDeleteEvent}
                            initialEvents={data}
                        />
                    )}
                </div>
            </div>
        </div>
    );
};

export default Calendar;
