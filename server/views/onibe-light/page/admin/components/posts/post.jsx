'use strict';

import React, { PropTypes, Component } from 'react';
import { connect, Provider } from 'react-redux';
import Remarkable from 'remarkable';

import posts from './posts';

class PostContainer extends Component {

    constructor(props) {
        super(props);
        this.md = new Remarkable();

        this.handleChange = this.handleChange.bind(this);
    }

    handleChange(e) {
        const markdown = this.refs.markdown.value;
        const title = this.refs.title.value;

        this.props.onMarkdownChange(Object.assign({}, this.props.post, {
            title: title,
            markdown: markdown
        }));
    }

    getRawMarkup() {
        const md = this.md;

        const post = this.props.post ? this.props.post.markdown : '';

        return { __html: md.render(post) };
    }

    render() {
        const post = this.props.post;
        if(post) {
            return (
                <div className="post-container">
                    <div className="post-title">
                        <input
                            className="post-title-edit form-control"
                            onChange={this.handleChange}
                            ref="title"
                            value={post.title} />
                    </div>
                    <div className="post-control">
                        <textarea
                            className="post-control-edit form-control"
                            onChange={this.handleChange}
                            ref="markdown"
                            value={post.markdown} />
                        <div
                            className="post-preview"
                            dangerouslySetInnerHTML={this.getRawMarkup()}
                        />
                    </div>
                    <div className="post-meta">
                        Meta Options
                    </div>
                    <div className="post-options">
                        <div className="post-options-wrapper">
                            <button className="btn btn-default">Discard Changes</button>
                            <button className="btn btn-primary">Save</button>
                        </div>
                    </div>
                </div>
            );
        } else {
            return (<div></div>)
        }

    }
}

const postMapStateToProps = (state, ownProps) => {
    return {
        post: state.posts.payload[ownProps.id]
    };
};

const postMapDispatchToProps = (dispatch, ownProps) => {
    // Return Props;
    return {
        select: (id) => {

        },
        fetch: (id) => {
            dispatch(post.actions.fetchPost(ownProps.id));
        },
        onMarkdownChange: (post) => {
            dispatch(posts.actions.editPost(post));
        },
        discard: (id) => {
            dispatch(posts.actions.editPost(post));
        }
    };
};


PostContainer = connect(postMapStateToProps, postMapDispatchToProps)(PostContainer);

const Index = (props) => {
    const store = props.resolves.store;
    const postId = props.resolves.$stateParams.postId;

    // store.dispatch(post.actions.fetchPost(postId));

    return (
        <Provider store={store}>
            <PostContainer id={postId} />
        </Provider>
    );

};


export default Index;