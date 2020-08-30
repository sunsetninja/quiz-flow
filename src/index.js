const { first, last, makePair, findQuestionAnswers } = require("./utils.js");
const { findNextQuestionPath } = require("./find-next-question-path.js");

function* quizFlow(questions, startQuestion, path = []) {
  let currentQuestion = startQuestion || first(questions);
  let answerId = yield currentQuestion;

  path.push(makePair(currentQuestion, answerId));

  while (currentQuestion) {
    if (Array.isArray(answerId)) {
      for (const givenAnswer of findQuestionAnswers(
        currentQuestion,
        answerId
      )) {
        /**
         * нужно создавать новый путь, так как если передавать старый
         * то по нему нельзя будет искать по givenAnswer.questions
         * TODO: как то нужно сохранять путь
         */
        const iter = quizFlow(
          givenAnswer.questions,
          first(givenAnswer.questions),
          []
        );

        let next = iter.next();
        let nextAnswer = null;
        while (!next.done) {
          nextAnswer = yield next.value;

          /**
           * переопределяем пару вопрос/ответ из замыкания для того,
           * чтобы когда выйдем из рекурсии последняя пара вопрос/ответ
           * стала новой внешней и можно было на основе неё продолжить флоу
           */
          if (next.value) {
            path.push(makePair(next.value, nextAnswer));
            currentQuestion = next.value;
            answerId = nextAnswer;
          }

          next = iter.next(nextAnswer);
        }
      }
    } else {
      currentQuestion = last(
        findNextQuestionPath(questions, path)
      ).getQuestion();
      // Если следующего вопроса нет, то флоу окончен
      if (!currentQuestion) return currentQuestion;
      answerId = yield currentQuestion;

      path.push(makePair(currentQuestion, answerId));
    }
  }
}

module.exports = { quizFlow };
