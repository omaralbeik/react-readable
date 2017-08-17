import React, {Component} from 'react';
import PropTypes from 'prop-types';

import Post from '../components/post'

class PostsPage extends Component {
  static propTypes = {
    posts: PropTypes.array.isRequired
  }

  render() {
    const {posts} = this.props
    return (
      <div>
        <ol>
          {posts.map((p) => (<Post key={p.id} post={p}/>))}
        </ol>
      </div>
    )
  }
}

export default PostsPage
