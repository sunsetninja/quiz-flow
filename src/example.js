const { first } = require("./utils.js");

// const data1 = require("../fixtures/data1.json");
const data2 = require("../fixtures/data2.json");

const { quizFlow } = require("./index.js");

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
