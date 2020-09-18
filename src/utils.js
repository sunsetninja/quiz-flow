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

function hasQuestionInAnswers(node, questionId) {
  function hasQuestionInNode(node) {
    return hasQuestionInAnswers(node, questionId);
  }

  // Answer
  if (node.questions) {
    if (node.questions.some(({ id }) => id === questionId)) {
      return true;
    }

    return node.questions.some(hasQuestionInNode);
  }

  // Question
  if (node.answers) {
    if (node.id === questionId) return true;

    return node.answers
      .filter(({ questions }) => questions)
      .some(({ questions }) => questions.some(hasQuestionInNode));
  }
}

module.exports = {
  first,
  last,
  findQuestionAnswers,
  hasQuestionInAnswers,
  makePair,
};
