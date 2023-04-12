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
        queryKey: [id],
        queryFn: async () => {
            const res = await apiRequest.get(`/${lcText}s/${id}`);
            console.log(res.data);
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
    }, [id, refetch]);

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
                <Chart title="User Spending ( Last 6 Months )" aspect={3 / 1} />
            </div>
            <div className="bottom">
                <Table title="Last Transactions" />
            </div>
        </div>
    );
};

export default Single;
