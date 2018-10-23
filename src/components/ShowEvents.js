import React, { Component } from 'react';
import PropTypes from 'prop-types';
import AllEvents from './AllEvents';
import AddEvent from './AddEvent';
import { Tabs, Notification } from 'element-react';
import ShowSingleEvent from './ShowSingleEvent';

class ShowEvents extends Component {
    constructor(props) {
        super(props);
    }

    componentWillReceiveProps(props) {
        this.props = props;
    }

    state = {
        modeEdit: false
    }

    showTabs = () => {
        return (
            <Tabs activeName="2">
                <Tabs.Pane label="View Events" name="1">
                    <AllEvents
                        changeViewMode={this.changeViewMode}
                    />
                </Tabs.Pane>
                <Tabs.Pane label="Add Events" name="2">
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

    changeViewMode = (mode) => {
        this.setState({ modeEdit: mode });
    }

    removeSuccessMessage = () => {
        this.props.refreshEvents();
        this.changeViewMode(false)
        Notification({
            message: 'Event Removed!',
            type: 'success'
        });

    }

    showTabOrView = () => {
        if (!this.state.modeEdit) {
            return this.showTabs();
        } else {
            return(
                <ShowSingleEvent
                    onSuccess={this.removeSuccessMessage}
                    onCopy={this.props.onCopy}
                />
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

ShowEvents.propTypes = {
    eventStart: PropTypes.string,
    eventEnd: PropTypes.string,
    eventOnSave: PropTypes.func,
    eventOnCancel: PropTypes.func,
    refreshEvents: PropTypes.func
}

export default ShowEvents;