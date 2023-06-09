import "./addModal.scss";
import "rodal/lib/rodal.css";
import { useState } from "react";

const AddModal = ({ props, onClose, handleCardAdd }) => {
    const [title, setTitle] = useState("");
    const [detail, setDetail] = useState("");

    return (
        <div onClose={onClose}>
            <div className="addModal">
                <div className="modalItem">
                    <span className="label">Card Title</span>
                    <input
                        className="input"
                        type="text"
                        value={title}
                        onChange={(e) => setTitle(e.target.value)}
                    />
                </div>

                <div className="modalItem">
                    <span className="label">Detail</span>
                    <textarea
                        className="input"
                        rows="1"
                        value={detail}
                        type="text"
                        onChange={(e) => setDetail(e.target.value)}
                    />
                </div>

                <div className="modalButton">
                    <button
                        disabled={title === "" && detail === ""}
                        className="addButton"
                        onClick={() => {
                            handleCardAdd(props, title, detail);
                            setDetail("");
                            setTitle("");
                        }}
                    >
                        Add
                    </button>
                    <button
                        className="cancelButton"
                        onClick={() => {
                            onClose();
                        }}
                    >
                        Cancel
                    </button>
                </div>
            </div>
        </div>
    );
};

export default AddModal;
