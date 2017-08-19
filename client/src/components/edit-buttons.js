import React, {Component} from 'react';
import PropTypes from 'prop-types';

import {ButtonGroup, Button} from 'react-bootstrap';

class EditButtons extends Component {
  static propTypes = {
    onEdit: PropTypes.func.isRequired,
    onDelete: PropTypes.func.isRequired,
  }

  render() {
    const {onEdit, onDelete} = this.props
    return (
      <ButtonGroup bsSize="xsmall">
        <Button bsStyle="primary" onClick={() => {}}>Edit</Button>
        <Button bsStyle="danger" onClick={() => {onDelete()}}>Delete</Button>
      </ButtonGroup>
    )
  }
}

export default EditButtons
