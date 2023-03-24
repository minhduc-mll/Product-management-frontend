import "./table.scss";
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import Paper from "@mui/material/Paper";
import { productRows } from "../../datasource";
import { Link } from "react-router-dom";

const List = ({ title }) => {
    return (
        <div className="table">
            <div className="title">{title}</div>
            <TableContainer component={Paper} className="tableContainer">
                <Table sx={{ minWidth: 650 }} aria-label="simple table">
                    <TableHead>
                        <TableRow>
                            <TableCell className="tableCell">
                                Tracking ID
                            </TableCell>
                            <TableCell className="tableCell">Product</TableCell>
                            <TableCell className="tableCell">
                                Customer
                            </TableCell>
                            <TableCell className="tableCell">Date</TableCell>
                            <TableCell className="tableCell">Amount</TableCell>
                            <TableCell className="tableCell">
                                Payment Method
                            </TableCell>
                            <TableCell className="tableCell">Status</TableCell>
                        </TableRow>
                    </TableHead>
                    <TableBody>
                        {productRows.map((row) => (
                            <TableRow key={row.id}>
                                <TableCell className="tableCell">
                                    {row.id}
                                </TableCell>
                                <TableCell className="tableCell">
                                    <div className="cellWrapper">
                                        <img
                                            src={row.img}
                                            alt="image"
                                            className="image"
                                        />
                                        <Link
                                            to={`/products/${row.id}`}
                                            className="link"
                                            key={row.id}
                                        >
                                            {row.product}
                                        </Link>
                                    </div>
                                </TableCell>
                                <TableCell className="tableCell">
                                    {row.customer}
                                </TableCell>
                                <TableCell className="tableCell">
                                    {row.date}
                                </TableCell>
                                <TableCell className="tableCell">
                                    {row.amount}
                                </TableCell>
                                <TableCell className="tableCell">
                                    {row.method}
                                </TableCell>
                                <TableCell className="tableCell">
                                    <span className={`status ${row.status}`}>
                                        {row.status}
                                    </span>
                                </TableCell>
                            </TableRow>
                        ))}
                    </TableBody>
                </Table>
            </TableContainer>
        </div>
    );
};

export default List;
