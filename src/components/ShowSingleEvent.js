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
        startEdit: false
    }

    getEvent = () => {
        return this.props.event || this.props.evento;
    }

    onEditSave = () => {
        this.setState({ startEdit: false });

        Notification({
            message: 'Event Updated!',
            type: 'success'
        });
    }

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

    eventEdit = (event) => {
        return(
            <EditEvent
                onSave={this.onEditSave}
            />
        )
    }

    eventShowOrEdit = (event) => {
        if (!this.state.startEdit) {
            return this.eventShow(event);
            console.log("why")
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

ShowSingleEvent.propTypes = {
    evento: PropTypes.object,
    onSuccess: PropTypes.func,
    onCopy: PropTypes.func,
    onStartEdit: PropTypes.func
}

const mapStateToProps = (state) => {
    return {
        event: state.singleEvent,
    }
}

const matchDispatchToProps = (dispatch) => {
    return bindActionCreators({
        selectEditEvent,
        copySingleEvent,
        removeSingleEvent
    }, dispatch);
}

export default connect(mapStateToProps, matchDispatchToProps)(ShowSingleEvent);