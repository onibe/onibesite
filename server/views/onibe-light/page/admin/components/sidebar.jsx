'use strict';

import React, { PropTypes, Component } from 'react';
import {UISref, UISrefActive} from 'ui-router-react';

const SidebarLink = (props) => {
    return (
        <UISrefActive class="sidebar-active">
            <UISref to={props.state}>
                <a><div>{props.label}</div></a>
            </UISref>
        </UISrefActive>
    )
};

const SideBarLinks = (props) => {
    const links = [
        {
            state: 'main',
            label: 'Home'
        },
        {
            state: 'main.posts',
            label: 'Post'
        },
        {
            state: 'main.tags',
            label: 'Tags'
        },
        {
            state: 'main.users',
            label: 'Users'
        },
        {
            state: 'main.files',
            label: 'Files'
        },
    ];

    return (
        <div className="sidebar-links">
            {links.map((link, index) => <SidebarLink {...link} key={index} />)}
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