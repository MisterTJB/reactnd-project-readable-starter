import React, { Component } from 'react';
import { connect } from 'react-redux';
import { addPost } from '../actions'
import uuidv4 from 'uuid/v4'
import { createPost } from '../utilities/api';

class PostForm extends Component {

  state = {
    postTitle: '',
    postBody: ''
  }

  resetForm = _ => {
    this.setState({
      postTitle: '',
      postBody: ''
    });
  }

  createPost = ( { title, body, author, category } ) => {
    return {
      title,
      body,
      author,
      category,
      id: uuidv4(),
      timestamp: Date.now(),
      voteScore: 0,
      deleted: false
    }
  }

  onChange = (event) => {

    const target = event.target;
    const name = target.name;
    const value = target.value

    console.log(event)

    this.setState({
      [name]: value
    });

  }

  handleSubmit = event => {
    event.preventDefault();

    let { addPost } = this.props;
    let newPost = this.createPost({
      title: this.state.postTitle,
      body: this.state.postBody,
      author: "AUTHOR-TODO",
      category: "CATEGORY-TODO"
    })

    createPost(newPost).then( _ => addPost(newPost))

    this.resetForm();
  }

  render() {
    return (
      <div>
        <h1>New Post</h1>
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

const mapStateToProps = (state) => {
  return {
    // Nothing to return yet
  }
}

const mapDispatchToProps = (dispatch) => {
  return {
    addPost: d => dispatch(addPost(d))
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(PostForm)
