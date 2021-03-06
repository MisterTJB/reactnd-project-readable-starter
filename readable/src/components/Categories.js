import React, { Component } from 'react';
import { connect } from 'react-redux';
import { addCategories } from '../actions'
import { getCategories } from '../utilities/api';

import Category from './Category';

class Categories extends Component {

  componentDidMount(){

    getCategories().then(
      result => {
        let { categories } = result
        let { addCategories } = this.props;
        addCategories(categories)
      });
  }

  render(){

    let { categories, selectedCategory } = this.props;

    return (
      <ul className="categories__list-container">
          <li className="category__list-element" key="all">
            <a href="/" className={selectedCategory === undefined 
                                            ? "category__link-active" 
                                            : "category__link-inactive"}>all</a>
          </li>
          { categories && categories.map( category =>
            <li className="category__list-element" key={category.path}>
              <Category selectedCategory={selectedCategory} name={category.name} path={category.path} />
            </li> )
          }
      </ul>
    )
  }
}

const mapStateToProps = state => {

  return {
    ...state
  }
}

const mapDispatchToProps = dispatch => {
  return {
    addCategories: d => dispatch(addCategories(d))
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(Categories);
