'use strict';

import React from 'react';
import {UISref, UISrefActive} from 'ui-router-react';

const Index = (props) => {
    const router = props.transition.router;

    return (
        <div className="post-container">
            <div>
                <UISref to="main.posts.create">
                    <button className="btn btn-primary">Add New Post</button>
                </UISref>
            </div>
        </div>
    );
};



export default Index;