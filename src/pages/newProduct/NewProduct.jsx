import "./newProduct.scss";
import FormProduct from "components/formProduct/FormProduct";
import { productInputs } from "utils/inputForm";

const NewProduct = () => {
    return (
        <div className="newProduct">
            <div className="top">
                <h1 className="title">Add New Product</h1>
            </div>
            <div className="bottom">
                <FormProduct route="products" inputs={productInputs} />
            </div>
        </div>
    );
};

export default NewProduct;
