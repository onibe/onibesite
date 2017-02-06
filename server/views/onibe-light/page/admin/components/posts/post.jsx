'use strict';

import React from 'react';
import { connect, Provider } from 'react-redux';
import Remarkable from 'remarkable';
import {UISref, UISrefActive} from 'ui-router-react';

import post from './post-reducer';
import posts from './posts-reducer';

import TagSearch from '../tags/tag-search.jsx';


// PostContainer has two modes
// Create Mode
// Update Mode

class SettingsButton extends  React.Component {

    constructor(props) {
        super(props);
        this.state = {
            open: false
        };
        this.handleClick = this.handleClick.bind(this);
        this.handleDelete = this.handleDelete.bind(this);
    }

    componentDidMount() {
        // document.body.addEventListener('click', this.outsideClick, true);
    }

    componentWillReceiveProps() {
        this.state = {
            open: false
        };

        this.setState(this.state);
    }

    handleClick() {
        this.state.open = !this.state.open;

        this.setState(this.state);
    }

    handleDelete() {
        this.props.onDelete();
    }

    render() {
        const { disabled } = this.props;

        return (
            <span ref="settingMenu">
                {this.state.open ?
                    <div className="clearfix" style={{position: 'absolute', display: 'inline', marginTop: -36}}>
                        <button className="btn btn-danger"
                                disabled={disabled}
                                onClick={this.handleDelete}
                                type="button">
                            DELETE
                        </button>
                    </div>
                    : ''}
                <button className="btn btn-default"
                        disabled={disabled}
                        onClick={this.handleClick}
                        type="button">
                    <i className="glyphicon glyphicon-option-vertical"></i>
                </button>
            </span>
        );
    }
}

class PostContainer extends React.Component {

    constructor(props) {
        super(props);
        this.md = new Remarkable({
            html: true
        });

        this.handleTitleChange = this.handleTitleChange.bind(this);
        this.handleMarkdownChange = this.handleMarkdownChange.bind(this);
        this.handleHTMLChange = this.handleHTMLChange.bind(this);
        this.handleDraftClick = this.handleDraftClick.bind(this);
        this.handleHTMLModeClick = this.handleHTMLModeClick.bind(this);
        this.handleDiscard = this.handleDiscard.bind(this);
        this.handleSave = this.handleSave.bind(this);
        this.handleDelete = this.handleDelete.bind(this);
        this.handleTagDelete = this.handleTagDelete.bind(this);
        this.handleTagAdd = this.handleTagAdd.bind(this);
        this.handleKeyDown = this.handleKeyDown.bind(this);
    }

    componentWillMount() {
        const { mode, fetch } = this.props;

        if(!mode.create){
            fetch();
        }
    }

    componentWillReceiveProps() {

    }

    handleTitleChange(e) {
        const { post, onPostChange } = this.props;
        const title = this.refs.title.value;

        onPostChange(Object.assign({}, post, {
            title: title
        }));
    }

    handleHTMLChange(e) {
        const { post, onPostChange } = this.props;

        const html = this.refs.html.value;

        onPostChange(Object.assign({}, post, {
            html: html
        }));
    }

    handleMarkdownChange(e) {
        const md = this.md;
        const { post, onPostChange } = this.props;

        const markdown = this.refs.markdown.value;

        onPostChange(Object.assign({}, post, {
            markdown: markdown,
            html: md.render(markdown)
        }));
    }

    handleDraftClick(e) {
        const { post, onPostChange } = this.props;
        onPostChange(Object.assign({}, post, {
            draft: !post.draft
        }));
    }

    handleHTMLModeClick(e) {
        const md = this.md;
        const { post, onPostChange } = this.props;

        onPostChange(Object.assign({}, post, {
            format: post.format === 'MARKDOWN' ? 'HTML' : 'MARKDOWN',
            html: post.format === 'MARKDOWN' ? md.render(post.markdown) : post.html
        }));
    }

    getRawHTML() {
        return { __html: this.props.post ? this.props.post.html : '' };
    }

    handleDiscard() {
        this.props.discard(this.props.post.id);
    }

    handleKeyDown(event) {
        if(event.ctrlKey && event.key && event.key.toLowerCase() == 's'){
            this.props.onSave(this.props.post);
        }
    }

    handleSave() {
        this.props.onSave(this.props.post);
    }

    handleDelete() {
        this.props.onDelete(this.props.post.id);
    }

    handleTagAdd(tag) {
        this.props.onTagSubmit(this.props.post,tag);
    }

    handleTagDelete(tag) {
        this.props.onTagDelete(this.props.post,tag);
    }

