'use strict';

import React from 'react';
import sortBy from 'lodash/sortBy';

class TagItemButton extends React.Component {

    constructor(props) {
        super(props);

        this.handleClick = this.handleClick.bind(this);
    }

    handleClick() {
        this.props.onClick(this.props.tag);
    }

    render() {
        const tag = this.props.tag;

        return (
            <button className="tag-button btn btn-default btn-xs"
                    onClick={this.handleClick}
                    type="button">
                <span>{tag.name}</span>
                <span className="glyphicon glyphicon-remove" />
            </button>
        );
    }
}

TagItemButton.propTypes = {
    onClick: React.PropTypes.func,
    tag: React.PropTypes.object
};

class TagSearch extends React.Component {

    constructor(props) {
        super(props);

        this.handleChange = this.handleChange.bind(this);
        this.handleSubmit = this.handleSubmit.bind(this);
        this.removeTag = this.removeTag.bind(this);
    }

    componentWillMount() {
        const props = this.props;
    }

    removeTag(tag) {
        this.props.onDelete(tag);
    }

    handleChange() {
        const { onDelete } = this.props;
        const props = this.props;
    }

    handleSubmit(e) {
        const { tags } = this.props;
        e.preventDefault();

        const newTag = { name: this.refs.tag.value };

        if(!tags.find(tag => tag.name === newTag.name)) {
            this.props.onSubmit(newTag);
            this.refs.tag.value = '';
        }

        // Clear Selection
        this.refs.tag.value = '';
    }

    render() {
        const { tags } = this.props;
        const mapTags = sortBy(Object.keys(tags || []).map(key => tags[key]), 'name');

        return (
            <form onSubmit={this.handleSubmit}>
                <div className="tag-search-list">
                {mapTags.map(tag => <TagItemButton key={tag.name}
                                        onClick={this.removeTag}
                                        tag={tag}  />)}
                    <input className="tag-search-input"
                           placeholder="Add Tags"
                           onChange={this.handleChange}
                           ref="tag"
                    />
                </div>

            </form>
        );
    }
}

TagSearch.propTypes = {
    onSubmit: React.PropTypes.func,
    onDelete: React.PropTypes.func,
    tags: React.PropTypes.array
};


export default TagSearch;