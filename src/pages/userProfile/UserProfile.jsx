import "./userProfile.scss";
import UserDetail from "components/userDetail/UserDetail";
import Chart from "components/chart/Chart";
import Regulartable from "components/regulartable/Regulartable";
import { useNavigate, useParams } from "react-router-dom";
import { useQuery } from "@tanstack/react-query";
import { apiRequest } from "utils/apiAxios";
import { getCurrentUser } from "utils/auth";

const UserProfile = () => {
    const navigate = useNavigate();
    const currentUser = getCurrentUser();
    const { id } = useParams();

    const {
        isLoading,
        error,
        data: user,
    } = useQuery({
        queryKey: ["profile", id],
        queryFn: async () => {
            const res = await apiRequest.get(`/users/profile/${id}`);
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
        queryKey: [`products`, `user`, userId],
        queryFn: async () => {
            const res = await apiRequest.get(
                `/products/user/${userId}?sortName=createdAt&sortOrder=dsc`
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
        queryKey: ["analys", "chart", `user`, userId],
        queryFn: async () => {
            const res = await apiRequest.get(
                `/analys/userProductsByMonth/${userId}`
            );
            return res.data;
        },
        enabled: !!userId,
    });

    return (
        <div className="userProfile">
            <div className="userProfileTop">
                <h1 className="title">Thông tin</h1>
                <div className="buttons">
                    {userId !== currentUser._id ? (
                        ""
                    ) : (
                        <button
                            className="updateButton"
                            onClick={() => {
                                navigate(`/profile/update/`);
                            }}
                        >
                            Cập nhật
                        </button>
                    )}
                </div>
            </div>
            <div className="userProfileMiddle">
                {isLoading || error ? (
                    <UserDetail user={null} />
                ) : (
                    <UserDetail user={user} />
                )}
                <div className="userProfileChart">
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
                            title={`Thống kê số Cont ${
                                user.name || user.username
                            } bán mỗi tháng`}
                            aspect={3 / 1}
                            data={dataChart}
                            initChart="LineChart"
                            dataKey="month"
                        />
                    )}
                </div>
            </div>
            <div className="userProfileBottom">
                <div className="userProfileList">
                    {isLoadingProducts ? (
                        "Loading..."
                    ) : errorProducts ? (
                        <Regulartable
                            title={errorProducts.message}
                            products={null}
                        />
                    ) : (
                        <Regulartable
                            title={`Cont ${
                                user.name || user.username
                            } bán mỗi tháng`}
                            products={dataProducts}
                        />
                    )}
                </div>
            </div>
        </div>
    );
};

export default UserProfile;
