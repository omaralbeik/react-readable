import React, {Component} from 'react';
import PropTypes from 'prop-types';

import {connect} from 'react-redux';
import * as actions from '../actions';

import {FormGroup, FormControl, ControlLabel, Button} from 'react-bootstrap';

import APIHelper from '../utils/api-helper';

class CommentForm extends Component {
  static propTypes = {
    parent_id: PropTypes.string.isRequired,
    comment: PropTypes.object,
  }

  initialState = {
    author: '',
    body: '',
  };

  constructor(props) {
    super(props);
    this.state = this.initialState;
    this.handleChange = this.handleChange.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
  }

  getFormValidationState() {
    const {author, body} = this.state;
    return (author > 0 && body > 0);
  }

  handleChange(event) {
    const {name, value} = event.target;
    this.setState({ [name]: value });
  }

  handleSubmit(event) {
    event.preventDefault();
    const {parent_id} = this.props;
    const {author, body} = this.state;

    if (!this.getFormValidationState()) {
      console.error("Author and comment body are required to add a comment");
      return;
    }

    APIHelper.createComment(parent_id, author, body).then(comment => {
      this.props.addComment({
        type: actions.ADD_COMMENT,
        comment
      });
      // reset state after submitting form
      this.setState(this.initialState);
    })
  }

  render() {
    const {comment, onSubmit} = this.props
    return (
      <form onSubmit={this.handleSubmit}>
        <FormGroup controlId="commentAuthor">
          <ControlLabel>Author</ControlLabel>
          <FormControl
            type="text"
            name="author"
            placeholder="Author Name"
            value={this.state.author}
            onChange={this.handleChange}/>
        </FormGroup>
        <FormGroup controlId="commentBody">
          <ControlLabel>Comment</ControlLabel>
          <FormControl
            componentClass="textarea"
            name="body"
            placeholder="Comment"
            value={this.state.body}
            onChange={this.handleChange}/>
        </FormGroup>
        <Button type="submit" disabled={!this.getFormValidationState()}>Submit</Button>
      </form>
    )
  }
}

function mapStateToProps ({ comment }) {
  return {
    comment,
  }
}

function mapDispatchToProps (dispatch) {
  return {
    addComment: (comment) => dispatch(actions.addComment(comment)),
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(CommentForm)
