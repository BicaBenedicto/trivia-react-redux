import requestApiToken from '../services/RequestApiToken';
import requestApiQuestion from '../services/RequestApiQuestion';

const URL_USER_ICON = 'https://www.gravatar.com/avatar/';

export const GET_USER = 'GET_USER';
export const GET_EMAIL = 'GET_EMAIL';
export const GET_TOKEN = 'GET_TOKEN';
export const GET_QUESTIONS = 'GET_QUESTIONS';
export const GET_USER_ICON = 'GET_USER_ICON';
export const TOGGLE_SELECTED = 'TOGGLE_SELECTED';
export const GET_SCORE = 'GET_SCORE';
export const GET_ASSERTIONS = 'GET_ASSERTIONS';

export const getToken = (payload) => ({
  type: GET_TOKEN,
  payload,
});

export const getQuestions = (payload) => ({
  type: GET_QUESTIONS,
  payload,
});

export const getUser = (payload) => (
  {
    type: GET_USER,
    payload,
  }
);

export const getUserIcon = (payload) => (
  {
    type: GET_USER_ICON,
    payload: `${URL_USER_ICON}${payload}`,
  }
);

export const getEmail = (payload) => (
  {
    type: GET_EMAIL,
    payload,
  }
);

export const actionApiQuestions = (token, number) => async (dispatch) => {
  try {
    const { results } = await requestApiQuestion(token, number);
    dispatch(getQuestions(results));
  } catch (error) {
    console.error(error);
  }
};

export const actionApiToken = () => async (dispatch) => {
  try {
    const { token } = await requestApiToken();
    dispatch(getToken(token));
    dispatch(actionApiQuestions(token));
    localStorage.setItem('token', JSON.stringify(token));
  } catch (error) {
    console.error(error);
  }
};

export const toggleSelected = () => ({ type: TOGGLE_SELECTED });

export const getAssertion = (payload) => (
  { type: GET_ASSERTIONS, payload }
);
