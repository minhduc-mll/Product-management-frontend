import "./categories.scss";
import Datatable from "components/datatable/Datatable";
import { useNavigate } from "react-router-dom";
import { useQuery } from "@tanstack/react-query";
import { apiRequest } from "utils/apiAxios";

const categoryColumns = [
    {
        field: "id",
        headerName: "Id",
        width: 88,
    },
    {
        field: "title",
        headerName: "Title",
        flex: 1,
    },
    {
        field: "desc",
        headerName: "Descriptions",
        flex: 3,
    },
];

const Categories = () => {
    const navigate = useNavigate();

    const { isLoading, error, data } = useQuery({
        queryKey: ["categories"],
        queryFn: async () => {
            const res = await apiRequest.get(`/categories`);
            const categories = res.data?.map((data, index) => {
                return {
                    id: index + 1,
                    ...data,
                };
            });
            return categories;
        },
    });

    return (
        <div className="categories">
            <div className="categoriesTop">
                <h1 className="title">All Categories</h1>
                <button
                    onClick={() => {
                        navigate(`/categories/new`);
                    }}
                    className="addButton"
                >
                    Add new
                </button>
            </div>
            <div className="categoriesBottom">
                {isLoading ? (
                    "Loading..."
                ) : error ? (
                    error.response.data.message
                ) : (
                    <Datatable
                        target="categories"
                        rows={data}
                        columns={categoryColumns}
                    />
                )}
            </div>
        </div>
    );
};

export default Categories;
