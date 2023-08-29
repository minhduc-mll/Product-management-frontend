import "./calendar.scss";
import CalendarCard from "components/calendarCard/CalendarCard";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { apiRequest } from "utils/apiAxios";

const Calendar = () => {
    const queryClient = useQueryClient();

    const {
        isLoading: isLoadingProductEvent,
        error: errorProductEvent,
        data: dataProductEvent,
    } = useQuery({
        queryKey: ["events"],
        queryFn: async () => {
            const res = await apiRequest.get(`/productevent`);
            return res.data;
        },
    });

    const mutatePost = useMutation({
        mutationFn: async ({ event }) => {
            const res = await apiRequest.post(`/events`, event);
            return res.data;
        },
        onSuccess: (data, { calendarSelected }) => {
            queryClient.invalidateQueries(["events"]);
            calendarSelected.addEvent({
                _id: data?._id,
                title: data?.title,
                allDay: data?.allDay,
                start: data?.start,
                end: data?.end,
            });
        },
    });

    // const mutatePut = useMutation({
    //     mutationFn: async ({ id, event }) => {
    //         const res = await apiRequest.put(`/events/${id}`, event);
    //         return res.data;
    //     },
    //     onSuccess: () => {
    //         queryClient.invalidateQueries(["events"]);
    //     },
    // });

    const mutateDelete = useMutation({
        mutationFn: async ({ id }) => {
            await apiRequest.delete(`/events/${id}`);
        },
        onSuccess: (_, { selected }) => {
            queryClient.invalidateQueries(["events"]);
            selected.event.remove();
        },
    });

    const mutatePutProduct = useMutation({
        mutationFn: async ({ productId, formData }) => {
            const res = await apiRequest.put(
                `/products/${productId}`,
                formData
            );
            return res.data;
        },
        onSuccess: (_, { selected }) => {
            queryClient.invalidateQueries(["events"]);
            if (selected) {
                selected.event.remove();
            }
        },
    });

    const handleAddEvent = (selected) => {
        const title = prompt("Nhập mã cont");
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

            const formData = new FormData();
            formData.append("arrivalDate", selected.startStr);
            mutatePutProduct.mutate({ productId: title, formData });
        }
    };

    const handleDeleteEvent = (selected) => {
        const deleteConfirm = window.confirm(
            `Bạn muốn xóa sự kiện '${selected.event.title}'?`
        );

        if (deleteConfirm) {
            const id = selected.event.extendedProps._id;
            if (id) {
                mutateDelete.mutate({ id, selected });
            } else {
                const productId = selected.event.title;
                const formData = new FormData();
                if (selected.event.backgroundColor.includes("blue")) {
                    formData.append("deliveryDate", "");
                } else {
                    formData.append("arrivalDate", "");
                }
                mutatePutProduct.mutate({ productId, formData, selected });
            }
        }
    };

    // const handleUpdateEvent = (selected) => {
    //     const id = selected.event.extendedProps._id;
    //     const event = {
    //         title: selected.title,
    //         allDay: selected.allDay,
    //         start: selected.startStr,
    //         end: selected.endStr,
    //     };
    //     mutatePut.mutate({ id, event });
    // };

    const handleUpdateProduct = (selected) => {
        const productId = selected.event.title;
        const newDate = selected.event.startStr;
        const formData = new FormData();
        if (selected.event.backgroundColor.includes("blue")) {
            formData.append("deliveryDate", newDate);
            selected.event.setProp("backgroundColor", "blue");
        } else {
            formData.append("arrivalDate", newDate);
            selected.event.setProp("backgroundColor", "green");
        }
        mutatePutProduct.mutate({ productId, formData });
    };

    return (
        <div className="calendar">
            <div className="calendarBottom">
                <div className="calendarRight">
                    {isLoadingProductEvent || errorProductEvent ? (
                        ""
                    ) : (
                        <CalendarCard
                            height="auto"
                            left="prev,next today"
                            center="title"
                            right="dayGridMonth,timeGridWeek,timeGridDay,listMonth"
                            initialView="dayGridMonth"
                            editable={true}
                            handleSelect={handleAddEvent}
                            handleEventClick={handleDeleteEvent}
                            handleEventDrop={handleUpdateProduct}
                            initialEvents={dataProductEvent}
                        />
                    )}
                </div>
            </div>
        </div>
    );
};

export default Calendar;
