import React, { Component } from 'react';
import { connect } from 'react-redux';
import { addPost, addComments } from '../actions'
import { getPost, getComments } from '../utilities/api';
import moment from 'moment';
import Comment from './Comment'

class PostDetail extends Component {

  componentDidMount(){

    let { id } = this.props.match.params

    getPost(id).then(
      result => {
        let { addPost } = this.props;
        addPost(result)

        getComments(id).then(
          result => {
            let { addComments } = this.props
            addComments(result, id)
          }
        )
      });
  }

  render(){

    if (!this.props.post || !this.props.comments){
      return <h1>Loading</h1>
    } else {
      let { title, author, timestamp, voteScore, body } = this.props.post

      return (
        <div>
          <h1>{title}</h1>
          <h2>By {author}</h2>
          <span>{ moment(Number(timestamp)).fromNow() }</span>
          <span>{voteScore}</span>
          { body.split('\n').map( (p, i) => <p key={i}>{ p }</p>) }
          { this.props.comments.map( comment => { <Comment {...comment} /> } ) }
        </div>
      )
    }
  }
}

const mapStateToProps = (state, ownProps) => {
  return {
    post: state.posts.filter( post => post.id === ownProps.match.params.id)[0],
    comments: state.comments.filter( comment => comment.parentId === ownProps.match.params.id)
  }
}

const mapDispatchToProps = dispatch => {
  return {
    addPost: d => dispatch(addPost(d)),
    addComments: d => dispatch(addComments(d))
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(PostDetail);
