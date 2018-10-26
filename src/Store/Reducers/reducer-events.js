import InitialState from './initialState';
import { 
    ADD_DATA,
    FETCH_DATA,
    SINGLE_EVENT_REMOVE,
    SINGLE_EVENT_COPY,
    SINGLE_EVENT_EDIT_UPDATE
} from '../Actions/actionTypes';

/**
 * set state for specific action type
 * @param {*} state 
 * @param {*} action 
 */
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
            return action.payload[1];
    }
}

export {
    eventReducer
};