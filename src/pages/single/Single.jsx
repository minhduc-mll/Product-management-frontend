import "./single.scss";
import UserDetail from "components/userDetail/UserDetail";
import Chart from "components/chart/Chart";
import Regulartable from "components/regulartable/Regulartable";
import { useEffect } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { useQuery } from "@tanstack/react-query";
import { apiRequest } from "utils/apiAxios";

const Single = ({ text }) => {
    const navigate = useNavigate();
    const lcText = text.toLowerCase();

    const { id } = useParams();

    const { isLoading, error, data, refetch } = useQuery({
        queryKey: [`${lcText}s`, id],
        queryFn: async () => {
            const res = await apiRequest.get(`/${lcText}s/${id}`);
            return res.data;
        },
        enabled: !!id,
    });

    const {
        isLoading: isLoadingProducts,
        error: errorProducts,
        data: dataProducts,
        refetch: refetchProducts,
    } = useQuery({
        queryKey: [`products`, `${lcText}`, id],
        queryFn: async () => {
            const res = await apiRequest.get(`/products/${lcText}/${id}`);
            return res.data;
        },
        enabled: !!id,
    });

    const {
        isLoading: isLoadingChart,
        error: errorChart,
        data: dataChart,
        refetch: refetchChart,
    } = useQuery({
        queryKey: ["analys", "chart", `${lcText}`, id],
        queryFn: async () => {
            const res = await apiRequest.get(
                `/analys/${lcText}ProductsByMonth/${id}`
            );
            return res.data;
        },
        enabled: !!id,
    });

    const handleDelete = async () => {
        try {
            await apiRequest.delete(`/${lcText}s/${id}`);
            navigate(`/${lcText}s`);
        } catch (err) {
            console.log(err.message);
        }
    };

    useEffect(() => {
        refetch();
        refetchProducts();
        refetchChart();
    }, [id, refetch, refetchProducts, refetchChart]);

    return (
        <div className="single">
            <div className="top">
                <div className="title">Infomation</div>
                <div className="buttons">
                    <button
                        className="addButton"
                        onClick={() => {
                            navigate(`/${lcText}s/new`);
                        }}
                    >
                        Add New
                    </button>
                    <button
                        className="updateButton"
                        onClick={() => {
                            navigate(`/${lcText}s/update/${id}`);
                        }}
                    >
                        Update
                    </button>
                    <button className="deleteButton" onClick={handleDelete}>
                        Delete
                    </button>
                </div>
            </div>
            <div className="mid">
                {isLoading || error ? (
                    <UserDetail user={null} />
                ) : (
                    <UserDetail user={data} />
                )}
                {isLoadingChart ? (
                    "Loading..."
                ) : errorChart ? (
                    <Chart
                        title={errorChart.message}
                        aspect={3 / 1}
                        data={null}
                    />
                ) : data.name ? (
                    <Chart
                        title={`Products sold per month by ${data.name}`}
                        aspect={3 / 1}
                        data={dataChart}
                    />
                ) : (
                    <Chart
                        title={`Products sold per month by ${data.username}`}
                        aspect={3 / 1}
                        data={dataChart}
                    />
                )}
            </div>
            <div className="bottom">
                {isLoadingProducts ? (
                    "Loading..."
                ) : errorProducts ? (
                    <Regulartable
                        title={errorProducts.message}
                        products={null}
                    />
                ) : data.name ? (
                    <Regulartable
                        title={`Products sold by ${data.name}`}
                        products={dataProducts}
                    />
                ) : (
                    <Regulartable
                        title={`Products sold by ${data.username}`}
                        products={dataProducts}
                    />
                )}
            </div>
        </div>
    );
};

export default Single;
