import "./newCategory.scss";
import FormCreate from "components/formCreate/FormCreate";
import { categoryInputs } from "utils/inputForm";

const NewCategory = () => {
    return (
        <div className="newCategory">
            <div className="top">
                <h1 className="title">Add New Category</h1>
            </div>
            <div className="bottom">
                <FormCreate route="categories" inputs={categoryInputs} />
            </div>
        </div>
    );
};

export default NewCategory;
