import { getCurrentUser } from "./apiAxios";

export const initialProduct = {
    productId: "",
    cover: null,
    images: [],
    customerId: null,
    sellerId: null,
    price: 0,
    deposit: 0,
    desc: null,
    port: null,
    status: "pending",
    timeArrived: null,
    timeDelivery: null,
    updatedBy: getCurrentUser()?._id,
};

export const productReducer = (product, action) => {
    switch (action.type) {
        case "CHANGE_INPUT":
            return {
                ...product,
                [action.payload.name]: action.payload.value,
            };
        case "ADD_IMAGES":
            return {
                ...product,
                cover: action.payload.cover,
                images: action.payload.images,
            };
        default:
            return product;
    }
};
