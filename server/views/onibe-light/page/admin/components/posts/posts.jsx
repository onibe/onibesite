'use strict';

import React, { PropTypes, Component } from 'react';
import { connect, Provider } from 'react-redux';
import {UIView, UISrefActive, UISref} from 'ui-router-react';
import posts from './posts';
import Input from '../form/input.jsx';

const PostLink = (data) => (
    <div className="post-item">
        <UISrefActive class="post-item-active">
            <UISref to=".post" params={{postId:data.post.id}}>
                <a>
                    <div>
                        <span>{data.post.title}</span>
                        <span>{data.post.blurb}</span>
                    </div>
                </a>
            </UISref>
        </UISrefActive>
    </div>
);

class PostsContainer extends Component {

    componentWillMount() {
        const props = this.props;
        props.fetch();
    }

    constructor(props) {
        super(props);
    }

    render() {
        const postLinks = this.props.posts;

        return (
            <div className="posts-container">
                <div className="post-list">
                    <div className="post-search">
                        <Input
                            label="Search"
                            type="text"
                            onChange={this.props.fetchWithOptions('search')}
                            defaultValue={this.props.search['search']}
                        />
                    </div>
                    <div className="post-list-items">
                        {postLinks.map((post, index) => <PostLink post={post} key={index} />)}
                    </div>
                </div>
                <UIView />
            </div>
        );
    }
}

const PostsMapStateToProps = (state, ownProps) => {
    return {
        posts: state.posts.payload,
        search: state.posts.search
    };
};

const PostsMapDispatchToProps = (dispatch, ownProps) => {
    const form = {};

    return {
        fetch: () => {
            dispatch(posts.actions.fetchPosts());
        },
        fetchWithOptions: (key) => (value) => {
            form[key] = value;

            dispatch(posts.actions.fetchPostSearch(form));
            dispatch(posts.actions.fetchPosts(form));
        }
    };
};


PostsContainer = connect(PostsMapStateToProps, PostsMapDispatchToProps)(PostsContainer);

const Index = (props) => {
    const store = props.resolves.store;

    return (
        <Provider store={store}>
            <PostsContainer />
        </Provider>
    );
};

export default Index;