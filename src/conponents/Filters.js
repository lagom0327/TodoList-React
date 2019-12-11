import React, { Component } from 'react';
import PropTypes from 'prop-types';

const firstCharUpperCase = str => (
  str.substring(0, 1).toUpperCase() + str.substring(1)
);

class Filters extends Component {
  handleClick = e => {
    const { changeFilter, filter } = this.props;
    if (filter === e.target.dataset.tag) return;
    changeFilter(e.target.dataset.tag);
  }

  render() {
    const { filter, filters } = this.props;
    return (
      <section className="filters">
        {
          filters.map(filterText => (
            <button
              type="button"
              className={`filters__${filterText} ${filter === filterText ? 'pickedTag' : ''}`}
              data-tag={filterText}
              key={filterText}
              onClick={this.handleClick}
            >
              {firstCharUpperCase(filterText)}
            </button>
          ))
        }
      </section>
    );
  }
}

Filters.propTypes = {
  changeFilter: PropTypes.func.isRequired,
  filter: PropTypes.string.isRequired,
  filters: PropTypes.arrayOf(PropTypes.string).isRequired,
};

export default Filters;
