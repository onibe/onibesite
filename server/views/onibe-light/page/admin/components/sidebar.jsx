'use strict';

import React, { PropTypes, Component } from 'react';
import {UISref, UISrefActive} from 'ui-router-react';

const SideBarLinks = (props) => {
    return (
        <div className="sidebar-links">
            <UISref to="main">
                <a><div>Home</div></a>
            </UISref>
            <UISref to="main.posts">
                <a><div>Post</div></a>
            </UISref>
            <UISref to="main.tags">
                <a><div>Tags</div></a>
            </UISref>
            <UISref to="main.users">
                <a><div>Users</div></a>
            </UISref>
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