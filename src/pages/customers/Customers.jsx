import "./customers.scss";
import { KeyboardArrowDownOutlined, SearchOutlined } from "@mui/icons-material";
import CustomerCard from "components/customerCard/CustomerCard";
import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { useQuery } from "@tanstack/react-query";
import { apiRequest } from "utils/apiAxios";

const Customers = () => {
    const navigate = useNavigate();

    const [open, setOpen] = useState(false);
    const [sort, setSort] = useState(null);

    const {
        isLoading,
        error,
        data: customersData,
        refetch,
    } = useQuery({
        queryKey: ["customers"],
        queryFn: async () => {
            if (sort) {
                const res = await apiRequest.get(`/customers?sort=${sort}`);
                return res.data;
            }
            const res = await apiRequest.get(`/customers`);
            return res.data;
        },
    });

    const reSort = (type) => {
        setSort(type);
        setOpen(false);
    };

    useEffect(() => {
        refetch();
    }, [sort, refetch]);

    return (
        <div className="customers">
            <div className="customersTop">
                <div className="customersTitle">
                    <h1 className="title">All customers</h1>
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
                    <div className="menuSearch">
                        <input type="text" placeholder="Search..." />
                        <SearchOutlined className="icon" />
                    </div>
                    <div className="menuSort">
                        <span className="sortBy">Sort by</span>
                        <span
                            className="sortType"
                            onClick={() => setOpen(!open)}
                        >
                            {sort === "name" ? "Name" : "Newest"}
                            <KeyboardArrowDownOutlined className="icon" />
                        </span>
                        {open && (
                            <div className="openMenu">
                                {sort === "name" ? (
                                    <span onClick={() => reSort("createdAt")}>
                                        Newest
                                    </span>
                                ) : (
                                    <span onClick={() => reSort("name")}>
                                        Name
                                    </span>
                                )}
                            </div>
                        )}
                    </div>
                </div>
            </div>
            <div className="customersBottom">
                {isLoading
                    ? "Loading..."
                    : error
                    ? error.message
                    : customersData.map((item) => (
                          <div className="item" key={item._id}>
                              <CustomerCard customer={item} />
                          </div>
                      ))}
            </div>
        </div>
    );
};

export default Customers;
