import React, { Component } from 'react';
import Categories from './Categories';
import Posts from './Posts';
import PostForm from './PostForm';

class Home extends Component {
  render(){
    return (
      <main>
        <Categories />
        <Posts />
        <PostForm />
      </main>
    )
  }
}

export default Home;
