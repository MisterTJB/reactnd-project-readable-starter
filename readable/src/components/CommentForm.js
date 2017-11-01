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
      <div className="comments__container">
        <h1 className="comments__header">Add Comment</h1>
        <form className="comments__form" onSubmit={this.handleSubmit}>
          <label className="comments__label" htmlFor="author">Author</label>
          <input  id="author"
                  name="author"
                  className="comments__input"
                  placeholder="Who are you?"
                  onChange={this.onChange}
                  value={this.state.author} />

          <label className="comments__label" htmlFor="body">Comment</label>
          <textarea rows="5"
                    id="body"
                    name="body"
                    className="comments__body"
                    placeholder="What do you think?"
                    onChange={this.onChange}
                    value={this.state.body} />

          <input className="button" type="submit" value="Submit"/>
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
