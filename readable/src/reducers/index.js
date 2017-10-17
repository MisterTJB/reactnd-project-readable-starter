import { combineReducers } from 'redux';

import { ADD_CATEGORIES, ADD_POSTS } from '../actions';

const category = (state = {}, action ) => {

  let { categories } = action;

  switch (action.type){
    case ADD_CATEGORIES:
      return {
        ...state,
        categories
      }
    default:
      return state;
  }
}

const post = (state = {}, action ) => {

  let { posts } = action;

  switch (action.type){
    case ADD_POSTS:
      return {
        ...state,
        posts
      }
    default:
      return state;
  }
}

export default combineReducers({ category, post })
