import "./productDetail.scss";

const ProductDetail = ({ product }) => {
    return (
        <div className="productDetail">
            <div className="productImage">
                <img src={product.img} alt="image" className="image" />
            </div>
            <div className="productItems">
                <h1 className="title">{product.product}</h1>
                <div className="items">
                    <p className="itemDetail">{product.customer}</p>
                    <p className="itemDetail">{product.amount}</p>
                    <p className="itemDetail">{product.method}</p>
                    <p className="itemDetail">{product.status}</p>
                    <p className="itemDetail">{product.date}</p>
                </div>
            </div>
        </div>
    );
};

export default ProductDetail;
