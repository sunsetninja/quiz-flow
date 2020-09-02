const { TERMINATE } = require("./constants");
const { first, makePair, findQuestionAnswers } = require("./utils.js");
const { findNextQuestion } = require("./find-next-question.js");

function createQuizFlow() {
  let quizPath = [];

  function* quizFlow(questions, startQuestion, path = []) {
    let currentQuestion = startQuestion || first(questions);
    let answerId = yield currentQuestion;

    const pair = makePair(currentQuestion.id, answerId);
    path.push(pair);
    quizPath.push(pair);

    while (currentQuestion) {
      if (Array.isArray(answerId)) {
        for (const givenAnswer of findQuestionAnswers(
          currentQuestion,
          answerId
        )) {
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
              currentQuestion = next.value;
              answerId = nextAnswer;

              path.push(makePair(currentQuestion.id, answerId));
            }

            next = iter.next(nextAnswer);
          }

          /**
           * Если один из ответов привел к окончанию опроса
           * завершаем обход ответов
           */
          if (next.value === TERMINATE) {
            break;
          }
        }
      } else {
        currentQuestion = findNextQuestion(questions, path);
        /**
         * Если следующего вопроса нет
         * или ответ привел к окончанию опроса
         * то флоу окончен
         */
        if (currentQuestion === TERMINATE || currentQuestion === null) {
          return currentQuestion;
        }

        answerId = yield currentQuestion;

        const pair = makePair(currentQuestion.id, answerId);
        path.push(pair);
        quizPath.push(pair);
      }
    }
  }

  quizFlow.getPath = () => quizPath;

  return quizFlow;
}

module.exports = { createQuizFlow };
