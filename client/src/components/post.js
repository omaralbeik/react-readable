import React, {Component} from 'react';
import PropTypes from 'prop-types';

import {Link} from 'react-router-dom';

import {connect} from 'react-redux';
import * as actions from '../actions';

import APIHelper from '../utils/api-helper';
import {ButtonGroup, Button, Glyphicon} from 'react-bootstrap';
import timeago from 'timeago.js';;

class Post extends Component {
  static propTypes = {
    post: PropTypes.object.isRequired
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
    APIHelper.downvotePost(post_id).then(post => {
      this.props.downvotePost({
        type: actions.DOWNVOTE_POST,
        post_id
      });
    });
  }


  render() {
    const {post} = this.props
    const date = timeago().format(post.timestamp);
    return (
      <li>
        <Link to={`/posts/${post.id}`} ><h1>{post.title}</h1></Link>
        <p>{date} | by {post.author} | in <Link to={`/${post.category}`}>{post.category}</Link></p>
        <p>{post.body}</p>
        <ButtonGroup bsSize="xsmall">
          <Button><Glyphicon glyph="triangle-bottom" onClick={() => {this.downvotePost()}}/></Button>
          <div className="btn score-label">{post.voteScore}</div>
          <Button><Glyphicon glyph="triangle-top" onClick={() => {this.upvotePost()}}/></Button>
        </ButtonGroup>
        <hr/>
      </li>
    );
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
  }
}

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(Post)
