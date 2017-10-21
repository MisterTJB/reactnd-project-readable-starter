import React from 'react';
import VoteControl from './VoteControl';

export default function Post(props){
  let { id, title, category, voteScore } = props;

  return ( <div>
    <a href={ `${category}/${id}` }>{title}</a>
    <span>{voteScore} votes</span>
    <VoteControl postId={id}/>
    </div> )
}
