import "./user.scss";
import Sidebar from "../../components/sidebar/Sidebar";
import Navbar from "../../components/navbar/Navbar";
import Datatable from "../../components/datatable/Datatable";
import { userRows, userColumns } from "../../datasource";

const User = () => {
    return (
        <div className="user">
            <Sidebar />
            <div className="userContainer">
                <Navbar />
                <Datatable title="Add New User" rows={userRows} columns={userColumns} />
            </div>
        </div>
    );
};

export default User;