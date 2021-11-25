import React, { Component } from 'react';
import PropTypes from 'prop-types';
import './Button.css';

const answerButton = 'answer-button';

class Button extends Component {
  constructor() {
    super();

    this.checkDatatestid = this.checkDatatestid.bind(this);
  }

  checkDatatestid() {
    const { datatestid } = this.props;
    if (datatestid === 'correct-answer') return `correct-answer ${answerButton}`;
    if (datatestid.includes('wrong-answer')) return `wrong-answer ${answerButton}`;
  }

  render() {
    const { value, datatestid, answerSelected,
      onButtonClick, hasButtonDisabled } = this.props;
    return (
      <button
        type="button"
        data-testid={ datatestid }
        className={ answerSelected ? this.checkDatatestid() : answerButton }
        onClick={ onButtonClick }
        disabled={ hasButtonDisabled }
      >
        { value }
      </button>
    );
  }
}

Button.propTypes = {
  datatestid: PropTypes.string.isRequired,
  value: PropTypes.string.isRequired,
  answerSelected: PropTypes.bool.isRequired,
  onButtonClick: PropTypes.func,
  hasButtonDisabled: PropTypes.bool.isRequired,
};

Button.defaultProps = {
  onButtonClick: () => {},
};

export default Button;
