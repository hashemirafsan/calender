/**-------------------------------
 * This Component contain using 
 * for form Tasks data input
---------------------------------*/

import React, { Component } from 'react';
import PropTypes  from 'prop-types';
import { Form, Input} from 'element-react';

class TaskType extends Component {
    
    constructor(props) {
        super(props);
    }

    componentWillReceiveProps(props) {
        this.props = props;
        // when work is done refresh the state
        if (this.props.onClear) {
            this.setState({ tasks: "" })
        }
    }

    state = {
        tasks: this.props.tasks
    }

    // set description through input event
    setDescription = (e) => {
        this.props.addComposeType('tasks', e)
        this.setState({ tasks: e })
    }

    render() {
        return (
            <div>
                <Form.Item label="Description">
                    <Input 
                        type="textarea"
                        autosize={true}
                        placeholder="Description"
                        value={this.state.tasks}
                        onChange={(e) => {
                            this.setDescription(e);
                        }}
                    />
                </Form.Item>
            </div>
        );
    }
}

// Tasks Props types
TaskType.propTypes = {
    mode: PropTypes.string.isRequired,
    tasks: PropTypes.string,
    addComposeType: PropTypes.func,
    onClear: PropTypes.bool
}

// Task Default Props
TaskType.defaultProps = {
    mode: "add",
    tasks: ""
}

export default TaskType;