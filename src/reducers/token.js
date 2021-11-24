import { GET_TOKEN, GET_QUESTIONS, REQUEST_QUESTIONS } from '../actions';

const INITIAL_STATE = {
  token: '',
  results: [],
  isLoading: false,
};

const token = (state = INITIAL_STATE, { type, payload }) => {
  switch (type) {
  case GET_TOKEN:
    return {
      ...state,
      token: payload,
    };
  case REQUEST_QUESTIONS:
    return {
      ...state,
      isLoading: true,
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
