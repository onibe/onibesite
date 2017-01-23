'use strict';

import React  from 'react';
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

class Sidebar extends React.Component {
    constructor(props) {
        super(props);
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