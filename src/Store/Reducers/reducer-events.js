import DB from '../../Database/LocalStorage';
import InitialState from './initialState';
import { 
    ADD_DATA,
    FETCH_DATA,
    SINGLE_EVENT_REMOVE,
    SINGLE_EVENT_COPY,
    SINGLE_EVENT_EDIT_UPDATE
} from '../Actions/actionTypes';

const eventReducer = (state = InitialState.events, action) => {
    switch(action.type) {
        default:
            return state;
        case ADD_DATA:
            return action.payload;
        case FETCH_DATA:
            return action.payload;
        case SINGLE_EVENT_REMOVE:
            return action.payload;
        case SINGLE_EVENT_COPY:
            return action.payload;
        case SINGLE_EVENT_EDIT_UPDATE:
            console.log(action.payload, "e")
            return action.payload[1];
    }
}


const fetchData = () => {
    var date = new Date();
    var d = date.getDate();
    var m = date.getMonth();
    var y = date.getFullYear();

    return [
        {
            title: 'All Day Event',
            start: new Date(y, m, 1),
            color: '#ff00ac'
        },
        {
            id: 999,
            title: 'Repeating Event',
            start: new Date(y, m, d-3, 16, 0),
            allDay: false,
            className: 'info'
        },
        {
            id: 999,
            title: 'Repeating Event',
            start: new Date(y, m, d+4, 16, 0),
            allDay: false,
            className: 'info'
        },
        {
            title: 'Meeting',
            start: new Date(y, m, d, 10, 30),
            allDay: false,
            className: 'important'
        },
        {
            title: 'Lunch',
            start: new Date(y, m, d, 12, 0),
            end: new Date(y, m, d, 14, 0),
            allDay: false,
            className: 'important'
        },
        {
            title: 'Birthday Party',
            start: new Date(y, m, d+1, 19, 0),
            end: new Date(y, m, d+1, 22, 30),
            allDay: false,
        },
        {
            title: 'Click for Google',
            start: new Date(y, m, 28),
            end: new Date(y, m, 29),
            url: 'https://ccp.cloudaccess.net/aff.php?aff=5188',
            className: 'success'
        }
    ]
}

export {
    eventReducer
};