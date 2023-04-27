import "./newUser.scss";
import FormCreate from "components/formCreate/FormCreate";

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
        type: "text",
        placeholder: "Role",
    },
];

const NewUser = () => {
    return (
        <div className="newUser">
            <div className="top">
                <h1 className="title">Add New User</h1>
            </div>
            <div className="bottom">
                <FormCreate route="users" inputs={userInputs} />
            </div>
        </div>
    );
};

export default NewUser;
