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
        headerName: "Name",
        flex: 1,
    },
    {
        field: "phone",
        headerName: "Phone",
        flex: 1,
    },
    {
        field: "email",
        headerName: "Email",
        flex: 1,
    },
    {
        field: "birthday",
        headerName: "Birthday",
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
        headerName: "Company",
        flex: 1,
    },
];

const Customers = () => {
    const navigate = useNavigate();

    const [open, setOpen] = useState(false);
    const [view, setView] = useState("grid");
    const [search, setSearch] = useState("");
    const [sortName, setSortName] = useState("createdAt");
    const [sortOrder, setSortOrder] = useState("dsc");

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
                    <h1 className="title">All Customers</h1>
                    <button
                        className="addButton"
                        onClick={() => {
                            navigate(`/customers/new`);
                        }}
                    >
                        Add new
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
                            <span className="sortBy">Sort by</span>
                            <span
                                className="sortType"
                                onClick={() => setOpen(!open)}
                            >
                                {sortName === "name" ? "Name" : "Newest"}
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
                                            Name
                                        </span>
                                    ) : (
                                        <span
                                            onClick={() => reSort("createdAt")}
                                        >
                                            Newest
                                        </span>
                                    )}
                                </div>
                            )}
                        </div>
                    </div>
                    <div className="menuView">
                        <GridViewOutlined
                            className={view === "grid" ? "icon active" : "icon"}
                            onClick={() => setView("grid")}
                        />
                        <ViewListOutlined
                            className={view === "list" ? "icon active" : "icon"}
                            onClick={() => setView("list")}
                        />
                    </div>
                </div>
            </div>
            <div className="customersBottom">
                {view === "grid" ? (
                    <div className="gridView">
                        {isLoading
                            ? "Loading..."
                            : error
                            ? error.response.data.message
                            : customersData?.map((item) => (
                                  <div className="item" key={item._id}>
                                      <CustomerCard customer={item} />
                                  </div>
                              ))}
                    </div>
                ) : (
                    <div className="listView">
                        {isLoading ? (
                            "Loading..."
                        ) : error ? (
                            error.response.data.message
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
