import React from 'react';
import CommentVoteControl from './CommentVoteControl';

export default function Comment( { id, timestamp, body, author, voteScore } ){
  return <div>
      <h1>{author}</h1>
      <p>{body} ({voteScore} votes)</p>
      <CommentVoteControl id={id} />
      </div>
}
