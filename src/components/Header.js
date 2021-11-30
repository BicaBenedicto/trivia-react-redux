import PropTypes from 'prop-types';
import React, { Component } from 'react';
import { connect } from 'react-redux';
import trivia from '../trivia.png';
import '../CSS/header.css';

class Header extends Component {
  render() {
    const { username, score, userIcon } = this.props;
    return (
      <header className="header">
        <img
          src={ trivia }
          alt="trivia"
          className="w-25 p-3
        position-absolute top-0 start-50 translate-middle-x"
        />
        <span
          data-testid="header-score"
          className="score"
        >
          {score}
        </span>
        <div className="icon-user-body">
          <span
            data-testid="header-player-name"
            className="user-name-header"
          >
            {username}
          </span>
          <img
            src={ userIcon }
            alt="icon-user"
            data-testid="header-profile-picture"
            className="user-icon-header"
          />
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
