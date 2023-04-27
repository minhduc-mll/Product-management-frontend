import "./formUpdate.scss";
import { DriveFolderUploadOutlined } from "@mui/icons-material";
import { useReducer, useState } from "react";
import { useQueryClient, useMutation } from "@tanstack/react-query";
import { apiRequest } from "utils/apiAxios";
import { formReducer } from "utils/formReducer";
import defaultImage from "assets/no-image.jpg";
import dateFormat from "dateformat";

const FormUpdate = ({ route, inputs, obj, id }) => {
    const [formObject, dispatch] = useReducer(formReducer, {
        ...obj,
        birthday: obj?.birthday && dateFormat(obj?.birthday, "yyyy-mm-dd"),
        arrivalDate:
            obj?.arrivalDate && dateFormat(obj?.arrivalDate, "yyyy-mm-dd"),
        deliveryDate:
            obj?.deliveryDate && dateFormat(obj?.deliveryDate, "yyyy-mm-dd"),
    });
    const [file, setFile] = useState(obj?.image);
    const [isSuccess, setIsSuccess] = useState(false);

    const queryClient = useQueryClient();

    const handleChange = (e) => {
        e.preventDefault();
        dispatch({
            type: "CHANGE_INPUT",
            payload: { name: e.target.name, value: e.target.value },
        });
        console.log(formObject);
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
        isLoading: isLoadingPut,
        error: errorPut,
        mutate: mutatePut,
    } = useMutation({
        mutationFn: async (formObject) => {
            const res = await apiRequest.put(`/${route}/${id}`, formObject);
            return res.data;
        },
        onSuccess: () => {
            queryClient.invalidateQueries([`/${route}`]);
            setIsSuccess(true);
        },
    });

    const handleSubmit = async (e) => {
        e.preventDefault();
        const formData = new FormData();
        for (const key in formObject) {
            formObject[key] && formData.append(key, formObject[key]);
        }
        mutatePut(formData);
    };

    return (
        <div className="formUpdate">
            <form action="" onSubmit={handleSubmit}>
                <div
                    className="top"
                    style={{ display: isSuccess ? "flex" : "none" }}
                >
                    <div className="success">Update Successful</div>
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
                                        value={formObject[input.name]}
                                        onChange={(e) => handleChange(e)}
                                    />
                                </div>
                            ))}
                        </div>
                        <span className="error">
                            {errorPut && errorPut.response.data.message}
                        </span>
                        <div className="sendButton">
                            {isLoadingPut ? (
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

export default FormUpdate;
