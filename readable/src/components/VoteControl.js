import React, { Component } from 'react';
import { connect } from 'react-redux';
import { upvotePost, downvotePost } from '../actions';
import { incrementVote as apiIncrement, decrementVote as apiDecrement } from '../utilities/api';


class VoteControl extends Component {

  incrementVote = _ => {
    let { upvote, postId } = this.props;

    apiIncrement(postId).then( _ => {
      upvote(postId)
    })

  }

  decrementVote = _ => {
    let { downvote, postId } = this.props;
    apiDecrement(postId).then( _ => {
      downvote(postId)
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
    upvote: d => dispatch(upvotePost(d)),
    downvote: d => dispatch(downvotePost(d))
  }
}

export default connect(undefined, mapDispatchToProps)(VoteControl)
