import "./app.scss";
import Login from "pages/login/Login";
import Layout from "pages/layout/Layout";
import Home from "pages/home/Home";
import Products from "pages/products/Products";
import Product from "pages/product/Product";
import NewProduct from "pages/newProduct/NewProduct";
import Customers from "pages/customers/Customers";
import NewCustomer from "pages/newCustomer/NewCustomer";
import Users from "pages/users/Users";
import Single from "pages/single/Single";
import NewUser from "pages/newUser/NewUser";
import Update from "pages/update/Update";
import UpdateUser from "pages/updateUser/UpdateUser";
import ComingSoon from "pages/comingSoon/ComingSoon";
import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import { productInputs, userInputs } from "./datasource";
import Analytics from "pages/analytics/Analytics";

function App() {
    console.log("App");

    return (
        <div className="app">
            <BrowserRouter>
                <Routes>
                    <Route path="/login" element={<Login />} />
                    <Route path="/" element={<Layout />}>
                        <Route
                            index
                            element={<Navigate to="dashboard" replace />}
                        />
                        <Route path="dashboard" element={<Home />} />
                        <Route path="transactions" element={<ComingSoon />} />
                        <Route path="feedback" element={<ComingSoon />} />
                        <Route path="settings" element={<ComingSoon />} />
                        <Route path="comingsoon" element={<ComingSoon />} />

                        <Route path="products">
                            <Route index element={<Products />} />
                            <Route path=":id" element={<Product />} />
                            <Route path="new" element={<NewProduct />} />
                            <Route
                                path="update/:id"
                                element={<Update inputs={productInputs} />}
                            />
                        </Route>
                        <Route path="customers">
                            <Route index element={<Customers />} />
                            <Route
                                path=":id"
                                element={<Single text="Customer" />}
                            />
                            <Route path="new" element={<NewCustomer />} />
                            <Route
                                path="update/:id"
                                element={<Update inputs={userInputs} />}
                            />
                        </Route>
                        <Route path="users">
                            <Route index element={<Users />} />
                            <Route
                                path=":id"
                                element={<Single text="User" />}
                            />
                            <Route path="new" element={<NewUser />} />
                            <Route
                                path="update/:id"
                                element={<UpdateUser text="User" />}
                            />
                        </Route>

                        <Route path="analytics" element={<Analytics />} />
                    </Route>
                </Routes>
            </BrowserRouter>
        </div>
    );
}

export default App;
