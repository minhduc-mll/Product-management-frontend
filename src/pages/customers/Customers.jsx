import "./customers.scss";
import {
    KeyboardArrowDownOutlined,
    KeyboardArrowUpOutlined,
    SearchOutlined,
    GridViewOutlined,
    ViewListOutlined,
} from "@mui/icons-material";
import CustomerCard from "components/customerCard/CustomerCard";
import Datatable from "components/datatable/Datatable";
import Pagination from "components/pagination/Pagination";
import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { useQuery } from "@tanstack/react-query";
import { apiRequest } from "utils/apiAxios";
import dateFormat from "dateformat";

const customerColumns = [
    {
        field: "id",
        headerName: "Id",
        width: 88,
    },
    {
        field: "name",
        headerName: "Tên",
        flex: 1,
    },
    {
        field: "phone",
        headerName: "Số điện thoại",
        flex: 1,
    },
    {
        field: "email",
        headerName: "Email",
        flex: 1,
    },
    {
        field: "birthday",
        headerName: "Ngày sinh",
        flex: 1,
        renderCell: (params) => {
            return params.row.birthday ? (
                <div className="cellUser">
                    {dateFormat(params.row.birthday, "dd-mm-yyyy")}
                </div>
            ) : (
                ""
            );
        },
    },
    {
        field: "company",
        headerName: "Công ty",
        flex: 1,
    },
];

const Customers = () => {
    const navigate = useNavigate();

    const [open, setOpen] = useState(false);
    const [view, setView] = useState("grid");
    const [currentPage, setCurrentPage] = useState(1);
    const [search, setSearch] = useState("");
    const [sortName, setSortName] = useState("createdAt");
    const [sortOrder, setSortOrder] = useState("dsc");

    const pageSize = 8;

    const {
        isLoading,
        error,
        data: customersData,
        refetch,
    } = useQuery({
        queryKey: ["customers"],
        queryFn: async () => {
            const res = await apiRequest.get(
                `/customers?search=${search}&sortName=${sortName}&sortOrder=${sortOrder}`
            );
            const customers = res.data?.map((data, index) => {
                return {
                    id: index + 1,
                    ...data,
                };
            });
            return customers;
        },
    });

    const reSort = (type) => {
        setSortName(type);
        setOpen(false);
    };

    useEffect(() => {
        refetch();
    }, [search, sortName, sortOrder, refetch]);

    return (
        <div className="customers">
            <div className="customersTop">
                <div className="customersTitle">
                    <h1 className="title">Tất cả khách hàng</h1>
                    <button
                        className="addButton"
                        onClick={() => {
                            navigate(`/customers/new`);
                        }}
                    >
                        Thêm mới
                    </button>
                </div>
                <div className="customersMenu">
                    <div className="menuFilters">
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
                        <div className="sortSelect">
                            <span className="sortBy">Sắp xếp theo</span>
                            <span
                                className="sortType"
                                onClick={() => setOpen(!open)}
                            >
                                {sortName === "name" ? "Tên" : "Mới nhất"}
                            </span>
                            <span className="sortOrder">
                                {sortOrder === "dsc" ? (
                                    <KeyboardArrowDownOutlined
                                        className="icon"
                                        onClick={() => setSortOrder("asc")}
                                    />
                                ) : (
                                    <KeyboardArrowUpOutlined
                                        className="icon"
                                        onClick={() => setSortOrder("dsc")}
                                    />
                                )}
                            </span>
                            {open && (
                                <div className="openMenu">
                                    {sortName === "createdAt" ? (
                                        <span onClick={() => reSort("name")}>
                                            Tên
                                        </span>
                                    ) : (
                                        <span
                                            onClick={() => reSort("createdAt")}
                                        >
                                            Mới nhất
                                        </span>
                                    )}
                                </div>
                            )}
                        </div>
                    </div>
                    <div className="menuView">
                        {isLoading
                            ? "Loading..."
                            : error
                            ? error.response?.data.message
                            : view === "grid" && (
                                  <Pagination
                                      currentPage={currentPage}
                                      totalCount={customersData?.length}
                                      pageSize={pageSize}
                                      onPageChange={(page) => {
                                          setCurrentPage(page);
                                      }}
                                  />
                              )}
                        <div className="changeView">
                            <GridViewOutlined
                                className={
                                    view === "grid" ? "icon active" : "icon"
                                }
                                onClick={() => setView("grid")}
                            />
                            <ViewListOutlined
                                className={
                                    view === "list" ? "icon active" : "icon"
                                }
                                onClick={() => setView("list")}
                            />
                        </div>
                    </div>
                </div>
            </div>
            <div className="customersBottom">
                {view === "grid" ? (
                    <div className="gridView">
                        {isLoading
                            ? "Loading..."
                            : error
                            ? error.response?.data.message
                            : customersData?.map((value, index) => {
                                  if (
                                      index >= (currentPage - 1) * pageSize &&
                                      index < currentPage * pageSize
                                  ) {
                                      return (
                                          <div className="item" key={value._id}>
                                              <CustomerCard customer={value} />
                                          </div>
                                      );
                                  }
                                  return null;
                              })}
                    </div>
                ) : (
                    <div className="listView">
                        {isLoading ? (
                            "Loading..."
                        ) : error ? (
                            error.response?.data.message
                        ) : (
                            <Datatable
                                target="customers"
                                rows={customersData}
                                columns={customerColumns}
                            />
                        )}
                    </div>
                )}
            </div>
        </div>
    );
};

export default Customers;
