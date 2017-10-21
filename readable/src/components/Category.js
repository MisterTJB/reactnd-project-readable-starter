import React from 'react';

export default function Category({ name, path }){
  return <a href={`/${path}`}>{name}</a>
}
