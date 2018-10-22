import { 
    SINGLE_EVENT_FETCH
} from './actionTypes';


const fetchSingleEvent = (data) => {
    return {
        type: SINGLE_EVENT_FETCH,
        payload: data
    }
}

export {
    fetchSingleEvent
}