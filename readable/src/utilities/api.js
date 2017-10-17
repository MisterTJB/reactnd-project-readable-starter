const SERVER_ROOT = 'http://localhost:3001';

export const getCategories = _ => {

  return fetch(ROUTES.categories, { headers:
    { 'Authorization': 'this-is-my-authorisation-header-there-are-many-like-it-but-this-is-mine' } })
}

const ROUTES = {
  categories: `${SERVER_ROOT}/categories`
}
