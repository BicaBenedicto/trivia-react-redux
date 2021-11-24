import requestApiToken from '../services/RequestApiToken';

export const GET_USER = 'GET_USER';
export const GET_EMAIL = 'GET_EMAIL';
export const GET_TOKEN = 'GET_TOKEN';

export const getToken = (payload) => ({
  type: GET_TOKEN,
  payload,
});

export const getUser = (payload) => (
  {
    type: GET_USER,
    payload,
  }
);

export const getEmail = (payload) => (
  {
    type: GET_EMAIL,
    payload,
  }
);

export const actionApiToken = () => async (dispatch) => {
  try {
    const { token } = await requestApiToken();
    dispatch(getToken(token));
    localStorage.setItem('token', JSON.stringify(token));
  } catch (error) {
    console.error(error);
  }
};
