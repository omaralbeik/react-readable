import React, {Component} from 'react';
import PropTypes from 'prop-types';

import {arrayFromObject} from '../utils/helpers';
import Category from '../components/category'

class CategoriesPage extends Component {
  static propTypes = {
    categories: PropTypes.object.isRequired
  }

  render() {
    const {categories} = this.props;
    const categoriesArray = arrayFromObject(categories, 'name');
    return (
      <div>
        <ol>
          {categoriesArray.map((c) => (<Category key={c.path} category={c}/>))}
        </ol>
      </div>
    )
  }
}

export default CategoriesPage
