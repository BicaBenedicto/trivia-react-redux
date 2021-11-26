import { GET_USER,
  GET_EMAIL, GET_USER_ICON, GET_ASSERTIONS, RESET_ASSERTIONS } from '../actions';

const INITIAL_STATE = {
  name: '',
  assertions: [],
  score: 0,
  gravatarEmail: '',
  userIcon: '',
};

const player = (state = INITIAL_STATE, { type, payload }) => {
  switch (type) {
  case GET_USER:
    return {
      ...state,
      name: payload,
    };
  case GET_EMAIL:
    return {
      ...state,
      gravatarEmail: payload,
    };
  case GET_USER_ICON:
    return {
      ...state,
      userIcon: payload,
    };
  case GET_ASSERTIONS:
    return {
      ...state,
      assertions: [...state.assertions, payload.assertion],
      score: state.score + payload.score,
    };
  case RESET_ASSERTIONS:
    return {
      ...state,
      assertions: [],
      score: 0,
    };
  default:
    return state;
  }
};

export default player;
