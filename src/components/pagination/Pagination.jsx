import "./pagination.scss";
import {
    KeyboardArrowLeftOutlined,
    KeyboardArrowRightOutlined,
} from "@mui/icons-material";
import { DOTS, usePagination } from "utils/usePagination";
import classnames from "classnames";

const Pagination = (props) => {
    const {
        currentPage,
        totalCount,
        siblingCount = 1,
        pageSize,
        onPageChange,
    } = props;

    const paginationRange = usePagination({
        currentPage,
        totalCount,
        siblingCount,
        pageSize,
    });

    if (!paginationRange || paginationRange?.length < 1) {
        return null;
    }

    const onNext = () => {
        onPageChange(currentPage + 1);
    };

    const onPrevious = () => {
        onPageChange(currentPage - 1);
    };

    let firstPage = paginationRange[0];
    let lastPage = paginationRange[paginationRange?.length - 1];

    return (
        <div className="pagination">
            <ul className="pagination-container">
                <li
                    className={classnames("pagination-item", "left", {
                        disabled: currentPage <= firstPage,
                    })}
                    onClick={onPrevious}
                >
                    <KeyboardArrowLeftOutlined className="icon" />
                </li>
                {paginationRange.map((pageNumber, index) => {
                    if (pageNumber === DOTS) {
                        return (
                            <li className="pagination-item dots" key={index}>
                                ...
                            </li>
                        );
                    }

                    return (
                        <li
                            className={classnames("pagination-item", {
                                selected: pageNumber === currentPage,
                            })}
                            onClick={() => onPageChange(pageNumber)}
                            key={index}
                        >
                            {pageNumber}
                        </li>
                    );
                })}
                <li
                    className={classnames("pagination-item", "right", {
                        disabled: currentPage >= lastPage,
                    })}
                    onClick={onNext}
                >
                    <KeyboardArrowRightOutlined className="icon" />
                </li>
            </ul>
        </div>
    );
};

export default Pagination;
