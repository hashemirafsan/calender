import {
    SELECT_DATE_FETCH
} from './actionTypes';

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
    let allEvent = events.filter((eve) => {
        let s = new Date(eve.start).getTime();
        let e = new Date(eve.end).getTime();
        return s >= new Date(start).getTime() && e <= new Date(end).getTime();
    });

    return {
        type: SELECT_DATE_FETCH,
        payload: allEvent
    }
}

export {
    getEventByDate
}