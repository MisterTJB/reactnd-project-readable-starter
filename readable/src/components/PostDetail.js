import React, { Component } from 'react';
import { connect } from 'react-redux';
import { addPost } from '../actions'
import { getPost } from '../utilities/api';

class PostDetail extends Component {

  componentDidMount(){

    let { id } = this.props.match.params

    getPost(id).then(
      result => {
        console.log(result);
        let { addPost } = this.props;
        addPost( { post: result } )
      });
  }

  render(){

    let { id } = this.props.match.params

    return (
      <h1>Post detail for {id}</h1>
    )
  }
}

const mapStateToProps = state => {
  return {
    posts: state.posts
  }
}

const mapDispatchToProps = dispatch => {
  return {
    addPost: d => dispatch(addPost(d))
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(PostDetail);
