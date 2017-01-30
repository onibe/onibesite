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
            <button className="btn btn-default btn-xs"
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
        e.preventDefault();

        this.props.onSubmit(this.refs.tag.value);
    }

    render() {
        const { tags } = this.props;
        const mapTags = sortBy(Object.keys(tags || []).map(key => tags[key]), 'createdAt');

        return (
            <form onSubmit={this.handleSubmit}>
                <div className="tag-list rvoffset2">
                {mapTags.map(tag => <TagItemButton key={tag.id}
                                        onClick={this.removeTag}
                                        tag={tag}  />)}
                </div>
                <input className="form-control"
                     placeholder="tags"
                     onChange={this.handleChange}
                     ref="tag"
                />
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