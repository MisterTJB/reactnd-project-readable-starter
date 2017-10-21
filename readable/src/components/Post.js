import React from 'react';
import VoteControl from './VoteControl';
import moment from 'moment';

export default function Post(props){
  let { id, title, category, voteScore, timestamp } = props;

  return (
    <div>
      <a href={ `/${category}/${id}` }>{title}</a>
      <span>{moment(Number(timestamp)).fromNow()}</span><span>{voteScore} votes</span>
      <VoteControl postId={id}/>
    </div>
  )
}
