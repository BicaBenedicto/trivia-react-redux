import PropTypes from 'prop-types';
import React, { Component } from 'react';
import { connect } from 'react-redux';
import Loading from '../components/Loading';
import Header from '../components/Header';
import Button from '../components/Button';

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
  }

  componentDidMount() {
    const ONE_SECOND = 1000;
    const FIVE_SECONDS = 5000;

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
    }
  }

  onButtonClick({ target }) {
    const { className } = target;
    if (className === answerButton) {
      this.toggleAnswerSelected();
      clearInterval(this.intervalId);
    }
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
    const { timer, answers, answerSelected, hasButtonDisabled } = this.state;
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
                  { results[0].category }

                </span>
                <span data-testid="question-text">{ results[0].question }</span>
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
            </div>
          )}
      </>
    );
  }
}

Game.propTypes = {
  isLoading: PropTypes.bool.isRequired,
  results: PropTypes.arrayOf(PropTypes.object).isRequired,
};

const mapStateToProps = (state) => ({
  results: state.token.results,
  isLoading: state.token.isLoading,
});

export default connect(mapStateToProps)(Game);
