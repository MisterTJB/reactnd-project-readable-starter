import React, { Component } from 'react';
import { Redirect } from 'react-router-dom';
import { connect } from 'react-redux';
import { addPost, addComments, removePost } from '../actions'
import { getPost, getComments, deletePost } from '../utilities/api';
import moment from 'moment';
import Comment from './Comment';
import VoteControl from './VoteControl';
import EditForm from './EditForm';

class PostDetail extends Component {

  state = {
    isEditing: false,
    didDelete: false
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
          this.setState( { didDelete: true } )
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

    if (!this.props.post || !this.props.comments){
      return <span>Loading...</span>
    }

    if (this.state.isEditing){
      let { title, body } = this.props.post;
      return (
        <EditForm postTitle={title}
                  postBody={body}
                  postId={this.props.post.id}
                  finishedEditing={this.finishedEditing}/>
      )
    }

    let { title, author, timestamp, voteScore, body, id } = this.props.post
    return (
      <div>
        <h1>{title}</h1>
        <h2>By {author}</h2>
        <span>{ moment(Number(timestamp)).fromNow() }</span>
        <span>{voteScore}</span>
        <button onClick={this.enableEditing}>Edit</button>
        <button onClick={this.deleteCurrentPost}>Delete</button>
        <VoteControl id={id}/>
        { body.split('\n').map( (p, i) => <p key={i}>{ p }</p>) }
        { this.props.comments.map( comment => { return <Comment key={comment.id} {...comment} /> } ) }
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
