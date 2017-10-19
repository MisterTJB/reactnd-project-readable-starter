import React, { Component } from 'react';
import { connect } from 'react-redux';
import { addPost } from '../actions'
import uuidv4 from 'uuid/v4'
import { createPost } from '../utilities/api';

class PostForm extends Component {

  state = {
    postTitle: '',
    postBody: '',
    postAuthor: '',
    postCategory: this.props.category
  }

  resetForm = _ => {
    this.setState({
      postTitle: '',
      postBody: '',
      postAuthor: ''
    });
  }

  createPost = ( { title, body, author, category } ) => {
    return {
      title,
      body,
      author,
      category,
      id: uuidv4(),
      timestamp: Date.now()
    }
  }

  // The categories will passed from Redux after
  // the state is initially set
  componentWillReceiveProps(newProps){
    this.setState({
      postCategory: newProps.categories[0].name
    });
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

    let { addPost } = this.props;
    let newPost = this.createPost({
      title: this.state.postTitle,
      body: this.state.postBody,
      author: this.state.postAuthor,
      category: this.state.postCategory
    })

    createPost(newPost)
      .then( post => addPost(post))

    this.resetForm();
  }

  render() {
    return (
      <div>
        <h1>New Post</h1>
        <form onSubmit={this.handleSubmit}>
          <label htmlFor="title">Title</label>
          <input id="title" name="postTitle" placeholder="Title for the post" onChange={this.onChange} value={this.state.postTitle} />

          <label htmlFor="author">Author</label>
          <input id="author" name="postAuthor" placeholder="Your Name" onChange={this.onChange} value={this.state.postAuthor} />

          { !this.props.category &&
            <label htmlFor="category">Category
            <select id="category" name="postCategory" value="" onChange={this.onChange}>
              {
                this.props.categories.map( category => {
                  return <option key={category.path} value={category.name}>{category.name}</option>
                })
              }
            </select>
            </label>
          }

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
    categories: state.categories
  }
}

const mapDispatchToProps = (dispatch) => {
  return {
    addPost: d => dispatch(addPost(d))
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(PostForm)
