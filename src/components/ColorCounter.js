/**-------------------------------
 * This Component
 * showing the event data
 * by color code and counting 
 * how much event are stored 
---------------------------------*/

import React, { Component } from 'react';
import PropTypes from 'prop-types' ;
import { Layout } from 'element-react';

class ColorCounter extends Component {
    constructor(props) {
        super(props);
    }

    componentWillReceiveProps(props) {
        this.props = props;
    }

    /**
     * setEventCount
     * this method count 
     * the past and upcoming 
     * event from props
     */
    setEventCount = () => {
        const { event } = this.props;
        let past = 0, upcoming = 0;
        if (event.length) {
            event.forEach((eves) => {
                if (new Date(eves.end).getTime() < new Date().getTime()) {
                    past++;
                } else {
                    upcoming++;
                }
            })
        }

        return [past, upcoming];
    }

    render() {
        const [past, upcoming] = this.setEventCount();
        return (
            <div>
                <Layout.Row gutter="20">
                    <Layout.Col span="1" offset="17">
                        <div className="past">
                            <span>{ past }</span>
                        </div>
                    </Layout.Col>
                    <Layout.Col span="1">
                        <div className="upcoming">
                            <span>{ upcoming }</span>
                        </div>
                    </Layout.Col>
                </Layout.Row>
            </div>
        )
    }
}

// ColorCounter Prop Types
ColorCounter.propTypes = {
    event: PropTypes.any
}

// ColorCounter Default Props
ColorCounter.defaultProps = {
    event: []
}

export default ColorCounter;