import { combineReducers } from 'redux';

const dummyReducer = (state = {}, action) => {
  return state;
}

export default combineReducers({ dummyReducer })
