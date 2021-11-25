import { TOGGLE_SELECTED } from '../actions';

const INITIAL_STATE = {
  hasSelected: false,
};

const game = (state = INITIAL_STATE, { type }) => {
  switch (type) {
  case TOGGLE_SELECTED:
    return {
      ...state,
      hasSelected: !state.hasSelected,
    };
  default:
    return state;
  }
};

export default game;
