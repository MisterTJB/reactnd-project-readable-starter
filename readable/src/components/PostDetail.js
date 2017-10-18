import React, { Component } from 'react';
import { connect } from 'react-redux';
import { addPost } from '../actions'
import { getPost } from '../utilities/api';
import moment from 'moment';

class PostDetail extends Component {

  componentDidMount(){

    let { id } = this.props.match.params

    getPost(id).then(
      result => {
        let { addPost } = this.props;
        addPost( result )
      });
  }

  render(){

    if (!this.props.post){
      return <h1>Loading</h1>
    } else {
      let { title, author, timestamp, voteScore, body } = this.props.post

      return (
        <div>
          <h1>{title}</h1>
          <h2>By {author}</h2>
          <span>{ moment(Number(timestamp)).fromNow() }</span>
          <span>{voteScore}</span>
          { body.split('\n').map( p => <p>{ p }</p>) }
        </div>
      )
    }

  }
}

const mapStateToProps = (state, ownProps) => {
  return {
    post: state.posts.filter( post => post.id === ownProps.match.params.id)[0]
  }
}

const mapDispatchToProps = dispatch => {
  return {
    addPost: d => dispatch(addPost(d))
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(PostDetail);
