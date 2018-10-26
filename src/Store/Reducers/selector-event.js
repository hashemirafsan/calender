import { SELECT_DATE_FETCH } from '../Actions/actionTypes';

import InitialState from './initialState';

/**
 * set data for specific action type
 * @param {*} state 
 * @param {*} action 
 */
const allEvent = (state = InitialState.selectedEvent, action) => {
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