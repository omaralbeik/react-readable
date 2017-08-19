import React, {Component} from 'react';
import PropTypes from 'prop-types';

import {Link, withRouter} from 'react-router-dom';

import Modal from 'react-modal';

import {connect} from 'react-redux';
import * as actions from '../actions';

import APIHelper from '../utils/api-helper';
import timeago from 'timeago.js';

import Score from './score'
import EditButtons from './edit-buttons'
import PostForm from './post-form';

class Post extends Component {
  static propTypes = {
    post: PropTypes.object.isRequired,
    is_detail: PropTypes.bool,
  }

  initialState = {
    isModalOpen: false,
  };

  constructor(props) {
    super(props);
    this.state = this.initialState;
  }

  upvotePost() {
    const post_id = this.props.post.id
    APIHelper.upvotePost(post_id).then(post => {
      this.props.upvotePost({
        type: actions.UPVOTE_POST,
        post_id
      });
    });
  }

  downvotePost() {
    const post_id = this.props.post.id
    APIHelper.downvotePost(post_id).then(() => {
      this.props.downvotePost({
        type: actions.DOWNVOTE_POST,
        post_id
      });
    });
  }

  deletePost() {
    if(window.confirm('Delete Post?')) {
      const post_id = this.props.post.id
      APIHelper.deletePost(post_id).then(() => {
        this.props.deletePost({
          type: actions.DELETE_POST,
          post_id
        });
        this.props.history.push('/posts');
      });
    };
  }

  editPost() {
    this.openModel();
  }

  openModel() {
    this.setState({isModalOpen: true})
  }

  closeModal() {
    this.setState({isModalOpen: false})
  }

  generateBody() {
    const {isModalOpen} = this.state;
    const {post} = this.props
    const date = timeago().format(post.timestamp);
    const {is_detail} = this.props;

    const modalStyle = {
      content: {
        top: '10%',
        left: '10%',
        right: '10%',
        bottom: 'auto',
      }
    };

    var title, editButtons;
    if (is_detail) {
      title = <h1>{post.title}</h1>;
      editButtons = <EditButtons onEdit={() => {this.editPost()}} onDelete={() => {this.deletePost()}}/>;
    } else {
      title = <Link to={`/posts/${post.id}`} ><h1>{post.title}</h1></Link>;
      editButtons = null;
    }
    return (
      <div>
        {title}
        <p>{date} | by {post.author} | in <Link to={`/${post.category}`}>{post.category}</Link></p>
        <p>{post.body}</p>
        <Score score={post.voteScore} onUpvote={() => {this.upvotePost()}} onDownvote={() => {this.downvotePost()}} />
        {editButtons}
        <Modal
          style={modalStyle}
          isOpen={isModalOpen}
          onAfterOpen={() => {}}
          onRequestClose={() => {}}
          closeTimeoutMS={0}
          shouldCloseOnOverlayClick={true}
          contentLabel="Edit Post">
          <h1>Edit Post</h1>
          <PostForm originalPost={post} onSubmit={() => {this.closeModal()}} onCancel={() => {this.closeModal()}}/>
        </Modal>
        <hr/>
      </div>
    );
  }

  render() {
    return this.generateBody();
  };
}


function mapStateToProps ({ posts }) {
  return {
    posts,
  }
}

function mapDispatchToProps (dispatch) {
  return {
    upvotePost: (post_id) => dispatch(actions.upvotePost(post_id)),
    downvotePost: (post_id) => dispatch(actions.downvotePost(post_id)),
    deletePost: (post_id) => dispatch(actions.deletePost(post_id)),
  }
}

export default withRouter(connect(
  mapStateToProps,
  mapDispatchToProps
)(Post))
