import PropTypes from 'prop-types';
import { MD5 } from 'crypto-js';
import React, { Component } from 'react';
import { connect } from 'react-redux';
import { getUser, getEmail, actionApiToken, getUserIcon } from '../actions';

class Login extends Component {
  constructor() {
    super();

    this.state = {
      name: '',
      email: '',
      hasButtonDisabled: true,
    };

    this.onInputChange = this.onInputChange.bind(this);
    this.onButtonSubmit = this.onButtonSubmit.bind(this);
    this.handleClick = this.handleClick.bind(this);
    this.verifyNameAndUser = this.verifyNameAndUser.bind(this);
    this.redirectSettings = this.redirectSettings.bind(this);
  }

  onInputChange({ target }) {
    const { name, value } = target;
    this.setState({
      [name]: value,
      hasButtonDisabled: this.verifyNameAndUser(),
    });
  }

  onButtonSubmit(e) {
    e.preventDefault();
    const { name, email } = this.state;
    const { sendEmail, sendUser } = this.props;
    sendEmail(email);
    sendUser(name);
    this.handleClick();
  }

  handleClick() {
    const { history, requestToken, requestUserIcon } = this.props;
    const { email } = this.state;
    const emailConvert = MD5(email).toString();
    requestUserIcon(emailConvert);
    history.push('/game');
    return requestToken();
  }

  verifyNameAndUser() {
    const { name, email } = this.state;
    const emailFormat = /\S+@\S+\.\S+/; // fonte: https://www.horadecodar.com.br/2020/09/13/como-validar-email-com-javascript/
    const isValidEmail = emailFormat.test(email);
    const MIN_LENGHT = 3;
    const isValidName = name.length > MIN_LENGHT;

    if (isValidEmail && isValidName) return false;
    return true;
  }

  redirectSettings() {
    const { history } = this.props;
    history.push('/settings');
  }

  render() {
    const { name, email, hasButtonDisabled } = this.state;

    return (
      <>
        <form onSubmit={ this.onButtonSubmit }>
          <h2>Login</h2>
          <label htmlFor="user-input">
            Nome:
            <input
              id="user-input"
              data-testid="input-player-name"
              type="text"
              name="name"
              value={ name }
              onChange={ this.onInputChange }
            />
          </label>
          <label htmlFor="email-input">
            E-mail:
            <input
              id="email-input"
              data-testid="input-gravatar-email"
              type="email"
              name="email"
              value={ email }
              onChange={ this.onInputChange }
            />
          </label>
          <button type="submit" data-testid="btn-play" disabled={ hasButtonDisabled }>
            Jogar
          </button>
        </form>
        <div>
          <button
            type="button"
            data-testid="btn-settings"
            onClick={ () => this.redirectSettings() }
          >
            Configurações
          </button>
        </div>
      </>
    );
  }
}

Login.propTypes = {
  history: PropTypes.shape({
    push: PropTypes.func,
  }).isRequired,
  requestToken: PropTypes.func.isRequired,
  requestUserIcon: PropTypes.func.isRequired,
  sendEmail: PropTypes.func.isRequired,
  sendUser: PropTypes.func.isRequired,
};

const mapDispatchToProps = (dispatch) => ({
  sendEmail: (email) => dispatch(getEmail(email)),
  sendUser: (user) => dispatch(getUser(user)),
  requestToken: () => dispatch(actionApiToken()),
  requestUserIcon: (emailConvert) => dispatch(getUserIcon(emailConvert)),
});

export default connect(null, mapDispatchToProps)(Login);
