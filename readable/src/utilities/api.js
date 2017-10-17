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

const ROUTES = {
  categories: `${SERVER_ROOT}/categories`,
  posts: `${SERVER_ROOT}/posts`
}
