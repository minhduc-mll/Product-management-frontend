import "./app.scss";
import "./style/dark.scss";
import Navbar from "./components/navbar/Navbar";
import Sidebar from "./components/sidebar/Sidebar";
import Home from "./pages/home/Home";
import Login from "./pages/login/Login";
import ListProduct from "./pages/listProduct/ListProduct";
import ListUser from "./pages/listUser/ListUser";
import Single from "./pages/single/Single";
import New from "./pages/new/New";
import Update from "./pages/update/Update";
import ComingSoon from "./pages/comingSoon/ComingSoon";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { useContext } from "react";
import { DarkModeContext } from "./context/darkModeContext";
import { productInputs, userInputs, userRows, userColumns, productRows } from "./datasource";
import ProductDetail from "./components/productDetail/ProductDetail";

function App() {
    const { darkMode } = useContext(DarkModeContext);

    return (
        <div className={darkMode ? "app dark" : "app"}>
            <BrowserRouter>
                <Navbar />

                <div className="container">
                    <Sidebar />

                    <Routes>
                        <Route path="/">
                            <Route index element={<Home />} />
                            <Route path="login" element={<Login />} />
                            <Route path="comingsoon" element={<ComingSoon />} />
                            <Route
                                path="settings"
                                element={<ComingSoon />}
                            />

                            <Route path="products">
                                <Route
                                    index
                                    element={
                                        <ListProduct
                                            target="product"
                                            lists={productRows}
                                        />
                                    }
                                />
                                <Route
                                    path=":productId"
                                    element={<Single target="product" />}
                                />
                                <Route
                                    path="new"
                                    element={
                                        <New
                                            title="product"
                                            inputs={productInputs}
                                        />
                                    }
                                />
                                <Route
                                    path="update"
                                    element={<Update inputs={productInputs} />}
                                />
                            </Route>
                            <Route path="customers">
                                <Route
                                    index
                                    element={
                                        <ListUser
                                            target="customer"
                                            rows={userRows}
                                            columns={userColumns}
                                        />
                                    }
                                />
                                <Route
                                    path=":customerId"
                                    element={<Single target="customer" />}
                                />
                                <Route
                                    path="new"
                                    element={
                                        <New
                                            title="customer"
                                            inputs={userInputs}
                                        />
                                    }
                                />
                                <Route
                                    path="update"
                                    element={<Update inputs={userInputs} />}
                                />
                            </Route>
                            <Route path="users">
                                <Route
                                    index
                                    element={
                                        <ListUser
                                            target="user"
                                            rows={userRows}
                                            columns={userColumns}
                                        />
                                    }
                                />
                                <Route
                                    path=":userId"
                                    element={<Single target="user" />}
                                />
                                <Route
                                    path="new"
                                    element={
                                        <New title="user" inputs={userInputs} />
                                    }
                                />
                                <Route
                                    path="update"
                                    element={<Update inputs={userInputs} />}
                                />
                            </Route>
                        </Route>
                    </Routes>
                </div>
            </BrowserRouter>
        </div>
    );
}

export default App;
