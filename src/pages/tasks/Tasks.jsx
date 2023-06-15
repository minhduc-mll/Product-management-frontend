import "./tasks.scss";
import { useNavigate } from "react-router-dom";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { apiRequest } from "utils/apiAxios";
import { useEffect } from "react";

const Tasks = () => {
    const navigate = useNavigate();

    const {
        isLoading,
        error,
        data: tasksData,
        refetch,
    } = useQuery({
        queryKey: ["Tasks"],
        queryFn: async () => {
            const res = await apiRequest.get(`/tasks/userTasks`);
            return res.data;
        },
    });

    const queryClient = useQueryClient();

    const mutatePut = useMutation({
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

    const mutateDelete = useMutation({
        mutationFn: async (id) => {
            const res = await apiRequest.delete(`/tasks/${id}`);
            return res.data;
        },
        onSuccess: () => {
            queryClient.invalidateQueries([`tasks`]);
        },
    });

    const handleDeleteTask = (id) => {
        mutateDelete.mutate(id);
    };

    useEffect(() => {
        refetch();
    }, [mutatePut, mutateDelete, refetch]);

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
                {isLoading
                    ? "Loading..."
                    : error
                    ? "error"
                    : tasksData.columns?.map((task) => (
                          <div className="taskCard" key={task.title}>
                              <div className="cardTitle">
                                  <span>{task.title}</span>
                              </div>
                              <hr />
                              <div className="cardDetail">
                                  {task.cards.map((card) => (
                                      <div
                                          className="detailTask"
                                          key={card.title}
                                      >
                                          <div
                                              className="detailTaskLeft"
                                              onClick={() => {
                                                  navigate(
                                                      `/products/${card.title}`
                                                  );
                                              }}
                                          >
                                              <span>{card.title}</span>
                                              <span>{card.desc}</span>
                                          </div>
                                          <button
                                              className="deleteButton"
                                              onClick={() => {
                                                  handleDeleteTask(card.id);
                                              }}
                                          >
                                              Done
                                          </button>
                                      </div>
                                  ))}
                              </div>
                          </div>
                      ))}
            </div>
        </div>
    );
};

export default Tasks;
