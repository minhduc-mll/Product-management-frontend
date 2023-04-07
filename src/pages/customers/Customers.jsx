import "./customers.scss";
import { KeyboardArrowDownOutlined } from "@mui/icons-material";
import CustomerCard from "components/customerCard/CustomerCard";
import { useEffect, useRef, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { useQuery } from "@tanstack/react-query";
import { apiRequest } from "utils/apiAxios";

const Customers = () => {
    const navigate = useNavigate();

    const [open, setOpen] = useState(false);
    const [sort, setSort] = useState("sales");
    const minRef = useRef();
    const maxRef = useRef();

    const { isLoading, error, data, refetch } = useQuery({
        queryKey: ["customers"],
        queryFn: () =>
            apiRequest.get(`/customers`).then((res) => {
                return res.data;
            }),
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
            <div className="top">
                <div className="menuTitle">
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
                <div className="menu">
                    <div className="left">
                        <span>Price</span>
                        <input ref={minRef} type="number" placeholder="min" />
                        <input ref={maxRef} type="number" placeholder="max" />
                        <button
                            onClick={() => {
                                refetch();
                            }}
                        >
                            Apply
                        </button>
                    </div>
                    <div className="right">
                        <span className="sortBy">Sort by</span>
                        <span
                            className="sortType"
                            onClick={() => setOpen(!open)}
                        >
                            {sort === "sales" ? "Best Selling" : "Newest"}
                            <KeyboardArrowDownOutlined className="icon" />
                        </span>
                        {open && (
                            <div className="rightMenu">
                                {sort === "sales" ? (
                                    <span onClick={() => reSort("createdAt")}>
                                        Newest
                                    </span>
                                ) : (
                                    <span onClick={() => reSort("sales")}>
                                        Best Selling
                                    </span>
                                )}
                                <span onClick={() => reSort("sales")}>
                                    Popular
                                </span>
                            </div>
                        )}
                    </div>
                </div>
            </div>
            <div className="bottom">
                {isLoading
                    ? "Loading..."
                    : error
                    ? "get customers error"
                    : data.map((item) => (
                          <Link
                              to={`/customers/${item._id}`}
                              className="link"
                              key={item._id}
                          >
                              <div className="item">
                                  <CustomerCard customer={item} />
                              </div>
                          </Link>
                      ))}
            </div>
        </div>
    );
};

export default Customers;
