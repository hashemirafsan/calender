import InitialState from './initialState';

import { 
    SINGLE_EVENT_FETCH,
    SINGLE_EVENT_REMOVE,
    SINGLE_EVENT_EDIT_SELECT,
    SINGLE_EVENT_EDIT_UPDATE
} from '../Actions/actionTypes';

/**
 * set state for specific action type
 * @param {*} state 
 * @param {*} action 
 */
const singleEvent = (state = InitialState.singleEvent, action) => {
    switch(action.type) {
        default:
            return state;
        case SINGLE_EVENT_FETCH:
            return action.payload;
        case SINGLE_EVENT_REMOVE:
            return state;
        case SINGLE_EVENT_EDIT_SELECT:
            return action.payload;
        case SINGLE_EVENT_EDIT_UPDATE:
            return action.payload[0];
    }
}

export {
    singleEvent
}