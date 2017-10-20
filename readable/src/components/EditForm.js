import React, { Component } from 'react';
import { connect } from 'react-redux';
import { updatePost } from '../utilities/api';
import { editPost } from '../actions';


class EditForm extends Component {

  state = {
    postTitle: this.props.postTitle,
    postBody: this.props.postBody
  }

  onChange = (event) => {

    const target = event.target;
    const name = target.name;
    const value = target.value

    this.setState({
      [name]: value
    });

  }

  handleSubmit = event => {
    event.preventDefault();

    let id = this.props.postId;
    let editedPost = { title: this.state.postTitle, body: this.state.postBody }

    updatePost(id, editedPost)
      .then( _ => {
        this.props.editPost(id, editedPost);
        this.props.finishedEditing();
      })
  }

  render() {

    return (
      <div>
        <h1>Edit Post</h1>
        <form onSubmit={this.handleSubmit}>
          <label htmlFor="title">Title</label>
          <input id="title" name="postTitle" placeholder="Title for the post" onChange={this.onChange} value={this.state.postTitle} />

          <label htmlFor="body">Post</label>
          <textarea id="body" name="postBody" rows="5" value={this.state.postBody} onChange={this.onChange} />
          <input type="submit" value="Submit"/>
        </form>
      </div>
    )
  }
}

const mapDispatchToProps = dispatch => {
  return {
    editPost: (postId, editedPost) => dispatch(editPost(postId, editedPost))
  }
}

export default connect(_ => ({}), mapDispatchToProps)(EditForm);
