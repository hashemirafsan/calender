import { 
    SINGLE_EVENT_FETCH,
    SINGLE_EVENT_REMOVE,
    SINGLE_EVENT_COPY
} from './actionTypes';

const uuid4 = require('uuid/v4');

const fetchSingleEvent = (event) => {
    return {
        type: SINGLE_EVENT_FETCH,
        payload: event
    }
}

const copySingleEvent = ({ id, title, start, end, allDay }) => {
    let events = JSON.parse(localStorage.getItem('joom_event'));
    events.push({
        id: uuid4(), title, start, end, allDay
    })
    localStorage.setItem('joom_event', JSON.stringify(events));

    return {
        type: SINGLE_EVENT_COPY,
        payload: events
    }
}

const removeSingleEvent = ({ id }) => {
    const events = JSON.parse(localStorage.getItem('joom_event')).filter((e) => {
        return e.id !== id;
    });
    localStorage.setItem('joom_event', JSON.stringify(events));

    return {
        type: SINGLE_EVENT_REMOVE,
        payload: events
    }
}


export {
    fetchSingleEvent,
    removeSingleEvent,
    copySingleEvent
}