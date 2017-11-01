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

    let { removeComment, comment } = this.props;
    deleteComment(comment.id).then( _ => {
      removeComment(comment);
    })
  }

  render() {

    let { author, voteScore, timestamp, id, body } = this.props.comment;

    return this.state.isEditing 
    ? 
    <div className="comment__container">
      <CommentEditForm  finishedEditing={this.disableEditing} 
                        commentId={id}
                        body={body} />
    </div>
    :
     <div className="comment__container">
        <h1 className="comment__author">{author}</h1>
        <span className="comment__time">{ moment(Number(timestamp)).fromNow() }</span>
        <span className="comment__score"> ({voteScore} votes)</span>
        <p className="comment__body">{body}</p>
        <CommentVoteControl id={id} />
        <button className="button" onClick={this.enableEditing}>Edit</button>
        <button className="button" onClick={this.deleteComment}>Delete</button>
        
        
        
      </div>
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
