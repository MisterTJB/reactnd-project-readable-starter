import React, { Component } from 'react';
import Categories from './Categories';
import Posts from './Posts';
import PostForm from './PostForm';

class Home extends Component {
  render(){
    return (
      <main>
        <Categories className="categories__component" />
        <Posts className="posts__component"/>
        <PostForm className="post-form__component"/>
      </main>
    )
  }
}

export default Home;
