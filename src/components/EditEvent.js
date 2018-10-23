import React, { Component } from 'react';
import PropTypes from 'prop-types';
import moment from "moment";
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import { Form, Button, Dialog, Input, DateRangePicker } from 'element-react';
import { 
    updateEditEvent
} from '../Store/Actions/_actions';


class EditEvent extends Component {
    constructor(props) {
        super(props);
        console.log(props)
    }

    componentWillReceiveProps(props) {
        this.props =  props;
        console.log(this.props)
    }

    state = {
        form: {
            id: this.props.event.id,
            title: this.props.event.title,
            start: this.props.event.start,
            end: this.props.event.end
        }
    }

    sentForm = () => {
        const { id, title, start, end } = this.state.form;
        if (! title) {
            Notification({
                message: 'Title Required!',
                type: 'warning'
            });
        } else {
            this.props.updateEditEvent({
                id,
                title,
                start: moment(start).format("YYYY-MM-DDThh:mm:ssZ"),
                end:moment(end).format("YYYY-MM-DDThh:mm:ssZ"),
                allDay: false
            })

            this.props.onSave();
        }

    }


    setDateValue = () => {
        return [
            new Date(this.state.form.start),
            new Date(this.state.form.end)
        ]
    }

    render() {
        console.log(this.state);
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

const mapStateToProps = (state) => {
    return {
        event: state.singleEvent,
    }
}

const matchDispatchToProps = (dispatch) => {
    return bindActionCreators({
        updateEditEvent
    }, dispatch);
}

EditEvent.propTypes = {
    onSave: PropTypes.func
}

export default connect(mapStateToProps, matchDispatchToProps)(EditEvent);