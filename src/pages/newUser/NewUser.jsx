import "./newUser.scss";
import FormCreate from "components/formCreate/FormCreate";
import { userInputs } from "utils/inputForm";

const NewUser = () => {
    return (
        <div className="newUser">
            <div className="top">
                <h1 className="title">Add New User</h1>
            </div>
            <div className="bottom">
                <FormCreate route="users" inputs={userInputs} image={true} />
            </div>
        </div>
    );
};

export default NewUser;
