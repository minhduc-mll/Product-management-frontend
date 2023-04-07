import "./single.scss";
import UserDetail from "components/userDetail/UserDetail";
import Chart from "components/chart/Chart";
import Table from "components/table/Table";
import { useEffect } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { useQuery } from "@tanstack/react-query";
import { apiRequest } from "utils/apiAxios";

const Single = ({ text }) => {
    const navigate = useNavigate();
    const lcText = text.toLowerCase();

    const { id } = useParams();

    const { isLoading, error, data, refetch } = useQuery({
        queryKey: [`${lcText}`],
        queryFn: () =>
            apiRequest.get(`/${lcText}s/${id}`).then((res) => {
                console.log(res.data);
                return res.data;
            }),
        enabled: !!id,
    });

    useEffect(() => {
        refetch();
    }, [id, refetch]);

    return (
        <div className="single">
            <div className="top">
                <div className="title">Infomation</div>
                <button
                    className="editButton"
                    onClick={() => {
                        navigate(`/${lcText}s/update/${id}`);
                    }}
                >
                    Edit
                </button>
            </div>
            <div className="mid">
                {isLoading || error ? (
                    <UserDetail user={null} />
                ) : (
                    <UserDetail user={data} />
                )}
                <Chart title="User Spending ( Last 6 Months )" aspect={3 / 1} />
            </div>
            <div className="bottom">
                <Table title="Last Transactions" />
            </div>
        </div>
    );
};

export default Single;
