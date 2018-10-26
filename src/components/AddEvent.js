/**-------------------------------
 * This Component using for 
 * add event
---------------------------------*/

import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { 
    Form, 
    Input, 
    Dialog, 
    DateRangePicker, 
    Button,
    Notification 
} from 'element-react';
import moment from 'moment';
import TypeEvent from './TypeEvent';

const uuidv4 = require('uuid/v4');


class AddEvent extends Component {
    constructor(props) {
        super(props);
    }

    state = {
        clear: false,
        form: {
            title: "",
            start: this.props.start,
            end: this.props.end,
            type: "",
            data: null
        }
    }

    componentWillReceiveProps(props) {
        this.props = props;
        // set date in form when props again updated
        this.setFormDate();
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

    // set date in form when props again updated
    setFormDate = () => {
        const state = { ...this.state };
        state.form.start = this.props.start;
        state.form.end = this.props.end;
        this.setState({ state }); 
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
        const { title, start, end, type, data } = this.state.form;
        const id = uuidv4();
        if (! title && !type) {
            // Notify if title and types are empty
            Notification({
                message: 'Title, Types Required!',
                type: 'warning'
            });
            return;
        } 
        
        if (!data || ! data.hasOwnProperty(type.toLowerCase())) {
            Notification({
                message: 'Description Required!',
                type: 'warning'
            });
            return;
        } else {
            // send to parent component
            this.props.onSave(
                id,
                title,
                start,
                end,
                // moment(start).format("YYYY-MM-DDThh:mm:ssZ"),
                // moment(end).format("YYYY-MM-DDThh:mm:ssZ"),
                false,
                type,
                data
            )
            
            // update state
            const state = { ...this.state };
            state.form.title = "";
            state.form.data = null;
            state.form.type = "";

            this.setState({ state });
            
            // call clear
            this.clearToFalse();
        }

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
                            mode="add"
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
                        let state= { ...this.state }
                        state.form.title = "";
                        this.setState({ state });
                        this.props.onCancel();
                        this.clearToFalse();
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

// AddEvent Prop Types
AddEvent.propTypes = {
    start: PropTypes.string,
    end: PropTypes.string,
    onSave: PropTypes.func,
    onCancel: PropTypes.func
}

export default AddEvent;