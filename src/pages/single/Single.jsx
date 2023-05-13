import "./single.scss";
import UserDetail from "components/userDetail/UserDetail";
import Chart from "components/chart/Chart";
import Regulartable from "components/regulartable/Regulartable";
import { useNavigate, useParams } from "react-router-dom";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { apiRequest } from "utils/apiAxios";

const Single = ({ route }) => {
    const navigate = useNavigate();
    const { id } = useParams();

    const {
        isLoading,
        error,
        data: user,
    } = useQuery({
        queryKey: [`${route}`, id],
        queryFn: async () => {
            const res = await apiRequest.get(`/${route}s/${id}`);
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
        queryKey: [`products`, `${route}`, userId],
        queryFn: async () => {
            const res = await apiRequest.get(
                `/products/${route}/${userId}?sortName=createdAt&sortOrder=dsc`
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
        queryKey: ["analys", "chart", `${route}`, userId],
        queryFn: async () => {
            const res = await apiRequest.get(
                `/analys/${route}ProductsByMonth/${userId}`
            );
            return res.data;
        },
        enabled: !!userId,
    });

    const queryClient = useQueryClient();

    const { mutate } = useMutation({
        mutationFn: async () => {
            await apiRequest.delete(`/${route}s/${id}`);
        },
        onSuccess: () => {
            queryClient.invalidateQueries([`/${route}s`]);
            navigate(`/${route}s`);
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
                    <>
                        <button
                            className="addButton"
                            onClick={() => {
                                navigate(`/${route}s/new`);
                            }}
                        >
                            Add New
                        </button>
                        <button
                            className="updateButton"
                            onClick={() => {
                                navigate(`/${route}s/update/${id}`);
                            }}
                        >
                            Update
                        </button>
                        <button className="deleteButton" onClick={handleDelete}>
                            Delete
                        </button>
                    </>
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
                            initChart="LineChart"
                            dataKey="month"
                        />
                    ) : (
                        <Chart
                            title={`Products sold per month by ${
                                user.name || user.username
                            }`}
                            aspect={3 / 1}
                            data={dataChart}
                            initChart="LineChart"
                            dataKey="month"
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
