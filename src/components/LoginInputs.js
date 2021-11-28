import PropTypes from 'prop-types';
import React from 'react';
import { Form, Button, Row, Col } from 'react-bootstrap';
import 'bootstrap/dist/css/bootstrap.min.css';

class LoginInputs extends React.Component {
  render() {
    const { name, email, onInputChange, hasButtonDisabled } = this.props;
    return (
      <div
        className="d-block
       position-absolute top-50 start-50 translate-middle shadow p-3 mb-5 rounded
       loginCard"
      >
        <Row>
          <h2>Login</h2>
          <Col>
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
          </Col>
        </Row>
        <Row>
          <Col>
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
          </Col>
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
