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
        addCategories( { categories } )
      });
  }

  render(){

    let { categories } = this.props;

    return (
      <ul>
        { categories && categories.map( category =>
          <li key={category.path}><Category name={category.name} path={category.path} /></li>)}
      </ul>
    )
  }
}

const mapStateToProps = state => {
  return {
    categories: state.category.categories
  }
}

const mapDispatchToProps = dispatch => {
  return {
    addCategories: d => dispatch(addCategories(d))
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(Categories);
