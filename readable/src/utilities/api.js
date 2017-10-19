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
    .then( res => res.json() )
}

const ROUTES = {
  categories: `${SERVER_ROOT}/categories`,
  posts: `${SERVER_ROOT}/posts`,
  comments: `${SERVER_ROOT}/comments`
}
