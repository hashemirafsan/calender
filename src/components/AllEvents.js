import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import { Dialog, Table, Button } from 'element-react';

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
                width: 150,
            },
            {
                label: "Action",
                render: (row, column, index)=>{
                    return (
                        <span>
                            <Button type="info" size="mini" icon="edit">Edit</Button>
                            <Button type="warning" size="mini" icon="document">Copy</Button>
                            <Button type="danger" size="mini" icon="delete2">Remove</Button>
                        </span>
                    )
                }
            }
        ]
    }

    deleteRow = () => {

    }

    render() {
        console.log(this.props)
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

const mapStateToProps = (state) => {
    return {
        events: state.selectedEvent
    }
}

export default connect(mapStateToProps)(AllEvents);