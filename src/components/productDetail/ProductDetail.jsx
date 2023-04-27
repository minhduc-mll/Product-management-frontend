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
                {product?.desc && <p className="itemDetail">{product?.desc}</p>}
                {product?.price && (
                    <p className="itemDetail">Price: {product?.price}</p>
                )}
                {product?.deposit && (
                    <p className="itemDetail">
                        Deposit: {product?.deposit}.000.000
                    </p>
                )}
                {product?.arrivalDate && (
                    <p className="itemDetail">
                        {"Arrival date: "}
                        {dateFormat(product?.arrivalDate, "dd-mm-yyyy")}
                    </p>
                )}
                {product?.deliveryDate && (
                    <p className="itemDetail">
                        {"Delivery date: "}
                        {dateFormat(product?.deliveryDate, "dd-mm-yyyy")}
                    </p>
                )}
                {product?.port && <p className="itemDetail">{product?.port}</p>}
                {product?.status && (
                    <p className="itemDetail">
                        <span className={`status ${product?.status}`}>
                            {product?.status}
                        </span>
                    </p>
                )}
            </div>
        </div>
    );
};

export default ProductDetail;
