import React, { Component } from 'react';
import PropTypes from 'prop-types';
import AllEvents from './AllEvents';
import AddEvent from './AddEvent';
import { Tabs } from 'element-react';

class ShowEvents extends Component {
    constructor(props) {
        super(props);
    }

    componentWillReceiveProps(props) {
        this.props = props;
        console.log(props)
    }

    render() {
        return(
            <div>
                <Tabs activeName="2">
                    <Tabs.Pane label="View Events" name="1">
                        <AllEvents/>
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
            </div>
        );
    }
}

ShowEvents.propTypes = {
    eventStart: PropTypes.string,
    eventEnd: PropTypes.string,
    eventOnSave: PropTypes.func,
    eventOnCancel: PropTypes.func
}

export default ShowEvents;