export const ADD_CATEGORIES = 'ADD_CATEGORIES';
export const ADD_POSTS = 'ADD_POSTS';
export const ADD_POST = 'ADD_POST';

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
