import React, { Component } from 'react';
import { connect } from 'react-redux';
import { addPosts } from '../actions'
import { getPostsByCategory } from '../utilities/api';

import Post from './Post';

class CategoryView extends Component {

  componentDidMount(){

    let { category } = this.props.match.params;

    getPostsByCategory(category).then(
      posts => {
        let { addPosts } = this.props;
        addPosts(posts)
      });
  }

  render(){

    let { posts } = this.props;

    return (
      <ul>
        { posts && posts.map( post =>
          <li key={post.id}><Post {...post} /></li>)}
      </ul>
    )
  }
}

const mapStateToProps = (state, ownProps) => {
  return {
    posts: state.posts.filter( post => post.category === ownProps.match.params.category)
  }
}

const mapDispatchToProps = dispatch => {
  return {
    addPosts: d => dispatch(addPosts(d))
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(CategoryView);
