import "./app.scss";
import Layout from "pages/layout/Layout";
import Home from "pages/home/Home";
import Products from "pages/products/Products";
import Product from "pages/product/Product";
import NewProduct from "pages/newProduct/NewProduct";
import Update from "pages/update/Update";
import Categories from "pages/categories/Categories";
import Calendar from "pages/calendar/Calendar";
import Customers from "pages/customers/Customers";
import NewCustomer from "pages/newCustomer/NewCustomer";
import Single from "pages/single/Single";
import Users from "pages/users/Users";
import NewUser from "pages/newUser/NewUser";
import UpdateUser from "pages/updateUser/UpdateUser";
import Analytics from "pages/analytics/Analytics";
import ComingSoon from "pages/comingSoon/ComingSoon";
import { createBrowserRouter, RouterProvider } from "react-router-dom";
import { productInputs, userInputs } from "./datasource";
import { RequireAuth } from "utils/auth";

function App() {
    console.log("App");

    const router = createBrowserRouter([
        { path: "/", element: <RequireAuth /> },
        { path: "/login", element: <RequireAuth /> },
        {
            element: <Layout />,
            children: [
                {
                    path: "/unauthorized",
                    element: <ComingSoon />,
                },
                {
                    path: "/comingsoon",
                    element: <ComingSoon />,
                },
            ],
        },
        {
            element: <Layout />,
            children: [
                {
                    path: "/dashboard",
                    element: <Home />,
                },
                {
                    path: "/products",
                    element: <Products />,
                },
                {
                    path: "/products/:id",
                    element: <Product />,
                },
                {
                    path: "/products/new",
                    element: <NewProduct />,
                },
                {
                    path: "/products/update/:id",
                    element: <Update inputs={productInputs} />,
                },
                {
                    path: "/categories",
                    element: <Categories />,
                },
                {
                    path: "/categories/:id",
                    element: <Product />,
                },
                {
                    path: "/categories/new",
                    element: <NewProduct />,
                },
                {
                    path: "/categories/update/:id",
                    element: <Update inputs={productInputs} />,
                },
                {
                    path: "/transactions",
                    element: <ComingSoon />,
                },
                {
                    path: "/calendar",
                    element: <Calendar />,
                },
                {
                    path: "/customers",
                    element: <Customers />,
                },
                {
                    path: "/customers/:id",
                    element: (
                        <Single firstRoute="customers" secondRoute="customer" />
                    ),
                },
                {
                    path: "/customers/new",
                    element: <NewCustomer />,
                },
                {
                    path: "/customers/update/:id",
                    element: <Update inputs={userInputs} />,
                },
                {
                    path: "/feedback",
                    element: <ComingSoon />,
                },
                {
                    path: "/:id",
                    element: (
                        <Single firstRoute="users/profile" secondRoute="user" />
                    ),
                },
                {
                    path: "/:id/update",
                    element: <UpdateUser text="users/profile" />,
                },
                {
                    path: "/settings",
                    element: <ComingSoon />,
                },
            ],
        },
        {
            element: <Layout roles={["dev", "mod", "admin"]} />,
            children: [
                {
                    path: "/users",
                    element: <Users />,
                },
                {
                    path: "/users/:id",
                    element: <Single firstRoute="users" secondRoute="user" />,
                },
                {
                    path: "/users/new",
                    element: <NewUser />,
                },
                {
                    path: "/users/update/:id",
                    element: <UpdateUser text="Users" />,
                },
                {
                    path: "/analytics",
                    element: <Analytics />,
                },
            ],
        },
    ]);

    return (
        <div className="app">
            <RouterProvider router={router} />
        </div>
    );
}

export default App;
