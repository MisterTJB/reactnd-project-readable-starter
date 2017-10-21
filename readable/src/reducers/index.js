import { combineReducers } from 'redux';
import {
    ADD_CATEGORIES,
    ADD_POSTS,
    DELETE_POST,
    ADD_POST,
    EDIT_POST,
    ADD_COMMENTS,
    ADD_COMMENT,
    EDIT_COMMENT,
    REMOVE_COMMENT,
    UPVOTE_POST,
    DOWNVOTE_POST,
    UPVOTE_COMMENT,
    DOWNVOTE_COMMENT,
    CHANGE_SORTING } from '../actions';

const categories = ( state = [], action ) => {

  let { categories } = action

  switch (action.type){
    case ADD_CATEGORIES:
      return categories
    default:
      return state
  }

}

const posts = (state = [], action ) => {

  switch (action.type){
    case ADD_POSTS:
      return action.posts
    case ADD_POST:
      return [...state.filter( post => post.id !== action.post.id), action.post]
    case EDIT_POST:
      return state.map( post => post.id === action.id
                                ?
                                { ...post, title: action.post.title, body: action.post.body }
                                : post )
    case DELETE_POST:
      return state.map(post => post.id === action.id ? { ...post, deleted: true } : post)
                  .filter( post => !post.deleted)
    case UPVOTE_POST:
      return state.map( post => {
        return post.id === action.id ? { ...post, voteScore: post.voteScore + 1} : post
      })
    case DOWNVOTE_POST:
      return state.map( post => {
        return post.id === action.id ? { ...post, voteScore: post.voteScore - 1} : post
      })
    default:
      return state;
  }
}

const comments = (state = [], action) => {
  switch (action.type){
    case ADD_COMMENTS:
      return [...state.filter( comment => comment.parentId !== action.postId), ...action.comments]
                      .sort( (a, b) => a.voteScore < b.voteScore)
    case ADD_COMMENT:
      return [...state.filter( comment => comment.parentId !== action.postId), action.comment]
                    .sort( (a, b) => a.voteScore < b.voteScore)
    case EDIT_COMMENT:
      return state.map(comment => comment.id === action.comment.id
                                ? action.comment
                                : comment)
                                .sort( (a, b) => a.voteScore < b.voteScore)
    case REMOVE_COMMENT:
      return state.filter(comment => comment.id !== action.id).sort( (a, b) => a.voteScore < b.voteScore)
    case DELETE_POST:
      return state.map(comment => comment.parentId === action.id ? { ...comment, parentDeleted: true } : comment)
    case UPVOTE_COMMENT:
      return state.map( comment => {
        return comment.id === action.id ? { ...comment, voteScore: comment.voteScore + 1} : comment
      }).sort( (a, b) => a.voteScore < b.voteScore)
    case DOWNVOTE_COMMENT:
    return state.map( comment => {
      return comment.id === action.id ? { ...comment, voteScore: comment.voteScore - 1} : comment
    }).sort( (a, b) => a.voteScore < b.voteScore)
    default:
      return state
  }
}

const sorting = ( state = "NEWEST", action) => {

  switch (action.type) {
    case CHANGE_SORTING:
      return action.parameter
    default:
      return state
  }
}

export default combineReducers({ sorting, categories, posts, comments })
