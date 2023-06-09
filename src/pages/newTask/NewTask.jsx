import "./newTask.scss";
import FormCreate from "components/formCreate/FormCreate";
import { useQuery } from "@tanstack/react-query";
import { apiRequest } from "utils/apiAxios";
import { taskInputs } from "utils/inputForm";

const NewTask = () => {
    useQuery({
        queryKey: ["addSellers"],
        queryFn: async () => {
            const res = await apiRequest.get(`/users`);
            const seller = taskInputs?.find((input) => {
                return input.name === "userId";
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

    useQuery({
        queryKey: ["pending", "addProduct"],
        queryFn: async () => {
            const res = await apiRequest.get(
                `/products?status=pending&sortName=productId`
            );
            const product = taskInputs?.find((input) => {
                return input.name === "title";
            });
            if (product) {
                product.options = res.data?.map((data) => {
                    return {
                        value: data.productId,
                        title: data.productId,
                    };
                });
                product.options?.unshift({
                    value: "",
                    title: "--- Please select ---",
                });
            }
            return res.data;
        },
    });

    return (
        <div className="newTask">
            <div className="top">
                <h1 className="title">Add New Task</h1>
            </div>
            <div className="bottom">
                <FormCreate route="tasks" inputs={taskInputs} />
            </div>
        </div>
    );
};

export default NewTask;
