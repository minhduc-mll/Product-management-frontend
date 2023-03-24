import "./update.scss";
import UserDetail from "../../components/userDetail/UserDetail";
import Form from "../../components/form/Form";

const Update = ({ inputs }) => {
    return (
        <div className="update">
            <div className="top">
                <div className="title">Edit User</div>
            </div>
            <div className="bottom">
                <UserDetail />
                <Form inputs={inputs} />
            </div>
        </div>
    );
};

export default Update;
