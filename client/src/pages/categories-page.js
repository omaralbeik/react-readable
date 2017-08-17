import React, {Component} from 'react';
import PropTypes from 'prop-types';

import Category from '../components/category'

class CategoriesPage extends Component {
  static propTypes = {
    categories: PropTypes.array.isRequired
  }

  render() {
    var {categories} = this.props;
    return (
      <div>
        <ol>
          {categories.map((c) => (<Category key={c.path} category={c}/>))}
        </ol>
      </div>
    )
  }
}

export default CategoriesPage
