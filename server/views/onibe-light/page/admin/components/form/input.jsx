'use strict';

import React, { PropTypes, Component } from 'react';

class Input extends Component {

    constructor(props) {
        super(props);

        // Necessary for handleChange to see this.props;
        this.handleChange = this.handleChange.bind(this);
    }
    handleChange(e) {
        const props = this.props;
        const value = e.target.value;

        props.onChange(value);
    }
    render() {
        const props = this.props;
        return (
            <div className="form-group">
                <label htmlFor={props.label}>{props.label}</label>
                <input
                    className="form-control"
                    placeholder={props.placeholder}
                    ref={props.reference}
                    type={props.type}
                    onChange={this.handleChange}
                    defaultValue={props.defaultValue}
                />
            </div>
        );
    }
}

Input.propTypes = {
    label: React.PropTypes.string,
    type: React.PropTypes.string,
    onChange: React.PropTypes.func,
    reference: React.PropTypes.func,
    placeholder: React.PropTypes.string,
    defaultValue: React.PropTypes.any
};

export default Input;