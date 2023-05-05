import "./productDetail.scss";
import defaultImage from "assets/no-image.jpg";
import dateFormat from "dateformat";

const ProductDetail = ({ product }) => {
    return (
        <div className="productDetail">
            <div className="productItems">
                <div className="itemImage">
                    <img
                        src={product?.cover || defaultImage}
                        alt=""
                        className="image"
                    />
                </div>
                <h1 className="itemTitle">{product?.productId}</h1>
                {product?.desc && (
                    <div className="itemDetail">{product?.desc}</div>
                )}
                {product?.price && (
                    <div className="itemDetail">
                        <span>Price: {product?.price}</span>
                    </div>
                )}
                {product?.deposit && (
                    <div className="itemDetail">
                        <span>Deposit: {product?.deposit}.000.000</span>
                    </div>
                )}
                {product?.saleDate && (
                    <div className="itemDetail">
                        <span>
                            {"Sale date: "}
                            {dateFormat(product?.saleDate, "dd-mm-yyyy")}
                        </span>
                    </div>
                )}
                {product?.arrivalDate && (
                    <div className="itemDetail">
                        <span>
                            {"Arrival date: "}
                            {dateFormat(product?.arrivalDate, "dd-mm-yyyy")}
                        </span>
                    </div>
                )}
                {product?.deliveryDate && (
                    <div className="itemDetail">
                        <span>
                            {"Delivery date: "}
                            {dateFormat(product?.deliveryDate, "dd-mm-yyyy")}
                        </span>
                    </div>
                )}
                {product?.port && (
                    <div className="itemDetail">
                        <span>Port: {product?.port}</span>
                    </div>
                )}
                {product?.document && (
                    <div className="itemDetail">
                        <span>Document: {product?.document}</span>
                    </div>
                )}
                {product?.status && (
                    <div className="itemDetail">
                        <span className={`status ${product?.status}`}>
                            {product?.status}
                        </span>
                    </div>
                )}
            </div>
        </div>
    );
};

export default ProductDetail;
