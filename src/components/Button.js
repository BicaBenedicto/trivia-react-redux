import React, { Component } from 'react';
import PropTypes from 'prop-types';
import './Button.css';

class Button extends Component {
  render() {
    const { value, datatestid, className, onButtonClick } = this.props;
    return (
      <button
        type="button"
        data-testid={ datatestid }
        className={ className }
        onClick={ onButtonClick }
      >
        { value }
      </button>
    );
  }
}

Button.propTypes = {
  datatestid: PropTypes.string.isRequired,
  value: PropTypes.string.isRequired,
  className: PropTypes.string,
  onButtonClick: PropTypes.func,
};

Button.defaultProps = {
  className: '',
  onButtonClick: () => {},
};

export default Button;
