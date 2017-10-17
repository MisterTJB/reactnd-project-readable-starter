import { combineReducers } from 'redux';

import { ADD_CATEGORIES } from '../actions';

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

export default combineReducers({ category })
