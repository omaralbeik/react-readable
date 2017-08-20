import React, {Component} from 'react';

import 'bootstrap/dist/css/bootstrap.min.css';
import './App.css';

import {Switch, Route, withRouter} from 'react-router-dom';

import NavigationBar from './components/navigation-bar';
import PostsPage from './pages/posts-page';
import CategoryPage from './pages/category-page';
import PostDetailsPage from './pages/post-details-page';

import {connect} from 'react-redux';

import APIHelper from './utils/api-helper';
import * as actions from './actions';

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
    return (
      <div className="App">
        <NavigationBar/>
        <div className='container'>
          <Switch>
            <Route exact path='/' component={PostsPage}/>
            <Route exact path='/:category_name' component={CategoryPage}/>
            <Route exact path='/:category_name/:post_id' component={PostDetailsPage}/>
          </Switch>
        </div>
      </div>
    );
  }
}

function mapStateToProps() {}

function mapDispatchToProps(dispatch) {
  return {
    loadPosts: (posts) => dispatch(actions.loadPosts(posts)),
    loadCategories: (categories) => dispatch(actions.loadCategories(categories))
  }
}

export default withRouter(connect(mapStateToProps, mapDispatchToProps)(App));
