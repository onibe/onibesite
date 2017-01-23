'use strict';

import React from 'react';
import { connect, Provider } from 'react-redux';
import Remarkable from 'remarkable';
import {UISref, UISrefActive} from 'ui-router-react';

import post from './post-reducer';
import posts from './posts-reducer';


// PostContainer has two modes
// Create Mode
// Update Mode
class PostContainer extends React.Component {

    constructor(props) {
        super(props);
        this.md = new Remarkable();

        this.handleChange = this.handleChange.bind(this);
        this.handleDiscard = this.handleDiscard.bind(this);
        this.handleSave = this.handleSave.bind(this);
    }

    componentWillMount() {
        const props = this.props;

        if(props.mode.create){

        } else {
            props.fetch();
        }
    }

    handleChange(e) {
        const post = this.props.post;

        const markdown = this.refs.markdown.value;
        const title = this.refs.title.value;
        const draft = !post.draft;

        this.props.onMarkdownChange(Object.assign({}, this.props.post, {
            title: title,
            markdown: markdown,
            draft: draft
        }));
    }

    getRawMarkup() {
        const md = this.md;

        const post = this.props.post ? this.props.post.markdown : '';

        return { __html: md.render(post) };
    }

    handleDiscard() {
        this.props.discard(this.props.post.id);
    }

    handleSave() {
        this.props.onSave(this.props.post);
    }

    render() {
        const post = this.props.post;
        console.log(post,'post');
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
                        <div className="form-group">
                            <label>
                                <input checked={!!post.draft}
                                    onChange={this.handleChange}
                                    ref="draft"
                                    type="checkbox" />
                                <span>Draft</span>
                            </label>
                        </div>
                        <div>Create Date: {post.createdAt}</div>
                        <div>Update Date: {post.updatedAt}</div>
                    </div>
                    <div className="post-options">
                        <div>
                            <UISrefActive class="sidebar-active">
                                <UISref to="main.posts.create">
                                    <button className="btn btn-default"
                                            type="button">
                                        New Post
                                    </button>
                                </UISref>
                            </UISrefActive>
                        </div>
                        <div className="post-options-wrapper">
                            <button className="btn btn-default"
                                    disabled={!post.modified}
                                    onClick={this.handleDiscard}
                                    type="button">
                                Discard Changes
                            </button>
                            <button
                                    className="btn btn-primary"
                                    disabled={!post.modified}
                                    onClick={this.handleSave}>Save</button>
                        </div>
                    </div>
                </div>
            );
        } else {
            return (<div></div>);
        }

    }
}

const postMapStateToProps = (state, ownProps) => {
    const post = ownProps.mode.create ? state.post.payload : state.posts.payload[ownProps.id];

    return {
        post: post,
        mode: ownProps.mode
    };
};

const postMapDispatchToProps = (dispatch, ownProps) => {
    // Return Props;
    return {
        onMarkdownChange: (data) => {
            if(ownProps.mode.create){
                dispatch(post.actions.editNewPost(data));
            } else {
                dispatch(posts.actions.editPost(data));
            }
        },
        fetch: () => {
            dispatch(posts.actions.fetchPost(ownProps.id));
        },
        discard: (id) => {
            dispatch(posts.actions.fetchPost(id));
        },
        onSave: (data) => {
            if(ownProps.mode.create){
                dispatch(posts.actions.createPost(data));
            } else if(data.id) {
                dispatch(posts.actions.updatePost(data));
            }
        }
    };
};

PostContainer = connect(postMapStateToProps, postMapDispatchToProps)(PostContainer);

PostContainer.propTypes = {
    id: React.PropTypes.string,
    post: React.PropTypes.object,
    onMarkdownChange: React.PropTypes.func,
    discard: React.PropTypes.func,
    onSave: React.PropTypes.func
};

const Index = (props) => {
    const store = props.resolves.store;
    const postId = props.resolves.$stateParams.postId;
    const mode = props.resolves.mode;

    return (
        <Provider store={store}>
            <PostContainer id={postId} mode={mode} />
        </Provider>
    );
};

Index.propTypes = {
    resolves: React.PropTypes.object
};

export default Index;