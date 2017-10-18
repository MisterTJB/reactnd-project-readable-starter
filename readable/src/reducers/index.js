import { combineReducers } from 'redux';
import { ADD_CATEGORIES, ADD_POSTS, ADD_POST, ADD_COMMENTS } from '../actions';

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
    default:
      return state;
  }
}

const comments = (state = [], action) => {
  switch (action.type){
    case ADD_COMMENTS:
      return [...state.filter( comment => comment.parentId !== action.postId), ...action.comments]
    default:
      return state
  }
}

export default combineReducers({ categories, posts, comments })
