export const ADD_CATEGORIES = 'ADD_CATEGORIES';

export function addCategories({ categories }){
  console.log(categories);
  return {
    type: ADD_CATEGORIES,
    categories
    }
}
