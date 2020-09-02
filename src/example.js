const { first, makePair } = require("./utils.js");

// const data1 = require("../fixtures/data1.json");
const data2 = require("../fixtures/data2.json");
const data3 = require("../fixtures/data3.json");

const { createQuizFlow } = require("./index.js");
const { isPathValid } = require("./is-path-valid.js");

const quizFlow = createQuizFlow();
const iter = quizFlow(data2.questions, first(data2.questions));

let question;
question = iter.next();
question = iter.next(101);
question = iter.next(1001);
question = iter.next(2001);
question = iter.next(3001);
question = iter.next(300112);
question = iter.next(300121);
question = iter.next(4001);
question = iter.next(201);
question = iter.next(20111);
question = iter.next(2011111);
question = iter.next(2011121);
question = iter.next([301, 302]);
question = iter.next(30111);
question = iter.next(3011111);
question = iter.next(30211);
question = iter.next(30221);

if (question.done) {
  console.log("end of a quiz");
} else {
  console.log({ nextQuestion: question.value });
}

const validPath = quizFlow.getPath();

console.log({ isValid: isPathValid(data2.questions, validPath) });

const isValid = isPathValid(data3.questions, [
  makePair(100, 101),
  makePair(1000, 1001),
  makePair(2000, 2001),
  makePair(3000, 3002),
  makePair(4000, 4002),
  makePair(5000, [5001, 5002]),
  makePair(50011, 500111),
  makePair(50012, 500121),
  makePair(50021, 500212),
  makePair(50022, 500221),
]);

console.log({ isValid });
