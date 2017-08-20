import React, {Component} from 'react';
import PropTypes from 'prop-types';

import {arrayFromObject} from '../utils/helpers';
import Post from '../components/post';
import PostForm from '../forms/post-form';

class PostsPage extends Component {
  static propTypes = {
    posts: PropTypes.object.isRequired
  }

  render() {
    const {posts} = this.props
    const postsArray = arrayFromObject(posts, 'id');
    return (
      <div>
        <h1>All Posts</h1>
        <ol>
          {postsArray.map((p) => (<Post key={p.id} post={p}/>))}
        </ol>
        <div className="addPostContainer">
          <h3>Add New Post</h3>
          <PostForm/>
        </div>
      </div>
    )
  }
}

export default PostsPage
