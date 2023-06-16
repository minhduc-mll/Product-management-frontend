import "./newCustomer.scss";
import FormCreate from "components/formCreate/FormCreate";
import { customerInputs } from "utils/inputForm";

const NewCustomer = () => {
    return (
        <div className="newCustomer">
            <div className="top">
                <h1 className="title">Add New Customer</h1>
            </div>
            <div className="bottom">
                <FormCreate
                    route="customers"
                    inputs={customerInputs}
                    image={true}
                />
            </div>
        </div>
    );
};

export default NewCustomer;
