import React, { Component } from 'react';
import { connect } from 'react-redux';
import VoteControl from './VoteControl';
import moment from 'moment';
import { deletePost } from '../utilities/api';
import { removePost } from '../actions';

import EditForm from './EditForm'

class Post extends Component {

  state = {
    isEditing: false
  }

  enableEditing = _ => {
    this.setState({ isEditing: true })
  }

  finishedEditing = _ => {
    this.setState({ isEditing: false })
  }

  deletePost = _ => {

    let { id } = this.props;
    let { removePost } = this.props;
    deletePost(id).then( _ => {
      removePost(id);
    })
  }

  render() {
    let { id, title, category, voteScore, timestamp, body } = this.props;
      return (

        !this.state.isEditing ?
          <div>
            <a href={ `/${category}/${id}` }>{title}</a>
            <span>{moment(Number(timestamp)).fromNow()}</span>
            <span>{voteScore} votes</span>
            <VoteControl postId={id}/>
            <button onClick={this.enableEditing}>Edit</button>
            <button onClick={this.deletePost}>Delete</button>

          </div>

          :

          <EditForm postId={id} postTitle={title} postBody={body} finishedEditing={this.finishedEditing} />
      )
    }
}

const mapDispatchToProps = dispatch => {
  return {
    removePost: d => dispatch(removePost(d))
  }
}

export default connect(undefined, mapDispatchToProps)(Post);
