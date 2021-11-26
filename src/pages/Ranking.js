import React, { Component } from 'react';
import PropTypes from 'prop-types';
import Header from '../components/Header';

class Ranking extends Component {
  recoveryStorage() {
    const recoveryData = localStorage.getItem('state');
    const player = JSON.parse(recoveryData);

    console.log(player);
    Object.values(player).map(({ name, score, playerIcon, assertions }, index) => (
      <div key={ index }>
        <span data-testid={ `player-name-${index}` }>
          Player:
          { name }
        </span>
        <span data-testid={ `player-score-${index}` }>
          Acertos:
          { assertions }
        </span>
        <span>
          Pontuação:
          { score }
        </span>
        <img src={ playerIcon } alt="Icone do jogador" />
      </div>
    ));
  }

  render() {
    const { history } = this.props;
    return (
      <div>
        <Header />
        <span data-testid="ranking-title">Ranking</span>
        {this.recoveryStorage()}
        <button
          type="button"
          data-testid="btn-go-home"
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
