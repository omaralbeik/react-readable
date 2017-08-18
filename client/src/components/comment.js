import React, {Component} from 'react';
import PropTypes from 'prop-types';


import {connect} from 'react-redux';
import * as actions from '../actions';

import APIHelper from '../utils/api-helper';
import timeago from 'timeago.js';

import Score from './score'
import EditButtons from './edit-buttons'

class Comment extends Component {
  static propTypes = {
    comment: PropTypes.object.isRequired,
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

  render() {
    const {comment} = this.props
    const date = timeago().format(comment.timestamp);

    return (
      <div>
        <h3>{comment.body}</h3>
        <p>{date} | by {comment.author}</p>
        <Score score={comment.voteScore} onUpvote={() => {this.upvoteComment()}} onDownvote={() => {this.downvoteComment()}} />
        <EditButtons onEdit={() => {this.deleteComment()}} onDelete={() => {this.deleteComment()}}/>
        <hr/>
      </div>
    );
  };
}


function mapStateToProps ({ comments }) {
  return {
    comments,
  }
}

function mapDispatchToProps (dispatch) {
  return {
    upvoteComment: (comment_id) => dispatch(actions.upvoteComment(comment_id)),
    downvoteComment: (comment_id) => dispatch(actions.downvoteComment(comment_id)),
    deleteComment: (comment_id) => dispatch(actions.deleteComment(comment_id)),
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(Comment)
