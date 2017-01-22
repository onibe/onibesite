'use strict';

import React, { PropTypes, Component } from 'react';
import moment from 'moment';

import { connect, Provider } from 'react-redux';
import {UIView, UISrefActive, UISref} from 'ui-router-react';
import posts from './posts';

const PostLink = (prop) => {
    const date = moment(new Date(prop.post.createdAt)).fromNow();

    return (
        <div className="post-item">
            <UISrefActive class="post-item-active">
                <UISref to=".post" params={{postId:prop.post.id}}>
                    <a>
                        <div className="post-item-title">
                            {prop.post.modified ? <span className="post-item-modified">* </span> : null}
                            {prop.post.title}
                        </div>
                        <div className="post-item-info">{date}</div>

                    </a>
                </UISref>
            </UISrefActive>
        </div>
    );
};

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
                    {/*<div className="post-search">*/}
                        {/*<Input*/}
                            {/*label="Search"*/}
                            {/*type="text"*/}
                            {/*onChange={this.props.fetchWithOptions('search')}*/}
                            {/*defaultValue={this.props.search['search']}*/}
                        {/*/>*/}
                    {/*</div>*/}
                    <div className="post-list-items">
                        {Object.keys(postLinks).map(key => <PostLink post={postLinks[key]} key={key} />)}
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