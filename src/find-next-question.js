const { TERMINATE } = require("./constants");

function findNextQuestion(questions, path) {
  let currentQuestion = null;
  let nextQuestion = null;
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
        const pathQuestionId = remainPath[0].getQuestion();
        const pathAnswerId = remainPath[0].getAnswer();

        if (question.id === pathQuestionId) {
          remainPath.shift();

          /**
           * Если это был последний вопрос в пути,
           * то это текущий вопрос
           */
          if (remainPath.length === 0) {
            currentQuestion = question;
            const currentAnswer = currentQuestion.answers.find(
              ({ id }) => id === pathAnswerId
            );

            if (currentAnswer.isTerminate) {
              nextQuestion = TERMINATE;
              return;
            }

            /**
             * Если текущий вопрос HEAD,
             * берём первый вопрос из вопросов выбранного ответа
             */
            if (currentQuestion.isHead) {
              nextQuestion = currentAnswer.questions[0];
              return;
            }

            /**
             * Если текущий вопрос не последний в своей коллекции
             * берём следующий из его коллекции
             */
            if (questions[i + 1]) {
              nextQuestion = questions[i + 1];
              return;
            }

            return;
          }

          if (question.isHead) {
            if (Array.isArray(pathAnswerId)) {
              const givenAnswers = question.answers.filter(({ id }) =>
                pathAnswerId.includes(id)
              );
              for (const { questions } of givenAnswers) {
                find(questions);
              }
            } else {
              const givenAnswer = question.answers.find(
                ({ id }) => id === pathAnswerId
              );
              find(givenAnswer.questions);
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

  return nextQuestion;
}

module.exports = { findNextQuestion };
