import React, {Component} from 'react';
import PropTypes from 'prop-types';

import {connect} from 'react-redux';
import * as actions from '../actions';

import {FormGroup, FormControl, ControlLabel, Button, ButtonGroup} from 'react-bootstrap';

import APIHelper from '../utils/api-helper';

class CommentForm extends Component {
  static propTypes = {
    parent_id: PropTypes.string.isRequired,
    originalComment: PropTypes.object,
    onSubmit: PropTypes.func,
    onCancel: PropTypes.func,
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

  componentDidMount() {
    const {originalComment} = this.props;
    if (originalComment) {
      this.setState({author: originalComment.author, body: originalComment.body});
    }
  }

  // Return true if both author and body inputs has text
  getFormValidationState() {
    const {author, body} = this.state;
    return (author < 1 || body < 1);
  }

  // update state whenever input text is changed
  handleChange(event) {
    const {name, value} = event.target;
    this.setState({ [name]: value });
  }

  // handle form submission
  handleSubmit(event) {
    event.preventDefault();

    // validate form inputs
    if (this.getFormValidationState()) {
      console.error("Author and comment body are required to add a comment");
      return;
    }

    const {originalComment} = this.props;
    if (originalComment) { // should edit an existing comment
      this.editComment();
    } else { // should create a new comment
      this.createComment();
    }
    // call onSubmit function (if available)
    const {onSubmit} = this.props;
    if (onSubmit) {
      onSubmit();
    }
  }

  // handle cancellation
  handleCancel() {
    // call onCancel function (if available)
    const {onCancel} = this.props;
    if (onCancel) {
      onCancel();
    }
  }

  // create a new comment
  createComment() {
    const {parent_id} = this.props;
    const {author, body} = this.state;

    APIHelper.createComment(parent_id, author, body).then(newComment => {
      this.props.addComment({
        type: actions.ADD_COMMENT,
        comment: newComment
      });
      // reset state after submitting form
      this.setState(this.initialState);
    })
  }

  // edit existing comment
  editComment() {
    const {originalComment} = this.props;
    const {author, body} = this.state;

    APIHelper.editComment(originalComment.id, author, body).then(newComment => {
      this.props.editComment({
        type: actions.EDIT_COMMENT,
        comment: newComment
      });
    });
  }

  generateFormButtons() {
    const {originalComment} = this.props;
    const buttonText = originalComment ? "Save" : "Add"
    if (originalComment) {
      return (
        <ButtonGroup>
          <Button bsStyle="primary" type="submit" disabled={this.getFormValidationState()}>{buttonText}</Button>
          <Button onClick={() => {this.handleCancel()}}>Cancel</Button>
        </ButtonGroup>
      );
    } else {
      return <Button bsStyle="primary" type="submit" disabled={this.getFormValidationState()}>{buttonText}</Button>;
    }
  }

  render() {
    const {author, body} = this.state

    return (
      <form onSubmit={this.handleSubmit}>
        <FormGroup controlId="commentAuthor">
          <ControlLabel>Author</ControlLabel>
          <FormControl
            type="text"
            name="author"
            placeholder="Author Name"
            value={author}
            onChange={this.handleChange}/>
        </FormGroup>
        <FormGroup controlId="commentBody">
          <ControlLabel>Comment</ControlLabel>
          <FormControl
            componentClass="textarea"
            name="body"
            placeholder="Comment"
            value={body}
            onChange={this.handleChange}/>
        </FormGroup>
        {this.generateFormButtons()}
      </form>
    )
  }
}

function mapStateToProps ({ comment }) {
  return {comment}
}

function mapDispatchToProps (dispatch) {
  return {
    addComment: (comment) => dispatch(actions.addComment(comment)),
    editComment: (comment) => dispatch(actions.editComment(comment)),
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(CommentForm)
