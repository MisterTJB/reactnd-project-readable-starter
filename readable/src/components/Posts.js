import React, { Component } from 'react';
import { connect } from 'react-redux';
import { addPosts } from '../actions'
import { getPosts } from '../utilities/api';

import Post from './Post';

class Posts extends Component {

  componentDidMount(){

    getPosts().then(
      posts => {
        let { addPosts } = this.props;
        addPosts( { posts } )
      });
  }

  render(){

    let { posts } = this.props;

    return (
      <ul>
        { posts && posts.map( post =>
          <li key={post.id}><Post /></li>)}
      </ul>
    )
  }
}

const mapStateToProps = state => {
  return {
    posts: state.post.posts
  }
}

const mapDispatchToProps = dispatch => {
  return {
    addPosts: d => dispatch(addPosts(d))
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(Posts);
