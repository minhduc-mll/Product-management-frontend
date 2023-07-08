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
import { useState } from "react";
import { Link } from "react-router-dom";
import dateFormat from "dateformat";
import Pagination from "components/pagination/Pagination";

const tableColumns = [
    "",
    "Cont",
    "Loại hàng",
    "Giá bán",
    "Ngày về",
    "Cảng",
    "Giấy tờ",
    "Trạng thái",
];

const Regulartable = ({ title, products, pageSize = 15 }) => {
    const [currentPage, setCurrentPage] = useState(1);

    return (
        <div className="regulartable">
            <h1 className="title">{title}</h1>
            <TableContainer component={Paper} className="tableContainer">
                <Table aria-label="simple table">
                    <TableHead>
                        <TableRow>
                            {tableColumns?.map((column) => (
                                <TableCell className="tableCell" key={column}>
                                    {column}
                                </TableCell>
                            ))}
                        </TableRow>
                    </TableHead>
                    <TableBody>
                        {products?.map((row, id) => {
                            if (
                                id >= (currentPage - 1) * pageSize &&
                                id < currentPage * pageSize
                            ) {
                                return (
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
                                            {row.price}
                                        </TableCell>
                                        <TableCell className="tableCell">
                                            {row.arrivalDate &&
                                                dateFormat(
                                                    row.arrivalDate,
                                                    "dd-mm-yyyy"
                                                )}
                                        </TableCell>
                                        <TableCell className="tableCell">
                                            {row.port}
                                        </TableCell>
                                        <TableCell className="tableCell">
                                            {row.documents}
                                        </TableCell>
                                        <TableCell className="tableCell">
                                            <span
                                                className={`status ${row.status}`}
                                            >
                                                {row.status}
                                            </span>
                                        </TableCell>
                                    </TableRow>
                                );
                            }
                            return null;
                        })}
                    </TableBody>
                </Table>
                <div className="tableCell">
                    <Pagination
                        currentPage={currentPage}
                        totalCount={products?.length}
                        pageSize={pageSize}
                        onPageChange={(page) => {
                            setCurrentPage(page);
                        }}
                    />
                </div>
            </TableContainer>
        </div>
    );
};

export default Regulartable;
