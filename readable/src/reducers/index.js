import { combineReducers } from 'redux';
import { ADD_CATEGORIES, ADD_POSTS, ADD_POST } from '../actions';

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

const post = (state = [], action) => {

  switch (action.type){
    case ADD_POST:
      // Ensure that this post is not already represented, then add it
      return state.filter( post => post.id !== action.post.id).push(action.post)
    default:
      return state
  }

}

const posts = (state = [], action ) => {

  let { posts } = action;

  switch (action.type){
    case ADD_POSTS:
      return posts
    case ADD_POST:
      return post(state, action)
    default:
      return state;
  }
}


export default combineReducers({ categories, posts })
