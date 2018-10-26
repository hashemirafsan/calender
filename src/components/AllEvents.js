/**-------------------------------
 * This Component contain a table
 * to display all the events for 
 * selected day and go to the full
 * details by view button.
---------------------------------*/

import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import { Dialog, Table, Button } from 'element-react';
import { fetchSingleEvent } from '../Store/Actions/_actions';
class AllEvents extends Component {
    constructor(props) {
        super(props);
    }

    componentWillReceiveProps(props) {
        this.props = props;
    }

    state = {
        columns: [
            {
                label: "Title",
                prop: "title",
                width: "150px"
            },
            {
                label: "Action",
                render: (row, column, index)=>{
                    return (
                        <span>
                            <Button 
                                type="info" 
                                size="mini" 
                                icon="view"
                                onClick={() => {
                                    this.props.fetchSingleEvent(row)
                                    this.props.changeViewMode(true);
                                }}
                            >View</Button>
                        </span>
                    )
                }
            }
        ]
    }

    render() {
        return(
            <div>
                <Dialog.Body>
                <Table
                    style={{width: '100%'}}
                    columns={this.state.columns}
                    data={this.props.events}
                    border={true}
                    height={250}
                />
                </Dialog.Body>
            </div>
        )
    }
}

// AllEvent Prop Types
AllEvents.propTypes = {
    changeViewMode: PropTypes.func
}

// map selected event to props
const mapStateToProps = (state) => {
    return {
        events: state.selectedEvent
    }
}

// map fetchSingle event to dispath in props
const matchDispatchToProps = (dispatch) => {
    return bindActionCreators({
        fetchSingleEvent
    }, dispatch);
}


export default connect(mapStateToProps, matchDispatchToProps)(AllEvents);