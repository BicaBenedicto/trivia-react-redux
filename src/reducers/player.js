import { GET_USER, GET_EMAIL } from '../actions';

const INITIAL_STATE = {
  name: '',
  assertions: '',
  score: 0,
  gravatarEmail: '',
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
  default:
    return state;
  }
};

export default player;
