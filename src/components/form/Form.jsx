import "./form.scss";
import DriveFolderUploadOutlinedIcon from "@mui/icons-material/DriveFolderUploadOutlined";
import { useState } from "react";

const Form = ({ inputs, imageURL }) => {
    const [file, setFile] = useState("");
    const image = imageURL
        ? imageURL
        : "https://icon-library.com/images/no-image-icon/no-image-icon-0.jpg";

    return (
        <div className="form">
            <div className="left">
                <img
                    src={file ? URL.createObjectURL(file) : image}
                    alt="avata"
                />
                <div className="formInput">
                    <div>Image: </div>
                    <label htmlFor="file">
                        <DriveFolderUploadOutlinedIcon className="icon" />
                    </label>
                    <input
                        type="file"
                        id="file"
                        onChange={(e) => setFile(e.target.files[0])}
                    />
                </div>
            </div>
            <div className="right">
                <form action="">
                    {inputs.map((input) => (
                        <div className="formInput" key={input.id}>
                            <label>{input.label}</label>
                            <input
                                type={input.type}
                                placeholder={input.placeholder}
                            />
                        </div>
                    ))}
                </form>
                <div className="sendButton">
                    <button>Send</button>
                </div>
            </div>
        </div>
    );
};

export default Form;
