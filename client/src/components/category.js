import React, {Component} from 'react';

import {Link} from 'react-router-dom'

import PropTypes from 'prop-types';

class Category extends Component {
  static propTypes = {
    category: PropTypes.object.isRequired
  }

  render() {
    const {category} = this.props
    return (
      <li>
        <Link to={`/${category.path}`}>{category.name}</Link>
      </li>
    );
  };
}
export default Category;
