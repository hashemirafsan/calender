const selectEvent = (event) => {
    return {
        type: 'EVENT_SELECT',
        payload: event
    }
}

export {
    selectEvent
}