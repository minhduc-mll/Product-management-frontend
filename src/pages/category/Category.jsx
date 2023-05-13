import "./category.scss";
import {
    KeyboardArrowDownOutlined,
    KeyboardArrowUpOutlined,
    SearchOutlined,
    GridViewOutlined,
    ViewListOutlined,
} from "@mui/icons-material";
import ProductDetail from "components/productCard/ProductCard";
import Datatable from "components/datatable/Datatable";
import Pagination from "components/pagination/Pagination";
import { useState, useEffect } from "react";
import { useNavigate, useParams } from "react-router-dom";
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

const Category = () => {
    const navigate = useNavigate();
    const { id } = useParams();

    const [open, setOpen] = useState(false);
    const [view, setView] = useState("grid");
    const [currentPage, setCurrentPage] = useState(1);
    const [search, setSearch] = useState("");
    const [sortName, setSortName] = useState("createdAt");
    const [sortOrder, setSortOrder] = useState("dsc");

    const pageSize = 20;

    const {
        isLoading: isLoadingCategory,
        error: errorCategory,
        data: dataCategory,
    } = useQuery({
        queryKey: ["category", id],
        queryFn: async () => {
            const res = await apiRequest.get(`/categories/${id}`);
            return res.data;
        },
        enabled: !!id,
    });

    const {
        isLoading: isLoadingProducts,
        error: errorProducts,
        data: dataProducts,
        refetch,
    } = useQuery({
        queryKey: ["products"],
        queryFn: async () => {
            let route = `/products/category/${id}?sortName=${sortName}&sortOrder=${sortOrder}`;
            if (search) {
                route += `&search=${search}`;
            }
            const res = await apiRequest.get(route);
            const category = res.data?.map((data, index) => {
                return {
                    id: index + 1,
                    ...data,
                };
            });
            return category;
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
        <div className="category">
            <div className="categoryTop">
                <div className="categoryTitle">
                    {isLoadingCategory ? (
                        "Loading..."
                    ) : errorCategory ? (
                        <h1 className="title">
                            {errorCategory.response.data.message}
                        </h1>
                    ) : (
                        <h1 className="title">{`All Products From Category ${dataCategory.title}`}</h1>
                    )}
                    <button
                        className="addButton"
                        onClick={() => {
                            navigate(`/categories/update/${id}`);
                        }}
                    >
                        Edit Category
                    </button>
                </div>
                <div className="categoryMenu">
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
                        {isLoadingProducts
                            ? "Loading..."
                            : errorProducts
                            ? errorProducts.response.data.message
                            : view === "grid" && (
                                  <Pagination
                                      currentPage={currentPage}
                                      totalCount={dataProducts?.length}
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
            <div className="categoryBottom">
                {view === "grid" ? (
                    <div className="gridView">
                        {isLoadingProducts
                            ? "Loading..."
                            : errorProducts
                            ? errorProducts.response.data.message
                            : dataProducts?.map((value, index) => {
                                  if (
                                      index >= (currentPage - 1) * pageSize &&
                                      index < currentPage * pageSize
                                  ) {
                                      return (
                                          <div
                                              className="item"
                                              key={value.productId}
                                          >
                                              <ProductDetail product={value} />
                                          </div>
                                      );
                                  }
                                  return null;
                              })}
                    </div>
                ) : (
                    <div className="listView">
                        {isLoadingProducts ? (
                            "Loading..."
                        ) : errorProducts ? (
                            errorProducts.response.data.message
                        ) : (
                            <Datatable
                                target="category"
                                rows={dataProducts}
                                columns={productColumns}
                            />
                        )}
                    </div>
                )}
            </div>
        </div>
    );
};

export default Category;
