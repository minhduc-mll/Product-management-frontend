import "./update.scss";
import UserDetail from "../../components/userDetail/UserDetail";
import Form from "../../components/form/Form";

const Update = ({ inputs }) => {
    return (
        <div className="update">
            <div className="top">
                <h1 className="title">Edit User</h1>
            </div>
            <div className="bottom">
                <UserDetail />
                <Form inputs={inputs} />
            </div>
        </div>
    );
};

export default Update;
