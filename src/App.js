import "./app.scss";
import Layout from "pages/layout/Layout";
import Home from "pages/home/Home";
import Products from "pages/products/Products";
import Product from "pages/product/Product";
import NewProduct from "pages/newProduct/NewProduct";
import UpdateProduct from "pages/updateProduct/UpdateProduct";
import Categories from "pages/categories/Categories";
import Category from "pages/category/Category";
import NewCategory from "pages/newCategory/NewCategory";
import UpdateCategory from "pages/updateCategory/UpdateCategory";
import Tasks from "pages/tasks/Tasks";
import Calendar from "pages/calendar/Calendar";
import Customers from "pages/customers/Customers";
import NewCustomer from "pages/newCustomer/NewCustomer";
import UpdateCustomer from "pages/updateCustomer/UpdateCustomer";
import Single from "pages/single/Single";
import Employees from "pages/employees/Employees";
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
            path: "/test",
            element: <ComingSoon title="Test" />,
        },
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
                    element: <UpdateProduct />,
                },
                {
                    path: "/categories",
                    element: <Categories />,
                },
                {
                    path: "/categories/:id",
                    element: <Category />,
                },
                {
                    path: "/categories/new",
                    element: <NewCategory />,
                },
                {
                    path: "/categories/update/:id",
                    element: <UpdateCategory />,
                },
                {
                    path: "/transactions",
                    element: <ComingSoon title={`Transactions`} />,
                },
                {
                    path: "/tasks",
                    element: <Tasks />,
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
                    element: <UpdateCustomer />,
                },
                {
                    path: "/employees",
                    element: <Employees />,
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
                    element: <UpdateUser />,
                },
                {
                    path: "/admin/analytics",
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
