const { createQuizFlow } = require("./index");

function isPathValid(questions, path) {
  let remainPath = [...path];

  try {
    const quizFlow = createQuizFlow();
    const iter = quizFlow(questions);

    let next = iter.next();
    for (const pair of path) {
      /**
       * Если флоу уже закончен,
       * а в пути еще есть пары
       */
      if (next.done) {
        return false;
      }
      next = iter.next(pair.getAnswer());

      remainPath.shift();
    }

    if (!next.done) {
      return false;
    }
  } catch (e) {
    console.log(e);
    return false;
  }

  return remainPath.length === 0;
}

module.exports = { isPathValid };
