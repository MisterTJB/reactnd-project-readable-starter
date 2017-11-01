import React from 'react';

export default function Category({ name, path, selectedCategory }){
  return <a href={`/${path}`} 
            className={selectedCategory === path 
                                        ? "category__link-active"
                                        : "category__link-inactive"}>{name}</a>
}
