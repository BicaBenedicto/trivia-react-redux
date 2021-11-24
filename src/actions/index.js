export const GET_USER = 'GET_USER';
export const GET_EMAIL = 'GET_EMAIL';

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
