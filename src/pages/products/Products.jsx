import "./products.scss";
import { KeyboardArrowDownOutlined, SearchOutlined } from "@mui/icons-material";
import ProductDetail from "components/productCard/ProductCard";
import { useState, useEffect, useRef } from "react";
import { useNavigate } from "react-router-dom";
import { useQuery } from "@tanstack/react-query";
import { apiRequest } from "utils/apiAxios";

const Products = () => {
    const [open, setOpen] = useState(false);
    const [sort, setSort] = useState("sales");
    const minRef = useRef();
    const maxRef = useRef();

    const navigate = useNavigate();

    const {
        isLoading,
        error,
        data: productsData,
        refetch,
    } = useQuery({
        queryKey: ["products"],
        queryFn: async () => {
            const res = await apiRequest.get(`/products`);
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
        <div className="products">
            <div className="productsTop">
                <div className="productsTitle">
                    <h1 className="title">All products</h1>
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
                    <div className="menuSearch">
                        <div className="searchPrimary">
                            <input type="text" placeholder="Search..." />
                            <SearchOutlined className="icon" />
                        </div>
                        <div className="searchSecondary">
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
                            <button
                                onClick={() => {
                                    refetch();
                                }}
                            >
                                Apply
                            </button>
                        </div>
                    </div>
                    <div className="menuSort">
                        <span className="sortBy">Sort by</span>
                        <span
                            className="sortType"
                            onClick={() => setOpen(!open)}
                        >
                            {sort === "sales" ? "Best Selling" : "Newest"}
                            <KeyboardArrowDownOutlined className="icon" />
                        </span>
                        {open && (
                            <div className="openMenu">
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
            <div className="productsBottom">
                {isLoading
                    ? "Loading..."
                    : error
                    ? error.message
                    : productsData.map((item) => (
                          <div className="item" key={item.productId}>
                              <ProductDetail product={item} />
                          </div>
                      ))}
            </div>
        </div>
    );
};

export default Products;
