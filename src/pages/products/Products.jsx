import "./products.scss";
import {
    KeyboardArrowDownOutlined,
    KeyboardArrowUpOutlined,
    SearchOutlined,
    GridViewOutlined,
    ViewListOutlined,
} from "@mui/icons-material";
import ProductCard from "components/productCard/ProductCard";
import Datatable from "components/datatable/Datatable";
import Pagination from "components/pagination/Pagination";
import { useState, useEffect, useRef } from "react";
import { useNavigate, useSearchParams } from "react-router-dom";
import { useQuery } from "@tanstack/react-query";
import { apiRequest } from "utils/apiAxios";
import dateFormat from "dateformat";

const productColumns = [
    {
        field: "id",
        headerName: "Id",
        width: 88,
    },
    {
        field: "productId",
        headerName: "ProductId",
        flex: 1,
    },
    {
        field: "saleDate",
        headerName: "Sale Date",
        flex: 1,
        renderCell: (params) => {
            return params.row.saleDate ? (
                <div className="cellUser">
                    {dateFormat(params.row.saleDate, "dd-mm-yyyy")}
                </div>
            ) : (
                ""
            );
        },
    },
    {
        field: "arrivalDate",
        headerName: "Arrival Date",
        flex: 1,
        renderCell: (params) => {
            return params.row.arrivalDate ? (
                <div className="cellUser">
                    {dateFormat(params.row.arrivalDate, "dd-mm-yyyy")}
                </div>
            ) : (
                ""
            );
        },
    },
    {
        field: "deliveryDate",
        headerName: "Delivery Date",
        flex: 1,
        renderCell: (params) => {
            return params.row.deliveryDate ? (
                <div className="cellUser">
                    {dateFormat(params.row.deliveryDate, "dd-mm-yyyy")}
                </div>
            ) : (
                ""
            );
        },
    },
    {
        field: "desc",
        headerName: "Description",
        flex: 1,
    },
    {
        field: "port",
        headerName: "Port",
        flex: 1,
    },
    {
        field: "status",
        headerName: "Status",
        flex: 1,
        renderCell: (params) => {
            return (
                <div className={`status ${params.row.status}`}>
                    {params.row.status}
                </div>
            );
        },
    },
];

const Products = () => {
    const navigate = useNavigate();
    const [searchParams] = useSearchParams();

    const [open, setOpen] = useState(false);
    const [view, setView] = useState("grid");
    const [currentPage, setCurrentPage] = useState(1);
    const [search, setSearch] = useState("");
    const [sortName, setSortName] = useState("createdAt");
    const [sortOrder, setSortOrder] = useState("dsc");
    const [status] = useState(searchParams.get("status"));
    const [startArrivalDate] = useState(searchParams.get("startArrivalDate"));
    const [endArrivalDate] = useState(searchParams.get("endArrivalDate"));
    const minRef = useRef();
    const maxRef = useRef();

    const pageSize = 20;

    const {
        isLoading,
        error,
        data: productsData,
        refetch,
    } = useQuery({
        queryKey: ["products"],
        queryFn: async () => {
            let route = `/products?sortName=${sortName}&sortOrder=${sortOrder}`;
            if (status) {
                route += `&status=${status}`;
            }
            if (search) {
                route += `&search=${search}`;
            }
            if (startArrivalDate) {
                route += `&startArrivalDate=${startArrivalDate}`;
            }
            if (endArrivalDate) {
                route += `&endArrivalDate=${endArrivalDate}`;
            }
            const res = await apiRequest.get(route);
            const products = res.data?.map((data, index) => {
                return {
                    id: index + 1,
                    ...data,
                };
            });
            return products;
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
        <div className="products">
            <div className="productsTop">
                <div className="productsTitle">
                    <h1 className="title">All Products</h1>
                    <button
                        className="addButton"
                        onClick={() => {
                            navigate(`/products/new`);
                        }}
                    >
                        Add new
                    </button>
                </div>
                <div className="productsMenu">
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
                        <div className="sortInput">
                            <span>Price</span>
                            <input
                                ref={minRef}
                                type="number"
                                placeholder="min"
                            />
                            <input
                                ref={maxRef}
                                type="number"
                                placeholder="max"
                            />
                            <button onClick={refetch}>Apply</button>
                        </div>
                        <div className="sortSelect">
                            <span className="sortBy">Sort by</span>
                            <span
                                className="sortType"
                                onClick={() => setOpen(!open)}
                            >
                                {sortName === "createdAt" ? "Newest" : "Status"}
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
                                        <span onClick={() => reSort("status")}>
                                            Status
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
                        {isLoading
                            ? "Loading..."
                            : error
                            ? error.response.data.message
                            : view === "grid" && (
                                  <Pagination
                                      currentPage={currentPage}
                                      totalCount={productsData?.length}
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
            <div className="productsBottom">
                {view === "grid" ? (
                    <div className="gridView">
                        {isLoading
                            ? "Loading..."
                            : error
                            ? error.response.data.message
                            : productsData?.map((value, index) => {
                                  if (
                                      index >= (currentPage - 1) * pageSize &&
                                      index < currentPage * pageSize
                                  ) {
                                      return (
                                          <div
                                              className="item"
                                              key={value.productId}
                                          >
                                              <ProductCard product={value} />
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
                            error.response.data.message
                        ) : (
                            <Datatable
                                target="products"
                                rows={productsData}
                                columns={productColumns}
                            />
                        )}
                    </div>
                )}
            </div>
        </div>
    );
};

export default Products;
