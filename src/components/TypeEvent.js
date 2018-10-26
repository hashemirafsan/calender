/**-------------------------------
 * This Component contain using 
 * for form event data input
---------------------------------*/

import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { Radio } from 'element-react';
import EventType from './type-component/Event';
import MeetingType from './type-component/Meeting';
import ReminderType from './type-component/Reminder';
import TaskType from './type-component/Tasks';


class TypeEvent extends Component {

    constructor(props) {
        super(props);
    }

    componentWillReceiveProps(props) {
        this.props = props;
    }

    state = {
        type: this.props.type,
        data: this.props.data
    }

    // using for sent type and type data to store in immidiate parent
    sentData = () => {
        this.props.composedTypeData(this.state.type, this.state.data);
    }

    // Composing data to state by key and value
    composeTypeData = (key, value) => {
        let state = { ...this.state }
        state.data[key] = value;
        this.setState({ state });
        this.sentData();
    }

    // Logical Rendering for which type and mode is selected
    showSelectedType = () => {
        if (this.state.type === "Event" && this.props.mode === "add") {
            return (
                <EventType
                    mode={this.props.mode}
                    addComposeType={this.composeTypeData}
                    onClear={this.props.onClear}
                />
            );
        } else if (this.state.type === "Event" && this.props.mode === "edit") {
            return (
                <EventType
                    mode={this.props.mode}
                    event={this.state.data['event']}
                    addComposeType={this.composeTypeData}
                    onClear={this.props.onClear}
                />
            );
        }

        if (this.state.type === "Meeting" && this.props.mode === "add") {
            return(
                <MeetingType
                    mode={this.props.mode}
                    addComposeType={this.composeTypeData}
                    onClear={this.props.onClear}
                />
            );
        } else if (this.state.type === "Meeting" && this.props.mode === "edit") {
            return(
                <MeetingType
                    mode={this.props.mode}
                    meeting={this.state.data['meeting']}
                    addComposeType={this.composeTypeData}
                    onClear={this.props.onClear}
                />
            );
        }

        if (this.state.type === "Reminder" && this.props.mode === "add") {
            return (
                <ReminderType
                    mode={this.props.mode}
                    addComposeType={this.composeTypeData}
                    onClear={this.props.onClear}
                />
            );
        } else if (this.state.type === "Reminder" && this.props.mode === "edit") {
            return (
                <ReminderType
                    mode={this.props.mode}
                    reminder={this.state.data['reminder']}
                    addComposeType={this.composeTypeData}
                    onClear={this.props.onClear}
                />
            );
        }

        if (this.state.type === "Tasks" && this.props.mode === "add") {
            return(
                <TaskType
                    mode={this.props.mode}
                    addComposeType={this.composeTypeData}
                    onClear={this.props.onClear}
                />
            )
        } else if (this.state.type === "Tasks" && this.props.mode === "edit") {
            return(
                <TaskType
                    mode={this.props.mode}
                    tasks={this.state.data['tasks']}
                    addComposeType={this.composeTypeData}
                    onClear={this.props.onClear}
                />
            )
        }

    }

    // Radio button for select type and load component
    eventType = () => {
        return (
            <div>
                <Radio.Group 
                value={this.state.type} 
                onChange={(e) => {
                    this.setState({ type: e })
                    this.sentData();
                }}>
                    <Radio.Button value="Event" label="Event"/>
                    <Radio.Button value="Meeting" label="Meeting"/>
                    <Radio.Button value="Reminder" label="Reminder"/>
                    <Radio.Button value="Tasks" label="tasks"/>
                </Radio.Group>

                { this.showSelectedType() }
            </div>
        )
    }
    // mode wise event show
    modeWiseEventShow = () => {
        return this.eventType();
    }

    render() {
        return(
            <div>
                { this.modeWiseEventShow() }
            </div>
        );
    }

}

// TypeEvent prop types
TypeEvent.propTypes = {
    mode: PropTypes.string.isRequired,
    type: PropTypes.string.isRequired,
    composedTypeData: PropTypes.func,
    data: PropTypes.object,
    onClear: PropTypes.bool
}

// TypeEvent default props
TypeEvent.defaultProps = {
    mode: "add",
    type: "Event",
    data: {},
    onClear: false
}

export default TypeEvent;