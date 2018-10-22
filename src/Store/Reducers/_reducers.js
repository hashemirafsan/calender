import { combineReducers } from 'redux';
import { eventReducer } from './reducer-events';
import { allEvent } from './selector-event';
import { singleEvent } from './single-event';

const allReducer = combineReducers({
    events: eventReducer,
    selectedEvent: allEvent,
    singleEvent: singleEvent
});

export default allReducer; 