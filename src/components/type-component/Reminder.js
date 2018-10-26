/**-------------------------------
 * This Component contain using 
 * for form Reminder data input
---------------------------------*/

import React, { Component } from 'react';
import PropTypes  from 'prop-types';
import { Form, Input} from 'element-react';

class Reminder extends Component {
    
    constructor(props) {
        super(props);
    }

    componentWillReceiveProps(props) {
        this.props = props;
        // when work is done refresh the state
        if (this.props.onClear) {
            this.setState({ reminder: "" });
        }
    }

    state = {
        reminder: this.props.reminder
    }

    // set description through input event
    setDescription = (e) => {
        this.props.addComposeType('reminder', e)
        this.setState({ reminder: e })
    }

    render() {
        return (
            <div>
                <Form.Item label="Remind for">
                    <Input 
                        placeholder="example: Today Emon's birthday"
                        value={this.state.reminder}
                        onChange={(e) => {
                            this.setDescription(e);
                        }}
                    />
                </Form.Item>
            </div>
        );
    }
}

// Reminder Prop Types
Reminder.propTypes = {
    mode: PropTypes.string.isRequired,
    reminder: PropTypes.string,
    addComposeType: PropTypes.func,
    onClear: PropTypes.bool
}

// Reminder Default Props
Reminder.defaultProps = {
    mode: "add",
    reminder: ""
}

export default Reminder;