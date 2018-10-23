import { 
    SINGLE_EVENT_FETCH,
    SINGLE_EVENT_REMOVE,
    SINGLE_EVENT_COPY,
    SINGLE_EVENT_EDIT_SELECT,
    SINGLE_EVENT_EDIT_UPDATE
} from './actionTypes';

const uuid4 = require('uuid/v4');

const fetchSingleEvent = (event) => {
    let events = JSON.parse(localStorage.getItem('joom_event'));
    const [ firstEvent ] = events.filter(e => e.id === event.id);
    return {
        type: SINGLE_EVENT_FETCH,
        payload: firstEvent
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

const selectEditEvent = (event) => {
    return {
        type: SINGLE_EVENT_EDIT_SELECT,
        payload: event
    }
}

const updateEditEvent = (event) => {
    let events = JSON.parse(localStorage.getItem('joom_event')).filter(e => e.id !== event.id);
    events.push(event);
    localStorage.setItem('joom_event', JSON.stringify(events));

    return {
        type: SINGLE_EVENT_EDIT_UPDATE,
        payload: [event, events]
    }
}

export {
    fetchSingleEvent,
    removeSingleEvent,
    copySingleEvent,
    selectEditEvent,
    updateEditEvent
}