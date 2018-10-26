/**-------------------------------
 * This Component contain using 
 * for form Meeting data input
---------------------------------*/

import React, { Component } from 'react';
import PropTypes  from 'prop-types';
import { Form, Input} from 'element-react';

class Meeting extends Component {
    
    constructor(props) {
        super(props);
    }

    componentWillReceiveProps(props) {
        this.props = props;
        // when work is done refresh the state
        if (this.props.onClear) {
            this.setState({ meeting: "" })
        }
    }

    state = {
        meeting: this.props.meeting
    }

    // set description through input event
    setDescription = (e) => {
        this.props.addComposeType('meeting', e)
        this.setState({ meeting: e })
    }

    render() {
        return (
            <div>
                <Form.Item label="Meeting with">
                    <Input 
                        placeholder="@Hashemi"
                        value={this.state.meeting}
                        onChange={(e) => {
                            this.setDescription(e);
                        }}
                    />
                </Form.Item>
            </div>
        );
    }
}

// Meeting Prop types 
Meeting.propTypes = {
    mode: PropTypes.string.isRequired,
    meeting: PropTypes.string,
    addComposeType: PropTypes.func,
    onClear: PropTypes.bool
}

// Meeting Default Props
Meeting.defaultProps = {
    mode: "add",
    meeting: ""
}

export default Meeting;