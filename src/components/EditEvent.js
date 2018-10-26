/**-------------------------------
 * This Component contain using 
 * for edit specific event
---------------------------------*/

import React, { Component } from 'react';
import PropTypes from 'prop-types';
import moment from "moment";
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import { Form, Button, Dialog, Input, DateRangePicker } from 'element-react';
import { 
    updateEditEvent
} from '../Store/Actions/_actions';
import TypeEvent from './TypeEvent';


class EditEvent extends Component {
    constructor(props) {
        super(props);
    }

    componentWillReceiveProps(props) {
        this.props =  props;
    }

    state = {
        clear: false,
        form: {
            id: this.props.event.id,
            title: this.props.event.title,
            start: this.props.event.start,
            end: this.props.event.end,
            type: this.props.event.type,
            data: this.props.event.data
        }
    }

    /** 
     * When Different Type of data coming from
     * Child Form '/type-component/' it update
     * the data in state
     */
    eventTypeCompose = (type, data) => {
        let state = { ...this.state };
        state.form.type = type;
        state.form.data = data;
        this.setState({ state });
    }

    // change data clear 
    clearToFalse = () => {
        this.setState({ clear: true });


        setTimeout(() => {
            this.setState({ clear: false });
        }, 2000);
    }

    /**
     * send the data to main
     * Calender Component to
     * Store in that state 
     */
    sentForm = () => {
        const { id, title, start, end, type, data } = this.state.form;
        if (! title && !type) {
            // Notify if title and types are empty
            Notification({
                message: 'Title, Types Required!',
                type: 'warning'
            });
        } else {
            // send to parent component            
            this.props.updateEditEvent({
                id,
                title,
                start: moment(start).format("YYYY-MM-DDThh:mm:ssZ"),
                end:moment(end).format("YYYY-MM-DDThh:mm:ssZ"),
                allDay: false,
                type, data
            })
            // back to main view
            this.props.onSave();

            this.clearToFalse();

        }

    }

    /**
     * Set Date value modified to use
     * DateRangePicker Component 
     * Default Value when Component
     * Initiate
     */
    setDateValue = () => {
        return [
            new Date(this.state.form.start),
            new Date(this.state.form.end)
        ]
    }

    render() {
        return(
            <div>
                <Dialog.Body>
                    <Form className="en-US" model={this.state.form}>
                        <Form.Item label="Title">
                            <Input 
                                value={this.state.form.title}
                                onChange={
                                    (e) => {
                                        let state= { ...this.state }
                                        state.form.title = e;
                                        this.setState({ state })
                                    }
                                }
                            />
                        </Form.Item>
                        
                        <TypeEvent
                            mode="edit"
                            type={this.state.form.type}
                            data={this.state.form.data}
                            composedTypeData={this.eventTypeCompose}
                            onClear={this.state.clear}
                        />

                        <Form.Item label="Duration">
                            <DateRangePicker
                                isShowTime={true}
                                value={this.setDateValue()}
                                placeholder="Pick a range"
                                onChange={date=>{
                                    const [ start, end ] = date;
                                    let state= { ...this.state }
                                    state.form.start = start;
                                    state.form.end = end;
                                    this.setState({ state })
                                }}
                            />

                        </Form.Item>
                    </Form>
                </Dialog.Body>
                <Dialog.Footer className="dialog-footer">

                    <Button onClick={ () => {
                        this.props.onCancel();
                    } }>Cancel</Button>

                    <Button 
                        type="primary" 
                        onClick={ () => {
                            this.sentForm()
                        } }>Confirm</Button>
                </Dialog.Footer>
            </div>
        );
    }
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
        updateEditEvent
    }, dispatch);
}

// EditEvent Prop Types
EditEvent.propTypes = {
    onSave: PropTypes.func,
    onCancel: PropTypes.func
}

export default connect(mapStateToProps, matchDispatchToProps)(EditEvent);