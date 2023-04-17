import "./regulartable.scss";
import {
    Table,
    TableBody,
    TableCell,
    TableContainer,
    TableHead,
    TableRow,
    Paper,
} from "@mui/material";
import { Link } from "react-router-dom";
import dateFormat from "dateformat";

const tableColumns = [
    "",
    "ProductId",
    "Category",
    "Price",
    "Deposit",
    "Arrival Date",
    "Port",
    "Status",
];

const Regulartable = ({ title, products }) => {
    return (
        <div className="regulartable">
            <h1 className="title">{title}</h1>
            <TableContainer component={Paper} className="tableContainer">
                <Table aria-label="simple table">
                    <TableHead>
                        <TableRow>
                            {tableColumns.map((column) => (
                                <TableCell className="tableCell" key={column}>
                                    {column}
                                </TableCell>
                            ))}
                        </TableRow>
                    </TableHead>
                    <TableBody>
                        {products?.map((row, id) => (
                            <TableRow key={id}>
                                <TableCell className="tableCell">
                                    {id + 1}
                                </TableCell>
                                <TableCell className="tableCell">
                                    <div className="cellWrapper">
                                        <img
                                            src={row.image}
                                            alt=""
                                            className="image"
                                        />
                                        <Link
                                            to={`/products/${row.productId}`}
                                            className="link"
                                        >
                                            {row.productId}
                                        </Link>
                                    </div>
                                </TableCell>
                                <TableCell className="tableCell">
                                    {row.desc}
                                </TableCell>
                                <TableCell className="tableCell">
                                    {row.price ? row.price : ""}
                                </TableCell>
                                <TableCell className="tableCell">
                                    {row.deposit
                                        ? row.deposit + ".000.000"
                                        : ""}
                                </TableCell>
                                <TableCell className="tableCell">
                                    {dateFormat(row.arrivalDate, "dd-mm-yyyy")}
                                </TableCell>
                                <TableCell className="tableCell">
                                    {row.port}
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

export default Regulartable;
