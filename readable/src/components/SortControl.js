import React, { Component } from 'react';
import { connect } from 'react-redux';
import { changeSorting } from '../actions';

class SortControl extends Component {

  didChange = event => {

    let selectedFilter = event.target.value;
    let { sortBy } = this.props;

    sortBy(selectedFilter);

  }

  render(){
    return (
      <select onChange={this.didChange}>
        <option value="NEWEST">Newest</option>
        <option value="OLDEST">Oldest</option>
        <option value="MOST_POPULAR">Most Popular</option>
        <option value="LEAST_POPULAR">Least Popular</option>

      </select>
    )
  }
}

const mapDispatchToProps = dispatch => {
  return {
    sortBy: property => dispatch(changeSorting(property))
  }
}

export default connect(_ => ({}), mapDispatchToProps)(SortControl);
