import React, { Component } from 'react';
import { connect } from 'react-redux';
import { deleteComment } from '../utilities/api';
import { removeComment } from '../actions';
import CommentVoteControl from './CommentVoteControl';
import CommentEditForm from './CommentEditForm';

class Comment extends Component {

  state = {
    isEditing: false
  }

  enableEditing = _ => {
    this.setState({isEditing: true})
  }

  disableEditing = _ => {
    this.setState({isEditing: false})
  }

  deleteComment = _ => {

    let { id, removeComment } = this.props;
    deleteComment(id).then( _ => {
      removeComment(id);
    })
  }

  render() {

    let { author, voteScore, id, body } = this.props;
    return (<div>
      <h1>{author}</h1>

      { this.state.isEditing  ? <CommentEditForm finishedEditing={this.disableEditing} commentId={id} body={body} /> : <p>{body}</p> }
      <button onClick={this.enableEditing}>Edit</button>
      <button onClick={this.deleteComment}>Delete</button>
      <p>({voteScore} votes)</p>
      <CommentVoteControl id={id} />
    </div>)
  }
}

const mapDispatchToProps = dispatch => {
  return {
    removeComment: d => dispatch(removeComment(d))
  }
}

export default connect(_ => ({}), mapDispatchToProps)(Comment);
