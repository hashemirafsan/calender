/**-------------------------------
 * This Component contain using
 * for single events details 
 * and actions to edit, copy and
 * delete
---------------------------------*/

import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import { Card, Button, Dialog, Notification } from 'element-react';
import { 
    selectEditEvent,
    removeSingleEvent, 
    copySingleEvent 
} from '../Store/Actions/_actions';
import EditEvent from './EditEvent';

class ShowSingleEvent extends Component {
    constructor(props) {
        super(props);
    }

    componentWillReceiveProps(props) {
        this.props = props;
    }

    state = {
        startEdit: this.props.refresh
    }

    // get event from singleEvent or AllEvent
    getEvent = () => {
        return this.props.event || this.props.evento;
    }

    // return in view
    onCancel = () => {
        this.setState({ startEdit: false });
    }

    // when update event to show success notifiction
    onEditSave = () => {
        this.setState({ startEdit: false });

        Notification({
            message: 'Event Updated!',
            type: 'success'
        });
    }

    // Event Show method
    eventShow = (event) => {
        return(
            <Dialog.Body>
                <Card
                    className="box-card"
                    header={
                        <div className="clearfix">
                        <span style={{ "lineHeight": "24px" }}>
                            { event.title }
                        </span>
                        <span style={{ "float": "right" }}>
                            <Button 
                                type="info" 
                                size="small" 
                                icon="edit"
                                onClick={() => {
                                    this.props.selectEditEvent(event);
                                    this.setState({ startEdit: true });
                                    // this.props.onStartEdit(true);
                                }}
                            >Edit</Button>

                            <Button 
                                type="warning" 
                                size="small" 
                                icon="document"
                                onClick={() => {
                                    this.props.copySingleEvent(event);
                                    this.props.onCopy();
                                }}
                            >Copy</Button>

                            <Button 
                                type="danger" 
                                size="small" 
                                icon="delete2"
                                onClick={() => {
                                    this.props.removeSingleEvent(event);
                                    this.props.onSuccess();
                                }}
                            >Remove</Button>
                        </span>
                        </div>
                    }
                >
                    <div className="text item">
                        Start : { event.start }
                    </div>

                    <div className="text item">
                        End : { event.end }
                    </div>

                </Card>
            </Dialog.Body>
        )
    }

    // event edit method
    eventEdit = (event) => {
        return(
            <EditEvent
                onSave={this.onEditSave}
                onCancel={this.onCancel}
            />
        )
    }

    // Logical renderning for showing show or edit component
    eventShowOrEdit = (event) => {
        if (!this.state.startEdit) {
            return this.eventShow(event);
        } else {
            return this.eventEdit(event);
        }
    }

    render() {
        const event = this.getEvent();
        
        return(
            <div>
                { this.eventShowOrEdit(event) }
            </div>
        );
    }
}

// ShowSingleEvent Prop types
ShowSingleEvent.propTypes = {
    evento: PropTypes.object,
    onSuccess: PropTypes.func,
    onCopy: PropTypes.func,
    onStartEdit: PropTypes.func,
    refresh: PropTypes.bool
}

// map store state
const mapStateToProps = (state) => {
    return {
        event: state.singleEvent,
    }
}

// map store actions
const matchDispatchToProps = (dispatch) => {
    return bindActionCreators({
        selectEditEvent,
        copySingleEvent,
        removeSingleEvent
    }, dispatch);
}

export default connect(mapStateToProps, matchDispatchToProps)(ShowSingleEvent);