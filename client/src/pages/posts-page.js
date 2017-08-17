import React, {Component} from 'react';
import PropTypes from 'prop-types';

import {arrayFromObject} from '../utils/helpers';
import Post from '../components/post'

class PostsPage extends Component {
  static propTypes = {
    posts: PropTypes.object.isRequired
  }

  render() {
    const {posts} = this.props
    const postsArray = arrayFromObject(posts, 'id');
    return (
      <div>
        <ol>
          {postsArray.map((p) => (<Post key={p.id} post={p}/>))}
        </ol>
      </div>
    )
  }
}

export default PostsPage
