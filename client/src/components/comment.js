import React, {Component} from 'react';
import PropTypes from 'prop-types';

import {withRouter} from 'react-router-dom';

import {connect} from 'react-redux';
import * as actions from '../actions';

import timeago from 'timeago.js';
import Modal from 'react-modal';

import APIHelper from '../utils/api-helper';
import Score from './score';
import EditButtons from './edit-buttons';
import CommentForm from '../forms/comment-form';

class Comment extends Component {
  static propTypes = {
    comment: PropTypes.object.isRequired,
  }

  initialState = {
    isModalOpen: false,
  };

  constructor(props) {
    super(props);
    this.state = this.initialState;
  }

  upvoteComment() {
    const comment_id = this.props.comment.id
    APIHelper.upvoteComment(comment_id).then(comment => {
      this.props.upvoteComment({
        type: actions.UPVOTE_COMMENT,
        comment_id
      });
    });
  }

  downvoteComment() {
    const comment_id = this.props.comment.id
    APIHelper.downvoteComment(comment_id).then(comment => {
      this.props.downvoteComment({
        type: actions.DOWNVOTE_COMMENT,
        comment_id
      });
    });
  }

  deleteComment() {
    if(window.confirm('Delete Comment?')) {
      const comment_id = this.props.comment.id
      APIHelper.deleteComment(comment_id).then(() => {
        this.props.deleteComment({
          type: actions.DELETE_COMMENT,
          comment_id
        });
      });
    };
  }

  editComment() {
    this.openModel();
  }

  openModel() {
    this.setState({isModalOpen: true})
  }

  closeModal() {
    this.setState({isModalOpen: false})
  }

  generateModal(comment) {
    const {isModalOpen} = this.state;
    const modalStyle = {
      content: {
        top: '10%',
        left: '10%',
        right: '10%',
        bottom: 'auto',
      }
    };

    return (
      <Modal
        style={modalStyle}
        isOpen={isModalOpen}
        onAfterOpen={() => {}}
        onRequestClose={() => {}}
        closeTimeoutMS={0}
        shouldCloseOnOverlayClick={true}
        contentLabel="Edit Comment">
        <h1>Edit Comment</h1>
        <CommentForm originalComment={comment} parent_id={comment.parentId} onSubmit={() => {this.closeModal()}} onCancel={() => {this.closeModal()}}/>
      </Modal>
    )
  }

  render() {
    const {comment} = this.props
    const date = timeago().format(comment.timestamp);

    return (
      <div>
        <h3>{comment.body}</h3>
        <p>{date} | by {comment.author}</p>
        <Score score={comment.voteScore} onUpvote={() => {this.upvoteComment()}} onDownvote={() => {this.downvoteComment()}} />
        <EditButtons onEdit={() => {this.editComment()}} onDelete={() => {this.deleteComment()}}/>
        {this.generateModal(comment)}
        <hr/>
      </div>
    );
  };
}


function mapStateToProps ({ comments }) {
  return {comments};
}

function mapDispatchToProps (dispatch) {
  return {
    upvoteComment: (comment_id) => dispatch(actions.upvoteComment(comment_id)),
    downvoteComment: (comment_id) => dispatch(actions.downvoteComment(comment_id)),
    deleteComment: (comment_id) => dispatch(actions.deleteComment(comment_id)),
  }
}

export default withRouter(connect(mapStateToProps, mapDispatchToProps)(Comment));
