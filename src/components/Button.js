import React, { Component } from 'react';
import PropTypes from 'prop-types';
import './style.css';

const answerButton = 'answer-button';

class Button extends Component {
  constructor() {
    super();

    this.checkDatatestid = this.checkDatatestid.bind(this);
  }

  checkDatatestid() {
    const { datatestid } = this.props;
    if (datatestid === 'correct-answer') return 'correct-answer';
    if (datatestid.includes('wrong-answer')) return 'wrong-answer';
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
        name={ datatestid }
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
