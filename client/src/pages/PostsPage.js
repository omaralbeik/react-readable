import React, { Component } from 'react';
import { connect } from 'react-redux'

import APIHelper from '../utils/apihelper'
import * as actions from '../actions'

class PostsPage extends Component {
  constructor(props) {
    super(props);
    this.getPosts();
  }

  getPosts() {
    APIHelper.getPosts().then(posts => {
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
        <h1>Posts</h1>
        <ul>
          {posts.map((p) => (<li key={p.id}>{p.title}</li>))}
        </ul>
      </div>
    )
  }

}


function mapStateToProps ({ posts }) {
  return {
    posts
  }
}

function mapDispatchToProps (dispatch) {
  return {
    setPosts: (posts) => dispatch(actions.setPosts(posts))
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(PostsPage);
