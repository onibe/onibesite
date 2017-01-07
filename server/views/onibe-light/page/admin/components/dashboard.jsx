'use strict';
import React from 'react';
import Sidebar from './sidebar.jsx';
import Posts from './posts.jsx';

const Index = () => (
    <div className="dashboard-container">
        <div className="sidebar">
            <Sidebar />
        </div>
        <div className="post">
            <Posts />
        </div>
        <div className="markdown">Markdown</div>
        <div className="html-preview">HTML</div>
    </div>
);

export default Index;