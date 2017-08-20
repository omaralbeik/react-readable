import React, {Component} from 'react';
import PropTypes from 'prop-types';

import {withRouter} from 'react-router-dom';

import {arrayFromObject} from '../utils/helpers';
import Post from '../components/post';
import PostForm from '../forms/post-form';

class CategoryPage extends Component {
  static propTypes = {
    posts: PropTypes.object.isRequired
  }

  isCategoryAvailable() {
    const {categories} = this.props;
    const {category_name} = this.props.match.params;
    return categories.hasOwnProperty(category_name);
  }

  generateTitle(category_name) {
    if (!this.isCategoryAvailable()) {
      return (
        <div>
          <h1>Category does not exist</h1>
          <h2>¯\_(ツ)_/¯</h2>
        </div>
      );
    } else {
      return <h1>All <strong>{category_name.toUpperCase()}</strong> Posts</h1>
    }
  }
  
  render() {
    const {posts} = this.props
    const {category_name} = this.props.match.params
    const postsArray = arrayFromObject(posts, 'id');
    const categoryPosts = postsArray.filter(p => (p.category === category_name));

    return (
      <div>
        {this.generateTitle(category_name)}
        <br/>
        <ol>
          {categoryPosts.map((p) => (<Post key={p.id} post={p}/>))}
        </ol>
        <div className="addPostContainer">
          <h3>Add New Post</h3>
          <PostForm defaultCategory={category_name}/>
        </div>
      </div>
    )
  }
}

export default withRouter(CategoryPage)
