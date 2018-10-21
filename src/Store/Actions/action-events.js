const selectEvent = (event) => {
    console.log(event)
    return {
        type: 'EVENT_SELECT',
        payload: event
    }
}

export {
    selectEvent
}