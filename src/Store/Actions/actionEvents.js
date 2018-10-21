import {
    ADD_DATA,
    FETCH_DATA
} from './actionTypes';

const addEvent = (event) => {
    let events = JSON.parse(localStorage.getItem('joom_event')) || [];
    events.push(event);
    localStorage.setItem('joom_event', JSON.stringify(events));
    return {
        type: ADD_DATA,
        payload: events
    }
}

const fetchEvents = () => {
    const getEvent = JSON.parse(localStorage.getItem('joom_event'));
    console.log(getEvent)
    return {
        type: FETCH_DATA,
        payload: getEvent
    }
}

export { 
    addEvent,
    fetchEvents
}