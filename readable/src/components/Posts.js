import React, { Component } from 'react';
import { connect } from 'react-redux';
import { addPosts } from '../actions'
import { getPosts } from '../utilities/api';

import Post from './Post';
import SortControl from './SortControl';

class Posts extends Component {

  componentDidMount(){

    getPosts().then(
      posts => {
        let { addPosts } = this.props;
        addPosts(posts)
      });
  }

  render(){

    let { posts, sortBy } = this.props;

    return (
      <div className="posts__component">
        <SortControl />
        <ul className="posts__list-container">
          { posts && posts
              .sort(sortBy)
              .map( (post, index) => <li className="posts__list-item" key={index}><Post {...post} /></li>)
          }
        </ul>
      </div>
    )
  }
}

const mapStateToProps = state => {

  let sortFn;
  switch (state.sorting){
    case "OLDEST":
      sortFn = (a, b) => { return a.timestamp > b.timestamp }
      break;
    case "MOST_POPULAR":
      sortFn = (a, b) => { return a.voteScore < b.voteScore }
      break;
    case "LEAST_POPULAR":
      sortFn = (a, b) => { return a.voteScore > b.voteScore }
      break;
    default:
      sortFn = (a, b) => { return a.timestamp < b.timestamp }
  }
  return {
    posts: state.posts,
    sortBy: sortFn
  }
}

const mapDispatchToProps = dispatch => {
  return {
    addPosts: d => dispatch(addPosts(d))
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(Posts);
