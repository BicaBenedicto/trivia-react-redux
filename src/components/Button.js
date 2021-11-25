import React, { Component } from 'react';
import PropTypes from 'prop-types';

class Button extends Component {
  render() {
    const { value, datatestid } = this.props;
    return (
      <button
        type="button"
        data-testid={ datatestid }
      >
        { value }
      </button>
    );
  }
}

Button.propTypes = {
  datatestid: PropTypes.string.isRequired,
  value: PropTypes.string.isRequired,
};

export default Button;
