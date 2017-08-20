import React, {Component} from 'react';
import PropTypes from 'prop-types';

import {connect} from 'react-redux';
import * as actions from '../actions';

import {FormGroup, FormControl, ControlLabel, Button, ButtonGroup} from 'react-bootstrap';

import APIHelper from '../utils/api-helper';
import {arrayFromObject} from '../utils/helpers';

class PostForm extends Component {
  static propTypes = {
    originalPost: PropTypes.object,
    defaultCategory: PropTypes.string,
    onSubmit: PropTypes.func,
    onCancel: PropTypes.func,
  }

  initialState = {
    author: '',
    category: 'select',
    title: '',
    body: '',
  };

  constructor(props) {
    super(props);

    this.state = this.initialState;
    this.handleChange = this.handleChange.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
  }

  componentDidMount() {
    const {originalPost, defaultCategory} = this.props;
    if (originalPost) {
      this.setState({
        author: originalPost.author,
        category: originalPost.category,
        title: originalPost.title,
        body: originalPost.body});
    } else {
      if (defaultCategory) {
        this.setState({category: defaultCategory})
      }
    }
  }

  // Return true if all author, title and body inputs has text
  getFormValidationState() {
    const {author, category, title, body} = this.state;
    return (author < 1 || title < 1 || body < 1 || category === 'select');
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

    const {originalPost} = this.props;
    if (originalPost) { // should edit an existing post
      this.editPost();
    } else { // should create a new post
      this.createPost();
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

  // create a new post
  createPost() {
    const {author, category, title, body} = this.state;

    APIHelper.createPost(author, category, title, body).then(newPost => {
      this.props.addPost({
        type: actions.ADD_POST,
        post: newPost
      });
      // reset state after submitting form
      this.setState(this.initialState);
    })
  }

  // edit existing post
  editPost() {
    const {originalPost} = this.props;
    const {author, category, title, body} = this.state;

    APIHelper.editPost(originalPost.id, author, category, title, body).then(newPost => {
      this.props.editPost({
        type: actions.EDIT_POST,
        post: newPost
      });
    });
  }

  generateFormButtons() {
    const {originalPost} = this.props;
    const buttonText = originalPost ? "Save" : "Add";

    if (originalPost) {
      return (
        <ButtonGroup>
          <Button bsStyle="primary" type="submit" disabled={this.getFormValidationState()}>{buttonText}</Button>
          <Button onClick={() => {
            this.handleCancel()
          }}>Cancel</Button>
        </ButtonGroup>
      );
    } else {
      return <Button bsStyle="primary" type="submit" disabled={this.getFormValidationState()}>{buttonText}</Button>;
    }
  }

  render() {
    const {author, category, title, body} = this.state
    const {categories} = this.props;
    const categoriesArray = arrayFromObject(categories, 'name');

    return (
      <form onSubmit={this.handleSubmit}>
        <FormGroup controlId="postAuthor">
          <ControlLabel>Author</ControlLabel>
          <FormControl type="text" name="author" placeholder="Author Name" value={author} onChange={this.handleChange}/>
        </FormGroup>
        <FormGroup controlId="postCategory">
          <ControlLabel>Category</ControlLabel>
          <FormControl componentClass="select" name="category" placeholder="select" value={category} onChange={this.handleChange}>
            <option value="select">Select category</option>
            {categoriesArray.map(c => (<option key={c.path} value={c.path}>{c.name}</option>))}
          </FormControl>
        </FormGroup>
        <FormGroup controlId="postTitle">
          <ControlLabel>Title</ControlLabel>
          <FormControl type="text" name="title" placeholder="Title" value={title} onChange={this.handleChange}/>
        </FormGroup>
        <FormGroup controlId="postBody">
          <ControlLabel>Body</ControlLabel>
          <FormControl componentClass="textarea" name="body" placeholder="Body" value={body} onChange={this.handleChange}/>
        </FormGroup>
        {this.generateFormButtons()}
      </form>
    )
  }
}

function mapStateToProps ({ post, categories }) {
  return {
    post,
    categories,
  }
}

function mapDispatchToProps (dispatch) {
  return {
    addPost: (post) => dispatch(actions.addPost(post)),
    editPost: (post) => dispatch(actions.editPost(post)),
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(PostForm)
