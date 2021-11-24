import PropTypes from 'prop-types';
import React, { Component } from 'react';
import { connect } from 'react-redux';
import Loading from '../components/loading';
import Header from '../Header';

class Game extends Component {
  render() {
    const { results, isLoading } = this.props;
    console.log(results);
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
              <span data-testid="question-text">{ results[0] }</span>
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
  results: state.token.token,
  isLoading: state.token.isLoading,
});

export default connect(mapStateToProps)(Game);
