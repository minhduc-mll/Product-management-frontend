import "./newProduct.scss";
import FormProduct from "components/formProduct/FormProduct";

const productInputs = [
    {
        id: 1,
        name: "productId",
        label: "Product ID",
        type: "text",
        placeholder: "Product ID",
    },
    {
        id: 2,
        name: "desc",
        label: "Description",
        type: "text",
        placeholder: "Description",
    },
    {
        id: 3,
        name: "port",
        label: "Port",
        type: "text",
        placeholder: "Port",
    },
    {
        id: 4,
        name: "status",
        label: "Status",
        type: "text",
        placeholder: "Status",
    },
    {
        id: 5,
        name: "arrivalDate",
        label: "Arival date",
        type: "date",
        placeholder: "Arival date",
    },
    {
        id: 6,
        name: "deliveryDate",
        label: "Delivery date",
        type: "date",
        placeholder: "Delivery date",
    },
    {
        id: 7,
        name: "price",
        label: "Price",
        type: "text",
        placeholder: "Price",
    },
    {
        id: 8,
        name: "deposit",
        label: "Deposit",
        type: "text",
        placeholder: "Deposit",
    },
    {
        id: 9,
        name: "customerId",
        label: "Customer",
        type: "text",
        placeholder: "Customer",
    },
    {
        id: 10,
        name: "sellerId",
        label: "Seller",
        type: "text",
        placeholder: "Seller",
    },
];

const NewProduct = () => {
    return (
        <div className="newProduct">
            <div className="top">
                <h1 className="title">Add New Product</h1>
            </div>
            <div className="bottom">
                <FormProduct target="product" inputs={productInputs} />
            </div>
        </div>
    );
};

export default NewProduct;
