import "./calendar.scss";
import CalendarCard from "components/calendarCard/CalendarCard";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { apiRequest } from "utils/apiAxios";
import { formatDate } from "utils/format.helper";
import { useRef, useState } from "react";

const Calendar = () => {
    const [open, setOpen] = useState(false);
    const [event, setEvent] = useState();
    const [position, setPosition] = useState({
        position: "absolute",
        top: 0,
        left: 0,
    });
    const calendarElement = useRef(null);

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

    const handleDeleteEvent = async (selected) => {
        const productId = selected.event.title;
        const res = await apiRequest.get(`/products/${productId}`);
        const product = res.data;

        let text = `Bạn muốn xóa sự kiện '${productId}'?\n\n`;
        text += `Category: ` + product.category?.title + `\n`;
        if (product.seller?.name) {
            text += `Seller: ` + product.seller?.name + `\n`;
        } else {
            text += `Seller:\n`;
        }
        if (product.customer?.name) {
            text += `Customer: ` + product.customer?.name + `\n`;
        } else {
            text += `Customer:\n`;
        }
        text += `Ngày về: ` + formatDate(product.arrivalDate) + `\n`;
        text += `Ngày giao: ` + formatDate(product.deliveryDate);

        const deleteConfirm = window.confirm(text);

        if (deleteConfirm) {
            const id = selected.event.extendedProps._id;
            if (id) {
                mutateDelete.mutate({ id, selected });
            } else {
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

    const handleHoverEventIn = async (selected) => {
        const navbar = document.getElementById("navbar");
        const navbarHeight = navbar.offsetHeight;
        const sidebar = document.getElementById("sidebar");
        const sidebarWidth = sidebar.offsetWidth;
        const top =
            selected.jsEvent.clientY -
            selected.jsEvent.layerY -
            navbarHeight -
            20;
        const left =
            selected.jsEvent.clientX -
            selected.jsEvent.layerX -
            sidebarWidth -
            20;
        if (left > calendarElement.current.offsetWidth / 2) {
            setPosition({
                ...position,
                top: top,
                left: left - 10,
                transform: "translate(-100%, 0)",
            });
        } else {
            setPosition({
                ...position,
                top: top,
                left: left + selected.el.offsetWidth + 10,
                transform: "translate(0, 0)",
            });
        }
        const res = await apiRequest.get(`/products/${selected.event.title}`);
        setEvent(res.data);
        setOpen(true);
    };

    const handleHoverEventOut = () => {
        setOpen(false);
    };

    return (
        <div className="calendar" ref={calendarElement}>
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
                            handleEventMouseEnter={handleHoverEventIn}
                            handleEventMouseLeave={handleHoverEventOut}
                            handleEventDrop={handleUpdateProduct}
                            initialEvents={dataProductEvent}
                        />
                    )}
                    {
                        <div
                            className={`calendarEvent ${
                                open ? "active" : "disable"
                            }`}
                            style={position}
                        >
                            <div className="eventDetail">
                                <span className="text title">
                                    {event?.productId}
                                </span>
                                <span className="text">
                                    Category: {event?.category?.title}
                                </span>
                                <span className="text">
                                    Seller: {event?.seller?.name}
                                </span>
                                <span className="text">
                                    Customer: {event?.customer?.name}
                                </span>
                                <span className="text">
                                    Ngày về: {formatDate(event?.arrivalDate)}
                                </span>
                                <span className="text">
                                    Ngày giao: {formatDate(event?.deliveryDate)}
                                </span>
                            </div>
                        </div>
                    }
                </div>
            </div>
        </div>
    );
};

export default Calendar;
