import {
    ADD_DATA,
    FETCH_DATA
} from './actionTypes';

/**
 * this method add event
 * on LocalStorage
 * @param {Object} event
 * @return type, payload 
 */
const addEvent = (event) => {
    let events = JSON.parse(localStorage.getItem('joom_event')) || [];
    events.push(event);
    localStorage.setItem('joom_event', JSON.stringify(events));
    return {
        type: ADD_DATA,
        payload: events
    }
}

/**
 * this method fetch all events from 
 * localstorage
 * @return type, payload
 */
const fetchEvents = () => {
    const getEvent = JSON.parse(localStorage.getItem('joom_event'));
    return {
        type: FETCH_DATA,
        payload: getEvent
    }
}

export { 
    addEvent,
    fetchEvents
}