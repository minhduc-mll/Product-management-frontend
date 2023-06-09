export const formatNumber = (number) => {
    return number.toLocaleString("vn", {
        useGrouping: true,
    });
};
