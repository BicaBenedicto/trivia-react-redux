import PropTypes from 'prop-types';
import React, { Component } from 'react';
import { connect } from 'react-redux';
import Loading from '../components/Loading';
import Header from '../components/Header';
import Button from '../components/Button';
import { getAssertion, resetAssertions } from '../actions';
import calculatedScorePoints from '../services/Score';
import '../CSS/timer.css';

const answerButton = 'answer-button';

class Game extends Component {
  constructor() {
    super();

    this.state = {
      answerSelected: false,
      index: 0,
      answers: [],
      hasButtonDisabled: false,
      timer: 30,
    };

    this.onButtonClick = this.onButtonClick.bind(this);
    this.toggleAnswerSelected = this.toggleAnswerSelected.bind(this);
    this.randomAnswer = this.randomAnswer.bind(this);
    this.toggleButtonsDisabled = this.toggleButtonsDisabled.bind(this);
    this.resetTimer = this.resetTimer.bind(this);
    this.onNextButtonClick = this.onNextButtonClick.bind(this);
  }

  componentDidMount() {
    const { player, resetPlayer } = this.props;
    const ONE_SECOND = 1000;

    localStorage.setItem('state', JSON.stringify(
      {
        player: {
          ...player,
          assertions: 0,
          score: 0,
        },
      },
    ));
    resetPlayer();

    this.intervalId = setInterval(() => {
      this.stopwatchQuestion();
    }, ONE_SECOND);
  }

  componentDidUpdate(_prevProps, prevState) {
    if (prevState.timer === 1) {
      clearInterval(this.intervalId);
      this.toggleButtonsDisabled();
      this.toggleAnswerSelected();
    }
  }

  onButtonClick({ target }) {
    const { className, name } = target;
    const { timer, index } = this.state;
    const { results, saveAssertion, player } = this.props;
    if (className === answerButton) {
      this.toggleAnswerSelected();
      clearInterval(this.intervalId);
      if (name === 'correct-answer') {
        const assertion = [{ timer, difficulty: results[index].difficulty }];
        const scorePoints = calculatedScorePoints(assertion);
        saveAssertion({ assertion, score: scorePoints });
        localStorage.setItem('state', JSON.stringify(
          {
            player: {
              ...player,
              score: player.score + scorePoints,
              assertions: player.assertions.length + 1,
            },
          },
        ));
      }
    }
  }

  onNextButtonClick() {
    const { results, history, player } = this.props;
    const { index } = this.state;
    if (index === results.length - 1) {
      history.push('/feedback');
      const ranking = JSON.parse(localStorage.getItem('ranking'));
      if (ranking) {
        this.verifiyPlayerInRanking(ranking, player);
      } else {
        localStorage.setItem('ranking', JSON.stringify([player]));
      }
    } else {
      this.setState((prevState) => ({
        index: prevState.index + 1,
      }), () => this.randomAnswer());
      this.toggleAnswerSelected();
      this.resetTimer();
    }
  }

  verifiyPlayerInRanking(ranking, player) {
    if (ranking.some((rPlayer) => rPlayer.gravatarEmail === player.gravatarEmail)) {
      const oldRanking = [...ranking];
      const newRanking = oldRanking
        .filter(({ gravatarEmail }) => (gravatarEmail !== player.gravatarEmail));
      localStorage.setItem('ranking', JSON.stringify([...newRanking, player]));
    } else {
      const newRanking = [...ranking, player];
      localStorage.setItem('ranking', JSON.stringify(newRanking));
    }
  }

  resetTimer() {
    this.setState({
      timer: 30,
    });
  }

  toggleAnswerSelected() {
    this.setState((prevState) => ({
      answerSelected: !prevState.answerSelected,
    }));
  }

  randomAnswer() {
    const { index } = this.state;
    const { results } = this.props;
    const correctAnswer = results[index].correct_answer;
    const wrongAnswer = results[index].incorrect_answers;
    const randomIndex = Math.floor(Math.random() * wrongAnswer.length);
    const answers = wrongAnswer.map((answer, i) => {
      if (i === randomIndex) {
        return ({
          datatestid: 'correct-answer',
          value: correctAnswer,
        });
      }

      return ({
        datatestid: `wrong-answer-${i}`,
        value: answer,
      });
    }).concat({
      datatestid: `wrong-answer-${randomIndex}`,
      value: wrongAnswer[randomIndex],
    });
    this.setState({ answers });
  }

  toggleButtonsDisabled() {
    this.setState((prevState) => ({
      hasButtonDisabled: !prevState.hasButtonDisabled,
    }));
  }

  stopwatchQuestion() {
    this.setState((prevState) => ({
      timer: prevState.timer - 1,
    }));
  }

  render() {
    const { timer, answers, answerSelected, hasButtonDisabled, index } = this.state;
    const { results, isLoading } = this.props;
    if (results.length !== 0 && answers.length === 0) this.randomAnswer();
    return (
      <>
        <Header />
        { isLoading ? <Loading />
          : (
            <div className="timer">
              <span>{`TEMPO: ${timer}`}</span>
              <div
                className="d-flex
                position-relative top-50 start-50 translate-middle shadow p-3 mb-5 rounded
                "
              >
                <div>
                  <span
                    data-testid="question-category"
                  >
                    { results[index].category }

                  </span>
                  <span data-testid="question-text">{ results[index].question }</span>
                </div>
                <div className="p-3">
                  { answers.map((answer, i) => (
                    <Button
                      key={ i }
                      datatestid={ answer.datatestid }
                      value={ answer.value }
                      onButtonClick={ this.onButtonClick }
                      answerSelected={ answerSelected }
                      hasButtonDisabled={ hasButtonDisabled }
                    />
                  )) }
                </div>
                { answerSelected && <Button
                  datatestid="btn-next"
                  value="Próxima"
                  onButtonClick={ this.onNextButtonClick }
                  answerSelected={ answerSelected }
                /> }
              </div>
            </div>
          )}
      </>
    );
  }
}

Game.propTypes = {
  isLoading: PropTypes.bool.isRequired,
  player: PropTypes.shape({
    score: PropTypes.number,
    assertions: PropTypes.arrayOf(PropTypes.object),
    name: PropTypes.string.isRequired,
    gravatarEmail: PropTypes.string.isRequired,
  }).isRequired,
  results: PropTypes.arrayOf(PropTypes.object).isRequired,
  saveAssertion: PropTypes.func.isRequired,
  history: PropTypes.shape({
    push: PropTypes.func,
  }).isRequired,
  resetPlayer: PropTypes.func.isRequired,
};

const mapDispatchToProps = (dispatch) => ({
  saveAssertion: (answer) => dispatch(getAssertion(answer)),
  resetPlayer: () => dispatch(resetAssertions()),
});

const mapStateToProps = (state) => ({
  results: state.token.results,
  isLoading: state.token.isLoading,
  answersList: state.player.assertions,
  player: state.player,
});

export default connect(mapStateToProps, mapDispatchToProps)(Game);
