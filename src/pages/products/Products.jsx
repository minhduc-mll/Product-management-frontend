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

    const { isLoading, error, data, refetch } = useQuery({
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
            <div className="top">
                <div className="menuTitle">
                    <div className="title">All products</div>
                    <button
                        className="addButton"
                        onClick={() => {
                            navigate(`/products/new`);
                        }}
                    >
                        Add new
                    </button>
                </div>
                <div className="menu">
                    <div className="search">
                        <input type="text" placeholder="Search..." />
                        <SearchOutlined className="icon" />
                    </div>
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
                    ? "get products error"
                    : data.map((item) => (
                          <div className="item" key={item.productId}>
                              <ProductDetail product={item} />
                          </div>
                      ))}
            </div>
        </div>
    );
};

export default Products;
