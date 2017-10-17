import React, { Component } from 'react';
import Categories from './Categories';
import Posts from './Posts';

class Home extends Component {
  render(){
    return (
      <main>
        <Categories />
        <Posts />
      </main>
    )
  }
}

export default Home;
