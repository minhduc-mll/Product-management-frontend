export const formatNumber = (number) => {
    let formatNumber = "";
    let negativeNumber = false;
    if (number < 0) {
        number = -number;
        negativeNumber = true;
    }
    while (number > 0) {
        if (formatNumber) {
            formatNumber = "," + formatNumber;
        }
        let mod = number % 1000;
        if (number > 1000) {
            mod = mod.toString().padStart(3, "0");
        }
        formatNumber = mod + formatNumber;
        number = Math.floor(number / 1000);
    }
    if (negativeNumber) {
        formatNumber = "-" + formatNumber;
    }
    return formatNumber;
};
