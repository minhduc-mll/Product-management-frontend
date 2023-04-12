import "./formProduct.scss";
import { DriveFolderUploadOutlined } from "@mui/icons-material";
import { useReducer, useState } from "react";
import { useNavigate } from "react-router-dom";
import { useQueryClient, useMutation } from "@tanstack/react-query";
import { apiRequest, cloudinaryUpload } from "utils/apiAxios";
import { formReducer, initialProduct } from "utils/formReducer";
import defaultImage from "assets/no-image.jpg";

const FormProduct = ({ inputs }) => {
    const [formObject, dispatch] = useReducer(formReducer, initialProduct);
    const [files, setFiles] = useState([]);
    const [uploading, setUploading] = useState(false);

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
        try {
            setUploading(true);
            const cover = await cloudinaryUpload(files[0]);

            const images = await Promise.all(
                [...files].map(async (file) => {
                    const url = await cloudinaryUpload(file);
                    return url;
                })
            );

            dispatch({
                type: "ADD_IMAGES",
                payload: { cover, images },
            });
            setUploading(false);
        } catch (err) {
            console.log(err.message);
        }
    };

    const { mutate } = useMutation({
        mutationFn: async (formObject) => {
            const res = await apiRequest.post("/products", formObject);
            console.log(res.data);
        },
        onSuccess: () => {
            queryClient.invalidateQueries(["products"]);
            navigate(`/products/${formObject.productId}`);
        },
    });

    const handleSubmit = async (e) => {
        e.preventDefault();
        mutate(formObject);
    };

    return (
        <div className="formProduct">
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
                        onChange={(e) => {
                            handleUpload(e);
                        }}
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
                        {uploading ? (
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

export default FormProduct;
