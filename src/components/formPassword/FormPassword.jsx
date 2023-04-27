import "./formPassword.scss";
import { useReducer, useState } from "react";
import { useQueryClient, useMutation } from "@tanstack/react-query";
import { apiRequest } from "utils/apiAxios";
import { formReducer, initialState } from "utils/formReducer";

const FormPassword = ({ route, inputs, user }) => {
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
            const res = await apiRequest.put(
                `/${route}/${user?._id}`,
                formObject
            );
            return res.data;
        },
        onSuccess: () => {
            queryClient.invalidateQueries([`/${route}`]);
            setIsSuccess(true);
        },
    });

    const handleSubmit = async (e) => {
        e.preventDefault();
        formObject.forEach((value) => {
            console.log(value);
        });
        mutate();
    };

    return (
        <div className="formPassword">
            <form action="" onSubmit={handleSubmit}>
                <div
                    className="top"
                    style={{ display: isSuccess ? "flex" : "none" }}
                >
                    <div className="success">Change Password Successfully</div>
                </div>
                <div className="wrapper">
                    <div className="formInput">
                        {inputs?.map((input) => (
                            <div className="input" key={input.id}>
                                <label>{input.label}</label>
                                <input
                                    name={input.name}
                                    type={input.type}
                                    onChange={(e) => handleChange(e)}
                                />
                            </div>
                        ))}
                    </div>
                    <span className="error">
                        {error && error.response.data.message}
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
