import {
    SELECT_DATE_FETCH
} from './actionTypes';

import {
    dateRange,
    monthDateRange
} from '../../Helpers/date';

/**
 * this method fetch data 
 * by this @param
 * @param {*} start 
 * @param {*} end 
 * @param {*} view 
 * 
 * @return type, payload
 */
const getEventByDate = (start, end, view) => {
    let events = JSON.parse(localStorage.getItem('joom_event')) || [];
    let [limitStart, limitEnd] = view === "month" ? monthDateRange(start, end) : dateRange(start, end); 
    let allEvent = events.filter((eve) => {
        let s = new Date(eve.start).getTime();
        let e = new Date(eve.end).getTime();
        console.log(s, e)
        return s >= limitStart && e <= limitEnd;
    });

    return {
        type: SELECT_DATE_FETCH,
        payload: allEvent
    }
}

export {
    getEventByDate
}