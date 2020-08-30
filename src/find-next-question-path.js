const { makePair } = require("./utils.js");

function findNextQuestionPath(questions, path) {
  let currentQuestion = null;
  let nextQuestion = null;
  let nextQuestionPath = [...path];
  let remainPath = [...path];

  function find(questions) {
    for (let i = 0; i < questions.length; i++) {
      const question = questions[i];

      /**
       * Пока currentQuestion не найден, нужно его искать
       * Только потом - искать nextQuestion
       * В моменте, когда мы начнем искать nextQuestion
       * мы должны быть на глубине currentQuestion
       */
      if (!currentQuestion) {
        const pathQuestionId = remainPath[0].getQuestion().id;
        const pathAnswerId = remainPath[0].getAnswer().id;

        if (question.id === pathQuestionId) {
          remainPath.shift();

          /**
           * Если это был последний вопрос в пути,
           * то это текущий вопрос
           */
          if (remainPath.length === 0) {
            currentQuestion = question;

            /**
             * Если текущий вопрос HEAD,
             * берём первый вопрос из вопросов выбранного ответа
             */
            if (currentQuestion.isHead) {
              nextQuestion = currentQuestion.answers.find(
                ({ id }) => id === pathAnswerId
              ).questions[0];
              return;
            }

            /**
             * Если текущий вопрос не последний в своей коллекции
             * берём следующий из его коллекции
             */
            if (questions[i + 1]) {
              nextQuestionPath.pop();
              nextQuestion = questions[i + 1];
              return;
            }

            return;
          }

          if (question.isHead) {
            for (const answer of question.answers) {
              if (!currentQuestion) {
                find(answer.questions);
              }
            }
          }
        }
      } else {
        /**
         * Эта ситуация возможна только если
         * nextQuestion не был найден сразу после нахождения currentQuestion
         * То есть currentQuestion был найден и он был последним в своей коллекции
         * берём следующий вопрос из ближайшей коллекции выше
         */
        if (!nextQuestion) {
          nextQuestion = question;
        }

        break;
      }
    }
  }

  find(questions);

  nextQuestionPath.push(makePair(nextQuestion, null));

  return nextQuestionPath;
}

module.exports = { findNextQuestionPath };
