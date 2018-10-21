import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { Form, Input, Dialog, DateRangePicker, Button, Notification } from 'element-react';
import moment from 'moment';
const uuidv4 = require('uuid/v4');

class AddEvent extends Component {
    constructor(props) {
        super(props);
    }

    state = {
        form: {
            title: "",
            start: this.props.start,
            end: this.props.end,
        }
    }

    componentWillReceiveProps(props) {
        this.props = props;
        this.setFormDate();
    }

    setFormDate = () => {
        const state = { ...this.state };
        state.form.start = this.props.start;
        state.form.end = this.props.end;
        this.setState({ state }); 
    }

    setDateValue = () => {
        return [
            new Date(this.state.form.start),
            new Date(this.state.form.end)
        ]
    }

    sentForm = () => {
        const { title, start, end } = this.state.form;
        const id = uuidv4();
        if (! title) {
            Notification({
                message: 'Title Required!',
                type: 'warning'
            });
        } else {
            this.props.onSave(
                id,
                title,
                moment(start).format("YYYY-MM-DDThh:mm:ssZ"),
                moment(end).format("YYYY-MM-DDThh:mm:ssZ"),
                false
            )
        }

    }

    render() {
        console.log(this.state.form.value)
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

                        <Form.Item label="Duration">
                            <DateRangePicker
                                isShowTime={true}
                                value={this.setDateValue()}
                                placeholder="Pick a range"
                                onChange={date=>{
                                    console.log('DateRangePicker1 changed: ', date)
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

AddEvent.propTypes = {
    start: PropTypes.string,
    end: PropTypes.string,
    onSave: PropTypes.func,
    onCancel: PropTypes.func
}

export default AddEvent;