import React, { Component } from 'react';
import PropTypes from 'prop-types';
import '../CSS/ranking.css';

class Ranking extends Component {
  recoveryStorage() {
    const recoveryData = localStorage.getItem('ranking');
    console.log(recoveryData);
    const ranking = JSON.parse(recoveryData);
    if (ranking.length !== 0) {
      console.log(ranking);
      return ranking.sort((a, b) => b.score - a.score)
        .map(({ name, score, userIcon, assertions }, index) => (
          <div className="ranking-line" key={ index }>
            <img src={ userIcon } alt="Icone do jogador" />
            <span data-testid={ `player-name-${index}` }>

              { name }
            </span>
            <span data-testid={ `player-score-${index}` }>
              Acertos:
              { assertions.length }
            </span>
            <span>
              Pontuação:
              { score }
            </span>
          </div>
        ));
    }
  }

  render() {
    const { history } = this.props;
    return (
      <div className="ranking-body">
        <span className="ranking-title" data-testid="ranking-title">Ranking</span>
        {this.recoveryStorage()}
        <button
          type="button"
          data-testid="btn-go-home"
          className="glow-on-hover"
          onClick={ () => history.push('/') }
        >
          Ir para Home

        </button>
      </div>
    );
  }
}

Ranking.propTypes = {
  history: PropTypes.shape({
    push: PropTypes.func,
  }).isRequired,
};

export default Ranking;
