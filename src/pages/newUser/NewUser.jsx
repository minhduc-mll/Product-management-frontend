import "./newUser.scss";
import Form from "../../components/form/Form";

const userInputs = [
    {
        id: 1,
        name: "username",
        label: "Username",
        type: "text",
        placeholder: "Username",
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
        type: "mail",
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
        type: "text",
        placeholder: "Role",
    },
];

const NewUser = () => {
    return (
        <div className="newUser">
            <div className="top">
                <div className="title">Add New User</div>
            </div>
            <div className="bottom">
                <Form target="user" inputs={userInputs} />
            </div>
        </div>
    );
};

export default NewUser;
