import React, { Component } from 'react';
import { connect } from 'react-redux';
import { editComment } from '../actions';
import { updateComment } from '../utilities/api';

class CommentEditForm extends Component {

  state = {
    body: this.props.body,
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

    let { finishedEditing, editComment, commentId } = this.props;
    let comment = { timestamp: Date.now(), body: this.state.body }

    updateComment(commentId, comment)
      .then( editedComment => {
        editComment(editedComment)
        finishedEditing();
      })

  }

  handleCancel = event => {
    event.preventDefault()
    this.props.finishedEditing();
  }

  render() {
    return (
      <div className="edit-comment__container">
        <form className="edit-comment__form" onSubmit={this.handleSubmit}>
          <textarea rows="5"
                    id="body"
                    name="body"
                    className="edit-comment__body"
                    placeholder="What do you think?"
                    onChange={this.onChange}
                    value={this.state.body} />
          <input className="button" type="submit" value="Save"/>
          <button className="button" onClick={this.handleCancel}>Cancel</button>
        </form>
      </div>
    )
  }
}

const mapDispatchToProps = (dispatch) => {
  return {
    editComment: d => dispatch(editComment(d))
  }
}

export default connect(undefined, mapDispatchToProps)(CommentEditForm)
