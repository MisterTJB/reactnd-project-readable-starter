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

  handleCancel = event => {
    event.preventDefault()
    this.props.finishedEditing()
  }

  render() {

    return (
      <div className="edit-post__container">
        <form className="edit-post__form" onSubmit={this.handleSubmit}>
          <label className="edit-post__label" htmlFor="title">Title</label>
          <input  id="title"
                  name="postTitle"
                  className="edit-post__input"
                  placeholder="Title for the post"
                  onChange={this.onChange}
                  value={this.state.postTitle} />

          <label htmlFor="body">Post</label>
          <textarea id="body"
                    name="postBody"
                    className="edit-post__body"
                    rows="5" value={this.state.postBody}
                    onChange={this.onChange} />

          <input type="submit" className="button" value="Submit"/>
          <button className="edit__cancel-button button" onClick={this.handleCancel}>Cancel</button>
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

export default connect(undefined, mapDispatchToProps)(EditForm);
