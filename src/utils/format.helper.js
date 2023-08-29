import dateFormat from "dateformat";

export const formatNumber = (number) => {
    return number.toLocaleString("vn", {
        useGrouping: true,
    });
};

export const formatDate = (date) => {
    return dateFormat(date, "yyyy-mm-dd");
};
