import PropTypes from 'prop-types';
import { MD5 } from 'crypto-js';
import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Button, Form } from 'react-bootstrap';
import { getUser, getEmail, actionApiToken, getUserIcon } from '../actions';
import LoginInputs from '../components/LoginInputs';
import '../CSS/login.css';
import trivia from '../trivia.png';

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
    this.changeButtonDisabled = this.changeButtonDisabled.bind(this);
  }

  onInputChange({ target }) {
    const { name, value } = target;
    this.setState({
      [name]: value,
    }, this.changeButtonDisabled);
  }

  onButtonSubmit(e) {
    e.preventDefault();
    const { name, email } = this.state;
    const { sendEmail, sendUser } = this.props;
    sendEmail(email);
    sendUser(name);
    this.handleClick();
  }

  changeButtonDisabled() { // Decide se o botão  de login deve ficar ativado ou desativado
    this.setState({
      hasButtonDisabled: this.verifyNameAndUser(),
    });
  }

  handleClick() {
    const { history, requestToken, requestUserIcon } = this.props;
    const { email } = this.state;
    const emailConvert = MD5(email).toString();
    requestUserIcon(emailConvert);
    requestToken();
    history.push('/game');
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
        <div className="login-form">
          <img
            src={ trivia }
            alt="trivia"
            className="w-25 p-3
          position-absolute top-0 start-50 translate-middle-x"
          />
          <Form className="mb-3" onSubmit={ this.onButtonSubmit }>
            <LoginInputs
              name={ name }
              email={ email }
              hasButtonDisabled={ hasButtonDisabled }
              onInputChange={ this.onInputChange }
            />
          </Form>
        </div>
        <div>
          <Button
            className="m-2 config-button"
            variant="secondary"
            type="button"
            data-testid="btn-settings"
            onClick={ () => this.redirectSettings() }
          >
            Configurações
          </Button>
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