    render() {
        const {post, mode} = this.props;

        if(!post) {
            return <div className="post-container">No Post</div>;
        }

        return (
            <div className="post-container" onKeyDown={this.handleKeyDown}>
                <div className="post-title">
                    <input
                        className="post-title-edit form-control"
                        onChange={this.handleTitleChange}
                        placeholder="Title"
                        ref="title"
                        value={post.title} />
                </div>
                <div className="post-control">
                    {post.format === 'HTML' ?
                        <textarea
                            className="post-control-edit-html form-control"
                            onChange={this.handleHTMLChange}
                            placeholder="Insert HTML"
                            ref="html"
                            value={post.html} /> :
                        <textarea
                            className="post-control-edit form-control"
                            onChange={this.handleMarkdownChange}
                            placeholder="Insert Markdown"
                            ref="markdown"
                            value={post.markdown} />
                    }
                    <div
                        className="post-preview"
                        dangerouslySetInnerHTML={this.getRawHTML()}
                    />
                </div>
                <div className="post-meta">
                    <div className="form-group checkbox-inline">
                        <label>
                            <input checked={!!post.draft}
                                   onChange={this.handleDraftClick}
                                   ref="draft"
                                   type="checkbox" />
                            <span>Draft</span>
                        </label>
                    </div>
                    <div className="form-group checkbox-inline">
                        <label>
                            <input checked={post.format === 'HTML'}
                                   onChange={this.handleHTMLModeClick}
                                   ref="HTMLMode"
                                   type="checkbox" />
                            <span>HTML Format</span>
                        </label>
                    </div>
                    <div>Create Date: {post.createdAt}</div>
                    <div>Update Date: {post.updatedAt}</div>
                    <div>
                        <TagSearch
                            onDelete={this.handleTagDelete}
                            onSubmit={this.handleTagAdd}
                            tags={post.tags} />
                    </div>
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
                        {mode.create ? '' :
                            <button className="btn btn-default"
                                    disabled={!post.modified}
                                    onClick={this.handleDiscard}
                                    type="button">
                                Discard Changes
                            </button>
                        }
                        {mode.create ? '' :
                            <SettingsButton
                                onDelete={this.handleDelete} />
                        }
                        {/*<button className="btn btn-danger"*/}
                                {/*onClick={this.handleDelete}*/}
                                {/*type="button">*/}
                            {/*Delete*/}
                        {/*</button>*/}
                    </div>
                    <div className="post-options-wrapper">
                        <button
                            className="btn btn-primary"
                            disabled={!post.modified}
                            onClick={this.handleSave}>Save</button>
                    </div>
                </div>
            </div>
        );

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
        onPostChange: (data) => {
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
        onTagSubmit: (postEntity, tag) => {
            if(ownProps.mode.create){
                dispatch(post.actions.addTagToNewPost(tag));
            } else {
                dispatch(posts.actions.addTagToPost(postEntity, tag));
            }
        },
        onTagDelete: (postEntity, tag) => {
            if(ownProps.mode.create){
                dispatch(post.actions.deleteTagFromNewPost(tag));
            } else {
                dispatch(posts.actions.deleteTagFromPost(postEntity, tag));
            }
        },
        onSave: (data) => {
            if(ownProps.mode.create){
                dispatch(post.actions.createPost(data))
                    .then(data => dispatch(posts.actions.fetchPost(data.value.id)))
                    .then(data => ownProps.router.stateService.go('main.posts.post', {postId: data.value.id} ))
                    .then(dispatch(post.actions.clearNewPost()));
            } else if(data.id) {
                dispatch(posts.actions.updatePost(data));
            }
        },
        onDelete: (id) => {
            dispatch(posts.actions.deletePost(id))
                .then(() => ownProps.router.stateService.go('main.posts.start'));
        }
    };
};

PostContainer = connect(postMapStateToProps, postMapDispatchToProps)(PostContainer);

PostContainer.propTypes = {
    id: React.PropTypes.string,
    post: React.PropTypes.object,
    mode: React.PropTypes.object,
    onPostChange: React.PropTypes.func,
    discard: React.PropTypes.func,
    onSave: React.PropTypes.func,
    onDelete: React.PropTypes.func
};

const Index = (props) => {
    const store = props.resolves.store;
    const postId = props.resolves.$stateParams.postId;
    const mode = props.resolves.mode;
    const router = props.transition.router;

    return (
        <Provider store={store}>
            <PostContainer
                id={postId}
                mode={mode}
                router={router}
            />
        </Provider>
    );
};

Index.propTypes = {
    resolves: React.PropTypes.object,
    transition: React.PropTypes.object
};

export default Index;