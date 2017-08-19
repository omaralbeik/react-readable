import React, {Component} from 'react';
import PropTypes from 'prop-types';

import {ButtonGroup, Button, Glyphicon} from 'react-bootstrap';

class Score extends Component {
  static propTypes = {
    score: PropTypes.number.isRequired,
    onUpvote: PropTypes.func.isRequired,
    onDownvote: PropTypes.func.isRequired,
  }

  render() {
    const {score, onUpvote, onDownvote} = this.props
    return (
      <ButtonGroup bsSize="xsmall" className="scoreButtons">
        <Button><Glyphicon glyph="triangle-bottom" onClick={() => {onDownvote()}}/></Button>
        <div className="btn score-label">{score}</div>
        <Button><Glyphicon glyph="triangle-top" onClick={() => {onUpvote()}}/></Button>
      </ButtonGroup>
    )
  }
}

export default Score
