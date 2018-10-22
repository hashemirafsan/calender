import InitialState from './initialState';

import { 
    SINGLE_EVENT_FETCH
} from '../Actions/actionTypes';

const singleEvent = (state = InitialState.singleEvent, action) => {
    switch(action.type) {
        default:
            return state;
        case SINGLE_EVENT_FETCH:
            return action.payload;
    }
}

export {
    singleEvent
}