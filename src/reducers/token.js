import { GET_TOKEN } from '../actions';

const INITIAL_STATE = {
  token: '',
  result: [],
};

const token = (state = INITIAL_STATE, { type, payload }) => {
  switch (type) {
  case GET_TOKEN:
    return {
      ...state,
      token: payload,
    };
  default:
    return state;
  }
};

export default token;
