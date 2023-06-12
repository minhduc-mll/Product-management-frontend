import "./tasks.scss";
import { AddOutlined, CloseOutlined } from "@mui/icons-material";
import { useEffect, useState } from "react";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { apiRequest } from "utils/apiAxios";

const Tasks = () => {
    const [task, setTask] = useState();

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
                {isLoading ? "Loading..." : error ? "error" : "tasks"}
            </div>
        </div>
    );
};

export default Tasks;
