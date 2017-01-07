'use strict';

import React, { PropTypes, Component } from 'react';
import { applyMiddleware, createStore } from 'redux';
import { connect, Provider } from 'react-redux';
import thunk  from 'redux-thunk';
import logger from 'redux-logger';
import promise from 'redux-promise-middleware';
import api from '../api/api';

const FETCH_POSTS = 'FETCH_POSTS';

const fetchPosts = (data) => {
    return {
        type: FETCH_POSTS,
        payload: api.getPosts()
    };
};

const fetchPostReducer = (state = {}, action) => {

};

const Post = (post) => (
    <div className="post">
        <span>{post.title}</span>
        <span>{post.blurb}</span>
    </div>
);

class Posts extends Component {

    componentWillMount() {

    }

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
                <Post />
            </div>
        );
    }
}


export default Posts;