import { useMemo } from "react";

export const DOTS = "...";

const range = (start, end) => {
    let length = end - start + 1;
    return Array.from({ length }, (_, index) => index + start);
};

export const usePagination = ({
    totalCount,
    pageSize,
    siblingCount = 1,
    currentPage,
}) => {
    const paginationRange = useMemo(() => {
        const totalPageCount = Math.ceil(totalCount / pageSize);

        // Pages count is determined as 2*siblingCount + firstPage + lastPage + currentPage
        const minPageNumbers = 2 * siblingCount + 3;

        /*
            If the number of pages is less than the page numbers we want to show in our
            paginationComponent, we return the range [1..totalPageCount]
        */
        if (minPageNumbers >= totalPageCount) {
            return range(1, totalPageCount);
        }

        const firstPageIndex = 1;
        const lastPageIndex = totalPageCount;

        const leftSiblingIndex = Math.max(
            currentPage - siblingCount,
            firstPageIndex
        );
        const rightSiblingIndex = Math.min(
            currentPage + siblingCount,
            lastPageIndex
        );

        /*
            We do not want to show dots if there is only one position left 
            after/before the left/right page count as that would lead to a change if our
            Pagination component size which we do not want
        */
        const shouldShowLeftDots = leftSiblingIndex > firstPageIndex + 1;
        const shouldShowRightDots = rightSiblingIndex < lastPageIndex - 1;

        if (!shouldShowLeftDots && !shouldShowRightDots) {
            return [firstPageIndex, lastPageIndex];
        }

        if (!shouldShowLeftDots && shouldShowRightDots) {
            let leftItemCount = Math.max(
                currentPage + siblingCount,
                firstPageIndex
            );
            let leftRange = range(firstPageIndex, leftItemCount);

            return [...leftRange, DOTS, totalPageCount];
        }

        if (shouldShowLeftDots && !shouldShowRightDots) {
            let rightItemCount = Math.min(
                currentPage - siblingCount,
                lastPageIndex
            );
            let rightRange = range(rightItemCount, lastPageIndex);
            return [firstPageIndex, DOTS, ...rightRange];
        }

        if (shouldShowLeftDots && shouldShowRightDots) {
            let middleRange = range(leftSiblingIndex, rightSiblingIndex);
            return [firstPageIndex, DOTS, ...middleRange, DOTS, lastPageIndex];
        }
    }, [totalCount, pageSize, siblingCount, currentPage]);

    return paginationRange;
};
