import React, { Component } from 'react';
import { Redirect } from 'react-router-dom';
import { connect } from 'react-redux';
import { addPost, addComments, removePost } from '../actions'
import { getPost, getComments, deletePost } from '../utilities/api';
import moment from 'moment';
import Comment from './Comment';
import CommentForm from './CommentForm';
import VoteControl from './VoteControl';
import EditForm from './EditForm';

class PostDetail extends Component {

  state = {
    isEditing: false,
    didDelete: false,
    isDeleted: false
  }

  componentWillMount(){

    let { id } = this.props.match.params

    getPost(id).then(
      result => {

        if (!result.id) throw Error("Nothing returned")

        let { addPost } = this.props;
        addPost(result)

        getComments(id).then(
          result => {
            let { addComments } = this.props
            addComments(result, id)
          }
        )}).catch( rej => {
          this.setState( { isDeleted: true } )
        })
  }

  enableEditing = _ => {
    this.setState({ isEditing: !this.state.isEditing })
  }

  deleteCurrentPost = _ => {

    let { id } = this.props.match.params;
    let { removePost } = this.props;
    deletePost(id).then( _ => {
      removePost(id);
      this.setState({ didDelete: true })
    })
  }

  finishedEditing = (editedPost) => {
    this.setState({ isEditing: false });
  }

  render(){

    if (this.state.didDelete) {
      return <Redirect to="/" />
    }

    if (this.state.isDeleted){
      return (
        <div className="404__container">
          <h1 className="404__container">404</h1>
          <p className="404_paragraph">Sorry bro, looks like someone deleted this post</p>
          <a className="404__link" href="/">Take me home</a>
        </div>
      )
    }

    if (!this.props.post || !this.props.comments){
      return <span>Loading...</span>
    }

    if (this.state.isEditing){
      let { title, body } = this.props.post;
      return (
        <div className="post-detail__container">
          <h1 className="post-detail__header">Edit Post</h1>
          <EditForm postTitle={title}
                    postBody={body}
                    postId={this.props.post.id}
                    finishedEditing={this.finishedEditing}/>
        </div>
      )
    }

    let { title, author, timestamp, voteScore, body, id, category, commentCount} = this.props.post

    return (
      <div className="post-detail__container">
        
        <a className="post-detail__back" href={`/${category}`}>Back</a>
        <h1 className="post-detail__title">{title}</h1>
        { body.split('\n').map( (p, i) => <p className="post-detail__body" key={i}>{ p }</p>) }
        <span className="post-detail__author">By {author}</span>
        <span className="post-detail__time">{ moment(Number(timestamp)).fromNow() }</span>
        <span className="post-detail__score">{voteScore} votes</span>
        <VoteControl postId={id}/>
        <button className="post-detail__edit-button button" onClick={this.enableEditing}>Edit</button>
        <button className="post-detail__delete-button button" onClick={this.deleteCurrentPost}>Delete</button>
        
        <div className="comments__container">
        <span className="post-detail__comment-count">{commentCount} {commentCount === 1 ? "comment" : "comments"}</span>
          { this.props.comments.map( comment => { return <Comment key={comment.id} id={comment.id} /> } ) }
        </div>
        <CommentForm parentId={id}/>
      </div>
    )
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
    addComments: d => dispatch(addComments(d)),
    removePost: d => dispatch(removePost(d))
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(PostDetail);
