import { combineReducers } from 'redux';
import {
    ADD_CATEGORIES,
    ADD_POSTS,
    DELETE_POST,
    ADD_POST,
    ADD_COMMENTS,
    UPVOTE_POST,
    DOWNVOTE_POST } from '../actions';

const initialState = {
    posts: [],
    categories: [],
    comments: []
}


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
    case DELETE_POST:
      return state.map(post => post.id === action.id ? { ...post, deleted: true } : post)
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
    case DELETE_POST:
      return state.map(comment => comment.parentId === action.id ? { ...comment, parentDeleted: true } : comment)
    default:
      return state
  }
}

export default combineReducers({ categories, posts, comments })
