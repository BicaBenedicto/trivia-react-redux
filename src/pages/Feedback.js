import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import Header from '../components/Header';
import '../CSS/feedback.css';

class Feedback extends Component {
  constructor() {
    super();

    this.handleClick = this.handleClick.bind(this);
  }

  handleClick() {
    const { history } = this.props;
    history.push('/');
  }

  render() {
    const GOOD_RESULT = 3;
    const { assertions, score, history } = this.props;
    return (
      <div>
        <Header />
        <div
          className="d-block
        position-absolute top-50 start-50 translate-middle shadow p-3 mb-5 rounded
        loginCard"
        >
          {
            assertions.length >= GOOD_RESULT
              ? <span className="feedback" data-testid="feedback-text">Mandou bem!</span>
              : <span data-testid="feedback-text">Podia ser melhor...</span>
          }
          <br />
          Pontuação total:
          <span
            className="feedback"
            data-testid="feedback-total-score"
          >
            { score }
          </span>
          Quantidade de acertos:
          <span className="feedback" data-testid="feedback-total-question">
            {(assertions.length === 0 ? 0 : assertions.length)}
          </span>
          <button
            type="button"
            data-testid="btn-play-again"
            onClick={ this.handleClick }
          >
            Jogar novamente
          </button>
          <button
            type="button"
            data-testid="btn-ranking"
            onClick={ () => history.push('/ranking') }
          >
            Ver Ranking
          </button>
        </div>
      </div>
    );
  }
}
Feedback.propTypes = {
  assertions: PropTypes.arrayOf(PropTypes.object).isRequired,
  history: PropTypes.shape({
    push: PropTypes.func,
  }).isRequired,
  score: PropTypes.number.isRequired,
};

const mapStateToProps = (state) => ({
  assertions: state.player.assertions,
  score: state.player.score,
});

export default connect(mapStateToProps)(Feedback);
