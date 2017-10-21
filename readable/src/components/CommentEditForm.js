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

  render() {
    return (
      <div>
        <form onSubmit={this.handleSubmit}>
          <textarea rows="5" id="body" name="body" placeholder="What do you think?" onChange={this.onChange} value={this.state.body} />
          <input type="submit" value="Save"/>
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

export default connect( _ => ({}), mapDispatchToProps)(CommentEditForm)
