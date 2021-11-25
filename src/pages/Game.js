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
    };

    this.onButtonClick = this.onButtonClick.bind(this);
    this.toggleAnswerSelected = this.toggleAnswerSelected.bind(this);
  }

  onButtonClick({ target }) {
    const { className } = target;
    if (className === answerButton) {
      this.toggleAnswerSelected();
    }
  }

  toggleAnswerSelected() {
    this.setState((prevState) => ({
      answerSelected: !prevState.answerSelected,
    }));
  }

  render() {
    const { answerSelected } = this.state;
    const { results, isLoading } = this.props;
    return (
      <>
        <Header />
        { isLoading ? <Loading />
          : (
            <div>
              <span
                data-testid="question-category"
              >
                { results[0].category }

              </span>
              <span data-testid="question-text">{ results[0].question }</span>
              <Button
                datatestid="correct-answer"
                value={ results[0].correct_answer }
                className={ answerSelected ? `correct-answer ${answerButton}`
                  : answerButton }
                onButtonClick={ this.onButtonClick }
              />
              { results[0].incorrect_answers.map((answer, index) => (
                <Button
                  key={ index }
                  datatestid={ `wrong-answer-${index}` }
                  value={ answer }
                  className={ answerSelected ? `wrong-answer ${answerButton}`
                    : answerButton }
                  onButtonClick={ this.onButtonClick }
                />
              ))}
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
