import "./app.scss";
import Layout from "pages/layout/Layout";
import Home from "pages/home/Home";
import Products from "pages/products/Products";
import Product from "pages/product/Product";
import NewProduct from "pages/newProduct/NewProduct";
import UpdateProduct from "pages/updateProduct/UpdateProduct";
import Categories from "pages/categories/Categories";
import NewCategory from "pages/newCategory/NewCategory";
import Calendar from "pages/calendar/Calendar";
import Customers from "pages/customers/Customers";
import NewCustomer from "pages/newCustomer/NewCustomer";
import UpdateCustomer from "pages/updateCustomer/UpdateCustomer";
import Single from "pages/single/Single";
import Users from "pages/users/Users";
import NewUser from "pages/newUser/NewUser";
import UpdateUser from "pages/updateUser/UpdateUser";
import Analytics from "pages/analytics/Analytics";
import UserProfile from "pages/userProfile/UserProfile";
import UpdateProfile from "pages/updateProfile/UpdateProfile";
import ComingSoon from "pages/comingSoon/ComingSoon";
import { createBrowserRouter, RouterProvider } from "react-router-dom";
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
                    element: <ComingSoon title="Unauthorized" />,
                },
                {
                    path: "/comingsoon",
                    element: <ComingSoon title="Comming Soon" />,
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
                    element: <UpdateProduct route="products" />,
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
                    element: <NewCategory />,
                },
                {
                    path: "/categories/update/:id",
                    element: <UpdateProduct route="categories" />,
                },
                {
                    path: "/transactions",
                    element: <ComingSoon title={`Transactions`} />,
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
                    element: <Single route="customer" />,
                },
                {
                    path: "/customers/new",
                    element: <NewCustomer />,
                },
                {
                    path: "/customers/update/:id",
                    element: <UpdateCustomer route="customers" />,
                },
                {
                    path: "/feedback",
                    element: <ComingSoon title={`Feedback`} />,
                },
                {
                    path: "/:id",
                    element: <UserProfile />,
                },
                {
                    path: "/profile/update",
                    element: <UpdateProfile />,
                },
                {
                    path: "/settings",
                    element: <ComingSoon title={`Settings`} />,
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
                    element: <Single route="user" />,
                },
                {
                    path: "/users/new",
                    element: <NewUser />,
                },
                {
                    path: "/users/update/:id",
                    element: <UpdateUser route="users" />,
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
