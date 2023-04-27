import "./formCreate.scss";
import { DriveFolderUploadOutlined } from "@mui/icons-material";
import { useReducer, useState } from "react";
import { useNavigate } from "react-router-dom";
import { useQueryClient, useMutation } from "@tanstack/react-query";
import { apiRequest } from "utils/apiAxios";
import { formReducer, initialState } from "utils/formReducer";
import defaultImage from "assets/no-image.jpg";

const FormCreate = ({ route, inputs }) => {
    const [formObject, dispatch] = useReducer(formReducer, initialState);
    const [file, setFile] = useState(defaultImage);
    const [isSuccess, setIsSuccess] = useState(false);

    const navigate = useNavigate();
    const queryClient = useQueryClient();

    const handleChange = (e) => {
        e.preventDefault();
        dispatch({
            type: "CHANGE_INPUT",
            payload: { name: e.target.name, value: e.target.value },
        });
    };

    const handleUpload = async (e) => {
        e.preventDefault();
        const file = e.target.files[0];
        if (file) {
            setFile(URL.createObjectURL(file));
        } else {
            setFile(file);
        }

        if (file) {
            const image = file;
            dispatch({
                type: "ADD_AVATAR",
                payload: { image },
            });
        }
    };

    const {
        isLoading: isLoadingPost,
        error: errorPost,
        mutate: mutatePost,
    } = useMutation({
        mutationFn: async (formObject) => {
            const res = await apiRequest.post(`/${route}`, formObject);
            return res.data;
        },
        onSuccess: (data) => {
            queryClient.invalidateQueries([`/${route}`]);
            setIsSuccess(true);
            navigate(`/${route}/${data._id}`);
        },
    });

    const handleSubmit = async (e) => {
        e.preventDefault();
        const formData = new FormData();
        for (const key in formObject) {
            formObject[key] && formData.append(key, formObject[key]);
        }
        mutatePost(formData);
    };

    return (
        <div className="formCreate">
            <form action="" onSubmit={handleSubmit}>
                <div
                    className="top"
                    style={{ display: isSuccess ? "flex" : "none" }}
                >
                    <div className="success">Create Successful</div>
                </div>
                <div className="bottom">
                    <div className="left">
                        <label htmlFor="file">
                            <div className="formUpload">
                                <div>Upload Image </div>
                                <DriveFolderUploadOutlined className="icon" />
                            </div>
                            <img
                                src={file || defaultImage}
                                alt="avata"
                                htmlFor="file"
                            />
                        </label>
                        <input
                            type="file"
                            id="file"
                            onChange={(e) => handleUpload(e)}
                        />
                    </div>
                    <div className="right">
                        <div className="formInput">
                            {inputs?.map((input) => (
                                <div className="input" key={input.id}>
                                    <label>{input.label}</label>
                                    <input
                                        name={input.name}
                                        type={input.type}
                                        placeholder={input.placeholder}
                                        onChange={(e) => handleChange(e)}
                                    />
                                </div>
                            ))}
                        </div>
                        <span className="error">
                            {errorPost && errorPost.response.data.message}
                        </span>
                        <div className="sendButton">
                            {isLoadingPost ? (
                                <div className="button">Uploading...</div>
                            ) : (
                                <button type="submit" className="button">
                                    Send
                                </button>
                            )}
                        </div>
                    </div>
                </div>
            </form>
        </div>
    );
};

export default FormCreate;
