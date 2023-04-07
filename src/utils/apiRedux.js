import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";

export const api = createApi({
    baseQuery: fetchBaseQuery({ baseUrl: process.env.BASE_URL }),
    reducerPath: "adminApi",
    tagTypes: ["User", "Products", "Customers", "Transactions", "Dashboard"],
    endpoints: (build) => ({
        getAllUser: build.query({
            query: ({ page, pageSize, sort, search }) => ({
                url: "users",
                method: "GET",
                params: { page, pageSize, sort, search },
            }),
            providesTags: ["User"],
        }),
        getUser: build.query({
            query: (id) => `users/${id}`,
            providesTags: ["User"],
        }),
        getAllProducts: build.query({
            query: ({ page, pageSize, sort, search }) => ({
                url: "products",
                method: "GET",
                params: { page, pageSize, sort, search },
            }),
            providesTags: ["Products"],
        }),
        getProducts: build.query({
            query: (id) => `products/${id}`,
            providesTags: ["Products"],
        }),
        getAllCustomers: build.query({
            query: ({ page, pageSize, sort, search }) => ({
                url: "customers",
                method: "GET",
                params: { page, pageSize, sort, search },
            }),
            providesTags: ["Customers"],
        }),
        getCustomers: build.query({
            query: (id) => `customers/${id}`,
            providesTags: ["Customers"],
        }),
        getTransactions: build.query({
            query: ({ page, pageSize, sort, search }) => ({
                url: "transactions",
                method: "GET",
                params: { page, pageSize, sort, search },
            }),
            providesTags: ["Transactions"],
        }),
        getDashboard: build.query({
            query: () => "dashboard",
            providesTags: ["Dashboard"],
        }),
    }),
});

export const {
    useGetAllUserQuery,
    useGetUserQuery,
    useGetAllProductsQuery,
    useGetProductsQuery,
    useGetAllCustomersQuery,
    useGetCustomersQuery,
    useGetTransactionsQuery,
    useGetDashboardQuery,
} = api;
