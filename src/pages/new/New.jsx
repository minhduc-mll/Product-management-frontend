import "./new.scss";
import Form from "../../components/form/Form";

const New = ({ inputs, title }) => {
    return (
        <div className="new">
            <div className="top">
                <div className="title">Add new {title}</div>
            </div>
            <div className="bottom">
                <Form inputs={inputs} />
            </div>
        </div>
    );
};

export default New;
