import { GET_TOKEN, GET_QUESTIONS } from '../actions';

const INITIAL_STATE = {
  token: '',
  results: [],
  isLoading: true,
};

const token = (state = INITIAL_STATE, { type, payload }) => {
  switch (type) {
  case GET_TOKEN:
    return {
      ...state,
      token: payload,
    };
  case GET_QUESTIONS:
    return {
      ...state,
      results: [...payload],
      isLoading: false,
    };
  default:
    return state;
  }
};

export default token;
