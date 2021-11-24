import requestApiToken from '../services/RequestApiToken';

const URL_USER_ICON = 'https://www.gravatar.com/avatar/';

export const GET_USER = 'GET_USER';
export const GET_EMAIL = 'GET_EMAIL';
export const GET_TOKEN = 'GET_TOKEN';
export const GET_USER_ICON = 'GET_USER_ICON';

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

export const actionApiToken = () => async (dispatch) => {
  try {
    const { token } = await requestApiToken();
    dispatch(getToken(token));
    localStorage.setItem('token', JSON.stringify(token));
  } catch (error) {
    console.error(error);
  }
};
