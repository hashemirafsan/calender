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
                width: 150,
                render: (row, column, index)=>{
                    return (
                        <span>
                            <Button type="text" size="small" onClick={this.deleteRow.bind(this, index)}>Edit</Button>
                            <Button type="text" size="small" onClick={this.deleteRow.bind(this, index)}>Remove</Button>
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