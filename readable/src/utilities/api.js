const SERVER_ROOT = 'http://localhost:3001';

export const getCategories = _ => {
  return fetch(ROUTES.categories, { headers:
    { 'Authorization': 'this-is-my-authorisation-header-there-are-many-like-it-but-this-is-mine' } })
    .then( res => res.json() )
}

export const getPosts = _ => {
  return fetch(ROUTES.posts, { headers:
    { 'Authorization': 'this-is-my-authorisation-header-there-are-many-like-it-but-this-is-mine' } })
    .then( res => res.json() )
}

export const getPostsByCategory = (category) => {
  return fetch(`${SERVER_ROOT}/${category}/posts`, { headers:
    { 'Authorization': 'this-is-my-authorisation-header-there-are-many-like-it-but-this-is-mine' } })
    .then( res => res.json() )
}

export const getComments = (id) => {
  return fetch(`${ROUTES.posts}/${id}/comments`, { headers:
    { 'Authorization': 'this-is-my-authorisation-header-there-are-many-like-it-but-this-is-mine' } })
    .then( res => res.json() )
}

export const getPost = (id) => {
  return fetch(`${ROUTES.posts}/${id}`, { headers:
    { 'Authorization': 'this-is-my-authorisation-header-there-are-many-like-it-but-this-is-mine' } })
    .then( res => res.json())
}

export const createPost = (post) => {
  return fetch(`${ROUTES.posts}`, {
    headers: {
      'Authorization': 'this-is-my-authorisation-header-there-are-many-like-it-but-this-is-mine',
      'Content-Type': 'application/json'},
    method: "POST",
    body: JSON.stringify({
      ...post })
    }).then ( res => res.json() );
}

export const updatePost = (postId, post) => {
  return fetch(`${ROUTES.posts}/${postId}`, {
    headers: {
      'Authorization': 'this-is-my-authorisation-header-there-are-many-like-it-but-this-is-mine',
      'Content-Type': 'application/json'},
    method: "PUT",
    body: JSON.stringify({
      ...post })
    }).then ( res => res.json() );
}

export const deletePost = (postId) => {
  return fetch(`${ROUTES.posts}/${postId}`, {
    headers: {
      'Authorization': 'this-is-my-authorisation-header-there-are-many-like-it-but-this-is-mine'
    },
    method: "DELETE"})
    .then ( res => res.json() );
}

const updateVote = (postId, option) => {
  return fetch(`${ROUTES.posts}/${postId}`, {
    headers: {
      'Authorization': 'this-is-my-authorisation-header-there-are-many-like-it-but-this-is-mine',
      'Content-Type': 'application/json'},
    method: "POST",
    body: JSON.stringify({ option })
    }).then ( res => res.json() );
}

export const incrementVote = (postId) => {
  return updateVote(postId, 'upVote');
}

export const decrementVote = (postId) => {
  return updateVote(postId, 'downVote');
}

const updateCommentVote = (commentId, option) => {

  return fetch(`${ROUTES.comments}/${commentId}`, {
    headers: {
      'Authorization': 'this-is-my-authorisation-header-there-are-many-like-it-but-this-is-mine',
      'Content-Type': 'application/json'},
    method: "POST",
    body: JSON.stringify({ option })
    }).then ( res => res.json() );
}

export const incrementCommentVote = (commentId) => {
  return updateCommentVote(commentId, 'upVote');
}

export const decrementCommentVote = (commentId) => {
  return updateCommentVote(commentId, 'downVote');
}

const ROUTES = {
  categories: `${SERVER_ROOT}/categories`,
  posts: `${SERVER_ROOT}/posts`,
  comments: `${SERVER_ROOT}/comments`
}
