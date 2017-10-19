import React from 'react';

export default function Comment( { id, timestamp, body, author, voteScore } ){
  return <div><h1>{author}</h1><p>{body}</p></div>
}
