'use strict';
import React from 'react';
import Sidebar from './sidebar.jsx';
import {UIView} from 'ui-router-react';


const Index = (props) => {
    return (
        <div className="dashboard-container">
            <div className="sidebar">
                <Sidebar />
            </div>
            <div className="main-body">
                <UIView />
            </div>
        </div>
    );
};

export default Index;