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
        console.log(props, 'yeah')
    }

    state = {
        columns: [
            {
                label: "Title",
                prop: "title",
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
                                    console.log(row, column, index)
                                }}
                            >View</Button>
                            <Button type="danger" size="mini" icon="delete2">Remove</Button>
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

AllEvents.propTypes = {
    changeViewMode: PropTypes.func
}

const mapStateToProps = (state) => {
    return {
        events: state.selectedEvent
    }
}

const matchDispatchToProps = (dispatch) => {
    return bindActionCreators({
        fetchSingleEvent
    }, dispatch);
}


export default connect(mapStateToProps, matchDispatchToProps)(AllEvents);