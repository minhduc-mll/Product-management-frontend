import "./formPassword.scss";
import { EastOutlined } from "@mui/icons-material";
import { useReducer, useState } from "react";
import { useQueryClient, useMutation } from "@tanstack/react-query";
import { apiRequest } from "utils/apiAxios";
import { formReducer, initialState } from "utils/formReducer";

const FormPassword = ({ inputs, route, id }) => {
    const [formObject, dispatch] = useReducer(formReducer, initialState);
    const [isSuccess, setIsSuccess] = useState(false);

    const queryClient = useQueryClient();

    const handleChange = (e) => {
        e.preventDefault();
        dispatch({
            type: "CHANGE_INPUT",
            payload: { name: e.target.name, value: e.target.value },
        });
    };

    const { isLoading, error, mutate } = useMutation({
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
        mutate(formData);
    };

    return (
        <div className="formPassword">
            <form action="" onSubmit={handleSubmit}>
                <div
                    className="top"
                    style={{ display: isSuccess ? "flex" : "none" }}
                >
                    <div className="success">Update Successful</div>
                    <EastOutlined className="icon" />
                </div>
                <div className="wrapper">
                    <div className="formInput">
                        {inputs?.map((value, index) => (
                            <div className="input" key={index}>
                                <label>{value.label}</label>
                                <input
                                    id={value.name}
                                    name={value.name}
                                    type={value.type}
                                    placeholder={value.placeholder}
                                    onChange={(e) => handleChange(e)}
                                    required={value.required}
                                />
                            </div>
                        ))}
                    </div>
                    <span className="error">
                        {error && error.response?.data.message}
                    </span>
                    <div className="link">Forget your password?</div>
                    <div className="sendButton">
                        {isLoading ? (
                            <div className="button">Uploading...</div>
                        ) : (
                            <button type="submit" className="button">
                                Send
                            </button>
                        )}
                    </div>
                </div>
            </form>
        </div>
    );
};

export default FormPassword;
