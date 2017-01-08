'use strict';

import React, { PropTypes, Component } from 'react';
import { connect, Provider } from 'react-redux';
import {UIView, UISrefActive, UISref} from 'ui-router-react';
import posts from './posts';

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
                    {postLinks.map((post, index) => <PostLink post={post} key={index} />)}
                </div>
                <UIView />
            </div>
        );
    }
}

const PostsMapStateToProps = (state, ownProps) => {
    return {
        posts: state.posts.payload
    };
};

const PostsMapDispatchToProps = (dispatch, ownProps) => {
    // Return Props;
    return {
        fetch: () => {
            dispatch(posts.actions.fetchPosts());
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