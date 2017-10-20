export const ADD_CATEGORIES = 'ADD_CATEGORIES';
export const ADD_POSTS = 'ADD_POSTS';
export const ADD_POST = 'ADD_POST';
export const ADD_COMMENTS = 'ADD_COMMENTS';
export const UPVOTE_POST = 'UPVOTE_POST';
export const DOWNVOTE_POST = 'DOWNVOTE_POST';
export const DELETE_POST = 'DELETE_POST';

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
