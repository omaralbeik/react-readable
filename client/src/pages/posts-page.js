import React, {Component} from 'react';

import {connect} from 'react-redux';

import {getSortedPostsArray} from '../utils/helpers';
import Post from '../components/post';
import PostForm from '../forms/post-form';
import SortButtons from '../components/sort-buttons';

class PostsPage extends Component {

  render() {
    const {posts} = this.props
    const {sorting} = this.props.prefrences;
    const postsArray = getSortedPostsArray(posts, sorting);
    return (
      <div>
        <h1>All Posts</h1>
        <SortButtons/>
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

function mapStateToProps({posts, prefrences}) {
  return {posts, prefrences}
}

export default connect(mapStateToProps)(PostsPage);
