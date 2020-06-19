export const getMonthFromDate = (date) => {
    return new Date(date).getMonth() + 1;
}

export const getDayOfMonthFromDate = (date) => {
    return new Date(date).getDate();
}

export const getDayFromNow = (day) => {
    return new Date().getDate() + day;
}