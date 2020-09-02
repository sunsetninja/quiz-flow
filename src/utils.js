function first(arr) {
  return arr[0];
}

function last(arr) {
  return arr[arr.length - 1];
}

function findQuestionAnswers(question, answerId) {
  if (Array.isArray(answerId)) {
    return question.answers.filter(({ id }) => answerId.includes(id));
  } else {
    return question.answers.find(({ id }) => id === answerId);
  }
}

// (questionId, answerId)
function makePair(question, answer) {
  return {
    question,
    answer,
    getQuestion() {
      return question;
    },
    getAnswer() {
      return answer;
    },
  };
}

module.exports = {
  first,
  last,
  findQuestionAnswers,
  makePair,
};
