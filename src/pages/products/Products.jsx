import "./products.scss";
import {
    KeyboardArrowDownOutlined,
    KeyboardArrowUpOutlined,
    SearchOutlined,
    GridViewOutlined,
    ViewListOutlined,
} from "@mui/icons-material";
import ProductDetail from "components/productCard/ProductCard";
import Datatable from "components/datatable/Datatable";
import { useState, useEffect, useRef } from "react";
import { useNavigate } from "react-router-dom";
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

    const [open, setOpen] = useState(false);
    const [view, setView] = useState("grid");
    const [search, setSearch] = useState("");
    const [sortName, setSortName] = useState("createdAt");
    const [sortOrder, setSortOrder] = useState("dsc");
    const minRef = useRef();
    const maxRef = useRef();

    const {
        isLoading,
        error,
        data: productsData,
        refetch,
    } = useQuery({
        queryKey: ["products"],
        queryFn: async () => {
            const res = await apiRequest.get(
                `/products?search=${search}&sortName=${sortName}&sortOrder=${sortOrder}`
            );
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
            <div className="productsBottom">
                {view === "grid" ? (
                    <div className="gridView">
                        {isLoading
                            ? "Loading..."
                            : error
                            ? error.response.data.message
                            : productsData?.map((item) => (
                                  <div className="item" key={item.productId}>
                                      <ProductDetail product={item} />
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
