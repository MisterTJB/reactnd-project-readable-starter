import React, { Component } from 'react';
import { connect } from 'react-redux';
import VoteControl from './VoteControl';
import moment from 'moment';
import { deletePost } from '../utilities/api';
import { removePost } from '../actions';

import EditForm from './EditForm'

class Post extends Component {

  state = {
    isEditing: false
  }

  enableEditing = _ => {
    this.setState({ isEditing: true })
  }

  finishedEditing = _ => {
    this.setState({ isEditing: false })
  }

  deletePost = _ => {

    let { id } = this.props.post;
    let { removePost } = this.props;
    deletePost(id).then( _ => {
      removePost(id);
    })
  }

  render() {
    
    let { id, title, author, commentCount, category, voteScore, timestamp, body } = this.props.post;
      return (

        !this.state.isEditing ?
          <div className="post__container">
            <a className="post__title" href={ `/${category}/${id}` }>{title}</a>
            <span className="post__author">By {author}</span>
            <span className="post__time">{moment(Number(timestamp)).fromNow()}</span>
            <span className="post__comment-count">{commentCount} comments</span>
            <span className="post__score">{voteScore} votes</span>
            <VoteControl postId={id}/>
            <button className="post__edit-button button" onClick={this.enableEditing}>Edit</button>
            <button className="post__delete-button button" onClick={this.deletePost}>Delete</button>

          </div>

          :

          <EditForm postId={id} postTitle={title} postBody={body} finishedEditing={this.finishedEditing} />
      )
    }
}

const mapStateToProps = (state, ownProps) => {
  console.log(ownProps)
  return {
    post: state.posts.filter( p => p.id === ownProps.postId)[0]
  }
}

const mapDispatchToProps = dispatch => {
  return {
    removePost: d => dispatch(removePost(d))
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(Post);
