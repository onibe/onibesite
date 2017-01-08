'use strict';
import React, { PropTypes, Component } from 'react';
import { connect, Provider } from 'react-redux';
import post from './post';

const FETCH_POST = 'FETCH_POST';
const FETCH_POST_PENDING = 'FETCH_POST_PENDING';
const FETCH_POST_FULFILLED = 'FETCH_POST_FULFILLED';
const FETCH_POST_REJECTED = 'FETCH_POST_REJECTED';


class PostContainer extends Component {

    constructor(props) {
        super(props);
    }

    componentWillUpdate(){
        const props = this.props;
    }

    render() {
        const post = this.props.post;

        return (
            <div className="post-container">
                <h2>{post.title}</h2>
                <div>{post.html}</div>
            </div>
        );
    }
}

const postMapStateToProps = (state, ownProps) => {
    return {
        post: state.post.payload
    };
};

const postMapDispatchToProps = (dispatch, ownProps) => {
    // Return Props;
    return {
        fetch: (id) => {
            dispatch(post.actions.fetchPost(ownProps.id));
        }
    };
};


PostContainer = connect(postMapStateToProps, postMapDispatchToProps)(PostContainer);


let oldId = null;

const Index = (props) => {
    const store = props.resolves.store;
    const postId = props.resolves.$stateParams.postId;

    if(oldId != postId) {
        oldId = postId;
        store.dispatch(post.actions.fetchPost(postId));
    }

    return (
        <Provider store={store}>
            <PostContainer id={postId} />
        </Provider>
    );
};


export default Index;