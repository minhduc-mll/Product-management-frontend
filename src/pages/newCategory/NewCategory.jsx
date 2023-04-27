import "./newCategory.scss";
import FormCreate from "components/formCreate/FormCreate";

const categoryInputs = [
    {
        id: 1,
        name: "title",
        label: "Title",
        type: "text",
        placeholder: "Title",
    },
    {
        id: 2,
        name: "desc",
        label: "Description",
        type: "text",
        placeholder: "Description",
    },
];

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
