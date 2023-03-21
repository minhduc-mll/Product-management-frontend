import "./single.scss";
import Sidebar from "../../components/sidebar/Sidebar";
import Navbar from "../../components/navbar/Navbar";
import Chart from "../../components/chart/Chart";
import Table from "../../components/table/Table";


const Single = () => {
    return (
        <div className="single">
            <Sidebar />
            <div className="singleContainer">
                <Navbar />
                <div className="top">
                    <div className="left">
                        <button className="editButton">Edit</button>
                        <h1 className="title">Infomation</h1>
                        <div className="item">
                            <img src="https://images.pexels.com/photos/1820770/pexels-photo-1820770.jpeg?auto=compress&cs=tinysrgb&dpr=2&w=500" alt="avata" className="itemImg" />
                            <div className="details">
                                <h1 className="itemTitle">Minh Duc</h1>
                                <div className="detailItem">
                                    <span className="itemKey">Email:</span>
                                    <span className="itemValue">minhduc.mll@gmail.com</span>
                                </div>
                                <div className="detailItem">
                                    <span className="itemKey">Phone:</span>
                                    <span className="itemValue">0949487687</span>
                                </div>
                                <div className="detailItem">
                                    <span className="itemKey">Address:</span>
                                    <span className="itemValue">124 Xuân Thủy, Dịch Vọng Hậu, Cầu Giấy, Hà Nội</span>
                                </div>
                                <div className="detailItem">
                                    <span className="itemKey">Country:</span>
                                    <span className="itemValue">Vietnam</span>
                                </div>
                            </div>
                        </div>
                    </div>
                    <div className="right">
                        <Chart title="User Spending ( Last 6 Months )" aspect={3 / 1}/>
                    </div>
                </div>
                <div className="bottom">
                    <Table title="Last Transactions" />
                </div>
            </div>
        </div>
    );
};

export default Single;