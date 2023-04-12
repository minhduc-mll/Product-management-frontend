import "./newCustomer.scss";
import Form from "components/form/Form";

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
    },
    {
        id: 3,
        name: "email",
        label: "Email",
        type: "mail",
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

const NewCustomer = () => {
    return (
        <div className="newCustomer">
            <div className="top">
                <div className="title">Add New Customer</div>
            </div>
            <div className="bottom">
                <Form target="customer" inputs={customerInputs} />
            </div>
        </div>
    );
};

export default NewCustomer;
