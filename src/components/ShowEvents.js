/**-------------------------------
 * This Component contain using 
 * for showing all Event and 
 * adding new data form
---------------------------------*/

import React, { Component } from 'react';
import PropTypes from 'prop-types';
import AllEvents from './AllEvents';
import AddEvent from './AddEvent';
import { Tabs, Notification, Button } from 'element-react';
import ShowSingleEvent from './ShowSingleEvent';

class ShowEvents extends Component {
    constructor(props) {
        super(props);
    }

    componentWillReceiveProps(props) {
        this.props = props;
    }

    state = {
        modeEdit: this.props.showEventMode
    }

    // Show tabs
    showTabs = () => {
        return (
            <Tabs activeName="2">
                <Tabs.Pane label="View Events" name="1">
                    {/* AllEvent Componet */}
                    <AllEvents
                        changeViewMode={this.changeViewMode}
                    />
                </Tabs.Pane>
                <Tabs.Pane label="Add Events" name="2">
                    {/* AddEvent Component */}
                    <AddEvent
                        start={this.props.eventStart}
                        end={this.props.eventEnd}
                        onSave={this.props.eventOnSave}
                        onCancel={this.props.eventOnCancel}
                    />
                </Tabs.Pane>
            </Tabs>

        )
    }

    // Change View Mode
    changeViewMode = (mode) => {
        this.setState({ modeEdit: mode });
    }

    // Refresh events when update and notify
    removeSuccessMessage = () => {
        this.props.refreshEvents();
        this.changeViewMode(false)
        Notification({
            message: 'Event Removed!',
            type: 'success'
        });

    }

    // Logical Rendering
    showTabOrView = () => {
        if (!this.state.modeEdit) {
            return this.showTabs();
        } else {
            return(
                <div>
                    <Button icon="arrow-left" type="primary" size="mini" onClick={() => {
                        this.setState({ modeEdit: false })
                    }}>Back</Button>
                    <ShowSingleEvent
                        onSuccess={this.removeSuccessMessage}
                        onCopy={this.props.onCopy}
                        refresh={this.props.showEventMode}
                    />
                </div>
            )
        }
    }

    render() {
        return(
            <div>
                { this.showTabOrView() }
            </div>
        );
    }
}

// ShowEvents prop types 
ShowEvents.propTypes = {
    eventStart: PropTypes.string,
    eventEnd: PropTypes.string,
    eventOnSave: PropTypes.func,
    eventOnCancel: PropTypes.func,
    refreshEvents: PropTypes.func,
    showEventMode: PropTypes.bool
}

export default ShowEvents;