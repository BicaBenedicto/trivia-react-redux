import PropTypes from 'prop-types';
import React, { Component } from 'react';
import { connect } from 'react-redux';
import Loading from '../components/Loading';
import Header from '../components/Header';
import Button from '../components/Button';
import { getAssertion } from '../actions';
import calculatedScorePoints from '../services/Score';

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
    const { player } = this.props;
    const ONE_SECOND = 1000;
    const FIVE_SECONDS = 5000;

    localStorage.setItem('state', JSON.stringify(
      {
        player,
      },
    ));

    setTimeout(() => {
      this.intervalId = setInterval(() => {
        this.stopwatchQuestion();
      }, ONE_SECOND);
    }, FIVE_SECONDS);
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
        saveAssertion(assertion, calculatedScorePoints(assertion));
        localStorage.setItem('state', JSON.stringify(
          {
            player: {
              ...player,
              score: player.score + calculatedScorePoints(assertion),
              assertions: [...player.assertions, assertion],
            },
          },
        ));
      }
    }
  }

  onNextButtonClick() {
    const { results, history } = this.props;
    const { index } = this.state;
    if (index === results.length - 1) {
      history.push('/feedback');
    } else {
      this.setState((prevState) => ({
        index: prevState.index + 1,
      }), () => this.randomAnswer());
      this.toggleAnswerSelected();
      this.resetTimer();
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
            <div>
              <div>
                <span
                  data-testid="question-category"
                >
                  { results[index].category }

                </span>
                <span data-testid="question-text">{ results[index].question }</span>
                <span>{timer}</span>
              </div>
              <div>
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
  }).isRequired,
  results: PropTypes.arrayOf(PropTypes.object).isRequired,
  saveAssertion: PropTypes.func.isRequired,
  history: PropTypes.shape({
    push: PropTypes.func,
  }).isRequired,
};

const mapDispatchToProps = (dispatch) => ({
  saveAssertion: (answer) => dispatch(getAssertion(answer)),
});

const mapStateToProps = (state) => ({
  results: state.token.results,
  isLoading: state.token.isLoading,
  answersList: state.player.assertions,
  player: state.player,
});

export default connect(mapStateToProps, mapDispatchToProps)(Game);
