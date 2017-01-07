"use strict";

import React, { PropTypes, Component } from 'react';
import { applyMiddleware, createStore } from 'redux';
import { connect, Provider } from 'react-redux';
import thunk  from 'redux-thunk';
import logger from 'redux-logger';
import promise from 'redux-promise-middleware';
import Input from './input.jsx';

import api from '../api/api';


const LOGIN_CHANGE = 'LOGIN_CHANGE';
const LOGIN_REQUEST = 'LOGIN_REQUEST';
const LOGIN_REQUEST_PENDING = 'LOGIN_REQUEST_PENDING';
const LOGIN_REQUEST_FULFILLED = 'LOGIN_REQUEST_FULFILLED';
const LOGIN_REQUEST_REJECTED = 'LOGIN_REQUEST_REJECTED';
const LOGIN_RECEIVE_AUTH = 'LOGIN_RECEIVE_AUTH';

const loginCredentials = (form) => {
    return {
        type: LOGIN_CHANGE,
        value: form,
    };
};

const loginReceiveAuth = (form, session) => {
    return {
        type: LOGIN_RECEIVE_AUTH,
        value: form,
        session: session
    };
};

const loginRequest = (data) => {
    return {
        type: LOGIN_REQUEST,
        payload: api.testRequest(data)
    };
};

const loginReducer = (state = {}, action) => {
    if(action.type === LOGIN_CHANGE){
        return Object.assign({}, state, action.value);
    } else if(action.type === LOGIN_REQUEST_PENDING) {
        return Object.assign({}, state, {fetching: true});
    } else if(action.type === LOGIN_REQUEST_FULFILLED) {
        return Object.assign({}, state, {fetching: false, fetched: true, login: action.payload});
    } else if(action.type === LOGIN_REQUEST_REJECTED) {
        return Object.assign({}, state, {fetching: false, fetched: true, error: action.payload});
    }

    return state;
};

const middleware = applyMiddleware(promise(), thunk, logger());
const store = createStore(loginReducer, middleware);

const LoginFormMapStateToProps = (state, ownProps) => {
    // Return Props;
    return {
        form: state
    };
};

const LoginFormMapDispatchToProps = (dispatch, ownProps) => {
    const form = {};
    const formElement = {};

    // Return Props;
    return {
        onSubmit: (e) => {
            e.preventDefault();
            dispatch(loginRequest(form));
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

let LoginErrorHandler = ({form}) => {
    let wat = null;
    if(form.username && form.password) {
        if(form.password === 'secret') {
            wat = 1;
        }
    }
    return (
        <div className="">
            {wat}
        </div>
    );
};


let LoginForm = ({form, onChange, onSubmit, refNode}) => {
    return (
        <div className="container">
            <LoginErrorHandler form={form} />
        <h2>Login</h2>
        <form onSubmit={onSubmit}>
            <Input
                label="Username"
                type="text"
                reference={refNode('username')}
                onChange={onChange('username')}
                defaultValue={form.username}
            />
            <Input
                label="Password"
                type="password"
                reference={refNode('password')}
                onChange={onChange('password')}
                defaultValue={form.password}
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