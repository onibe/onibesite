'use strict';

import React from 'react';
import { connect, Provider } from 'react-redux';
import sortBy from 'lodash/sortBy';

import {UIView, UISrefActive, UISref} from 'ui-router-react';
import tags from './tags-reducer';

export const TagItem = (props) => {
    const tag = props.tag;
    const onDelete = props.onDelete;

    return <label className="label label-default">
        <span>{tag.name}</span>
        {onDelete ? <span onClick={onDelete}>x</span> : ''}
    </label>;
};


class TagsContainer extends React.Component {
    constructor(props) {
        super(props);
    }

    componentWillMount() {
        const props = this.props;

        if(!props.fetched){
            props.fetch();
        }
    }

    render() {
        const tags = this.props.tags;
        const mapTags = sortBy(Object.keys(tags).map(key => tags[key]), 'createdAt');

        return (<div className="tags-container">
            {mapTags.map(tag => <TagItem key={tag.id} tag={tag} />)}
        </div>);
    }
}

const TagsMapStateToProps = (state) => {
    return {
        tags: state.tags.payload,
        fetched: state.tags.fetched
    };
};

const TagsMapDispatchToProps = (dispatch) => {
    const form = {};

    return {
        fetch: (options) => {
            dispatch(tags.actions.fetchTags(options));
        }
    };
};


TagsContainer = connect(TagsMapStateToProps, TagsMapDispatchToProps)(TagsContainer);

const Index = (props) => {
    const store = props.resolves.store;

    return (
        <Provider store={store}>
            <TagsContainer />
        </Provider>
    );
};

export default Index;