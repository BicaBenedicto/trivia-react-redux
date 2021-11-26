import PropTypes from 'prop-types';
import React from 'react';
import { Form, Button, Row } from 'react-bootstrap';

class LoginInputs extends React.Component {
  render() {
    const { name, email, onInputChange, hasButtonDisabled } = this.props;
    return (
      <div className="col-md-3 offset-md-4">
        <Row className="mb-3">
          <h2>Login</h2>
          <Form.Label htmlFor="user-input">
            Nome:
            <Form.Control
              id="user-input"
              data-testid="input-player-name"
              type="text"
              name="name"
              value={ name }
              onChange={ onInputChange }
            />
          </Form.Label>
        </Row>
        <Row>
          <Form.Label htmlFor="email-input">
            E-mail:
            <Form.Control
              id="email-input"
              data-testid="input-gravatar-email"
              type="email"
              name="email"
              value={ email }
              onChange={ onInputChange }
            />
          </Form.Label>
        </Row>
        <Button
          variant="outline-success"
          type="submit"
          data-testid="btn-play"
          disabled={ hasButtonDisabled }
        >
          Jogar
        </Button>
      </div>
    );
  }
}

LoginInputs.propTypes = {
  email: PropTypes.string.isRequired,
  hasButtonDisabled: PropTypes.func.isRequired,
  name: PropTypes.string.isRequired,
  onInputChange: PropTypes.func.isRequired,
};

export default LoginInputs;
