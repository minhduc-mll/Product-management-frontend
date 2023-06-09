import "./tasks.scss";
import { AddOutlined, CloseOutlined } from "@mui/icons-material";
import Board, {
    moveCard,
    moveColumn,
    removeCard,
    addCard,
} from "@asseinfo/react-kanban";
import AddModal from "components/addModal/AddModal";
import { useEffect, useState } from "react";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { apiRequest } from "utils/apiAxios";

const Tasks = () => {
    const [task, setTask] = useState({ columns: [] });
    const [modalOpened, setModalOpened] = useState(false);

    const handleColumnMove = (_card, source, destination) => {
        const updatedTask = moveColumn(task, source, destination);
        setTask(updatedTask);
    };

    const handleCardMove = (_card, source, destination) => {
        const updatedTask = moveCard(task, source, destination);
        setTask(updatedTask);
        let existing = task.columns.filter((value, index) => {
            return value.id === source.fromColumnId;
        });
        mutate({
            id: existing[0].cards[source.fromPosition].id,
            obj: { userId: destination.toColumnId },
        });
    };

    const handleCardAdd = (props, title, detail) => {
        const card = {
            id: new Date().getTime(),
            title,
            description: detail,
        };

        const updatedBoard = addCard(task, props, card);
        setTask(updatedBoard);
        setModalOpened(false);
    };

    const getColumn = (card) => {
        const column = task.columns.filter((column) =>
            column.cards.includes(card)
        );
        return column[0];
    };

    const {
        isLoading,
        error,
        data: tasksData,
    } = useQuery({
        queryKey: ["Tasks"],
        queryFn: async () => {
            const res = await apiRequest.get(`/tasks/userTasks`);
            setTask(res.data);
            return res.data;
        },
    });

    const queryClient = useQueryClient();

    const { mutate } = useMutation({
        mutationFn: async (formData) => {
            const res = await apiRequest.put(
                `/tasks/${formData.id}`,
                formData.obj
            );
            return res.data;
        },
        onSuccess: () => {
            queryClient.invalidateQueries([`tasks`]);
        },
    });

    useEffect(() => {
        setTask(tasksData);
    }, [tasksData]);

    return (
        <div className="tasks">
            <div className="tasksTop">
                <div className="tasksTitle">
                    <h1 className="title">To Do Today</h1>
                    <button className="addButton" onClick={() => {}}>
                        Add new
                    </button>
                </div>
            </div>
            <div className="tasksBottom">
                {isLoading ? (
                    "Loading..."
                ) : error ? (
                    "error"
                ) : (
                    <Board
                        allowAddColumn
                        allowRenameColumn
                        allowRemoveCard
                        allowAddCard={{ on: "top" }}
                        onCardDragEnd={handleCardMove}
                        onColumnDragEnd={handleColumnMove}
                        renderCard={(props, index) => {
                            return (
                                <div className="kanban-card" key={index}>
                                    <div>
                                        <span>{props.title}</span>
                                        <button
                                            className="remove-button"
                                            type="button"
                                            onClick={() => {
                                                const updatedBoard = removeCard(
                                                    task,
                                                    getColumn(props),
                                                    props
                                                );
                                                setTask(updatedBoard);
                                            }}
                                        >
                                            <CloseOutlined className="icon" />
                                        </button>
                                    </div>
                                    <span>{props.description}</span>
                                </div>
                            );
                        }}
                        renderColumnHeader={(props, index) => {
                            return (
                                <div className="column-header" key={index}>
                                    <div className="column-header-top">
                                        <span>{props.title}</span>

                                        <AddOutlined
                                            className="icon"
                                            onClick={() => {
                                                if (modalOpened === props) {
                                                    setModalOpened(null);
                                                } else {
                                                    setModalOpened(props);
                                                }
                                            }}
                                        />
                                    </div>
                                    {modalOpened === props && (
                                        <AddModal
                                            props={props}
                                            handleCardAdd={handleCardAdd}
                                            onClose={() =>
                                                setModalOpened(false)
                                            }
                                        />
                                    )}
                                </div>
                            );
                        }}
                    >
                        {task}
                    </Board>
                )}
            </div>
        </div>
    );
};

export default Tasks;
