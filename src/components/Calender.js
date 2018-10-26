/**-------------------------------
 * This Component contain the main
 * calender layout and Calender 
 * layout actually provided by 
 * FullCalender.io. This component
 * is main parent component for 
 * calender module.
---------------------------------*/

import React, { Component } from 'react';
import './css/calender.css';
import { Dialog, Notification } from 'element-react';
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
import ColorCounter from './ColorCounter';

const $ = window.$;
const timezone = "+0600";
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
        // Fetch Events from localStorage
        this.props.fetchEvents();
    }

    state = {
        dialogVisible: false,
        addNewDialogVisible: false,
        eventDialogVisible: false,
        singleEventDialogVisible: false,
        startDate: String(new Date()),
        endDate: String(new Date()),
        start: null,
        end: null,
        view: $('#calender').fullCalendar('getView').name,
        eventso: this.props.events,
        singleEventRefresh: false,
        showEventMode: false
    }

    componentWillReceiveProps(props) {
        this.props = props;
        // Update calender UI when Store change something
        $("#calender").fullCalendar('removeEvents'); 
        // Set Event store source when data updated
        $("#calender").fullCalendar('addEventSource', this.props.events);
        
    }

    /**
     * Initial Calender UI
     * If this.props.events has
     * event data
     */
    initCalender = () => {
        const { events } = this.props;
        if (events) {
            // Initial Full Calender
            $('#calender').fullCalendar({
                header: {
                    left: 'title',
                    center: 'agendaDay,agendaWeek,month',
                    right: 'prev,next today'
                },
                firstDay: 1,
                timezone: 'local',
                selectable: true,
                defaultView: 'month',
                axisFormat: 'h:mm',
                allDaySlot: false,
                selectHelper: true,
                eventLimit: true,
                editable: true,
                droppable: false, // this allows things to be dropped onto the calendar
                select: (start, end, allDay) => {
                    console.log(start, end)
                    // Which view type is assigned [day, week, month]
                    let view = $('#calender').fullCalendar('getView');  
                    // Open Modal When each date selected      
                    this.openModal(start, end ,view.name);
                },
                eventClick: (event) => {
                    // Fetch each single event when it click
                    this.props.fetchSingleEvent(event);
                    // Open single event model
                    this.singleEventModalOpen();
                },
                eventRender: (event, element) => {
                    // Showing event past or present by color code ['red', 'green];
                    const eves = JSON.parse(localStorage.getItem('joom_event')).filter((i) => i.id === event.id);
                    if (eves.length) {
                        const [ item ] = eves;
                        if (new Date(item.end).getTime() > new Date().getTime()) {
                            element.css('background-color', '#13ce66');
                        } else {
                            element.css('background-color', '#ff6d6d');
                        }
                    }
                    
                },
                // Events data source
                events
            })
        }
    }

    /**
     * Change Select state for
     * get Data by starting and 
     * ending date and view wise
     */
    changeSelectState = () => {
        const { start, end, view } = this.state;
        // Fetch event by start date, end date and view name
        this.props.getEventByDate(start, end, view);
    }

    /**
     * Open Modal
     * this method working for 
     * set some state and
     * get data by start and end date and view name
     */
    openModal = (start, end, view) => {
        console.log(start, end, "start")
        this.setState({ 
            dialogVisible: true,
            start,
            end,
            view,
            startDate: String(moment(start)),
            endDate: String(moment(end)) 
        })

        // Fetch event by start date, end date and view name        
        this.props.getEventByDate(start, end, view);
    }

    /**
     * saveEventByForm
     * this method Working for
     * add Event by specific data
     * close Add event modal
     * and show notification when 
     * event added
     */
    saveEventByForm = (id, title, start, end, allDay, type, data) => {
        // Add Event 
        this.props.addEvent({
            id,
            title,
            start,
            end,
            allDay,
            type,
            data
        })
        
        // Add Event modal close
        this.addEventModalClose();

        // Showing notification when event added
        Notification({
            message: 'Event Added!',
            type: 'success'
        });
    }

    /**
     * addEventModalClose
     * this method working for
     * close Add Event modal close
     */
    addEventModalClose = () => {
        this.setState({ addNewDialogVisible: false });
    }

    /**
     * addEventModal
     * this method working for
     * Showing a modal/Dialog
     * Contain AddEvent Component
     * For Adding Event
     */
    addEventModal = () => {
        return (
            <Dialog
                title="Add Event"
                size="tiny"
                visible={ this.state.addNewDialogVisible }
                onCancel={ () => this.setState({ addNewDialogVisible: false }) }
                lockScroll={ false }
            >   
                {/* Add Event Component */}
                <AddEvent
                    start={this.state.startDate}
                    end={this.state.endDate}
                    onSave={this.saveEventByForm}
                    onCancel={this.addEventModalClose}
                />
            </Dialog>
        )
    }

    /**
     * eventModal
     * This method working for
     * showing a modal/dialog
     * contain Show event component
     * to show all event and 
     * add event component for 
     * specific date
     */
    eventModal = () => {
        return (
            <Dialog
                title="All Events"
                size="tiny"
                visible={ this.state.dialogVisible }
                onCancel={ () => {this.setState({ dialogVisible: false, showEventMode:  false })} }
                lockScroll={ false }
            >
                {/* ShowEvent Component  */}
                <ShowEvents
                    eventStart={this.state.startDate}
                    eventEnd={this.state.endDate}
                    eventOnSave={this.saveEventByForm}
                    eventOnCancel={() => this.setState({ dialogVisible: false })}
                    onCopy={this.singleEventCopy}
                    refreshEvents={this.changeSelectState}
                    showEventMode={this.state.showEventMode}
                />
            </Dialog>
        )
    }

    /**
     * singleEventModal
     * This method working for
     * showing a modal/dialog
     * contain ShowSingle component
     * to show specific event 
     */
    singleEventModal = () => {
        return (
            <Dialog
                title="Single Event"
                size="tiny"
                visible={ this.state.singleEventDialogVisible }
                onClose={() => this.setState({ singleEventDialogVisible: false, singleEventRefresh: false })}
                onCancel={ () => {
                    this.setState({ singleEventDialogVisible: false, singleEventRefresh: false })
                } }
                lockScroll={ false }
            >  
                {/* ShowSingleEvent Component */}
                <ShowSingleEvent
                    onSuccess={this.singleEventRemoveSuccess}
                    onCopy={this.singleEventCopy}
                    onCancel={() => this.setState({ singleEventDialogVisible: false })}
                    refresh={this.state.singleEventRefresh}
                />
            </Dialog>
        )
    }

    // SingleEvent Modal Open
    singleEventModalOpen = () => {
        this.setState({ singleEventDialogVisible: true })
    }

    /**
     * singleEventRemoveSuccess
     * this method only working when 
     * Some event removed and need 
     * to show notification and close
     * the singleEvent Modal
     */
    singleEventRemoveSuccess = () => {  
        this.changeSelectState();

        this.setState({ singleEventDialogVisible: false });

        Notification({
            message: 'Event Removed!',
            type: 'success'
        });
    }

    /**
     * singleEventCopy
     * this method only working when 
     * Some event copied and need 
     * to show notification
     */
    singleEventCopy = () => {
        this.changeSelectState();

        Notification({
            message: 'Event Copied!',
            type: 'success'
        });
    }

    // Open AddNewEvent Modal
    addNewEventModalOpen = () => {
        this.setState( { 
            addNewDialogVisible: true,
        } );
    }

    componentDidMount() {
        // Init Calender UI when Compoenent Mounted
        this.initCalender();
    }

    render() {
        const { classes, events } = this.props;
        const fabs = {
            color: 'primary',
            className: classes.fab,
            icon: <AddIcon />,
        };
        return(
            <div>
                <ColorCounter
                    event={events}
                />
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

// map store state
const mapStateToProps = (state) => {
    return {
        events: state.events,
    }
}

// map store actions
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