import "./task.scss";
import { useNavigate } from "react-router-dom";

const Task = () => {
    const navigate = useNavigate();

    return (
        <div className="task">
            <div className="taskTop">
                <div className="taskTitle">
                    <h1 className="title">Công việc hôm nay</h1>
                    <button
                        className="addButton"
                        onClick={() => {
                            navigate(`/task/new`);
                        }}
                    >
                        Thêm mới
                    </button>
                </div>
            </div>
            <div className="taskBottom">
                {isLoading
                    ? "Loading..."
                    : error
                    ? "error"
                    : taskData.columns?.map((task) => (
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

export default Task;
