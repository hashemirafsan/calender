import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import { Card, Button, Dialog } from 'element-react';
import { removeSingleEvent, copySingleEvent } from '../Store/Actions/_actions';

class ShowSingleEvent extends Component {
    constructor(props) {
        super(props);
    }

    componentWillReceiveProps(props) {
        this.props = props;
    }

    getEvent = () => {
        return this.props.event || this.props.evento;
    }

    render() {
        const event = this.getEvent();

        return(
            <div>
                <Dialog.Body>
                    <Card
                        className="box-card"
                        header={
                            <div className="clearfix">
                            <span style={{ "lineHeight": "24px" }}>
                                { event.title }
                            </span>
                            <span style={{ "float": "right" }}>
                                <Button type="info" size="small" icon="edit">Edit</Button>
                                <Button 
                                    type="warning" 
                                    size="small" 
                                    icon="document"
                                    onClick={() => {
                                        this.props.copySingleEvent(event);
                                        this.props.onCopy();
                                    }}
                                >Copy</Button>
                                <Button 
                                    type="danger" 
                                    size="small" 
                                    icon="delete2"
                                    onClick={() => {
                                        this.props.removeSingleEvent(event);
                                        this.props.onSuccess();
                                    }}
                                >Remove</Button>
                            </span>
                            </div>
                        }
                    >
                        <div className="text item">List item 1</div>
                        <div className="text item">List item 2</div>
                        <div className="text item">List item 3</div>
                        <div className="text item">List item 4</div>
                    </Card>
                </Dialog.Body>
            </div>
        );
    }
}

ShowSingleEvent.propTypes = {
    evento: PropTypes.object,
    onSuccess: PropTypes.func,
    onCopy: PropTypes.func
}

const mapStateToProps = (state) => {
    return {
        event: state.singleEvent,
    }
}

const matchDispatchToProps = (dispatch) => {
    return bindActionCreators({
        copySingleEvent,
        removeSingleEvent
    }, dispatch);
}

export default connect(mapStateToProps, matchDispatchToProps)(ShowSingleEvent);