import React, {Component} from 'react';
import PropTypes from 'prop-types';

import {Link} from 'react-router-dom'

class Category extends Component {
  static propTypes = {
    category: PropTypes.object.isRequired
  }

  render() {
    const {category} = this.props
    return (
      <div>
        <Link to={`/${category.path}`}><h2>{category.name}</h2></Link>
        <hr/>
      </div>
    );
  };
}

export default Category
