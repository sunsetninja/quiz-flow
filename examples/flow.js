const { createQuizFlow } = require("../src/index.js");
const { first } = require("../src/utils.js");
const survey = require("./fixtures/survey.json");

const quizFlow = createQuizFlow();
const iter = quizFlow(survey.flow, first(survey.flow));

let question = iter.next();
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
