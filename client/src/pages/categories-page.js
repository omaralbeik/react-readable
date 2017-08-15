import React, { Component } from 'react';
import { connect } from 'react-redux'

import APIHelper from '../utils/api-helper'
import * as actions from '../actions'

class CategoriesPage extends Component {
  constructor(props) {
    super(props);
    this.fetchCategories();
  }

  fetchCategories() {
    APIHelper.fetchCategories().then(categories => {
      this.props.setCategories({
        type: actions.SET_CATEGORIES,
        categories
      });
    });
  }

  render() {
    var categories = this.props.categories || [];
    return (
      <div>
        <h1>Ctegories</h1>
        <ol>
          {categories.map((c) => (<li key={c.name}>{c.name}</li>))}
        </ol>
      </div>
    )
  }

}


function mapStateToProps ({ categories }) {
  return {
    categories
  }
}

function mapDispatchToProps (dispatch) {
  return {
    setCategories: (categories) => dispatch(actions.setCategories(categories))
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(CategoriesPage);
