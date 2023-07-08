import "./employees.scss";
import { SearchOutlined } from "@mui/icons-material";
import UserDetail from "components/userDetail/UserDetail";
import { useEffect, useState } from "react";
import { useQuery } from "@tanstack/react-query";
import { apiRequest } from "utils/apiAxios";

const Employees = () => {
    const [search, setSearch] = useState("");

    const {
        isLoading,
        error,
        data: employeesData,
        refetch,
    } = useQuery({
        queryKey: ["employees"],
        queryFn: async () => {
            const res = await apiRequest.get(`/users?search=${search}`);
            const employees = res.data?.map((data, index) => {
                return {
                    id: index + 1,
                    ...data,
                };
            });
            return employees;
        },
    });

    useEffect(() => {
        refetch();
    }, [search, refetch]);

    return (
        <div className="employees">
            <div className="employeesTop">
                <div className="employeesTitle">
                    <h1 className="title">Tất cả nhân viên kinh doanh</h1>
                </div>
                <div className="employeesMenu">
                    <div className="menuFilters">
                        <div className="totalInput">
                            <span>Tổng: {employeesData?.length}</span>
                        </div>
                        <div className="searchInput">
                            <input
                                type="text"
                                placeholder="Search..."
                                onChange={(e) => setSearch(e.target.value)}
                            />
                            <SearchOutlined
                                className="icon"
                                onClick={refetch}
                            />
                        </div>
                    </div>
                </div>
            </div>
            <div className="employeesBottom">
                <div className="gridView">
                    {isLoading
                        ? "Loading..."
                        : error
                        ? error.response?.data.message
                        : employeesData?.map((value, index) => {
                              return (
                                  <div className="item" key={index}>
                                      <UserDetail user={value} />
                                  </div>
                              );
                          })}
                </div>
            </div>
        </div>
    );
};

export default Employees;
