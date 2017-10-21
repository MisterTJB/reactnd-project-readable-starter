import React, { Component } from 'react';
import CommentVoteControl from './CommentVoteControl';
import CommentEditForm from './CommentEditForm';

export default class Comment extends Component {

  state = {
    isEditing: false
  }

  enableEditing = _ => {
    this.setState({isEditing: true})
  }

  disableEditing = _ => {
    this.setState({isEditing: false})
  }

  render() {

    let { author, voteScore, id, body } = this.props;
    return (<div>
      <h1>{author}</h1>

      { this.state.isEditing  ? <CommentEditForm finishedEditing={this.disableEditing} commentId={id} body={body} /> : <p>{body}</p> }
      <button onClick={this.enableEditing}>Edit</button>
      <p>({voteScore} votes)</p>
      <CommentVoteControl id={id} />
    </div>)
  }
}
