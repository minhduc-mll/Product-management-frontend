import "./update.scss";
import Detail from "../../components/detail/Detail";
import Form from "../../components/form/Form";

const Update = ({ inputs }) => {
    return (
        <div className="update">
            <div className="top">
                <div className="title">Edit User</div>
            </div>
            <div className="bottom">
                <Detail />
                <Form inputs={inputs} />
            </div>
        </div>
    );
};

export default Update;
