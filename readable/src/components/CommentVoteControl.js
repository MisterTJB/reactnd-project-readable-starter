import React, { Component } from 'react';
import { connect } from 'react-redux';
import { upvoteComment, downvoteComment } from '../actions';
import { incrementCommentVote as apiIncrement, decrementCommentVote as apiDecrement } from '../utilities/api';

class CommentVoteControl extends Component {

  incrementVote = _ => {
    let { upvote, id } = this.props;

    apiIncrement(id).then( _ => {
      upvote(id)
    })

  }

  decrementVote = _ => {
    let { downvote, id } = this.props;
    apiDecrement(id).then( _ => {
      downvote(id)
    })
  }

  render() {
    return (
      <div className="vote-control__container">
        <button className="vote__decrement" onClick={this.decrementVote}></button>
        <button className="vote__increment" onClick={this.incrementVote}></button>
      </div>
    )
  }
}

const mapDispatchToProps = (dispatch) => {
  return {
    upvote: d => dispatch(upvoteComment(d)),
    downvote: d => dispatch(downvoteComment(d))
  }
}

export default connect(undefined, mapDispatchToProps)(CommentVoteControl)
