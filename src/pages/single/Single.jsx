import "./single.scss";
import UserDetail from "components/userDetail/UserDetail";
import Chart from "components/chart/Chart";
import Regulartable from "components/regulartable/Regulartable";
import { useNavigate, useParams } from "react-router-dom";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { apiRequest } from "utils/apiAxios";
import { getCurrentUser } from "utils/auth";

const Single = ({ firstRoute, secondRoute }) => {
    const navigate = useNavigate();
    const currentUser = getCurrentUser();
    const { id } = useParams();

    const {
        isLoading,
        error,
        data: user,
    } = useQuery({
        queryKey: [`${firstRoute}`, id],
        queryFn: async () => {
            const res = await apiRequest.get(`/${firstRoute}/${id}`);
            return res.data;
        },
        enabled: !!id,
    });

    const userId = user?._id;

    const {
        isLoading: isLoadingProducts,
        error: errorProducts,
        data: dataProducts,
    } = useQuery({
        queryKey: [`products`, `${secondRoute}`, userId],
        queryFn: async () => {
            const res = await apiRequest.get(
                `/products/${secondRoute}/${userId}`
            );
            return res.data;
        },
        enabled: !!userId,
    });

    const {
        isLoading: isLoadingChart,
        error: errorChart,
        data: dataChart,
    } = useQuery({
        queryKey: ["analys", "chart", `${secondRoute}`, userId],
        queryFn: async () => {
            const res = await apiRequest.get(
                `/analys/${secondRoute}ProductsByMonth/${userId}`
            );
            return res.data;
        },
        enabled: !!userId,
    });

    const queryClient = useQueryClient();

    const { mutate } = useMutation({
        mutationFn: async () => {
            await apiRequest.delete(`/${firstRoute}/${id}`);
        },
        onSuccess: () => {
            queryClient.invalidateQueries(["products"]);
            navigate(`/${firstRoute}`);
        },
    });

    const handleDelete = async () => {
        mutate();
    };

    return (
        <div className="single">
            <div className="singleTop">
                <h1 className="title">Infomation</h1>
                <div className="buttons">
                    {firstRoute.includes("profile") ? (
                        userId !== currentUser._id ? (
                            ""
                        ) : (
                            <button
                                className="updateButton"
                                onClick={() => {
                                    navigate(`/${id}/update/`);
                                }}
                            >
                                Edit
                            </button>
                        )
                    ) : (
                        <>
                            <button
                                className="addButton"
                                onClick={() => {
                                    navigate(`/${firstRoute}/new`);
                                }}
                            >
                                Add New
                            </button>
                            <button
                                className="updateButton"
                                onClick={() => {
                                    navigate(`/${firstRoute}/update/${id}`);
                                }}
                            >
                                Update
                            </button>
                            <button
                                className="deleteButton"
                                onClick={handleDelete}
                            >
                                Delete
                            </button>
                        </>
                    )}
                </div>
            </div>
            <div className="singleMiddle">
                {isLoading || error ? (
                    <UserDetail user={null} />
                ) : (
                    <UserDetail user={user} />
                )}
                <div className="singleChart">
                    {isLoadingChart ? (
                        "Loading..."
                    ) : errorChart ? (
                        <Chart
                            title={errorChart.message}
                            aspect={3 / 1}
                            data={null}
                        />
                    ) : (
                        <Chart
                            title={`Products sold per month by ${
                                user.name || user.username
                            }`}
                            aspect={3 / 1}
                            data={dataChart}
                        />
                    )}
                </div>
            </div>
            <div className="singleBottom">
                <div className="singleList">
                    {isLoadingProducts ? (
                        "Loading..."
                    ) : errorProducts ? (
                        <Regulartable
                            title={errorProducts.message}
                            products={null}
                        />
                    ) : (
                        <Regulartable
                            title={`Products sold by ${
                                user.name || user.username
                            }`}
                            products={dataProducts}
                        />
                    )}
                </div>
            </div>
        </div>
    );
};

export default Single;
