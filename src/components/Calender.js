import React, { Component } from 'react';
import './css/calender.css';
import { Dialog, Button, Notification } from 'element-react';
import AddIcon from '@material-ui/icons/Add';
import { withStyles } from '@material-ui/core/styles';
import FabButton from '@material-ui/core/Button'
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import { selectEvent } from '../Store/Actions/action-events';
import { 
    fetchEvents, 
    addEvent, 
    getEventByDate,
    fetchSingleEvent
} from '../Store/Actions/_actions';
import AddEvent from './AddEvent';
import moment from 'moment';
import ShowEvents from './ShowEvents';
import ShowSingleEvent from './ShowSingleEvent';

const $ = window.$;
const timezone = "+06:00";
const styles = theme => ({
    fab: {
      position: 'absolute',
      bottom: theme.spacing.unit * 2,
      right: theme.spacing.unit * 2,
    }
});

class Calender extends Component {
    constructor(props) {
        super(props);
        this.props.fetchEvents();
        console.log(props);
    }

    state = {
        dialogVisible: false,
        addNewDialogVisible: false,
        eventDialogVisible: false,
        singleEventDialogVisible: false,
        startDate: String(new Date()),
        endDate: String(new Date())
    }

    componentWillReceiveProps(props) {
        this.props = props;
        $("#calender").fullCalendar('removeEvents'); 
        $("#calender").fullCalendar('addEventSource', this.props.events);
        
    }

    initCalender = () => {
        const { events } = this.props;
        if (events) {
            $('#calender').fullCalendar({
                header: {
                    left: 'title',
                    center: 'agendaDay,agendaWeek,month',
                    right: 'prev,next today'
                },
                firstDay: 1,
                selectable: true,
                defaultView: 'month',
                axisFormat: 'h:mm',
                allDaySlot: false,
                selectHelper: true,
                eventLimit: true,
                editable: true,
                droppable: true, // this allows things to be dropped onto the calendar
                select: (start, end, allDay) => {
                    let view = $('#calender').fullCalendar('getView');
                    this.props.getEventByDate(start, end, view.name);
                    this.openModal(start, end, view.name);
                },
                eventClick: (event) => {
                    this.props.fetchSingleEvent(event);
                    this.singleEventModalOpen();
                },
                eventRender: (event, element) => {
                    if (event.color) {
                        element.css('background-color', event.color)
                    }
                },
                events
            })
        }
    }

    handleClickOpen = () => {
        this.setState({ open: true });
    };

    handleClose = () => {
        this.setState({ open: false });
    };

    openModal = (start, end, view) => {
        console.log(moment(end).subtract(1, "days"), "show momet")
        this.setState({ 
            dialogVisible: true,
            startDate: String(moment(start).zone(timezone)),
            endDate: view === "month" ? String(moment(end).subtract(1, "days").zone(timezone)) : String(moment(end).zone(timezone))
        })
    }

    saveEventByForm = (id, title, start, end, allDay) => {
        this.props.addEvent({
            id,
            title,
            start,
            end,
            allDay
        })
        this.addEventModalClose();

        Notification({
            message: 'Event Added!',
            type: 'success'
        });
    }

    addEventModalClose = () => {
        this.setState({ addNewDialogVisible: false });
    }

    addEventModal = () => {
        return (
            <Dialog
                title="Add Event"
                size="tiny"
                visible={ this.state.addNewDialogVisible }
                onCancel={ () => this.setState({ addNewDialogVisible: false }) }
                lockScroll={ false }
            >
                <AddEvent
                    start={this.state.startDate}
                    end={this.state.endDate}
                    onSave={this.saveEventByForm}
                    onCancel={this.addEventModalClose}
                />
            </Dialog>
        )
    }

    eventModal = () => {
        return (
            <Dialog
                title="All Events"
                size="tiny"
                visible={ this.state.dialogVisible }
                onCancel={ () => this.setState({ dialogVisible: false }) }
                lockScroll={ false }
            >
                <ShowEvents
                    eventStart={this.state.startDate}
                    eventEnd={this.state.endDate}
                    eventOnSave={this.saveEventByForm}
                    eventOnCancel={this.addEventModalClose}
                />
                {/* <Dialog.Body>
                <span>This is a message</span>
                </Dialog.Body>
                <Dialog.Footer className="dialog-footer">
                <Button onClick={ () => this.setState({ dialogVisible: false }) }>Cancel</Button>
                <Button type="primary" onClick={ () => this.setState({ dialogVisible: false }) }>Confirm</Button>
                </Dialog.Footer> */}
            </Dialog>
        )
    }

    singleEventModal = () => {
        return (
            <Dialog
                title="Tips"
                size="tiny"
                visible={ this.state.singleEventDialogVisible }
                onCancel={ () => this.setState({ singleEventDialogVisible: false }) }
                lockScroll={ false }
            >
                <ShowSingleEvent/>
                {/* <Dialog.Body>
                <span>This is a message</span>
                </Dialog.Body>
                <Dialog.Footer className="dialog-footer">
                <Button onClick={ () => this.setState({ singleEventDialogVisible: false }) }>Cancel</Button>
                <Button type="primary" onClick={ () => this.setState({ singleEventDialogVisible: false }) }>Confirm</Button>
                </Dialog.Footer> */}
            </Dialog>
        )
    }

    singleEventModalOpen = () => {
        this.setState({ singleEventDialogVisible: true })
    }

    addNewEventModalOpen = () => {
        this.setState( { 
            addNewDialogVisible: true,
        } );
    }

    componentDidMount() {
        this.initCalender();
    }

    render() {
        const { classes } = this.props;
        const fabs = {
            color: 'primary',
            className: classes.fab,
            icon: <AddIcon />,
        };
        return(
            <div>
                <div id="calender"></div>
                
            { this.eventModal() }
            { this.addEventModal() }
            { this.singleEventModal() }

            <FabButton
                onClick={ () => ( this.addNewEventModalOpen() ) }
                variant="fab" className={fabs.className} color={fabs.color}>
                {fabs.icon}
            </FabButton>
            </div>
        );
    }
}

const mapStateToProps = (state) => {
    return {
        events: state.events,
    }
}

const matchDispatchToProps = (dispatch) => {
    return bindActionCreators({
        selectEvent,
        fetchEvents,
        addEvent,
        getEventByDate,
        fetchSingleEvent
    }, dispatch);
}

export default connect(mapStateToProps, matchDispatchToProps)(withStyles(styles, { withTheme: true })(Calender));