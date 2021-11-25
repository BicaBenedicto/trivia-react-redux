const DEFAULT_NUMBER = 5;

const requestApiQuestion = async (token, number = DEFAULT_NUMBER) => {
  try {
    const response = await fetch(`https://opentdb.com/api.php?amount=${number}&Question=${token}`);
    const data = await response.json();
    return data;
  } catch (e) {
    console.log(e);
  }
};

export default requestApiQuestion;
