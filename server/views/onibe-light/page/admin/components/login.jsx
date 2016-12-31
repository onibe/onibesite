"use strict";

import React, { PropTypes, Component } from 'react';
import { applyMiddleware, createStore } from 'redux';
import { connect, Provider } from 'react-redux';
import thunk  from 'redux-thunk';
import logger from 'redux-logger';
import Input from './input.jsx';


const LOGIN_CHANGE = 'LOGIN_CHANGE';
const LOGIN_REQUEST = 'LOGIN_REQUEST';
const LOGIN_RECEIVE_AUTH = 'LOGIN_RECEIVE_AUTH';

const loginCredentials = (form) => {
    return {
        type: LOGIN_CHANGE,
        value: form,
    }
};

const loginRequest = (form) => {
    return {
        type: LOGIN_REQUEST,
        value: form
    }
};

const loginReceiveAuth = (form, session) => {
    return {
        type: LOGIN_RECEIVE_AUTH,
        value: form,
        session: session
    }
};


const loginReducer = (state = {username: 1, password: 1}, action) => {
    if(action.type === LOGIN_CHANGE){
        return Object.assign({}, state, action.value);
    }

    return state;
};

const middleware = applyMiddleware(thunk, logger());
const store = createStore(loginReducer, middleware);

const LoginFormMapStateToProps = (state, ownProps) => {
    // Return Props;
    return {
        state: state
    };
};

const LoginFormMapDispatchToProps = (dispatch, ownProps) => {
    const form = {};
    const formElement = {};

    // Return Props;
    return {
        onSubmit: (e) => {
            e.preventDefault();
            dispatch(loginCredentials(form));
        },
        onChange: (key) => (value) => {
            form[key] = value;
            dispatch(loginCredentials(form));
        },
        refNode : (key) => (value) => {
            formElement[key] = value;
        }
    };
};

let LoginForm = ({state, onChange, onSubmit, refNode}) => {
    return (<div className="container">
        <h2>Login</h2>
        <form onSubmit={onSubmit}>
            <Input
                label="Username"
                type="text"
                reference={refNode('username')}
                onChange={onChange('username')}
                defaultValue={state.username}
            />
            <Input
                label="Password"
                type="password"
                reference={refNode('password')}
                onChange={onChange('password')}
                defaultValue={state.password}
            />
            <button type="submit" className="btn btn-default">Submit</button>
        </form>
    </div>);
};

// Connect this component to store
LoginForm = connect(LoginFormMapStateToProps, LoginFormMapDispatchToProps)(LoginForm);

const Index = () => (
    <Provider store={store}>
        <LoginForm otherProp="otherPropValue" />
    </Provider>
);

export default Index;