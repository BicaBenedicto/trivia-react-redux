const getDifficultyNumber = (userPoints) => {
  const NUMBER_THREE = 3;
  const NUMBER_TWO = 2;
  const NUMBER_ONE = 1;
  return userPoints.map((assertion) => {
    const { difficulty } = assertion;
    let difficultyPoints;
    if (difficulty === 'hard') difficultyPoints = NUMBER_THREE;
    if (difficulty === 'medium') difficultyPoints = NUMBER_TWO;
    if (difficulty === 'easy') difficultyPoints = NUMBER_ONE;
    return ({
      timer: assertion.timer,
      difficulty,
      difficultyPoints,
    });
  });
};

const calculatedScorePoints = (assertions) => {
  const points = getDifficultyNumber(assertions);
  const SCORE_BASE_NUMBER = 10;
  const total = Number(points.reduce((acc, current) => (
    acc + SCORE_BASE_NUMBER + (current.timer * current.difficultyPoints)
  ), 0));
  return total;
};

export default calculatedScorePoints;
