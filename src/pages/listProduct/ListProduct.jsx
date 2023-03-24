import "./listProduct.scss";
import ProductDetail from "../../components/productDetail/ProductDetail";
import { Link } from "react-router-dom";

const ListProduct = ({ target, lists }) => {
    return (
        <div className="listProduct">
            <div className="top">
                <div className="title">Add new {target}</div>
                <Link to={`/${target}s/new`} className="link">
                    Add new
                </Link>
            </div>
            <div className="bottom">
                {lists.map((item) => (
                    <Link
                        to={`/${target}s/${item.id}`}
                        className="link"
                        key={item.id}
                    >
                        <ProductDetail product={item} />
                    </Link>
                ))}
            </div>
        </div>
    );
};

export default ListProduct;
