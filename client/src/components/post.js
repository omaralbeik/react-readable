import React, {Component} from 'react';
import PropTypes from 'prop-types';

import {Link, withRouter} from 'react-router-dom';

import {connect} from 'react-redux';
import * as actions from '../actions';

import APIHelper from '../utils/api-helper';
import timeago from 'timeago.js';

import Score from './score'
import EditButtons from './edit-buttons'

class Post extends Component {
  static propTypes = {
    post: PropTypes.object.isRequired,
    is_detail: PropTypes.bool,
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

  generateBody() {
    const {post} = this.props
    const date = timeago().format(post.timestamp);
    const {is_detail} = this.props;
    var title, editButtons;
    if (is_detail) {
      title = <h1>{post.title}</h1>;
      editButtons = <EditButtons onEdit={() => {}} onDelete={() => {this.deletePost()}}/>;
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
