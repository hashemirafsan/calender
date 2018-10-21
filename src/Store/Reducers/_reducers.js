import { combineReducers } from 'redux';
import { eventReducer } from './reducer-events';
import { allEvent } from './selector-event';

const allReducer = combineReducers({
    events: eventReducer,
    selectedEvent: allEvent
});

export default allReducer; 