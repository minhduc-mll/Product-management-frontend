import axios from "axios";

export const apiRequest = axios.create({
    baseURL: process.env.REACT_APP_BASE_URL,
    withCredentials: true,
});

export const cloudinaryUpload = async (file) => {
    const data = new FormData();
    data.append("file", file);
    data.append("upload_preset", process.env.REACT_APP_CLOUDINARY_PRESET);

    try {
        const res = await axios.post(
            process.env.REACT_APP_CLOUDINARY_URL,
            data
        );

        const { url } = res.data;
        return url;
    } catch (err) {
        console.log(err.message);
    }
};
