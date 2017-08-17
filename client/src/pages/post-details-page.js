import React, {Component} from 'react';


class PostDetailsPage extends Component {
  render() {
    const {id} = this.props.match.params
    return (
      <h1>{id}</h1>
    );
  };
}

export default PostDetailsPage
