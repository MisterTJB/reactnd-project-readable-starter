import React, { Component } from 'react';
import { connect } from 'react-redux';
import { deleteComment } from '../utilities/api';
import { removeComment } from '../actions';
import CommentVoteControl from './CommentVoteControl';
import CommentEditForm from './CommentEditForm';
import moment from 'moment';

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

    let { author, voteScore, timestamp, id, body } = this.props.comment;
    
    return (
      <div>
        <h1>{author}</h1>

        { this.state.isEditing
          ? <CommentEditForm  finishedEditing={this.disableEditing}
                              commentId={id}
                              body={body} />
          : <p>{body}</p>
        }
        <button onClick={this.enableEditing}>Edit</button>
        <button onClick={this.deleteComment}>Delete</button>
        <span>{ moment(Number(timestamp)).fromNow() }</span>
        <span>({voteScore} votes)</span>
        <CommentVoteControl id={id} />
      </div>)
  }
}

const mapStateToProps = (state, ownProps) => {
  return {
    comment: state.comments.filter( c => c.id === ownProps.id)[0]
  }
}

const mapDispatchToProps = dispatch => {
  return {
    removeComment: d => dispatch(removeComment(d))
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(Comment);
