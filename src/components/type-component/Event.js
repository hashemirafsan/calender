/**-------------------------------
 * This Component contain using 
 * for form event data input
---------------------------------*/

import React, { Component } from 'react';
import PropTypes  from 'prop-types';
import { Form, Input} from 'element-react';

class EventType extends Component {
    
    constructor(props) {
        super(props);
    }

    componentWillReceiveProps(props) {
        this.props = props;
        // when work is done refresh the state
        if (this.props.onClear) {
            this.setState({ event: "" })
        }
    }

    state = {
        event: this.props.event
    }

    // set description through input event
    setDescription = (e) => {
        this.props.addComposeType('event', e)
        this.setState({ event: e })
    }

    render() {
        return (
            <div>
                <Form.Item label="Description">
                    <Input 
                        type="textarea"
                        autosize={true}
                        placeholder="Description"
                        value={this.state.event}
                        onChange={(e) => {
                            this.setDescription(e);
                        }}
                    />
                </Form.Item>
            </div>
        );
    }
}

// EventType Proptypes assignd
EventType.propTypes = {
    mode: PropTypes.string.isRequired,
    event: PropTypes.string,
    addComposeType: PropTypes.func,
    onClear: PropTypes.bool
}

// EventType Default props set here
EventType.defaultProps = {
    mode: "add",
    event: ""
}

export default EventType;