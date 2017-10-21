import React from 'react';
import VoteControl from './VoteControl';

export default function Post(props){
  let { id, title, category } = props;

  return ( <div>
    <a href={ `${category}/${id}` }>{title}</a>
    <VoteControl postId={id}/>
    </div> )
}
