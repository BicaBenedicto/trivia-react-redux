import PropTypes from 'prop-types';
import React, { Component } from 'react';
import { connect } from 'react-redux';
import Loading from '../components/Loading';
import Header from '../components/Header';
import Button from '../components/Button';

class Game extends Component {
  render() {
    const { results, isLoading } = this.props;
    console.log(results);
    console.log(isLoading);
    console.log(results[0]);
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
              <Button datatestid="correct-answer" value={ results[0].correct_answer } />
              { results[0].incorrect_answers.map((answer, index) => (
                <Button
                  key={ index }
                  datatestid={ `wrong-answer-${index}` }
                  value={ answer }
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
