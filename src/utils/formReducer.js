import { getCurrentUser } from "./apiAxios";

export const initialProduct = {
    updatedBy: getCurrentUser()?._id,
};

export const formReducer = (data, action) => {
    switch (action.type) {
        case "CHANGE_INPUT":
            return {
                ...data,
                [action.payload.name]: action.payload.value,
            };
        case "ADD_IMAGES":
            return {
                ...data,
                cover: action.payload.cover,
                images: action.payload.images,
            };
        case "ADD_AVATAR":
            return {
                ...data,
                image: action.payload.image,
            };
        default:
            return data;
    }
};
