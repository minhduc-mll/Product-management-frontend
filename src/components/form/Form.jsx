import "./form.scss";
import { DriveFolderUploadOutlined } from "@mui/icons-material";
import { useReducer, useState } from "react";
import { QueryClient, useMutation } from "@tanstack/react-query";
import { apiRequest, cloudinaryUpload } from "utils/apiAxios";
import { productReducer, initialProduct } from "utils/productReducer";

const Form = ({ inputs }) => {
    const [product, dispatch] = useReducer(productReducer, initialProduct);
    const [files, setFiles] = useState([]);
    const [uploading, setUploading] = useState(false);

    const handleChange = (e) => {
        dispatch({
            type: "CHANGE_INPUT",
            payload: { name: e.target.name, value: e.target.value },
        });
    };

    const handleUpload = async () => {
        try {
            setUploading(true);
            const cover = await cloudinaryUpload(files[0]);

            const images = await Promise.all(
                [...files].map(async (file) => {
                    const url = await cloudinaryUpload(file);
                    return url;
                })
            );
            setUploading(false);
            dispatch({ type: "ADD_IMAGES", payload: { cover, images } });
        } catch (err) {
            console.log("Upload err: " + err.message);
        }
    };

    const mutation = useMutation({
        mutationFn: (product) => {
            return apiRequest.post("/products", product);
        },
        onSuccess: () => {
            QueryClient.invalidateQueries(["products"]);
        },
    });

    const handleSubmit = async (e) => {
        e.preventDefault();
        await handleUpload();
        mutation.mutate(product);
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
                                    : "https://icon-library.com/images/no-image-icon/no-image-icon-0.jpg"
                            }
                            alt="avata"
                            htmlFor="file"
                        />
                    </label>
                    <input
                        type="file"
                        id="file"
                        multiple
                        onChange={(e) => setFiles(e.target.files)}
                    />
                    {uploading ? (
                        <div className="uploading">Uploading...</div>
                    ) : (
                        ""
                    )}
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
