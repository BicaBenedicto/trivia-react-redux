const ENDPOINT = 'https://opentdb.com/api_token.php?command=request';

const requestApiToken = async () => {
  try {
    const response = await fetch(ENDPOINT);
    const data = await response.json();
    return data;
  } catch (e) {
    console.log(e);
  }
};

export default requestApiToken;
