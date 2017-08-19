import React, {Component} from 'react';

import 'bootstrap/dist/css/bootstrap.min.css'
import './App.css';

import {Switch, Redirect, Route, withRouter} from 'react-router-dom'

import NavigationBar from './components/navigation-bar'
import PostsPage from './pages/posts-page'
import PostDetailsPage from './pages/post-details-page'
import CategoriesPage from './pages/categories-page'
import AboutPage from './pages/about-page'

import {connect} from 'react-redux'

import APIHelper from './utils/api-helper'
import * as actions from './actions'

class App extends Component {
  constructor(props) {
    super(props);
    this.fetchPosts();
    this.fetchCategories();
  }

  fetchPosts() {
    APIHelper.fetchPosts().then(posts => {
      this.props.loadPosts({type: actions.LOAD_POSTS, posts});
    });
  }

  fetchCategories() {
    APIHelper.fetchCategories().then(categories => {
      this.props.loadCategories({type: actions.LOAD_CATEGORIES, categories});
    });
  }

  render() {
    const {posts, categories} = this.props
    return (
      <div className="App">
        <NavigationBar/>
        <div className='container'>
          <Switch>
            <Redirect exact from="/" to="/posts" />
            <Route exact path='/posts' render={() => (<PostsPage posts={posts}/>)}/>
            <Route exact path='/posts/:post_id' component={PostDetailsPage}/>
            <Route exact path='/categories' render={() => (<CategoriesPage categories={categories}/>)}/>
            <Route exact path='/about' component={AboutPage}/>
          </Switch>
        </div>
      </div>
    );
  }
}

function mapStateToProps({posts, categories}) {
  return {posts, categories}
}

function mapDispatchToProps(dispatch) {
  return {
    loadPosts: (posts) => dispatch(actions.loadPosts(posts)),
    loadCategories: (categories) => dispatch(actions.loadCategories(categories)),
  }
}

export default withRouter(connect(mapStateToProps, mapDispatchToProps)(App));
