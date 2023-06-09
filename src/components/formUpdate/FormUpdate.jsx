import "./formUpdate.scss";
import { DriveFolderUploadOutlined, EastOutlined } from "@mui/icons-material";
import { useReducer, useState } from "react";
import { useNavigate } from "react-router-dom";
import { useQueryClient, useMutation, useQuery } from "@tanstack/react-query";
import { apiRequest } from "utils/apiAxios";
import { formReducer } from "utils/formReducer";
import defaultImage from "assets/no-image.jpg";
import dateFormat from "dateformat";

const FormUpdate = ({ inputs, image, obj, route, id }) => {
    const navigate = useNavigate();

    const [formObject, dispatch] = useReducer(formReducer, {
        ...obj,
        birthday: obj?.birthday && dateFormat(obj?.birthday, "yyyy-mm-dd"),
        saleDate: obj?.saleDate && dateFormat(obj?.saleDate, "yyyy-mm-dd"),
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
        mutationFn: async (formData) => {
            const res = await apiRequest.put(`/${route}/${id}`, formData);
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
            formObject[key] != null && formData.append(key, formObject[key]);
        }
        mutatePut(formData);
    };

    useQuery({
        queryKey: ["categories"],
        queryFn: async () => {
            const res = await apiRequest.get(`/categories`);
            const category = inputs?.find((input) => {
                return input.name === "categoryId";
            });
            if (category) {
                category.options = res.data?.map((data) => {
                    return {
                        value: data._id,
                        title: data.title,
                    };
                });
                category.options?.unshift({
                    value: null,
                    title: null,
                });
            }
            console.log(category);
            return res.data;
        },
    });

    useQuery({
        queryKey: ["customers"],
        queryFn: async () => {
            const res = await apiRequest.get(`/customers`);
            const customer = inputs?.find((input) => {
                return input.name === "customerId";
            });
            if (customer) {
                customer.options = res.data?.map((data) => {
                    return {
                        value: data._id,
                        title: data.name,
                    };
                });
                customer.options?.unshift({
                    value: "",
                    title: "--- Please select ---",
                });
            }
            return res.data;
        },
    });

    useQuery({
        queryKey: ["sellers"],
        queryFn: async () => {
            const res = await apiRequest.get(`/users`);
            const seller = inputs?.find((input) => {
                return input.name === "sellerId";
            });
            if (seller) {
                seller.options = res.data?.map((data) => {
                    return {
                        value: data._id,
                        title: data.name,
                    };
                });
                seller.options?.unshift({
                    value: "",
                    title: "--- Please select ---",
                });
            }
            return res.data;
        },
    });

    return (
        <div className="formUpdate">
            <form action="" onSubmit={handleSubmit}>
                <div
                    className="top"
                    style={{ display: isSuccess ? "flex" : "none" }}
                    onClick={() => {
                        route === "auth"
                            ? navigate(`/${obj.username}`)
                            : navigate(
                                  `/${route}/${formObject.productId || id}`
                              );
                    }}
                >
                    <div className="success">Update Successful</div>
                    <EastOutlined className="icon" />
                </div>
                <div className="bottom">
                    {image && (
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
                    )}
                    <div className="right">
                        <div className="formInput">
                            {inputs?.map((value, index) => (
                                <div className="input" key={index}>
                                    <label>{value.label}</label>
                                    {value.type === "select" ? (
                                        <select
                                            id={value.name}
                                            name={value.name}
                                            type={value.type}
                                            value={formObject[value.name] || ""}
                                            onChange={(e) => handleChange(e)}
                                            required={value.required}
                                        >
                                            {value.options?.map(
                                                (option, index) => (
                                                    <option
                                                        key={index}
                                                        value={option.value}
                                                    >
                                                        {option.title}
                                                    </option>
                                                )
                                            )}
                                        </select>
                                    ) : (
                                        <input
                                            id={value.name}
                                            name={value.name}
                                            type={value.type}
                                            placeholder={value.placeholder}
                                            value={formObject[value.name] || ""}
                                            onChange={(e) => handleChange(e)}
                                            required={value.required}
                                        />
                                    )}
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
