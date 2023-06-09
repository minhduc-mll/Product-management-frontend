const profileInputs = [
    {
        id: 1,
        name: "name",
        type: "text",
        label: "Name",
        placeholder: "Name",
    },
    {
        id: 2,
        name: "email",
        type: "email",
        label: "Email",
        placeholder: "Email",
    },
    {
        id: 3,
        name: "phone",
        type: "text",
        label: "Phone",
        placeholder: "Phone",
    },
    {
        id: 4,
        name: "birthday",
        type: "date",
        label: "Birthday",
    },
];

const passwordInputs = [
    {
        id: 1,
        name: "oldPassword",
        type: "password",
        label: "Current Password",
        required: true,
    },
    {
        id: 2,
        name: "newPassword",
        type: "password",
        label: "New Password",
        required: true,
    },
    {
        id: 3,
        name: "rePassword",
        type: "password",
        label: "Enter New Password",
        required: true,
    },
];

const categoryInputs = [
    {
        id: 1,
        name: "title",
        label: "Title",
        type: "text",
        placeholder: "Title",
        required: true,
    },
    {
        id: 2,
        name: "desc",
        label: "Description",
        type: "text",
        placeholder: "Description",
    },
];

const productInputs = [
    {
        id: 1,
        name: "productId",
        label: "Product ID",
        type: "text",
        placeholder: "Product ID",
        required: true,
    },
    {
        id: 2,
        name: "categoryId",
        label: "Category",
        type: "select",
        placeholder: "Category",
        required: true,
    },
    {
        id: 3,
        name: "price",
        label: "Price",
        type: "text",
        placeholder: "Price",
    },
    {
        id: 4,
        name: "deposit",
        label: "Deposit",
        type: "text",
        placeholder: "Deposit",
    },
    {
        id: 5,
        name: "amount",
        label: "Amount",
        type: "text",
        placeholder: "Amount",
    },
    {
        id: 6,
        name: "saleDate",
        label: "Sale date",
        type: "date",
        placeholder: "Sale date",
    },
    {
        id: 7,
        name: "arrivalDate",
        label: "Arrival date",
        type: "date",
        placeholder: "Arrival date",
    },
    {
        id: 8,
        name: "deliveryDate",
        label: "Delivery date",
        type: "date",
        placeholder: "Delivery date",
    },
    {
        id: 9,
        name: "port",
        label: "Port",
        type: "text",
        placeholder: "Port",
    },
    {
        id: 10,
        name: "document",
        label: "Document",
        type: "text",
        placeholder: "Document",
    },
    {
        id: 11,
        name: "customerId",
        label: "Customer",
        type: "select",
        placeholder: "Customer",
    },
    {
        id: 12,
        name: "sellerId",
        label: "Seller",
        type: "select",
        placeholder: "Seller",
    },
    {
        id: 13,
        name: "desc",
        label: "Description",
        type: "text",
        placeholder: "Description",
    },
    {
        id: 14,
        name: "status",
        label: "Status",
        type: "select",
        placeholder: "Status",
        required: true,
        options: [
            { value: "pending", title: "pending" },
            { value: "sold", title: "sold" },
            { value: "done", title: "done" },
        ],
    },
];

const productInputsAdmin = [
    {
        id: 1,
        name: "amount",
        label: "Amount",
        type: "text",
        placeholder: "Amount",
    },
    {
        id: 2,
        name: "payment",
        label: "Payment",
        type: "text",
        placeholder: "Payment",
    },
];

const customerInputs = [
    {
        id: 1,
        name: "name",
        label: "Name",
        type: "text",
        placeholder: "Name",
    },
    {
        id: 2,
        name: "phone",
        label: "Phone",
        type: "text",
        placeholder: "Phone",
        required: true,
    },
    {
        id: 3,
        name: "email",
        label: "Email",
        type: "email",
        placeholder: "Email",
    },
    {
        id: 4,
        name: "birthday",
        label: "Birthday",
        type: "date",
        placeholder: "Birthday",
    },
    {
        id: 5,
        name: "company",
        label: "Company",
        type: "text",
        placeholder: "Company",
    },
    {
        id: 6,
        name: "bankAccount",
        label: "Bank Account",
        type: "text",
        placeholder: "Bank Account",
    },
    {
        id: 7,
        name: "address",
        label: "Address",
        type: "text",
        placeholder: "Address",
    },
];

const userInputs = [
    {
        id: 1,
        name: "username",
        label: "Username",
        type: "text",
        placeholder: "Username",
        required: true,
    },
    {
        id: 2,
        name: "password",
        label: "Password",
        type: "text",
        placeholder: "Password",
    },
    {
        id: 3,
        name: "name",
        label: "Name",
        type: "text",
        placeholder: "Name",
    },
    {
        id: 4,
        name: "email",
        label: "Email",
        type: "email",
        placeholder: "Email",
    },
    {
        id: 5,
        name: "phone",
        label: "Phone",
        type: "text",
        placeholder: "Phone",
    },
    {
        id: 6,
        name: "birthday",
        label: "Birthday",
        type: "date",
        placeholder: "Birthday",
    },
    {
        id: 7,
        name: "role",
        label: "Role",
        type: "select",
        placeholder: "Role",
        options: ["sale", "manager", "dev", "mod", "admin"],
    },
];

export {
    profileInputs,
    passwordInputs,
    categoryInputs,
    productInputs,
    productInputsAdmin,
    customerInputs,
    userInputs,
};
