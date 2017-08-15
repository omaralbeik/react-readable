import React, { Component } from 'react';
import { connect } from 'react-redux'

import APIHelper from '../utils/api-helper'
import * as actions from '../actions'
import Post from '../components/post'

class PostsPage extends Component {
  constructor(props) {
    super(props);
    this.fetchPosts();
  }

  fetchPosts() {
    APIHelper.fetchPosts().then(posts => {
      this.props.setPosts({
        type: actions.SET_POSTS,
        posts
      });
    });
  }

  render() {
    var posts = this.props.posts || [];
    return (
      <div>
        <ol>
          {posts.map((p) => (<Post key={p.id} post={p} />))}
        </ol>
      </div>
    )
  }

}


function mapStateToProps ({ posts }) {
  return {
    posts,
  }
}

function mapDispatchToProps (dispatch) {
  return {
    setPosts: (posts) => dispatch(actions.setPosts(posts)),
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(PostsPage);
