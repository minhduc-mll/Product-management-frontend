import axios from "axios";

export const apiRequest = axios.create({
    baseURL: "http://localhost:3001/api/",
    withCredentials: true,
});

export const cloudinaryUpload = async (file) => {
    const data = new FormData();
    data.append("file", file);
    data.append("upload_preset", "hgtp_containers");

    try {
        const res = await axios.post(
            "https://api.cloudinary.com/v1_1/dupx03lpv/image/upload",
            data
        );

        const { url } = res.data;
        return url;
    } catch (err) {
        console.log(err.message);
    }
};

export const getCurrentUser = () => {
    return JSON.parse(localStorage.getItem("currentUser"));
};
