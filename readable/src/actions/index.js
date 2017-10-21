export const ADD_CATEGORIES = 'ADD_CATEGORIES';
export const ADD_POSTS = 'ADD_POSTS';
export const ADD_POST = 'ADD_POST';
export const EDIT_POST = 'EDIT_POST';
export const ADD_COMMENTS = 'ADD_COMMENTS';
export const ADD_COMMENT = 'ADD_COMMENT';
export const EDIT_COMMENT = 'EDIT_COMMENT';
export const REMOVE_COMMENT = 'REMOVE_COMMENT';
export const UPVOTE_POST = 'UPVOTE_POST';
export const DOWNVOTE_POST = 'DOWNVOTE_POST';
export const DELETE_POST = 'DELETE_POST';
export const UPVOTE_COMMENT = 'UPVOTE_COMMENT';
export const DOWNVOTE_COMMENT = 'DOWNVOTE_COMMENT';
export const CHANGE_SORTING = 'CHANGE_SORTING';

export function changeSorting(parameter){
  return {
    type: CHANGE_SORTING,
    parameter
  }
}

export function addCategories(categories){
  return {
    type: ADD_CATEGORIES,
    categories
    }
}

export function addPosts(posts){
  return {
    type: ADD_POSTS,
    posts
    }
}

export function addPost(post){
  return {
    type: ADD_POST,
    post
    }
}

export function editPost(postId, post){
  console.log(post)
  return {
    type: EDIT_POST,
    post,
    id: postId
    }
}

export function removePost(postId){
  return {
    type: DELETE_POST,
    id: postId
    }
}

export function addComments(comments, postId){
  return {
    type: ADD_COMMENTS,
    comments,
    id: postId
  }
}

export function addComment(comment){
  return {
    type: ADD_COMMENT,
    comment
  }
}

export function editComment(comment){
  return {
    type: EDIT_COMMENT,
    comment
  }
}

export function removeComment(id){
  return {
    type: REMOVE_COMMENT,
    id
  }
}

export function upvotePost(postId){
  return {
    type: UPVOTE_POST,
    id: postId
  }
}

export function downvotePost(postId){
  return {
    type: DOWNVOTE_POST,
    id: postId
  }
}

export function upvoteComment(postId){
  return {
    type: UPVOTE_COMMENT,
    id: postId
  }
}

export function downvoteComment(postId){
  return {
    type: DOWNVOTE_COMMENT,
    id: postId
  }
}
