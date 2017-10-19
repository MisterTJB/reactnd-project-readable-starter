import React, { Component } from 'react';
import { connect } from 'react-redux';
import { addPost } from '../actions'

class PostForm extends Component {

  state = {
    postTitle: '',
    postBody: ''
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

    addPost({
     id: 'slkgnsdgnls;gnlsdgnsgk',
     timestamp: 1468479767190,
     title: 'I put this here just now',
     body: 'You are stupid',
     author: 'test',
     category: 'udacity',
     voteScore: -5,
     deleted: false,
     commentCount: 0
    })

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
