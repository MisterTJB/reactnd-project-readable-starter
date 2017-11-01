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
      postCategory: this.props.category ? this.props.category : newProps.categories[0].name
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
      .then( post => addPost(post) )

    this.resetForm();
  }

  render() {
    
    return (
      <div className="new-post__container">
        <h1 className="new-post__header">New Post</h1>
        <form className="new-post__form" onSubmit={this.handleSubmit}>
          <label className="new-post__label" htmlFor="title">Title</label>
          <input  id="title"
                  name="postTitle"
                  placeholder="Title for the post"
                  onChange={this.onChange}
                  className="new-post__input"
                  value={this.state.postTitle} />

          <label className="new-post__label" htmlFor="author">Author</label>
          <input  id="author"
                  name="postAuthor"
                  className="new-post__input"
                  placeholder="Your Name"
                  onChange={this.onChange}
                  value={this.state.postAuthor} />

          { !this.props.category &&

            <label className="new-post__label" htmlFor="category">Category
              <select className="new-post__category" id="category" name="postCategory" value={this.props.postCategory} onChange={this.onChange}>
                {
                  this.props.categories.map( category => {
                    return <option  key={category.path}
                                    value={category.name}>{category.name}
                           </option> })
                }
              </select>
            </label>
          }

          <label className="new-post__label" htmlFor="body">Post</label>
          <textarea id="body"
                    name="postBody"
                    rows="5"
                    className="new-post__body"
                    value={this.state.postBody}
                    onChange={this.onChange} />

          <input className="button" type="submit" value="Submit"/>
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
