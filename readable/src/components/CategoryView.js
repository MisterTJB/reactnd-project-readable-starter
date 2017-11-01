import React, { Component } from 'react';
import { connect } from 'react-redux';
import { addPosts } from '../actions'
import { getPostsByCategory } from '../utilities/api';

import Categories from './Categories';
import Post from './Post';
import PostForm from './PostForm';
import SortControl from './SortControl';

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

    let { posts, sortBy } = this.props;
    let { category } = this.props.match.params;

    return (
      <div>
        <Categories selectedCategory={category}/>
        <SortControl />
        <ul className="posts__container">
          { posts && posts.sort(sortBy).map( post =>
            <li className="posts__list-item" key={post.id}><Post postId={post.id} /></li>)}
        </ul>
        <PostForm category={category}/>
      </div>
    )
  }
}

const mapStateToProps = (state, ownProps) => {

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
    posts: state.posts.filter( post => post.category === ownProps.match.params.category),
    sortBy: sortFn
  }
}

const mapDispatchToProps = dispatch => {
  return {
    addPosts: d => dispatch(addPosts(d))
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(CategoryView);
