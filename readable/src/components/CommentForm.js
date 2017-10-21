import React, { Component } from 'react';
import { connect } from 'react-redux';
import { addComment } from '../actions'
import uuidv4 from 'uuid/v4'
import { createComment } from '../utilities/api';

class CommentForm extends Component {

  state = {
    body: '',
    author: '',
  }

  resetForm = _ => {
    this.setState({
      author: '',
      body: ''
    });
  }

  createComment = _ => {
    return {
      ...this.state,
      id: uuidv4(),
      timestamp: Date.now(),
      parentId: this.props.parentId
    }
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

    let { addComment } = this.props;
    let comment = this.createComment()

    createComment(comment)
      .then( newComment => addComment(newComment) )

    this.resetForm();
  }

  render() {
    return (
      <div>
        <h1>Add Comment</h1>
        <form onSubmit={this.handleSubmit}>
          <label htmlFor="author">Author</label>
          <input  id="author"
                  name="author"
                  placeholder="Who are you?"
                  onChange={this.onChange}
                  value={this.state.author} />

          <label htmlFor="body">Comment</label>
          <textarea rows="5"
                    id="body"
                    name="body"
                    placeholder="What do you think?"
                    onChange={this.onChange}
                    value={this.state.body} />

          <input type="submit" value="Submit"/>
        </form>
      </div>
    )
  }
}

const mapDispatchToProps = (dispatch) => {
  return {
    addComment: d => dispatch(addComment(d))
  }
}

export default connect(undefined, mapDispatchToProps)(CommentForm)
