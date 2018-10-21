import moment from 'moment';

const monthDateRange = (start, end) => {
    const startTime = "00:00:00";
    const endTime = "23:59:59";
    let setStart = moment(start).format("YYYY-MM-DD");
    let setEnd = moment(end).subtract(1, "days").format("YYYY-MM-DD");
    setStart = moment(`${setStart} ${startTime}`).unix();
    setEnd = moment(`${setEnd} ${endTime}`).unix();
    return [setStart * 1000, setEnd * 1000];
}

const dateRange = (start, end ) => {
    start = new Date(start).getTime();
    end = new Date(end).getTime();
    return [start, end];
}

export {
    dateRange,
    monthDateRange
}