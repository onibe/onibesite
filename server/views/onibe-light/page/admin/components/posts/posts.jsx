'use strict';

import React from 'react';
import moment from 'moment';
import { orderBy } from 'lodash';

import { connect, Provider } from 'react-redux';
import {UIView, UISrefActive, UISref} from 'ui-router-react';
import posts from './posts-reducer';

const PostLink = (prop) => {
    const date = moment(new Date(prop.post.createdAt)).fromNow();

    return (
        <div className="post-item no-select">
            <UISrefActive class="post-item-active">
                <UISref params={{postId:prop.post.id}} to=".post" >
                    <a>
                        <div className="post-item-title">
                            {prop.post.modified ? <span className="post-item-modified">* </span> : null}
                            {prop.post.title}
                        </div>
                        <div className="post-item-info">{date} {prop.post.draft ? '- draft': ''}</div>
                    </a>
                </UISref>
            </UISrefActive>
        </div>
    );
};

class PostsContainer extends React.Component {

    constructor(props) {
        super(props);

        this.handleKeyDown = this.handleKeyDown.bind(this);
    }

    componentWillMount() {
        const props = this.props;

        if(!props.fetched){
            props.fetch();
        }
    }

    handleKeyDown(event){
        if(event.key) {

        }
    }

    render() {
        const postLinks = this.props.posts;

        const mapPosts = orderBy(Object.keys(postLinks).map(key => postLinks[key]), ['createdAt'], ['desc']);

        return (
            <div className="posts-container">
                <div className="post-list" onKeyDown={this.handleKeyDown}>
                    {/*<div className="post-search">*/}
                        {/*<Input*/}
                            {/*label="Search"*/}
                            {/*type="text"*/}
                            {/*onChange={this.props.fetchWithOptions('search')}*/}
                            {/*defaultValue={this.props.search['search']}*/}
                        {/*/>*/}
                    {/*</div>*/}
                    <div className="post-list-items">
                        {mapPosts.map(post => <PostLink key={post.id} post={post} />)}
                    </div>
                </div>
                <UIView />
            </div>
        );
    }
}

const PostsMapStateToProps = (state) => {
    return {
        posts: state.posts.payload,
        fetched: state.posts.fetched
    };
};

const PostsMapDispatchToProps = (dispatch) => {
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

PostsContainer.propTypes = {
    posts: React.PropTypes.object,
    fetched: React.PropTypes.bool,
    fetch: React.PropTypes.func
};

const Index = (props) => {
    const store = props.resolves.store;

    return (
        <Provider store={store}>
            <PostsContainer />
        </Provider>
    );
};

Index.propTypes = {
    resolves: React.PropTypes.object
};

export default Index;