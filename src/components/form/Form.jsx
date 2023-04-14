import "./form.scss";
import { DriveFolderUploadOutlined } from "@mui/icons-material";
import { useReducer, useState } from "react";
import { useNavigate } from "react-router-dom";
import { useQueryClient, useMutation } from "@tanstack/react-query";
import { apiRequest } from "utils/apiAxios";
import { formReducer, initialProduct } from "utils/formReducer";
import defaultImage from "assets/no-image.jpg";

const Form = ({ target, inputs }) => {
    const [formObject, dispatch] = useReducer(formReducer, initialProduct);
    const [files, setFiles] = useState([]);

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
        const files = e.target.files;
        setFiles(files);

        if (files) {
            const image = files[0];
            dispatch({
                type: "ADD_AVATAR",
                payload: { image },
            });
        }
    };

    const { mutate } = useMutation({
        mutationFn: async (formObject) => {
            const res = await apiRequest.post(`/${target}s`, formObject);
            console.log(res.data);
        },
        onSuccess: () => {
            queryClient.invalidateQueries([`/${target}s`]);
            navigate(`/${target}s`);
        },
    });

    const handleSubmit = async (e) => {
        e.preventDefault();
        const formData = new FormData();
        for (const key in formObject) {
            formData.append(key, formObject[key]);
        }
        mutate(formData);
    };

    return (
        <div className="form">
            <form action="" onSubmit={handleSubmit}>
                <div className="left">
                    <label htmlFor="file">
                        <div className="formUpload">
                            <div>Upload Image </div>
                            <DriveFolderUploadOutlined className="icon" />
                        </div>
                        <img
                            src={
                                files[0]
                                    ? URL.createObjectURL(files[0])
                                    : defaultImage
                            }
                            alt="avata"
                            htmlFor="file"
                        />
                    </label>
                    <input
                        type="file"
                        id="file"
                        multiple
                        onChange={(e) => handleUpload(e)}
                    />
                </div>
                <div className="right">
                    <div className="formInput">
                        {inputs.map((input) => (
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
                    <div className="sendButton">
                        <button type="submit">Send</button>
                    </div>
                </div>
            </form>
        </div>
    );
};

export default Form;
