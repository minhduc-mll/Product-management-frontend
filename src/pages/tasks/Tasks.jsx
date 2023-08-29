import "./tasks.scss";
import { useNavigate } from "react-router-dom";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { apiRequest } from "utils/apiAxios";
import { useState } from "react";

const Tasks = () => {
    const [newtask, setNewTask] = useState({ userId: "", title: "" });

    const navigate = useNavigate();

    const handleChange = (e, id) => {
        e.preventDefault();
        setNewTask({
            userId: id,
            title: e.target.value,
        });
    };

    const {
        isLoading,
        error,
        data: tasksData,
    } = useQuery({
        queryKey: ["tasks"],
        queryFn: async () => {
            const res = await apiRequest.get(`/tasks/userTasks`);
            return res.data;
        },
    });

    const queryClient = useQueryClient();

    const mutatePost = useMutation({
        mutationFn: async (formData) => {
            const res = await apiRequest.post(`/tasks`, formData);
            return res.data;
        },
        onSuccess: () => {
            queryClient.invalidateQueries([`tasks`]);
            setNewTask({ userId: "", title: "" });
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

    const { data: taskData } = useQuery({
        queryKey: ["pending", "addProduct"],
        queryFn: async () => {
            const res = await apiRequest.get(
                `/products?status=pending&sortName=productId`
            );
            const options = res.data?.map((data) => {
                return {
                    id: data.productId,
                    value: data.productId,
                    title: data.productId,
                };
            });
            options.unshift({
                id: "0",
                value: "",
                title: "--- Please select ---",
            });
            return options;
        },
    });

    const handleDeleteTask = (id) => {
        mutateDelete.mutate(id);
    };

    const handleAddTask = () => {
        if (newtask.title) {
            mutatePost.mutate(newtask);
        }
    };

    return (
        <div className="tasks">
            <div className="tasksTop">
                <div className="tasksTitle">
                    <h1 className="title">Công việc hôm nay</h1>
                    <button
                        className="addButton"
                        onClick={() => {
                            navigate(`/tasks/new`);
                        }}
                    >
                        Thêm mới
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
                              <div className="cardButton">
                                  <select
                                      name="title"
                                      type="select"
                                      className="input"
                                      onChange={(e) => handleChange(e, task.id)}
                                  >
                                      {taskData?.map((option) => (
                                          <option
                                              key={option.id}
                                              value={option.value}
                                          >
                                              {option.title}
                                          </option>
                                      ))}
                                  </select>
                                  <button
                                      className="addButton"
                                      onClick={handleAddTask}
                                  >
                                      Add
                                  </button>
                              </div>
                          </div>
                      ))}
            </div>
        </div>
    );
};

export default Tasks;
