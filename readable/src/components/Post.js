import React from 'react';
import VoteControl from './VoteControl';

// should show the details of a post, including: Title, Body, Author, timestamp (in user readable format), and vote score
// should list all of the comments for that post, ordered by voteScore (highest first)
// should have controls to edit or delete the post
// should have a control to add a new comment.
// implement comment form however you want (inline, modal, etc.)
// comments should also have controls for editing or deleting
export default function Post(props){
  let { id, title, category } = props;

  return ( <div>
    <a href={ `${category}/${id}` }>{title}</a>
    <VoteControl postId={id}/>
    </div> )
}
