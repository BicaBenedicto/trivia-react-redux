import PropTypes from 'prop-types';
import React, { Component } from 'react';
import { connect } from 'react-redux';
import trivia from '../trivia.png';

class Header extends Component {
  render() {
    const { username, score, userIcon } = this.props;
    return (
      <header className="header">
        <img src={ trivia } alt="trivia" className="trivia-logo" width="100px" />
        <span data-testid="header-score" className="score-header">{score}</span>
        <div>
          <img
            src={ userIcon }
            alt="icon-user"
            data-testid="header-profile-picture"
            className="user-icon-header"
          />
          <span
            data-testid="header-player-name"
            className="user-name-header"
          >
            {username}
          </span>
        </div>
      </header>
    );
  }
}

Header.propTypes = {
  score: PropTypes.number.isRequired,
  userIcon: PropTypes.string,
  username: PropTypes.string.isRequired,
};

Header.defaultProps = {
  userIcon: '',
};

const mapStateToProps = (state) => (
  {
    username: state.player.name,
    score: state.player.score,
    userIcon: state.player.userIcon,
  }
);

export default connect(mapStateToProps)(Header);
