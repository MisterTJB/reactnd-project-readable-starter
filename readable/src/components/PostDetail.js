import React, { Component } from 'react';
import { connect } from 'react-redux';
import { addPosts } from '../actions'
import { getPosts } from '../utilities/api';

class PostDetail extends Component {

  render(){

    let { id } = this.props.match.params

    return (
      <h1>Post detail for {id}</h1>
    )
  }
}

// import Post from './Post';
//
// class PostDetail extends Component {
//
//   componentDidMount(){
//
//     getPosts().then(
//       posts => {
//         let { addPosts } = this.props;
//         addPosts( { posts } )
//       });
//   }
//
//   render(){
//
//     let { posts } = this.props;
//
//     return (
//       <ul>
//         { posts && posts.map( post =>
//           <li key={post.id}><Post /></li>)}
//       </ul>
//     )
//   }
// }
//
// const mapStateToProps = state => {
//   return {
//     posts: state.post.posts
//   }
// }
//
// const mapDispatchToProps = dispatch => {
//   return {
//     addPosts: d => dispatch(addPosts(d))
//   }
// }
//
export default PostDetail;
