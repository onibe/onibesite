'use strict';

import React, { PropTypes, Component } from 'react';


const SideBarLinks = (props) => {
    return (
        <div className="sidebar-links">
            <div>Home</div>
            <div>Post</div>
            <div>Channel</div>
            <div>Users</div>
        </div>
    );
};

class Sidebar extends Component {
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
            <div className="">
                <SideBarLinks />
            </div>
        );
    }
}

Sidebar.propTypes = {
    label: React.PropTypes.string,
    type: React.PropTypes.string,
    onChange: React.PropTypes.func,
    reference: React.PropTypes.func,
    placeholder: React.PropTypes.string
};


export default Sidebar;