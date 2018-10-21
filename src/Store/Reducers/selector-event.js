import { SELECT_DATE_FETCH } from '../Actions/actionTypes';

import InitialState from './initialState';

const allEvent = (state = InitialState.selectedEvent, action) => {
    console.log(action)
    switch(action.type) {
        default: 
            return state;
        case SELECT_DATE_FETCH:
            return Array.isArray(action.payload) ? action.payload: [action.payload] ;
    }
}

export {
    allEvent
};