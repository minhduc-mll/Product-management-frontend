import "./app.scss";
import "./style/dark.scss";
import Navbar from "./components/navbar/Navbar";
import Sidebar from "./components/sidebar/Sidebar";
import Home from "./pages/home/Home";
import Login from "./pages/login/Login";
import List from "./pages/list/List";
import Single from "./pages/single/Single";
import New from "./pages/new/New";
import Update from "./pages/update/Update";
import ComingSoon from "./pages/comingSoon/ComingSoon";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { productInputs, userInputs, userRows, userColumns } from "./datasource";
import { useContext } from "react";
import { DarkModeContext } from "./context/darkModeContext";
import Form from "./components/form/Form";
import Detail from "./components/detail/Detail";

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
                                path="form"
                                element={<Form inputs={userInputs} />}
                            />
                            <Route path="settings" element={<Detail />} />

                            <Route path="products">
                                <Route
                                    index
                                    element={
                                        <List
                                            target="product"
                                            rows={userRows}
                                            columns={userColumns}
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
                                <Route path="update" element={<Update inputs={productInputs} />} />
                            </Route>
                            <Route path="customers">
                                <Route
                                    index
                                    element={
                                        <List
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
                                <Route path="update" element={<Update inputs={userInputs} />} />
                            </Route>
                            <Route path="users">
                                <Route
                                    index
                                    element={
                                        <List
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
                                <Route path="update" element={<Update inputs={userInputs} />} />
                            </Route>
                        </Route>
                    </Routes>
                </div>
            </BrowserRouter>
        </div>
    );
}

export default App;
