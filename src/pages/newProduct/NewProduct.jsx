import "./newProduct.scss";
import FormProduct from "components/formProduct/FormProduct";
import { useQuery } from "@tanstack/react-query";
import { apiRequest } from "utils/apiAxios";
import { productInputs } from "utils/inputForm";

const NewProduct = () => {
    useQuery({
        queryKey: ["addCategories"],
        queryFn: async () => {
            const res = await apiRequest.get(`/categories?sortName=title&sortOrder=asc`);
            const category = productInputs?.find((input) => {
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
            return res.data;
        },
    });

    useQuery({
        queryKey: ["addCustomers"],
        queryFn: async () => {
            const res = await apiRequest.get(`/customers?sortName=name&sortOrder=asc`);
            const customer = productInputs?.find((input) => {
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
        queryKey: ["addSellers"],
        queryFn: async () => {
            const res = await apiRequest.get(`/users`);
            const seller = productInputs?.find((input) => {
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
        <div className="newProduct">
            <div className="top">
                <h1 className="title">Add New Product</h1>
            </div>
            <div className="bottom">
                <FormProduct route="products" inputs={productInputs} />
            </div>
        </div>
    );
};

export default NewProduct;
