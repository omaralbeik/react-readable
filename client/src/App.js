import React, {Component} from 'react';
import PropTypes from 'prop-types'
import 'bootstrap/dist/css/bootstrap.min.css'
import './App.css';

import {Provider} from 'react-redux'

import {Route} from 'react-router-dom'
import NavigationBar from './components/NavigationBar'

import PostsPage from './pages/PostsPage'
import HomePage from './pages/HomePage'

class App extends Component {
  static propTypes = {
    store: PropTypes.object.isRequired,
  }

  render() {
    const {store} = this.props;
    return (
      <Provider store={store}>
        <div className="App">
          <NavigationBar/>
          <div className='container'>
            <Route exact path='/' component={HomePage}/>
            <Route exact path='/posts' component={PostsPage}/>
            <Route exact path='/categories' component={HomePage}/>
            <Route exact path='/comments' component={HomePage}/>
          </div>
        </div>
      </Provider>
    );
  }
}

export default App
